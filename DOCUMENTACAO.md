Atue como um especialista sênior em produto digital, SaaS B2B, UX/UI premium, prospecção comercial, automações locais, Node.js, React, Puppeteer/Playwright, segurança, LGPD, análise de dados e inteligência artificial aplicada a vendas.

Quero que você analise totalmente o projeto chamado **Nivano Search** e proponha uma evolução completa para transformar o sistema em uma plataforma profissional de prospecção local, pesquisa de mercado, diagnóstico comercial, CRM leve e capacitação de vendas.

## 1. Contexto do Produto

O Nivano Search é uma plataforma local para captação de leads qualificados a partir de buscas geográficas e nichos de mercado. Atualmente ele possui:

* Frontend em Vite + React.
* Backend em Node.js + Express.
* Automação local com Puppeteer.
* Comunicação em tempo real via Server-Sent Events.
* Seleção de Estados e municípios usando API pública do IBGE.
* Coleta de empresas locais com nome, avaliação, quantidade de avaliações, categoria, endereço, telefone e website.
* Enriquecimento com Instagram/Facebook encontrados no website.
* Busca alternativa de redes sociais pelo DuckDuckGo.
* Leitura pública de métricas do Instagram por meta tags.
* Sanitização de links do Instagram.
* Paginação com bloqueio de duplicados.
* Modal de relatório comercial com SWOT, plano de ação e proposta personalizada.
* Exportação para PDF via impressão.
* Interface dark premium com animações.
* Logomarca oficial da Nivano.
* Proteções contra cópia, como bloqueio de F12, botão direito e seleção de texto.

## 2. Objetivo Principal

Quero que você melhore o projeto para que ele deixe de ser apenas uma ferramenta de busca de empresas e se torne uma plataforma completa chamada, por exemplo:

**Nivano Search Pro — Inteligência Comercial Local**

A plataforma deve ajudar consultores, agências, vendedores, social medias, designers, gestores de tráfego e prestadores de serviço a encontrar empresas locais com problemas digitais, entender suas dores, priorizar oportunidades e gerar propostas comerciais melhores.

## 3. Direção Geral da Melhoria

Melhore o sistema pensando nestes pilares:

1. **Pesquisa de mercado local**
2. **Captação inteligente de leads**
3. **Diagnóstico digital automático**
4. **Priorização por potencial de venda**
5. **CRM leve para acompanhar negociações**
6. **Geração de propostas personalizadas**
7. **Capacitação comercial do usuário**
8. **Relatórios profissionais para clientes**
9. **Segurança, privacidade e conformidade**
10. **Interface premium, moderna e fácil de usar**

## 4. Melhorias de Produto que Quero

Crie uma proposta de evolução com funcionalidades como:

### A) Dashboard Executivo

Criar uma tela inicial com visão geral:

* Total de leads encontrados.
* Leads com site.
* Leads sem site.
* Leads sem Instagram.
* Leads com baixa avaliação.
* Leads com poucas avaliações.
* Leads com alto potencial comercial.
* Nichos mais pesquisados.
* Cidades mais pesquisadas.
* Últimas buscas realizadas.
* Gráfico de oportunidades por categoria.
* Gráfico de maturidade digital dos leads.
* Cards com oportunidades rápidas, como:

  * “Empresas sem site”
  * “Empresas com Instagram fraco”
  * “Empresas com nota abaixo de 4”
  * “Empresas com boa reputação, mas sem presença digital forte”

### B) Lead Scoring Inteligente

Criar uma pontuação de 0 a 100 para cada empresa.

A pontuação deve considerar:

* Tem ou não tem site.
* Tem ou não tem Instagram.
* Quantidade de seguidores.
* Quantidade de posts.
* Frequência aparente de publicação, se possível.
* Nota no Google.
* Quantidade de avaliações.
* Presença de telefone.
* Presença de WhatsApp.
* Qualidade do website.
* Presença de redes sociais.
* Possíveis problemas de SEO local.
* Potencial de contratação de serviços digitais.

Criar categorias:

* **Lead Quente**: alta chance de venda.
* **Lead Morno**: precisa de abordagem educativa.
* **Lead Frio**: baixa prioridade.
* **Lead Estratégico**: empresa forte, mas com falhas digitais claras.
* **Lead Urgente**: empresa com problemas graves de presença digital.

### C) Diagnóstico Digital Completo

Melhorar o relatório atual para incluir:

* Presença no Google Maps.
* Avaliação e reputação local.
* Quantidade de avaliações.
* Site oficial.
* Qualidade básica do site.
* Instagram.
* Facebook.
* WhatsApp.
* Identidade visual percebida.
* SEO local.
* Funil de conversão.
* Credibilidade digital.
* Falhas de comunicação.
* Oportunidades de melhoria.

