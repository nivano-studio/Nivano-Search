# Documentação Técnica e Funcional: Nivano Search

O **Nivano Search** é uma plataforma completa e profissional para captação local de leads qualificados do Google Maps, enriquecimento automático de dados de redes sociais e geração automática de diagnósticos comerciais (SWOT) e propostas de vendas personalizadas.

Esta solução foi projetada de forma **100% gratuita**, livre de dependências de chaves de API pagas (como Google Places API ou scraping proxies), utilizando automações locais com Puppeteer para coleta em tempo real.

---

## 🏗️ Arquitetura do Sistema

O projeto é dividido em uma estrutura monorepo local simples, otimizada para execução ágil e desenvolvimento contínuo:

```
Nivano Search/
├── backend/                  # Servidor de Scraping e APIs (Express + Puppeteer)
│   ├── scraper.js            # Engine de extração do Maps, sites e Instagram
│   ├── server.js             # API REST e Server-Sent Events (SSE)
│   └── package.json
├── frontend/                 # Painel do Usuário (Vite + React)
│   ├── public/               # Ativos públicos (Ex: nivano-logo.jpg)
│   ├── src/
│   │   ├── App.jsx           # Painel Administrativo e Lógica da Interface
│   │   ├── App.css           # Estilos Premium (Dark Mode, animações)
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
└── package.json              # Orquestrador de dependências da raiz
```

### Tecnologias Principais:
- **Core**: Node.js (v18+), React (v19), Vite.
- **Backend & Crawler**: Express.js, Puppeteer (Navegação Headless), Cors.
- **Comunicação**: Server-Sent Events (SSE) para transmissão dos logs de progresso e leads em tempo real para a interface.
- **Interface & Estilo**: CSS Puro (Premium Dark Mode) com animações dinâmicas de transição e biblioteca de ícones `lucide-react`.

---

## 🌟 Funcionalidades Detalhadas do Site

### 1. Seletor Inteligente de Cidades (Integração IBGE)
Para garantir que a busca seja cirúrgica, o frontend consome a API pública oficial do **IBGE**:
- Carrega e ordena alfabeticamente todos os Estados (UF) do Brasil.
- Ao selecionar um estado, busca em tempo real todos os municípios daquele estado específico.
- Isso padroniza as pesquisas geográficas e elimina erros de digitação por parte do usuário.

### 2. Scraper Local de Alta Performance (Google Maps)
O backend inicia uma instância segura do Puppeteer configurada com cabeçalhos de navegador real (`User-Agent` humano) para evitar bloqueios de robôs.
- **Scroll Infinito Automático**: O robô localiza o feed lateral do Maps, rola a lista de forma inteligente simulando o comportamento de um usuário e acumula os links das fichas cadastrais.
- **Extração Completa de Dados**:
  - Nome da Empresa
  - Nota Média de Avaliação (Rating)
  - Quantidade de Avaliações (Reviews Count)
  - Categoria/Nicho de Atuação
  - Endereço Físico
  - Telefone de Contato (extraído de tags diretas do Maps)
  - Website Oficial cadastrado

### 3. Crawler de Redes Sociais no Website
Para enriquecer a prospecção comercial, o robô realiza uma varredura paralela rápida:
- Se o Maps retornar um website para o lead, o Puppeteer abre uma página secundária de forma ultraleve (bloqueando imagens, folhas de estilo e mídias para economizar banda).
- Analisa o código fonte do site buscando links de ancoragem contendo domínios do **Instagram** e **Facebook**.

### 4. Busca Inteligente no DuckDuckGo (Redes Sociais Fallback)
Se a empresa não possui website cadastrado ou não há links de redes sociais nele:
- O backend faz uma pesquisa automática na versão HTML leve do DuckDuckGo buscando pela combinação: `"[Nome da Empresa] [Cidade] instagram"`.
- Coleta os **top 5 perfis sugeridos** que correspondem à marca.
- Exibe essas opções diretamente para o usuário com o `@nome_de_usuario` e a descrição encontrada na busca.

### 5. Instagram Metrics Scraper (Zero Custos)
Em vez de usar APIs oficiais do Instagram ou Graph API (que exigem contas ativas, logins e possuem alta taxa de banimento):
- O Puppeteer navega até o perfil público da conta encontrada.
- Faz a leitura da meta tag `<meta name="description">` ou `<meta property="og:description">` gerada no lado do servidor (SSR) do Instagram.
- Extrai com precisão a contagem pública de **Seguidores, Seguindo e Publicações (Posts)** de forma instantânea e totalmente gratuita.

### 6. Sanitizador Inteligente de Links do Instagram
O sistema conta com as funções `cleanInstagramUrl` (frontend) e `extractInstagramUsername` (backend) que tratam qualquer link colado de celular ou navegador:
- Trata links com parâmetros de rastreamento de compartilhamento: `https://www.instagram.com/usuario/?igsh=MTd0N3...` -> Extrai `usuario`.
- Trata arrobas digitadas: `@usuario` -> Extrai `usuario`.
- Trata barras extras no final do link.

