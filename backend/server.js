import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import { runScraper, getInstagramMetrics, analyzeOpportunities, generatePitch } from './scraper.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint de busca utilizando Server-Sent Events (SSE)
app.get('/api/search', async (req, res) => {
  const { query, state, city, limit, blocklist } = req.query;

  if (!query || !state || !city) {
    return res.status(400).json({ error: 'Parâmetros query, state e city são obrigatórios.' });
  }

  const parsedLimit = parseInt(limit) || 10;
  
  // Realiza o parse da blocklist de URLs já coletadas no frontend
  let parsedBlocklist = [];
  try {
    if (blocklist) {
      parsedBlocklist = JSON.parse(blocklist);
    }
  } catch (err) {
    console.error('Erro ao realizar o parse da blocklist:', err);
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const statusRef = { aborted: false };
  
  req.on('close', () => {
    console.log('Cliente encerrou a conexão SSE.');
    statusRef.aborted = true;
  });

  const sendSSE = (data) => {
    if (res.writableEnded) return;
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    sendSSE({ type: 'status', message: 'Iniciando busca...' });

    // Passamos a blocklist para a função de scraping
    const leads = await runScraper(query, state, city, parsedLimit, parsedBlocklist, (progressData) => {
      if (statusRef.aborted) {
        throw new Error('Busca cancelada pelo usuário.');
      }
      sendSSE(progressData);
    });

    sendSSE({ type: 'done', leads });
  } catch (error) {
    console.error('Erro durante o scraping:', error);
    if (!statusRef.aborted) {
      sendSSE({ type: 'error', message: error.message || 'Ocorreu um erro desconhecido durante a busca.' });
    }
  } finally {
    res.end();
  }
});

// Endpoint para re-analisar um Instagram sob demanda
app.post('/api/analyze-instagram', async (req, res) => {
  const { lead, instagramUrl } = req.body;

  if (!lead || !instagramUrl) {
    return res.status(400).json({ error: 'Os campos lead e instagramUrl são obrigatórios.' });
  }

  console.log(`Solicitação de re-análise do Instagram para: ${lead.name} -> ${instagramUrl}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  try {
    const metrics = await getInstagramMetrics(browser, instagramUrl);

    const updatedLead = { ...lead };
    updatedLead.socials = updatedLead.socials || {};
    updatedLead.socials.instagram = instagramUrl;
    updatedLead.instagramMetrics = metrics;

    updatedLead.opportunities = analyzeOpportunities(updatedLead);
    updatedLead.pitch = generatePitch(updatedLead);

    res.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error('Erro ao re-analisar Instagram:', error);
    res.status(500).json({ error: error.message || 'Falha no processamento.' });
  } finally {
    await browser.close();
  }
});

// Endpoint básico de saúde
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor Nivano Search operacional.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