Se o lead tiver website, analisar:

* Título da página.
* Meta description.
* Presença de botão de WhatsApp.
* Presença de formulário.
* Links quebrados simples.
* Certificado HTTPS.
* Responsividade básica.
* Velocidade percebida.
* Estrutura de headings.
* Presença de palavras-chave locais.
* Schema.org/local business, se possível.
* Presença de redes sociais no rodapé ou cabeçalho.

### D) Pesquisa de Mercado e Concorrentes

Criar uma área chamada **Pesquisa de Mercado Local**, onde o usuário consiga entender melhor o nicho pesquisado.

Essa área deve mostrar:

* Quantidade de empresas encontradas no nicho.
* Média de avaliações do nicho.
* Média de nota do nicho.
* Empresas mais fortes.
* Empresas mais fracas digitalmente.
* Oportunidades por bairro/região.
* Nichos com maior carência digital.
* Comparativo entre empresas com site e sem site.
* Comparativo entre empresas com Instagram forte e fraco.
* Sugestões de abordagem para cada tipo de nicho.

Exemplo:

“Em São Luís/MA, no nicho de clínicas odontológicas, 62% das empresas analisadas possuem Instagram, mas apenas 28% possuem site próprio. Isso indica oportunidade para venda de landing pages, SEO local e campanhas de tráfego.”

### E) CRM Leve Integrado

Adicionar um CRM simples para o usuário acompanhar os leads.

Cada lead deve poder ter status:

* Novo
* Analisado
* Entrar em contato
* Contatado
* Respondeu
* Reunião marcada
* Proposta enviada
* Fechado
* Perdido
* Ignorado

Adicionar campos:

* Observações internas.
* Valor estimado da proposta.
* Serviço sugerido.
* Data do último contato.
* Data do próximo follow-up.
* Responsável pelo atendimento.
* Canal preferido: WhatsApp, ligação, e-mail, Instagram.
* Histórico de ações.

Criar uma visualização em Kanban, com arrastar e soltar os leads entre etapas.

### F) Geração de Propostas Comerciais Mais Profissionais

Melhorar o módulo de proposta para gerar:

* Mensagem curta para WhatsApp.
* Mensagem mais consultiva para WhatsApp.
* E-mail profissional.
* Roteiro de ligação.
* Script de áudio para WhatsApp.
* Proposta em formato PDF.
* Diagnóstico antes da proposta.
* Proposta com pacotes:

  * Básico
  * Profissional
  * Premium
* Sugestão de preço com base no tipo de serviço.
* Argumentos baseados nas dores encontradas.
* Quebra de objeções.
* CTA final para reunião.

A proposta deve ser personalizada com:

* Nome da empresa.
* Cidade.
* Nicho.
* Principal problema identificado.
* Oportunidade comercial.
* Nome do consultor.
* Nome da agência ou empresa.
* Telefone, e-mail e Instagram do consultor.

### G) Módulo de Capacitação Comercial

Criar uma área chamada **Nivano Academy** ou **Capacitação Comercial**.

Essa área deve ensinar o usuário a vender melhor usando os dados encontrados.

Incluir:

* Guia de como abordar empresas sem site.
* Guia de como abordar empresas com Instagram fraco.
* Guia de como vender SEO local.
* Guia de como vender social media.
* Guia de como vender landing page.
* Guia de como vender tráfego pago.
* Guia de como vender identidade visual.
* Guia de como fazer diagnóstico consultivo.
* Guia de como não parecer vendedor insistente.
* Modelos de mensagens por nicho.
* Respostas para objeções comuns.
* Simulador de conversa comercial.
* Checklist antes de entrar em contato.
* Checklist depois do primeiro contato.
* Trilha de aprendizado para iniciantes.

Criar exemplos de objeções e respostas:

* “Já tenho alguém que faz isso.”
* “Agora não tenho dinheiro.”
* “Vou pensar.”
* “Meu sobrinho faz minhas artes.”
* “Não preciso de site.”
* “Já tenho Instagram.”
* “Não tenho interesse.”

Cada resposta deve ser natural, consultiva e profissional.

### H) IA Copiloto Comercial

Criar um módulo de “Copiloto Nivano” que ajude o usuário a interpretar os dados.

O copiloto deve:

* Explicar por que um lead é bom.
* Sugerir a melhor abordagem.
* Gerar uma mensagem personalizada.
* Gerar um diagnóstico simples.
* Gerar uma proposta mais completa.
* Sugerir o serviço mais adequado.
* Criar plano de ação de 7 dias para prospectar.
* Criar roteiro para reunião.
* Criar follow-up automático.
* Resumir histórico do lead.
* Sugerir próximos passos.

