/* =========================================================================
   LISTA DE PROJETOS
   -------------------------------------------------------------------------
   Projetos reais do currículo do Gabriel.

   COMO ADICIONAR UM PROJETO NOVO:
   Copie um bloco { ... } abaixo, cole antes do "];" e edite os campos.

   Campos:
     titulo        -> Nome do projeto
     descricao     -> Explicação curta (1 a 2 linhas)
     categoria     -> "ia" | "python" | "web" | "cpp"   (usado no filtro)
     categoriaNome -> Texto que aparece no selo do card
     tags          -> Lista de tecnologias usadas
     icone         -> ícone do card (logo/ícone SVG). Opções disponíveis:
                      "python", "cplusplus", "html5", "css", "javascript", "git",
                      "github", "mysql", "openai", "googlegemini", "visualstudiocode",
                      "figma", "terminal", "code", "server", "sparkles", "zap",
                      "brain-circuit", "graduation-cap"
     imagem        -> (opcional) caminho da imagem, ex: "vila-velha.jpg"
     demo          -> (opcional) link do projeto online
     repo          -> (opcional) link do repositório no GitHub
     destaque      -> (opcional) true para exibir o selo "Destaque"
   ========================================================================= */

const projetos = [
  {
    titulo: "Manutenção Preditiva Industrial com IA (TCC)",
    descricao:
      "Software em Python para centralizar e monitorar equipamentos industriais em tempo real a partir de dados simulados: relatórios de desgaste, gráficos de análise preditiva para prevenção de falhas e integração com LLMs via API para traduzir métricas técnicas em relatórios claros.",
    categoria: "ia",
    categoriaNome: "IA",
    tags: ["Python 3", "APIs de IA (LLM)", "Análise de Dados", "Visualização 3D"],
    icone: "brain-circuit",
    imagem: "",
    demo: "",
    repo: "",
    destaque: true
  },
  {
    titulo: "Site — Parque Estadual de Vila Velha",
    descricao:
      "Site educativo sobre o Parque Estadual de Vila Velha, em Ponta Grossa (PR). Projeto interdisciplinar em equipe: fui responsável por toda a programação (HTML e CSS), enquanto os demais integrantes cuidaram da pesquisa de conteúdo.",
    categoria: "web",
    categoriaNome: "Web",
    tags: ["HTML5", "CSS3", "Responsivo", "Trabalho em equipe"],
    icone: "html5",
    imagem: "vila-velha.jpg",
    demo: "https://celioxer.github.io/TDS_SESI/Interdisciplinar_Coop/site-vila-velha/index.html",
    repo: "",
    destaque: true
  },
  {
    titulo: "Landing Pages Responsivas",
    descricao:
      "Criação e estruturação de interfaces web modernas e responsivas, adaptadas para funcionar bem em celular, tablet e desktop.",
    categoria: "web",
    categoriaNome: "Web",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsivo"],
    icone: "html5",
    imagem: "",
    demo: "",
    repo: "https://github.com/kaka198977",
    destaque: false
  },
  {
    titulo: "Websites Institucionais e Gestão Web",
    descricao:
      "Construção e manutenção de sites institucionais, com organização e gerenciamento de conteúdo, padronização visual e atualização das páginas.",
    categoria: "web",
    categoriaNome: "Web",
    tags: ["HTML5", "CSS3", "Gestão de Conteúdo"],
    icone: "server",
    imagem: "",
    demo: "",
    repo: "",
    destaque: false
  },
  {
    titulo: "Algoritmos e Estruturas em C++",
    descricao:
      "Programas práticos focados em lógica de programação: estruturas de controle, vetores, funções, ordenação e busca.",
    categoria: "cpp",
    categoriaNome: "C++",
    tags: ["C++", "Lógica de Programação", "Algoritmos"],
    icone: "cplusplus",
    imagem: "",
    demo: "",
    repo: "https://github.com/kaka198977",
    destaque: false
  },
  {
    titulo: "Programas e Soluções em Python",
    descricao:
      "Desenvolvimento de programas em Python 3 aplicando estruturas de controle, funções, manipulação de arquivos e automação de tarefas do dia a dia.",
    categoria: "python",
    categoriaNome: "Python",
    tags: ["Python 3", "Automação", "Algoritmos"],
    icone: "python",
    imagem: "",
    demo: "",
    repo: "https://github.com/kaka198977",
    destaque: false
  }
];
