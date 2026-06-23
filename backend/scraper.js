import puppeteer from 'puppeteer';

/**
 * Função utilitária para higienizar links e extrair o username do Instagram de qualquer formato
 * Suporta: links completos, links com query parameters, arroba, apenas username.
 */
export function extractInstagramUsername(input) {
  if (!input) return '';
  let clean = input.trim();
  
  // Remove parâmetros de query (ex: ?igsh=MTd0N3Fh)
  clean = clean.split('?')[0];
  
  // Remove barras no final da URL
  clean = clean.replace(/\/+$/, '');
  
  // Se for uma URL completa, extrai a última parte
  if (clean.includes('instagram.com')) {
    const parts = clean.split('/');
    clean = parts[parts.length - 1] || '';
  }
  
  // Remove o símbolo de arroba no início do username, se houver
  clean = clean.replace(/^@/, '');
  
  return clean.trim();
}

/**
 * Função principal para executar o scraping no Google Maps
 * @param {string} query - Nicho
 * @param {string} state - UF
 * @param {string} city - Cidade
 * @param {number} limit - Quantidade a carregar
 * @param {array} blocklist - Links que já foram carregados no frontend e devem ser pulados
 * @param {function} onProgress - Callback SSE
 */
export async function runScraper(query, state, city, limit, blocklist = [], onProgress) {
  const searchQuery = `${query} em ${city}, ${state}`;
  const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}/`;
  
  onProgress({ type: 'status', message: 'Iniciando navegador local...' });

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1280,800'
    ],
    defaultViewport: { width: 1280, height: 800 }
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
    });

    onProgress({ type: 'status', message: `Buscando no Google Maps por: "${searchQuery}"` });
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    onProgress({ type: 'status', message: 'Rolando lista e filtrando empresas já capturadas...' });
    
    // Passamos a blocklist para carregar apenas empresas NOVAS
    const links = await scrollAndCollectLinks(page, limit, blocklist, onProgress);
    
    if (links.length === 0) {
      onProgress({ 
        type: 'status', 
        message: 'Fim dos resultados: não há mais empresas novas deste segmento nesta região.' 
      });
      return [];
    }

    onProgress({ 
      type: 'status', 
      message: `Encontradas ${links.length} novas empresas. Iniciando extração de detalhes...` 
    });

    const leads = [];

    for (let i = 0; i < links.length; i++) {
      const url = links[i];
      onProgress({ 
        type: 'status', 
        message: `Analisando empresa ${i + 1} de ${links.length}...` 
      });

      try {
        const lead = await scrapeBusinessDetails(page, url);
        if (lead && lead.name) {
          lead.socials = { instagram: '', facebook: '' };
          lead.instagramMetrics = null;
          lead.instagramSuggestions = [];

          // 2. Tenta extrair redes sociais do Website oficial
          if (lead.website) {
            onProgress({ type: 'status', message: `-> Verificando site da empresa: ${lead.website.replace(/https?:\/\/(www\.)?/, '').split('/')[0]} ...` });
            const socials = await extractSocialsFromWebsite(browser, lead.website);
            lead.socials = socials;
          }

          // 3. Fallback DuckDuckGo se não encontrou no site
          if (!lead.socials.instagram) {
            onProgress({ type: 'status', message: `-> Pesquisando sugestões de Instagram para "${lead.name}"...` });
            const suggestions = await getInstagramSuggestions(browser, lead.name, city);
            lead.instagramSuggestions = suggestions;
            if (suggestions.length > 0) {
              lead.socials.instagram = suggestions[0].url;
            }
          }

          // 4. Coleta métricas do Instagram via Meta Tags
          if (lead.socials.instagram) {
            onProgress({ type: 'status', message: `-> Analisando métricas do perfil Instagram...` });
            const metrics = await getInstagramMetrics(browser, lead.socials.instagram);
            if (metrics) {
              lead.instagramMetrics = metrics;
            }
          }

          // 5. Analisa oportunidades e proposta
          lead.opportunities = analyzeOpportunities(lead);
          lead.pitch = generatePitch(lead);
          
          leads.push(lead);
          
          onProgress({ 
            type: 'lead', 
            lead: lead,
            current: i + 1,
            total: links.length
          });
        }
      } catch (err) {
        console.error(`Erro ao analisar lead ${url}:`, err);
      }
    }

    onProgress({ type: 'status', message: 'Busca concluída!' });
    return leads;

  } catch (error) {
    onProgress({ type: 'error', message: `Erro no scraping: ${error.message}` });
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * Rola a lista lateral do Google Maps filtrando leads existentes
 */
async function scrollAndCollectLinks(page, limit, blocklist, onProgress) {
  const containerSelector = 'div[role="feed"]';
  await page.waitForSelector(containerSelector, { timeout: 15000 }).catch(() => {});

  return await page.evaluate(async (maxResults, blocked) => {
    const feed = document.querySelector('div[role="feed"]');
    if (!feed) {
      const allLinks = Array.from(document.querySelectorAll('a[href*="/maps/place/"]')).map(a => a.href);
      return [...new Set(allLinks)].filter(link => !blocked.includes(link)).slice(0, maxResults);
    }
    
    let lastHeight = feed.scrollHeight;
    let newLinks = [];
    let noChangeCount = 0;
    
    while (newLinks.length < maxResults && noChangeCount < 10) {
      feed.scrollTop = feed.scrollHeight;
      await new Promise(r => setTimeout(r, 1500));
      
      const currentLinks = Array.from(document.querySelectorAll('a[href*="/maps/place/"]'))
        .map(a => a.href);
      const uniqueLinks = [...new Set(currentLinks)];
      newLinks = uniqueLinks.filter(link => !blocked.includes(link));
      
      if (feed.scrollHeight === lastHeight) {
        feed.scrollTop = feed.scrollTop - 200;
        await new Promise(r => setTimeout(r, 500));
        feed.scrollTop = feed.scrollHeight;
        await new Promise(r => setTimeout(r, 1000));
        
        if (feed.scrollHeight === lastHeight) {
          noChangeCount++;
        } else {
          noChangeCount = 0;
        }
      } else {
        noChangeCount = 0;
      }
      
      lastHeight = feed.scrollHeight;
      
      const endText = document.body.innerText.includes('Você chegou ao fim da lista') || 
                      document.body.innerText.includes('Não encontramos mais resultados');
      if (endText) break;
    }
    
    return newLinks.slice(0, maxResults);
  }, limit, blocklist);
}

/**
 * Coleta detalhes básicos da empresa na página do Google Maps
 */
async function scrapeBusinessDetails(page, url) {
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  return await page.evaluate((businessUrl) => {
    const nameEl = document.querySelector('h1');
    const name = nameEl ? nameEl.textContent.trim() : '';

    let rating = 'N/A';
    let reviewsCount = '0';
    const ratingContainer = document.querySelector('div.F7nice');
    if (ratingContainer) {
      const spanRating = ratingContainer.querySelector('span[aria-hidden="true"]');
      if (spanRating) rating = spanRating.textContent.trim().replace(',', '.');
      
      const reviewsSpan = ratingContainer.querySelector('span:not([aria-hidden="true"])');
      if (reviewsSpan) {
        reviewsCount = reviewsSpan.textContent.replace(/[()]/g, '').trim();
      }
    }

    if (rating === 'N/A') {
      const ratingEl = document.querySelector('span[aria-label*="estrelas"], span[aria-label*="stars"]');
      if (ratingEl) {
        const text = ratingEl.getAttribute('aria-label');
        const match = text.match(/([0-9,.]+)/);
        if (match) rating = match[1].replace(',', '.');
      }
    }

    let category = '';
    const catEl = document.querySelector('button[jsaction*="pane.rating.category"], button[class*="D72ZCc"]');
    if (catEl) {
      category = catEl.textContent.trim();
    }

    let website = '';
    const webEl = document.querySelector('a[data-item-id="authority"]');
    if (webEl) {
      website = webEl.href;
    } else {
      const links = Array.from(document.querySelectorAll('a[href^="http"]'));
      const candidate = links.find(a => !a.href.includes('google.com/maps') && !a.href.includes('google.com/search'));
      if (candidate) website = candidate.href;
    }

    let phone = '';
    const phoneEl = document.querySelector('button[data-item-id^="phone:tel:"], a[data-item-id^="phone:tel:"]');
    if (phoneEl) {
      const itemId = phoneEl.getAttribute('data-item-id');
      phone = itemId.replace('phone:tel:', '').trim();
    }

    let address = '';
    const addressEl = document.querySelector('button[data-item-id="address"]');
    if (addressEl) {
      address = addressEl.textContent.trim();
    }

    return {
      name,
      rating: rating !== 'N/A' ? parseFloat(rating) : null,
      reviewsCount: parseInt(reviewsCount) || 0,
      category,
      website,
      phone,
      address,
      url: businessUrl
    };
  }, url);
}

/**
 * Crawlea website buscando links de redes sociais
 */
async function extractSocialsFromWebsite(browser, url) {
  if (!url) return { instagram: '', facebook: '' };
  
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 12000 });
    
    return await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      let instagram = '';
      let facebook = '';
      
      for (const a of anchors) {
        const href = a.href.toLowerCase();
        if (href.includes('instagram.com/') && !instagram && !href.includes('/p/') && !href.includes('/explore/')) {
          instagram = a.href;
        }
        if (href.includes('facebook.com/') && !facebook) {
          facebook = a.href;
        }
      }
      return { instagram, facebook };
    });
  } catch (err) {
    console.error(`Erro ao ler website ${url}:`, err.message);
    return { instagram: '', facebook: '' };
  } finally {
    await page.close();
  }
}

/**
 * Busca de até 5 sugestões de Instagram no DuckDuckGo
 */
export async function getInstagramSuggestions(browser, companyName, city) {
  const query = `${companyName} ${city} instagram`;
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    
    return await page.evaluate(() => {
      const results = Array.from(document.querySelectorAll('.result__body'));
      const suggestions = [];
      
      for (const res of results) {
        const linkEl = res.querySelector('a.result__url');
        const snippetEl = res.querySelector('.result__snippet');
        const titleEl = res.querySelector('.result__title');
        
        if (linkEl) {
          const href = linkEl.href;
          const hrefLower = href.toLowerCase();
          
          if (hrefLower.includes('instagram.com/') && !hrefLower.includes('/p/') && !hrefLower.includes('/explore/')) {
            let username = '';
            try {
              const cleanUrl = href.replace(/\/$/, '').split('?')[0];
              username = cleanUrl.split('/').pop();
            } catch (e) {
              continue;
            }
            
            if (username && username !== 'instagram' && !suggestions.some(s => s.username === username)) {
              const snippet = snippetEl ? snippetEl.textContent.trim() : (titleEl ? titleEl.textContent.trim() : '');
              suggestions.push({
                username,
                url: href,
                title: snippet || `@${username}`
              });
            }
          }
        }
        if (suggestions.length >= 5) break;
      }
      return suggestions;
    });
  } catch (err) {
    console.error('Erro ao buscar sugestões no DuckDuckGo:', err.message);
    return [];
  } finally {
    await page.close();
  }
}

/**
 * Coleta métricas de seguidores no perfil público do Instagram via Meta Tags
 */
export async function getInstagramMetrics(browser, instagramUrl) {
  if (!instagramUrl) return null;
  
  // Utiliza a função utilitária de sanitização de username
  const username = extractInstagramUsername(instagramUrl);
  if (!username) return null;
  
  const targetUrl = `https://www.instagram.com/${username}/`;
  const page = await browser.newPage();
  try {
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    
    const rawMeta = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="description"]') || document.querySelector('meta[property="og:description"]');
      return meta ? meta.getAttribute('content') : null;
    });

    if (!rawMeta) {
      return { username, followers: 'N/A', following: 'N/A', posts: 'N/A', url: targetUrl };
    }

    const text = rawMeta.toLowerCase();
    
    const followersMatch = text.match(/([0-9.,kmb\s]+)\s*(followers|seguidores)/);
    const followingMatch = text.match(/([0-9.,kmb\s]+)\s*(following|seguindo)/);
    const postsMatch = text.match(/([0-9.,kmb\s]+)\s*(posts|publicações|publicacoes)/);

    const clean = (val) => val ? val[1].trim().toUpperCase() : 'N/A';

    return {
      username,
      followers: clean(followersMatch),
      following: clean(followingMatch),
      posts: clean(postsMatch),
      url: targetUrl
    };

  } catch (err) {
    console.error(`Erro ao analisar Instagram para ${username}:`, err.message);
    return { username, followers: 'N/A', following: 'N/A', posts: 'N/A', url: targetUrl };
  } finally {
    await page.close();
  }
}