### 7. Paginação e Filtro de Duplicados ("Ver Mais Empresas")
Para ampliar o funil de leads sem carregar dados que o usuário já viu:
- O botão **"Ver Mais Empresas"** coleta as URLs do Google Maps de todos os leads já exibidos na tela.
- Envia essa lista como uma `blocklist` em formato JSON para o backend.
- O scraper do Maps ignora automaticamente qualquer ficha cujo link esteja nesta lista.
- Quando o robô chega ao fim de todas as empresas registradas na localidade, o app informa no console que não há mais novos leads a serem carregados.

### 8. Painel de Diagnóstico SWOT e Proposta Comercial (Pitch)
Ao clicar no botão "Relatório & Proposta" de qualquer Lead, um modal completo é aberto contendo duas abas principais:
- **Relatório Comercial**:
  - **Identificação e Presença**: Visão geral dos canais digitais do lead.
  - **Análise SWOT Automatizada**:
    - *Pontos Positivos (Forças)*: Identifica bons ratings, número expressivo de avaliações, se possui site cadastrado ou se tem mais de 1.000 seguidores no Instagram.
    - *Pontos Críticos (Fraquezas)*: Alerta sobre falta de website, ausência de telefone direto na ficha, baixa média de estrelas, poucas avaliações locais ou poucos seguidores/frequência no Instagram.
  - **Plano de Ação Estratégico**: Dicas estruturadas de SEO Local (Google Maps) e funil de conversão no Instagram.
  - **Proposta Comercial**: Gera dinamicamente um roteiro de abordagem comercial (via e-mail ou mensagem de WhatsApp) que foca diretamente no maior ponto de dor detectado no lead (ex: falta de site, nota baixa ou baixo engajamento). O texto é moldado a partir do nome e contato do consultor configurados na interface.
- **Análise de Redes Sociais**:
  - Permite verificar o link de Instagram atual, visualizar as 5 sugestões alternativas encontradas e vinculá-las com apenas 1 clique, ou colar um Instagram manualmente para rodar a análise de seguidores em tempo real.

### 9. Exportação Premium para PDF (Impressão)
Ao clicar em **Baixar Relatório (PDF)**, o sistema compõe um documento HTML separado em uma janela limpa e chama a função nativa de impressão (`window.print()`).
- O layout é desenhado em um **estilo claro e minimalista (White Theme)**, ideal para economizar tinta de impressora ou gerar arquivos PDF limpos de tamanho reduzido.
- O relatório vem assinado com a logomarca da **Nivano** no cabeçalho e inclui todo o diagnóstico SWOT, plano de ação estruturado e a proposta comercial personalizada.

### 10. Proteção Avançada contra Cópia e DevTools (F12)
Para dificultar a cópia não autorizada e proteger a propriedade intelectual localmente:
- **Bloqueio de Teclado**: Atalhos do teclado relacionados ao DevTools são bloqueados via interceptação de eventos (`F12`, `Ctrl+Shift+I`, `Ctrl+Shift+J`, `Ctrl+Shift+C`, `Ctrl+U` para ver código-fonte e `Ctrl+S` para download da página).
- **Bloqueio de Menu de Contexto**: O botão direito do mouse está 100% desativado no site.
- **Infinite Debugger Loop**: Roda um timer interno a cada 100ms injetando uma expressão autoeexecutável com a instrução `debugger;`. Se o DevTools for forçado a abrir por qualquer meio externo, o console do navegador ficará congelado na linha do debugger, impossibilitando a depuração e inspeção fluida dos elementos.
- **Bloqueio de Seleção de Texto**: Configurado via estilos CSS (`user-select: none`) nas áreas críticas da interface para impedir a seleção direta e cópia de blocos inteiros do código HTML.

### 11. Integração da Logomarca Oficial (Nivano)
A logomarca oficial está localizada em `/nivano-logo.jpg`.
- **Na Interface do Usuário**: Exibida no cabeçalho da plataforma com efeitos visuais premium (cantos arredondados de 8px, sombra neon azul de destaque e uma animação contínua de flutuação vertical).
- **No Documento de Impressão**: Cabeçalho do relatório PDF gerado dinamicamente para passar maior credibilidade ao cliente final do consultor.

---

## ⚙️ Instruções de Uso Local

1. Abra a pasta raiz no terminal.
2. Certifique-se de ter as dependências instaladas rodando:
   ```bash
   npm install
   ```
3. Inicie o ambiente de desenvolvimento local concorrente:
   ```bash
   npm run dev
   ```
   *(O frontend rodará em **http://localhost:5173/** e o backend com suporte a auto-reload na porta **3001**).*
4. Acesse a interface no seu navegador.
5. Selecione a localidade (Ex: SP -> São Paulo), insira o nicho que deseja pesquisar e determine o limite inicial.
6. Acompanhe a varredura ao vivo pelo console do scraper integrado!