A IA deve funcionar com sistema de prompt estruturado, separando dados do lead, instruções do sistema e objetivo da mensagem.

### I) Melhorias na Interface

Refazer a interface para parecer uma plataforma SaaS premium.

Sugestões visuais:

* Dark mode elegante.
* Cards com profundidade e hierarquia.
* Sidebar lateral com navegação.
* Dashboard inicial.
* Tela de buscas.
* Tela de leads.
* Tela de CRM.
* Tela de relatórios.
* Tela de capacitação.
* Tela de configurações.
* Modal de lead mais organizado.
* Badges de status.
* Badges de oportunidade.
* Gráficos simples.
* Microinterações suaves.
* Loading states bonitos.
* Skeleton loading.
* Toasts de sucesso/erro.
* Empty states explicativos.
* Layout responsivo.

Paleta sugerida:

* Fundo principal escuro.
* Azul neon como cor de destaque.
* Roxo/índigo para elementos premium.
* Verde para oportunidades.
* Amarelo para atenção.
* Vermelho para risco.
* Branco e cinza para contraste.

### J) Melhorias no PDF

O relatório em PDF deve ser mais profissional, com estrutura:

1. Capa com logo Nivano.
2. Dados do lead.
3. Resumo executivo.
4. Diagnóstico de presença digital.
5. Pontuação do lead.
6. Análise SWOT.
7. Problemas encontrados.
8. Oportunidades de melhoria.
9. Plano de ação sugerido.
10. Proposta comercial.
11. Pacotes sugeridos.
12. Próximos passos.
13. Assinatura do consultor.

O PDF deve ter aparência de consultoria, não apenas impressão simples de tela.

### K) Exportações

Adicionar exportação para:

* CSV.
* Excel.
* PDF individual.
* PDF em lote.
* JSON.
* Lista para WhatsApp.
* Lista filtrada por status.
* Lista filtrada por lead score.
* Lista filtrada por cidade/nicho.

### L) Histórico de Pesquisas

Criar uma área de histórico para salvar:

* Cidade pesquisada.
* Estado.
* Nicho.
* Data da busca.
* Quantidade de leads encontrados.
* Quantidade de leads novos.
* Filtros usados.
* Leads já analisados.
* Relatórios gerados.

Permitir repetir uma busca anterior com um clique.

### M) Deduplicação Avançada

Melhorar o sistema para evitar duplicados usando:

* Nome normalizado.
* Telefone.
* Website.
* Endereço.
* URL do Google Maps.
* Instagram.
* Similaridade textual.

Exemplo: “Clínica Sorriso LTDA” e “Clinica Sorriso” devem ser reconhecidas como possivelmente a mesma empresa.

### N) Banco de Dados Local

Em vez de deixar tudo apenas em memória, criar persistência local.

Opções:

* SQLite para versão local simples.
* Prisma como ORM.
* Estrutura preparada para futuramente usar PostgreSQL.
* Tabelas para:

  * leads
  * searches
  * reports
  * crm_notes
  * consultant_profile
  * lead_social_profiles
  * lead_scores
  * generated_messages
  * settings

### O) Configurações do Consultor

Criar uma tela onde o usuário configura:

* Nome do consultor.
* Nome da empresa/agência.
* Telefone.
* E-mail.
* Instagram.
* Logo.
* Serviços oferecidos.
* Valores base.
* Pacotes comerciais.
* Tom de comunicação:

  * formal
  * direto
  * consultivo
  * amigável
  * premium
* Nichos preferidos.
* Cidade/região de atuação.

Essas informações devem alimentar automaticamente os relatórios, mensagens e propostas.

## 5. Segurança, Privacidade e Conformidade

Revisar criticamente as proteções atuais.

Não quero soluções falsas de segurança apenas com bloqueio de F12 ou botão direito. Quero segurança real.

Substituir ou complementar com:

* Autenticação local ou senha de acesso.
* Criptografia local de dados sensíveis.
* Controle de sessão.
* Sanitização de entradas.
* Validação de URLs.
* Limite de requisições.
* Logs de erro.
* Tratamento de falhas.
* Política de privacidade.
* Botão para excluir dados salvos.
* Botão para exportar dados salvos.
* Modo compliance com aviso sobre uso responsável dos dados.
* Bloqueio de abuso sem prejudicar usabilidade.
* Remover ou tornar opcional o infinite debugger loop, pois pode afetar performance, acessibilidade e experiência do usuário.