/**
 * Gera diagnósticos baseados no perfil do lead
 */
export function analyzeOpportunities(lead) {
  const opps = [];
  
  if (!lead.website) {
    opps.push({
      title: 'Ausência de Website',
      severity: 'high',
      description: 'A empresa não possui website linkado no Google Maps. Isso reduz a credibilidade e afeta anúncios.'
    });
  }
  
  if (!lead.phone) {
    opps.push({
      title: 'Sem Telefone de Contato',
      severity: 'high',
      description: 'Sem número de telefone na ficha do Google Maps, dificultando chamadas e WhatsApp direto.'
    });
  }

  if (lead.rating !== null && lead.rating < 4.2) {
    opps.push({
      title: 'Nota do Maps Baixa',
      severity: 'medium',
      description: `A nota atual é de ${lead.rating}. Avaliações abaixo de 4.2 afastam clientes e reduzem rank local.`
    });
  }

  if (lead.reviewsCount < 15) {
    opps.push({
      title: 'Poucos Reviews no Maps',
      severity: 'medium',
      description: `Possui apenas ${lead.reviewsCount} avaliações. Concorrentes com mais avaliações tomam a liderança local.`
    });
  }

  if (!lead.socials?.instagram) {
    opps.push({
      title: 'Sem Perfil de Instagram',
      severity: 'high',
      description: 'Não encontramos conta ativa do Instagram vinculada à marca. Perda de canal vital de tráfego orgânico e imagem.'
    });
  } else if (lead.instagramMetrics) {
    const { followers, posts } = lead.instagramMetrics;
    
    let estFollowers = 0;
    if (followers !== 'N/A') {
      const cleanVal = followers.replace(/[.\s]/g, '').replace(',', '.');
      if (cleanVal.includes('K')) {
        estFollowers = parseFloat(cleanVal) * 1000;
      } else if (cleanVal.includes('M')) {
        estFollowers = parseFloat(cleanVal) * 1000000;
      } else {
        estFollowers = parseInt(cleanVal) || 0;
      }
    }

    if (followers === 'N/A' || estFollowers < 1000) {
      opps.push({
        title: 'Baixo Engajamento Instagram',
        severity: 'medium',
        description: `Possui menos de 1.000 seguidores (${followers || 0}). Indica oportunidade para gestão de tráfego orgânico/anúncios e design.`
      });
    }

    if (posts === 'N/A' || parseInt(posts) < 10) {
      opps.push({
        title: 'Instagram Pouco Ativo',
        severity: 'medium',
        description: `Apenas ${posts || 0} publicações encontradas. Frequência baixa enfraquece a retenção de marca.`
      });
    }
  }

  if (opps.length === 0) {
    opps.push({
      title: 'Estrutura Completa (Venda Avançada)',
      severity: 'low',
      description: 'Presença no Maps e Instagram bem estruturadas. A oportunidade é oferecer automação de funis (ManiChat) ou tráfego pago de alta conversão.'
    });
  }

  return opps;
}

