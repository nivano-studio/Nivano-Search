import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Building2, 
  Globe, 
  Phone, 
  MapPin, 
  Star, 
  Check, 
  FileText, 
  Send, 
  Copy, 
  X, 
  RefreshCw, 
  AlertTriangle,
  Flame,
  User,
  MessageSquare,
  Instagram,
  Facebook,
  Download,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award,
  Link as LinkIcon
} from 'lucide-react';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// Função para gerar o HTML do Relatório Comercial (White Theme para Impressão)
function generateReportHTML(lead, yourName, yourContact, customProposal) {
  const dateStr = new Date().toLocaleDateString('pt-BR');
  const logoUrl = typeof window !== 'undefined' ? window.location.origin + '/nivano-logo.jpg' : '';
  
  const positives = [];
  const negatives = [];
  
  if (lead.website) positives.push("Possui Website Oficial cadastrado.");
  else negatives.push("Não possui Website Oficial cadastrado (Perda de tráfego orgânico/anúncios).");
  
  if (lead.phone) positives.push("Número de telefone de contato está ativo na ficha.");
  else negatives.push("Ausência de telefone direto na ficha do Maps.");
  
  if (lead.rating && lead.rating >= 4.2) positives.push(`Boa avaliação local (${lead.rating.toFixed(1)} estrelas).`);
  else if (lead.rating) negatives.push(`Nota média baixa (${lead.rating.toFixed(1)} estrelas). Necessita melhorar a reputação.`);
  
  if (lead.reviewsCount >= 20) positives.push(`Bom número de avaliações (${lead.reviewsCount} comentários).`);
  else negatives.push(`Pouco volume de avaliações (${lead.reviewsCount} comentários). Fragilidade no ranqueamento.`);
  
  if (lead.socials?.instagram) positives.push(`Possui perfil de Instagram comercial ativo.`);
  else negatives.push("Não possui link do Instagram ativo (Perda de canal de vendas visual).");

  if (lead.instagramMetrics && lead.instagramMetrics.followers !== 'N/A') {
    const fCount = parseInt(lead.instagramMetrics.followers.replace(/\D/g, '')) || 0;
    if (fCount >= 1000) positives.push(`Base de seguidores consolidada (${lead.instagramMetrics.followers}).`);
    else negatives.push(`Pouco engajamento no Instagram (${lead.instagramMetrics.followers} seguidores).`);
  }

  const positivesHTML = positives.map(p => `<li>✅ ${p}</li>`).join('');
  const negativesHTML = negatives.map(n => `<li>❌ ${n}</li>`).join('');

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório Comercial de Otimização - ${lead.name}</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #334155;
      background: #f8fafc;
      margin: 0;
      padding: 30px;
      line-height: 1.6;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      border: 1px solid #e2e8f0;
    }
    .header {
      border-bottom: 3px solid #6366f1;
      padding-bottom: 20px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header-title h1 {
      margin: 0;
      font-size: 26px;
      color: #0f172a;
      font-weight: 700;
    }
    .header-title p {
      margin: 5px 0 0;
      color: #64748b;
      font-size: 14px;
    }
    .date-badge {
      background: #f1f5f9;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #475569;
    }
    .section-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
    }
    .card h2 {
      margin-top: 0;
      font-size: 16px;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .info-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .info-list li {
      margin-bottom: 10px;
      font-size: 14px;
    }
    .info-list strong {
      color: #0f172a;
    }
    .metric-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
      background: #e0f2fe;
      color: #0369a1;
    }
    .pos-neg-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }
    .list-pos, .list-neg {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .list-pos li, .list-neg li {
      margin-bottom: 10px;
      font-size: 14px;
      padding-left: 5px;
    }
    .optimization-section {
      margin-bottom: 30px;
    }
    .opt-box {
      border-left: 4px solid #6366f1;
      background: #f5f3ff;
      padding: 15px 20px;
      border-radius: 0 12px 12px 0;
      margin-bottom: 15px;
    }
    .opt-box h3 {
      margin-top: 0;
      margin-bottom: 8px;
      font-size: 15px;
      color: #4c1d95;
    }
    .opt-box p {
      margin: 0;
      font-size: 13.5px;
      color: #5b21b6;
    }
    .pitch-box {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 12px;
      padding: 20px;
      font-family: inherit;
      white-space: pre-wrap;
      font-size: 14px;
      color: #334155;
      margin-bottom: 30px;
    }
    .actions-bar {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 20px;
    }
    .btn {
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s;
    }
    .btn-print {
      background: #6366f1;
      color: white;
    }
    .btn-close {
      background: #e2e8f0;
      color: #475569;
    }
    .btn:hover {
      opacity: 0.9;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .container {
        box-shadow: none;
        border: none;
        padding: 0;
        max-width: 100%;
      }
      .actions-bar {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="display: flex; align-items: center; gap: 15px;">
        <img src="${logoUrl}" alt="Nivano" style="height: 50px; border-radius: 8px;" />
        <div class="header-title">
          <h1>Relatório Comercial de Otimização</h1>
          <p>Análise de Posicionamento Local & Presença Digital</p>
        </div>
      </div>
      <div class="date-badge">Data: ${dateStr}</div>
    </div>

    <!-- Seção 1: Dados da Empresa -->
    <div class="section-grid">
      <div class="card">
        <h2>🏢 Identificação da Empresa</h2>
        <ul class="info-list">
          <li><strong>Nome:</strong> ${lead.name}</li>
          <li><strong>Segmento:</strong> ${lead.category || 'Não mapeado'}</li>
          <li><strong>Telefone:</strong> ${lead.phone || 'Não listado'}</li>
          <li><strong>Endereço:</strong> ${lead.address || 'Não informado'}</li>
        </ul>
      </div>
      <div class="card">
        <h2>📊 Presença de Canais Digitais</h2>
        <ul class="info-list">
          <li><strong>Google Maps:</strong> 
            <span class="metric-badge" style="background:#fef3c7; color:#d97706;">
              ⭐ ${lead.rating ? lead.rating.toFixed(1) : 'N/A'} (${lead.reviewsCount} reviews)
            </span>
          </li>
          <li><strong>Site Oficial:</strong> 
            ${lead.website ? `<a href="${lead.website}" target="_blank">${lead.website}</a>` : '<span style="color:#ef4444; font-weight:600;">Ausente</span>'}
          </li>
          <li><strong>Instagram:</strong>
            ${lead.instagramMetrics ? `
              <span class="metric-badge" style="background:#fdf2f8; color:#be185d;">
                📸 @${lead.instagramMetrics.username}
              </span>
              <div style="margin-top: 5px; font-size: 12px; color: #64748b;">
                Seguidores: <strong>${lead.instagramMetrics.followers}</strong> | Posts: <strong>${lead.instagramMetrics.posts}</strong>
              </div>
            ` : lead.socials?.instagram ? `
              <a href="${lead.socials.instagram}" target="_blank">Perfil Ativo</a>
            ` : '<span style="color:#ef4444; font-weight:600;">Não Localizado</span>'}
          </li>
        </ul>
      </div>
    </div>

    <!-- Seção 2: Diagnóstico SWOT -->
    <div class="pos-neg-grid">
      <div class="card" style="border-top: 4px solid #22c55e;">
        <h2>Pontos Positivos (Forças)</h2>
        <ul class="list-pos">
          ${positivesHTML || '<li>Nenhum ponto forte detectado no escaneamento automático.</li>'}
        </ul>
      </div>
      <div class="card" style="border-top: 4px solid #ef4444;">
        <h2>Pontos Críticos (Oportunidades de Venda)</h2>
        <ul class="list-neg">
          ${negativesHTML || '<li>Nenhuma fragilidade digital encontrada.</li>'}
        </ul>
      </div>
    </div>

    <!-- Seção 3: Plano de Ação Recomendado -->
    <div class="optimization-section">
      <h2 style="font-size: 18px; color: #0f172a; margin-bottom: 15px; font-weight:700;">🚀 Plano de Ação Estratégico</h2>
      
      <div class="opt-box">
        <h3>1. Ranqueamento no Google Maps (SEO Local)</h3>
        <p>
          • <strong>Ativação de Avaliações em Lote:</strong> O Google prioriza fichas com atividade semanal de reviews. Envie mensagens estruturadas de pós-venda para clientes ativos e ofereça incentivos éticos.<br>
          • <strong>Fotos de Frequência:</strong> Publique fotos reais de produtos ou serviços toda semana. Isso avisa ao algoritmo que o negócio está ativo e amplia a visibilidade local.<br>
          • <strong>FAQ Otimizada:</strong> Responda às perguntas mais frequentes do nicho diretamente na seção "Perguntas e Respostas" para converter clientes em dúvidas.
        </p>
      </div>

      <div class="opt-box" style="border-left-color: #d946ef; background: #fdf4ff;">
        <h3>2. Otimização de Funil no Instagram</h3>
        <p>
          • <strong>Estrutura de Bio de Alta Conversão:</strong> A bio precisa responder em 3 segundos: 1. Qual problema você resolve; 2. Prova de autoridade; 3. CTA clara com link direto.<br>
          • <strong>Design e Destaques Vitais:</strong> Configure destaques estratégicos com depoimentos, catálogo dinâmico de serviços e passo a passo de como fechar negócio.<br>
          • <strong>Link em Bio Único:</strong> Centralize o funil de tráfego em uma página rápida de carregamento focado em uma única conversão (WhatsApp ou Agendamento).
        </p>
      </div>
    </div>

    <!-- Seção 4: Proposta Parceria -->
    <div class="optimization-section">
      <h2 style="font-size: 18px; color: #0f172a; margin-bottom: 10px; font-weight:700;">✉️ Proposta Comercial</h2>
      <div class="pitch-box">${customProposal}</div>
    </div>

    <!-- Rodapé -->
    <div class="actions-bar">
      <button class="btn btn-close" onclick="window.close()">Fechar</button>
      <button class="btn btn-print" onclick="window.print()">Imprimir / Salvar PDF</button>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(() => { window.print(); }, 800);
    }
  </script>
</body>
</html>
  `;
}

function App() {
  // Estados para o formulário de busca
  const [statesList, setStatesList] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  
  // Estados do Scraper e Resultados
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [leads, setLeads] = useState([]);
  const [currentSearchCount, setCurrentSearchCount] = useState(0);
  
  // SSE EventSource Ref
  const eventSourceRef = useRef(null);
  const consoleEndRef = useRef(null);

  // Estados da Proposta / Modal
  const [activeLead, setActiveLead] = useState(null);
  const [activeTab, setActiveTab] = useState('report'); // 'report' | 'socials'
  const [yourName, setYourName] = useState(() => localStorage.getItem('yourName') || 'Nivano');
  const [yourContact, setYourContact] = useState(() => localStorage.getItem('yourContact') || '');
  const [proposalText, setProposalText] = useState('');
  
  // Re-análise do Instagram e Facebook
  const [customInstaUrl, setCustomInstaUrl] = useState('');
  const [isAnalyzingInsta, setIsAnalyzingInsta] = useState(false);
  const [showInstaFormInline, setShowInstaFormInline] = useState(false); // inline toggle na primeira aba

  // Bloqueio de Segurança: Impede F12, Inspecionar Elemento, Copiar e Debugger Ativo
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    const handleKeyDown = (e) => {
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    const debugInterval = setInterval(() => {
      try {
        (function() {
          (function a() {
            debugger;
          })();
        })();
      } catch (e) {}
    }, 100);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(debugInterval);
    };
  }, []);

  // 1. Busca os Estados do Brasil no IBGE
  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({ uf: item.sigla, nome: item.nome }));
        setStatesList(formatted);
      })
      .catch(err => console.error('Erro ao buscar estados do IBGE:', err));
  }, []);

  // 2. Busca as Cidades do Estado selecionado no IBGE
  useEffect(() => {
    if (!selectedUf) {
      setCitiesList([]);
      setSelectedCity('');
      return;
    }
    
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => item.nome);
        setCitiesList(formatted);
        setSelectedCity('');
      })
      .catch(err => console.error('Erro ao buscar cidades do IBGE:', err));
  }, [selectedUf]);

  // Salva dados no localStorage
  useEffect(() => {
    localStorage.setItem('yourName', yourName);
    localStorage.setItem('yourContact', yourContact);
  }, [yourName, yourContact]);

  // Autoscroll para o final do console
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Atualiza pitch conforme mudanças
  useEffect(() => {
    if (activeLead) {
      const pitch = generateCustomPitch(activeLead);
      setProposalText(pitch);
    }
  }, [yourName, yourContact, activeLead]);

  // 3. Executa a busca (Nova busca limpa)
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query || !selectedUf || !selectedCity) return;

    setIsLoading(true);
    setLogs(['[SISTEMA]: Inicializando fluxo de captação...']);
    setLeads([]);
    setCurrentSearchCount(0);

    const backendUrl = `${API_BASE_URL}/api/search?query=${encodeURIComponent(query)}&state=${selectedUf}&city=${encodeURIComponent(selectedCity)}&limit=${limit}`;
    triggerScraperSSE(backendUrl, false);
  };

  // 4. Executa busca por "Ver Mais Empresas" (Acumula novos sem duplicar)
  const handleSearchMore = (e) => {
    e.preventDefault();
    if (!query || !selectedUf || !selectedCity || isLoading) return;

    setIsLoading(true);
    setLogs(prev => [...prev, `[SISTEMA]: Buscando mais empresas em ${selectedCity}...`]);
    setCurrentSearchCount(0);

    // Mapeia todas as URLs já carregadas para mandar como blocklist no backend
    const blocklist = leads.map(l => l.url);
    const blocklistParam = encodeURIComponent(JSON.stringify(blocklist));

    const backendUrl = `${API_BASE_URL}/api/search?query=${encodeURIComponent(query)}&state=${selectedUf}&city=${encodeURIComponent(selectedCity)}&limit=${limit}&blocklist=${blocklistParam}`;
    triggerScraperSSE(backendUrl, true);
  };

  // Executador de conexões EventSource para busca
  const triggerScraperSSE = (url, isAppending) => {
    const es = new EventSource(url);
    eventSourceRef.current = es;

    let leadsFoundInSession = 0;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'status') {
          setLogs(prev => [...prev, `[STATUS]: ${data.message}`]);
        } 
        else if (data.type === 'lead') {
          leadsFoundInSession++;
          setLeads(prev => {
            if (prev.some(item => item.url === data.lead.url)) return prev;
            return [...prev, data.lead];
          });
          setCurrentSearchCount(data.current);
          setLogs(prev => [...prev, `[LEAD]: "${data.lead.name}" analisado com sucesso.`]);
        } 
        else if (data.type === 'done') {
          if (isAppending && leadsFoundInSession === 0) {
            setLogs(prev => [...prev, `[SISTEMA]: Fim dos resultados. Todas as empresas locais do segmento "${query}" já foram capturadas.`]);
            alert('Não há mais novas empresas deste segmento nesta região.');
          } else {
            setLogs(prev => [...prev, `[SISTEMA]: Busca finalizada! +${leadsFoundInSession} leads processados.`]);
          }
          setIsLoading(false);
          es.close();
        } 
        else if (data.type === 'error') {
          setLogs(prev => [...prev, `[ERRO]: ${data.message}`]);
          setIsLoading(false);
          es.close();
        }
      } catch (err) {
        console.error('Erro ao processar dados SSE:', err);
      }
    };

    es.onerror = () => {
      setLogs(prev => [...prev, '[ERRO]: Conexão perdida com o backend scraper. Verifique se o servidor local está operacional.']);
      setIsLoading(false);
      es.close();
    };
  };

  // Cancela busca
  const handleCancelSearch = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      setLogs(prev => [...prev, '[SISTEMA]: Busca cancelada pelo usuário.']);
      setIsLoading(false);
    }
  };

  // Customização do Pitch
  const generateCustomPitch = (lead) => {
    if (!lead || !lead.pitch) return '';
    return lead.pitch
      .replace(/\[Seu Nome\]/g, yourName)
      .replace(/\[Seu Telefone\/Contato\]/g, yourContact);
  };

  const openReportModal = (lead) => {
    setActiveLead(lead);
    setActiveTab('report');
    setCustomInstaUrl('');
    setShowInstaFormInline(false);
    setProposalText(generateCustomPitch(lead));
  };

  const closeReportModal = () => {
    setActiveLead(null);
  };

  const handleCopyProposal = () => {
    navigator.clipboard.writeText(proposalText);
    alert('Proposta copiada para a área de transferência!');
  };

  // Higieniza no frontend o link antes de enviar para o backend
  const cleanInstagramUrl = (input) => {
    if (!input) return '';
    let clean = input.trim();
    
    // Remove query params
    clean = clean.split('?')[0];
    
    // Remove trailing slashes
    clean = clean.replace(/\/+$/, '');
    
    // Se for URL completa, extrai a última parte
    if (clean.includes('instagram.com')) {
      const parts = clean.split('/');
      clean = parts[parts.length - 1] || '';
    }
    
    // Remove leading @
    clean = clean.replace(/^@/, '');
    
    // Reconstrói para a URL canônica padrão aceita pelo Puppeteer
    return `https://www.instagram.com/${clean.trim()}/`;
  };

  // Aciona re-análise assíncrona do Instagram escolhido
  const handleAnalyzeInstagram = async (url) => {
    if (!url) return;
    
    // Higienização completa antes do envio
    const sanitizedUrl = cleanInstagramUrl(url);
    if (!sanitizedUrl) return;

    setIsAnalyzingInsta(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze-instagram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: activeLead, instagramUrl: sanitizedUrl })
      });
      const data = await response.json();
      if (data.success) {
        setLeads(prev => prev.map(l => l.url === activeLead.url ? data.lead : l));
        setActiveLead(data.lead);
        setProposalText(generateCustomPitch(data.lead));
        setShowInstaFormInline(false);
        alert('Perfil do Instagram analisado e vinculado com sucesso!');
        setActiveTab('report'); 
      } else {
        alert('Erro ao analisar Instagram: ' + data.error);
      }
    } catch (err) {
      alert('Erro de comunicação com o servidor backend: ' + err.message);
    } finally {
      setIsAnalyzingInsta(false);
    }
  };

  // Aciona download do relatório gerando a página e chamando impressão
  const handleDownloadReport = () => {
    if (!activeLead) return;
    const htmlReport = generateReportHTML(activeLead, yourName, yourContact, proposalText);
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlReport);
      newWindow.document.close();
    } else {
      alert('Por favor, autorize popups para abrir a janela de visualização do relatório.');
    }
  };

  const handleSendWhatsApp = () => {
    if (!activeLead || !activeLead.phone) return;
    
    let cleanedPhone = activeLead.phone.replace(/\D/g, '');
    if (cleanedPhone.length === 10 || cleanedPhone.length === 11) {
      cleanedPhone = '55' + cleanedPhone;
    }
    
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanedPhone}&text=${encodeURIComponent(proposalText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="app-header">
        <div className="logo-section">
          <img src="/nivano-logo.jpg" alt="Nivano" className="logo-img" />
          <div className="app-title-group">
            <h1>Nivano Search</h1>
            <p>Encontre leads qualificados no Google Maps 100% de graça</p>
          </div>
        </div>
        <span className="badge-free">API Free & Sem Custos</span>
      </header>

      {/* Grid Central */}
      <div className="dashboard-grid">
        {/* Painel Esquerdo: Busca e Console */}
        <aside className="card-premium">
          <div className="card-title">
            <Search size={20} className="text-primary" />
            Configuração de Busca
          </div>
          
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label>País</label>
              <select className="select-premium" disabled>
                <option>Brasil</option>
              </select>
            </div>

            <div className="row-inputs">
              <div className="form-group">
                <label>Estado (UF)</label>
                <select 
                  className="select-premium" 
                  value={selectedUf}
                  onChange={(e) => setSelectedUf(e.target.value)}
                  disabled={isLoading}
                  required
                >
                  <option value="">UF...</option>
                  {statesList.map(st => (
                    <option key={st.uf} value={st.uf}>{st.uf} - {st.nome}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Cidade</label>
                <select 
                  className="select-premium"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={isLoading || !selectedUf}
                  required
                >
                  <option value="">Selecione...</option>
                  {citiesList.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>O que buscar (Nicho/Segmento)</label>
              <input 
                type="text" 
                className="input-premium" 
                placeholder="Ex: Dentista, Petshop, Pizzaria"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group">
              <label>Limite de Resultados por busca</label>
              <select 
                className="select-premium"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                disabled={isLoading}
              >
                <option value={5}>5 empresas</option>
                <option value={10}>10 empresas</option>
                <option value={20}>20 empresas</option>
                <option value={50}>50 empresas</option>
              </select>
            </div>

            {!isLoading ? (
              <button type="submit" className="btn-primary" disabled={!selectedCity || !query}>
                <Search size={18} />
                Iniciar Nova Busca
              </button>
            ) : (
              <button type="button" className="btn-primary" style={{ background: 'var(--danger)' }} onClick={handleCancelSearch}>
                <RefreshCw size={18} className="animate-spin" />
                Cancelar Busca ({currentSearchCount}/{limit})
              </button>
            )}
          </form>

          {/* Console de Logs */}
          {(isLoading || logs.length > 1) && (
            <div className="console-panel">
              <div className="console-title">
                Console do Scraper
                {isLoading && <span className="pulse-dot"></span>}
              </div>
              <div className="console-box">
                {logs.map((log, i) => {
                  let logClass = 'console-line';
                  if (log.includes('[ERRO]')) logClass += ' error';
                  if (log.includes('[SISTEMA]') || log.includes('concluída')) logClass += ' success';
                  return (
                    <div key={i} className={logClass}>
                      {log}
                    </div>
                  );
                })}
                <div ref={consoleEndRef} />
              </div>
            </div>
          )}
        </aside>

        {/* Painel Direito: Lista de Leads e Estatísticas */}
        <main className="card-premium" style={{ minHeight: '500px' }}>
          <div className="results-header">
            <div className="results-count">
              Empresas Encontradas: <span>{leads.length}</span>
            </div>
            
            {leads.length > 0 && (
              <button 
                className="btn-secondary" 
                onClick={() => {
                  const headers = ['Nome', 'Categoria', 'Telefone', 'Website', 'Instagram', 'Seguidores', 'Posts', 'Nota', 'Total Reviews', 'Endereço', 'Link Maps'];
                  const rows = leads.map(l => [
                    `"${l.name.replace(/"/g, '""')}"`,
                    `"${(l.category || '').replace(/"/g, '""')}"`,
                    `"${l.phone || ''}"`,
                    `"${l.website || ''}"`,
                    `"${l.socials?.instagram || ''}"`,
                    `"${l.instagramMetrics?.followers || 'N/A'}"`,
                    `"${l.instagramMetrics?.posts || 'N/A'}"`,
                    l.rating || 'N/A',
                    l.reviewsCount || 0,
                    `"${(l.address || '').replace(/"/g, '""')}"`,
                    `"${l.url}"`
                  ]);
                  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
                    + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", `leads_${selectedCity || 'busca'}.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Exportar CSV (.xlsx)
              </button>
            )}
          </div>

          {leads.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Building2 size={48} />
              </div>
              <h3>Nenhum lead capturado ainda</h3>
              <p>Configure a localização e o nicho desejado no formulário ao lado e inicie o rastreamento.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="leads-container">
                {leads.map((lead, idx) => (
                  <div key={idx} className="lead-card">
                    <div className="lead-main">
                      <div className="lead-header">
                        <div className="lead-title-area">
                          <div className="lead-name">{lead.name}</div>
                          {lead.category && <span className="lead-category">{lead.category}</span>}
                        </div>
                        
                        {lead.rating && (
                          <div className="lead-rating-box">
                            <Star size={14} fill="#f97316" />
                            <span>{lead.rating.toFixed(1)} ({lead.reviewsCount})</span>
                          </div>
                        )}
                      </div>

                      <div className="lead-details">
                        <div className="lead-info-item">
                          <Phone size={14} />
                          <span>{lead.phone || 'Não listado'}</span>
                        </div>
                        
                        <div className="lead-info-item">
                          <Globe size={14} />
                          {lead.website ? (
                            <a href={lead.website} target="_blank" rel="noopener noreferrer">
                              {lead.website.replace(/https?:\/\/(www\.)?/, '').split('/')[0]}
                            </a>
                          ) : (
                            <span style={{ color: 'var(--danger)' }}>Sem site cadastrado</span>
                          )}
                        </div>

                        {/* Informações de Instagram */}
                        <div className="lead-info-item text-insta">
                          <Instagram size={14} className="text-insta-icon" />
                          {lead.instagramMetrics ? (
                            <a href={lead.socials.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                              {lead.instagramMetrics.followers} seg. ({lead.instagramMetrics.posts} posts)
                            </a>
                          ) : lead.socials?.instagram ? (
                            <a href={lead.socials.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                              Instagram Vinculado
                            </a>
                          ) : (
                            <span style={{ color: 'var(--text-muted)' }}>Sem Instagram</span>
                          )}
                        </div>

                        <div className="lead-info-item" style={{ gridColumn: 'span 2' }}>
                          <MapPin size={14} />
                          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {lead.address || 'Sem endereço'}
                          </span>
                        </div>
                      </div>

                      {/* Tags Diagnóstico */}
                      <div className="opportunity-tags">
                        {lead.opportunities.map((opp, i) => (
                          <span key={i} className={`opp-badge ${opp.severity}`} title={opp.description}>
                            <AlertTriangle size={12} />
                            {opp.title}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lead-actions">
                      <button className="btn-primary" onClick={() => openReportModal(lead)}>
                        <FileText size={16} />
                        Relatório & Proposta
                      </button>
                      <a 
                        href={lead.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-secondary"
                        style={{ justifyContent: 'center' }}
                      >
                        <MapPin size={14} />
                        Ver no Maps
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão Ver Mais Empresas no rodapé */}
              {!isLoading && (
                <button className="btn-primary" style={{ alignSelf: 'center', width: 'auto', padding: '0.85rem 3rem' }} onClick={handleSearchMore}>
                  <RefreshCw size={18} />
                  Ver Mais Empresas (Região: {selectedCity})
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modal de Relatório e Proposta */}
      {activeLead && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header className="modal-header">
              <h3>Painel de Inteligência Comercial: {activeLead.name}</h3>
              <button className="close-btn" onClick={closeReportModal}>
                <X size={20} />
              </button>
            </header>

            {/* Cabeçalho das Abas */}
            <div className="modal-tabs">
              <button 
                className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
                onClick={() => setActiveTab('report')}
                disabled={isAnalyzingInsta}
              >
                <FileText size={16} />
                Relatório Comercial
              </button>
              <button 
                className={`tab-btn ${activeTab === 'socials' ? 'active' : ''}`}
                onClick={() => setActiveTab('socials')}
                disabled={isAnalyzingInsta}
              >
                <Instagram size={16} />
                Análise de Redes Sociais
              </button>
            </div>

            <div className="modal-body">
              {activeTab === 'report' ? (
                /* ABA 1: Relatório Comercial e Proposta */
                <>
                  <div className="pitch-config">
                    <div className="form-group">
                      <label className="flex items-center gap-1">
                        <User size={14} /> Seu Nome
                      </label>
                      <input 
                        type="text" 
                        className="input-premium" 
                        value={yourName}
                        onChange={(e) => setYourName(e.target.value)}
                        placeholder="Ex: Filip"
                      />
                    </div>
                    <div className="form-group">
                      <label className="flex items-center gap-1">
                        <MessageSquare size={14} /> Seu Contato
                      </label>
                      <input 
                        type="text" 
                        className="input-premium" 
                        value={yourContact}
                        onChange={(e) => setYourContact(e.target.value)}
                        placeholder="Ex: (11) 99999-9999"
                      />
                    </div>
                  </div>

                  {/* Informações Integradas de Instagram diretamente na Primeira Aba */}
                  <div className="form-group" style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.9rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Instagram size={16} className="text-insta-icon" /> Análise do Instagram
                      </strong>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }} 
                        onClick={() => setShowInstaFormInline(!showInstaFormInline)}
                      >
                        {showInstaFormInline ? 'Ocultar Ferramenta' : activeLead.instagramMetrics ? 'Alterar Instagram' : 'Vincular Instagram'}
                      </button>
                    </div>

                    {isAnalyzingInsta ? (
                      <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <RefreshCw size={24} className="animate-spin text-primary" style={{ margin: '0 auto 0.5rem' }} />
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Analisando perfil comercial...</span>
                      </div>
                    ) : (
                      <>
                        {/* Se já possuir Instagram cadastrado e não estiver editando inline */}
                        {activeLead.instagramMetrics && !showInstaFormInline && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
                            <span style={{ fontSize: '0.85rem', color: '#fff' }}>
                              @{activeLead.instagramMetrics.username} (<strong>{activeLead.instagramMetrics.followers}</strong> seguidores | <strong>{activeLead.instagramMetrics.posts}</strong> posts)
                            </span>
                            <span className="badge-free" style={{ background: 'var(--success-bg)', color: 'var(--success)', border: 'none', padding: '0.15rem 0.5rem' }}>Vinculado</span>
                          </div>
                        )}

                        {/* Se não possuir Instagram OU clicar para alterar inline */}
                        {(!activeLead.instagramMetrics || showInstaFormInline) && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                            {activeLead.instagramSuggestions && activeLead.instagramSuggestions.length > 0 && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sugestões encontradas na web:</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                  {activeLead.instagramSuggestions.slice(0, 3).map((sug, i) => (
                                    <button 
                                      key={i} 
                                      className="btn-secondary" 
                                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                      onClick={() => handleAnalyzeInstagram(sug.url)}
                                    >
                                      @{sug.username}
                                    </button>
                                  ))}
                                  {activeLead.instagramSuggestions.length > 3 && (
                                    <button 
                                      className="btn-secondary" 
                                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderStyle: 'dashed' }}
                                      onClick={() => setActiveTab('socials')}
                                    >
                                      + Ver mais ({activeLead.instagramSuggestions.length - 3})
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Campo manual integrado */}
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <input 
                                type="text" 
                                className="input-premium" 
                                style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                                value={customInstaUrl}
                                onChange={(e) => setCustomInstaUrl(e.target.value)}
                                placeholder="Paster o link do celular (ou nome de usuário)"
                              />
                              <button 
                                className="btn-primary" 
                                style={{ width: 'auto', padding: '0 1rem', fontSize: '0.85rem', marginTop: 0 }}
                                onClick={() => handleAnalyzeInstagram(customInstaUrl)}
                                disabled={!customInstaUrl}
                              >
                                Analisar
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Diagnóstico Técnico do Lead (Google Maps & Instagram)</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {activeLead.opportunities.map((opp, i) => (
                        <div key={i} style={{ 
                          display: 'flex', 
                          gap: '0.5rem', 
                          background: 'rgba(255,255,255,0.02)', 
                          padding: '0.75rem', 
                          borderRadius: '8px',
                          borderLeft: `3px solid var(--${opp.severity === 'high' ? 'danger' : opp.severity === 'medium' ? 'warning' : 'success'})`
                        }}>
                          <Flame size={16} style={{ 
                            color: `var(--${opp.severity === 'high' ? 'danger' : opp.severity === 'medium' ? 'warning' : 'success'})`,
                            flexShrink: 0
                          }} />
                          <div>
                            <strong style={{ fontSize: '0.85rem', color: '#fff' }}>{opp.title}</strong>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{opp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Script de Abordagem Comercial (WhatsApp / Direct)</label>
                    <textarea 
                      className="proposal-textbox"
                      value={proposalText}
                      onChange={(e) => setProposalText(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                /* ABA 2: Análise Avançada de Redes Sociais e Sugestões */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {isAnalyzingInsta ? (
                    <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                      <RefreshCw size={36} className="animate-spin text-primary" />
                      <h3>Analisando Perfil no Instagram Comercial...</h3>
                      <p>Estamos visitando a página e extraindo seguidores e métricas gratuitas do perfil.</p>
                    </div>
                  ) : (
                    <>
                      {/* Instagram Ativo Vinculado */}
                      {activeLead.instagramMetrics ? (
                        <div className="card-premium" style={{ background: 'rgba(244, 63, 94, 0.05)', borderColor: 'rgba(244, 63, 94, 0.2)' }}>
                          <h4 style={{ color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Instagram size={18} /> Instagram Vinculado e Ativo
                          </h4>
                          <p style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.5rem' }}>
                            Conta: <strong>@{activeLead.instagramMetrics.username}</strong>
                          </p>
                          <ul className="info-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                            <li style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Seguidores</span>
                              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{activeLead.instagramMetrics.followers}</div>
                            </li>
                            <li style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Seguindo</span>
                              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{activeLead.instagramMetrics.following}</div>
                            </li>
                            <li style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Posts</span>
                              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{activeLead.instagramMetrics.posts}</div>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <div className="card-premium" style={{ background: 'rgba(239, 68, 68, 0.03)', borderColor: 'rgba(239, 68, 68, 0.15)' }}>
                          <h4 style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <XCircle size={18} /> Sem Instagram Oficial Detectado
                          </h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            Não encontramos nenhum link de Instagram oficial no Maps ou no site da empresa. Vincule um perfil abaixo para rodar o diagnóstico.
                          </p>
                        </div>
                      )}

                      {/* Lista de Sugestões DuckDuckGo */}
                      <div className="form-group">
                        <label className="flex items-center gap-1" style={{ color: '#fff' }}>
                          <TrendingUp size={14} className="text-primary" /> Sugestões Encontradas na Web ( DuckDuckGo )
                        </label>
                        
                        {activeLead.instagramSuggestions && activeLead.instagramSuggestions.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                            {activeLead.instagramSuggestions.map((sug, i) => {
                              const isLinked = activeLead.socials?.instagram === sug.url;
                              return (
                                <div key={i} style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'space-between', 
                                  background: isLinked ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                                  border: `1px solid ${isLinked ? 'var(--border-focus)' : 'var(--border)'}`, 
                                  padding: '0.75rem 1rem', 
                                  borderRadius: '10px'
                                }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', maxWidth: '75%' }}>
                                    <strong style={{ fontSize: '0.85rem', color: '#fff' }}>@{sug.username}</strong>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {sug.title}
                                    </span>
                                  </div>
                                  <button 
                                    className="btn-secondary" 
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', background: isLinked ? 'var(--border-focus)' : '' }}
                                    onClick={() => handleAnalyzeInstagram(sug.url)}
                                  >
                                    {isLinked ? 'Re-Analisar' : 'Analisar Este'}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.25rem' }}>
                            Nenhuma sugestão automatizada encontrada. Digite o perfil desejado no campo abaixo.
                          </p>
                        )}
                      </div>

                      {/* Vinculador Manual */}
                      <div className="form-group" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                        <label className="flex items-center gap-1" style={{ color: '#fff' }}>
                          <LinkIcon size={14} /> Vincular Outro Perfil / Buscar Manualmente
                        </label>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                          <input 
                            type="text" 
                            className="input-premium" 
                            value={customInstaUrl}
                            onChange={(e) => setCustomInstaUrl(e.target.value)}
                            placeholder="Digite o Username (ex: pizzaria_local) ou link completo"
                          />
                          <button 
                            className="btn-primary" 
                            style={{ width: 'auto', flexShrink: 0, padding: '0 1.25rem', marginTop: 0 }}
                            onClick={() => handleAnalyzeInstagram(customInstaUrl)}
                            disabled={!customInstaUrl}
                          >
                            Analisar Manual
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <footer className="modal-footer">
              <button className="btn-secondary" onClick={handleCopyProposal} disabled={isAnalyzingInsta}>
                <Copy size={16} />
                Copiar Pitch
              </button>

              <button className="btn-secondary" style={{ background: 'var(--info-bg)', color: 'var(--info)', borderColor: 'rgba(59, 130, 246, 0.3)' }} onClick={handleDownloadReport} disabled={isAnalyzingInsta}>
                <Download size={16} />
                Baixar Relatório (PDF)
              </button>
              
              {activeLead.phone ? (
                <button className="btn-primary" style={{ width: 'auto' }} onClick={handleSendWhatsApp} disabled={isAnalyzingInsta}>
                  <Send size={16} />
                  Enviar WhatsApp
                </button>
              ) : (
                <button className="btn-primary" disabled style={{ width: 'auto' }}>
                  Sem Telefone
                </button>
              )}
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