Também quero que você revise riscos jurídicos e técnicos envolvendo coleta automatizada, termos de uso de plataformas externas e LGPD. Não crie soluções para burlar sistemas, captchas ou bloqueios. Em vez disso, proponha alternativas seguras, responsáveis e sustentáveis.

## 6. Melhorias no Backend

Refatorar o backend para ficar mais modular:

* routes/
* services/
* scrapers/
* utils/
* database/
* jobs/
* validators/
* config/

Separar responsabilidades:

* Serviço de busca.
* Serviço de enriquecimento.
* Serviço de redes sociais.
* Serviço de lead scoring.
* Serviço de relatórios.
* Serviço de CRM.
* Serviço de exportação.
* Serviço de logs.

Adicionar:

* Fila de tarefas.
* Cancelamento de busca.
* Pausar e continuar busca.
* Timeout por etapa.
* Retry controlado.
* Cache de websites já analisados.
* Cache de Instagram já analisado.
* Rate limit.
* Logs estruturados.
* Tratamento de erros amigável.
* Health check da API.
* Testes básicos.

## 7. Melhorias no Frontend

Refatorar o frontend para componentes:

* components/
* pages/
* hooks/
* services/
* contexts/
* utils/
* styles/

Criar páginas:

* Dashboard
* Nova Busca
* Leads
* CRM
* Relatórios
* Capacitação
* Configurações

Criar componentes:

* LeadCard
* LeadTable
* LeadScoreBadge
* SearchForm
* SearchProgress
* ReportModal
* ProposalGenerator
* CRMKanban
* TrainingModule
* ConsultantSettings
* ExportButtons
* PDFPreview
* EmptyState
* LoadingSkeleton
* ToastNotification

## 8. Inovações Desejadas

Inclua ideias inovadoras como:

* Mapa de oportunidade por cidade e nicho.
* Ranking de empresas com maior dor digital.
* Sugestão automática de serviço ideal.
* Simulador de abordagem comercial.
* Gerador de áudio/texto para WhatsApp.
* Analisador de maturidade digital.
* Checklist de reunião.
* Agenda de follow-up.
* Biblioteca de modelos por nicho.
* Comparação entre concorrentes locais.
* Relatório “antes e depois” sugerindo melhorias.
* Plano de ação de 30 dias para cada lead.
* Modo agência, para gerenciar vários clientes.
* Modo iniciante, explicando cada métrica.
* Modo avançado, com dados técnicos.
* Assistente que transforma diagnóstico em proposta.
* Banco de objeções comerciais.
* Treinamento por etapas para novos vendedores.

## 9. Entregáveis que Quero de Você

Depois de analisar tudo, entregue:

1. Diagnóstico completo do estado atual do projeto.
2. Lista dos pontos fortes.
3. Lista dos pontos fracos.
4. Lista dos riscos técnicos, jurídicos e de privacidade.
5. Proposta de nova arquitetura.
6. Nova estrutura de pastas.
7. Novas funcionalidades priorizadas por impacto.
8. Plano de implementação por fases:

   * Fase 1: melhorias rápidas
   * Fase 2: CRM e persistência
   * Fase 3: relatórios e proposta
   * Fase 4: capacitação e IA
   * Fase 5: segurança, compliance e polimento
9. Sugestão visual completa da nova interface.
10. Fluxo ideal do usuário.
11. Modelo de banco de dados.
12. Regras de lead scoring.
13. Novo modelo de relatório SWOT.
14. Modelos de mensagens comerciais.
15. Módulo de capacitação completo.
16. Melhorias no código backend.
17. Melhorias no código frontend.
18. Componentes React sugeridos.
19. Rotas de API sugeridas.
20. Checklist final para transformar o Nivano Search em produto profissional.

## 10. Regras Importantes

* Mantenha a proposta viável para um projeto local.
* Priorize soluções gratuitas ou de baixo custo.
* Não dependa obrigatoriamente de APIs pagas.
* Não crie nada que dependa de burlar bloqueios, captchas ou termos de plataformas.
* Preserve a ideia principal do Nivano Search.
* Melhore o produto sem destruir o que já funciona.
* Pense como produto real, não apenas como código.
* Traga soluções modernas, profissionais e inovadoras.
* Use linguagem técnica, mas clara.
* Dê exemplos práticos.
* Não seja genérico.
* Sempre que sugerir uma funcionalidade, explique:

  * o que ela faz;
  * por que ela melhora o produto;
  * como ela pode ser implementada;
  * qual impacto ela gera para o usuário.

## 11. Resultado Esperado

Quero uma resposta completa e organizada para transformar o Nivano Search em uma plataforma premium de inteligência comercial local, com foco em captação de leads, diagnóstico digital, propostas comerciais, CRM, capacitação de vendas e crescimento de agências/consultores.