/**
 * Cria proposta comercial
 */
export function generatePitch(lead) {
  const intro = `Olá, tudo bem?\n\nMe chamo [Seu Nome] e analisei o posicionamento digital da *${lead.name}* no Maps e redes sociais.`;
  
  let coreMessage = '';
  
  if (!lead.website) {
    coreMessage = `Vi que vocês são bem recomendados no Google Maps, mas notei que *ainda não possuem um site oficial cadastrado*.\n\nCerca de 90% das pessoas pesquisam no Maps e clicam no site para ver serviços e cardápios. Além disso, notei que ${lead.socials?.instagram ? 'vocês já têm presença no Instagram' : 'também não achamos seu Instagram ativo'}.\n\nEu desenvolvo sites profissionais e velozes para celular. Que tal ver um rascunho de como seria o site ideal da sua empresa esta semana?`;
  }
  else if (!lead.socials?.instagram) {
    coreMessage = `Vocês têm uma nota de ${lead.rating || 'N/A'} no Maps, o que é ótimo! Contudo, *não localizei um perfil ativo de Instagram* para a sua empresa.\n\nHoje, o Instagram serve como vitrine visual indispensável para conectar com clientes locais e passar autoridade. Eu trabalho estruturando perfis comerciais focados em captação automática de clientes. Gostaria de entender como podemos criar seu perfil do zero?`;
  }
  else if (lead.instagramMetrics && lead.instagramMetrics.followers !== 'N/A' && parseInt(lead.instagramMetrics.followers.replace(/\D/g, '')) < 1000) {
    coreMessage = `Excelente trabalho no Google Maps (nota ${lead.rating || 'N/A'}). Analisei o perfil do Instagram de vocês (@${lead.instagramMetrics.username}) e percebi que vocês estão com *${lead.instagramMetrics.followers} seguidores*.\n\nCom uma audiência menor, as postagens orgânicas atingem poucas pessoas na cidade. Eu ajudo negócios locais a acelerar o ganho de seguidores qualificados e lotar a agenda por meio de anúncios patrocinados voltados diretamente para a sua região.\n\nPodemos fazer um bate-papo rápido de 5 minutos sobre isso?`;
  }
  else if (lead.rating !== null && lead.rating < 4.2) {
    coreMessage = `Notei que a *avaliação de vocês no Google Maps está em ${lead.rating} estrelas*.\n\nNotas abaixo de 4.2 fazem com que o Google prefira indicar seus concorrentes no topo, além de gerar dúvidas nos clientes de primeira viagem.\n\nTrabalho com estratégias de captação de reviews reais e blindagem de reputação local. Topa conversar por 5 minutos para entender como subir essa nota?`;
  }
  else {
    coreMessage = `Parabéns pela estrutura! Vocês têm site, boa nota no Maps e uma conta ativa no Instagram (@${lead.instagramMetrics?.username || ''}).\n\nComo vocês já fazem o básico de forma incrível, a melhor estratégia de escala agora é implantar *automação de respostas no Instagram (Direct)* com funis de tráfego pago avançados para capturar contatos automaticamente no piloto automático.\n\nQuer agendar uma chamada rápida para eu te mostrar como isso funciona na prática?`;
  }

  const callToAction = `\n\nAbraço,\n[Seu Nome]\n[Seu Telefone/Contato]`;
  
  return `${intro}\n\n${coreMessage}${callToAction}`;
}
