# Portfólio — Gabriel

Portfólio profissional de **Gabriel**, estudante do **Curso Técnico em Análise e Desenvolvimento de
Sistemas (SENAI)**, em Ponta Grossa (PR).

Feito 100% com **HTML, CSS e JavaScript puro** — sem frameworks, sem instalação, sem build.

---

## Como abrir

Dê duplo clique no arquivo `index.html`.

Para ver com recarregamento automático (opcional), instale a extensão **Live Server** no VS Code,
clique com o botão direito no `index.html` e escolha **Open with Live Server**.

---

## O que personalizar

| Onde | O que trocar |
|------|--------------|
| `curriculo.html` | Conteúdo do seu currículo (a seção "Currículo" do site e o PDF saem daqui) |
| `js/projetos.js` | Seus projetos reais — edite para adicionar/mudar projetos |

> **Atalho:** no VS Code, aperte `Ctrl + H` e use "Substituir tudo" para trocar informações
> repetidas em todos os arquivos.

---

## Estrutura do projeto

```
portifolio/
├── index.html          estrutura da página (inclui o sprite de ícones SVG)
├── style.css           todo o visual (temas escuro e claro)
├── script.js           animações, menu, filtros e formulário
├── projetos.js         LISTA DOS PROJETOS (edite aqui)
├── curriculo.html      fonte do currículo (tela e impressão)
├── curriculo.pdf       currículo em PDF (botão "Baixar currículo em PDF")
├── perfil.jpg          sua foto (800x1000, recorte 4:5)
├── vila-velha.jpg      print do site do Parque Estadual de Vila Velha
├── .gitignore          arquivos que o Git deve ignorar
├── .nojekyll           evita o processamento Jekyll no GitHub Pages
└── README.md
```

Todos os arquivos ficam na raiz porque o upload pelo navegador do GitHub não cria pastas.
Quando quiser organizar em `css/`, `js/` e `assets/`, é só instalar o Git e usar `git mv` — mas a
estrutura atual funciona exatamente igual.

---

## Sobre os ícones (importantíssimo)

O site **não usa emojis**. Todos os ícones são **SVG vetorial**, com os logos oficiais das
tecnologias (Python, C++, HTML5, CSS3, JavaScript, Git, GitHub, MySQL, OpenAI, Gemini, VS Code,
Figma) e ícones de interface (Lucide).

Eles ficam em um **sprite embutido** no topo do `index.html`, dentro de uma única tag:

```html
<svg class="icon-sprite" style="display:none">
  <symbol id="i-python" viewBox="0 0 24 24"> ... </symbol>
  ...
</svg>
```

Para usar qualquer ícone em qualquer lugar da página:

```html
<svg class="icon icon-sm"><use href="#i-python"></use></svg>
```

Tamanhos disponíveis (classes CSS): `icon-xs`, `icon-sm`, `icon-md`, `icon-lg`, `icon-xl`.
Sem `icon-*`, o ícone acompanha o tamanho do texto (`1.15em`).

Como é um sprite embutido, os ícones funcionam até sem internet — nada de imagem quebrada.

---

## Como adicionar um projeto

Abra `projetos.js` e adicione um bloco:

```js
{
  titulo: "Nome do Projeto",
  descricao: "Explicação curta do que o projeto faz.",
  categoria: "python",          // "ia" | "python" | "web" | "cpp"
  categoriaNome: "Python",
  tags: ["Python", "SQL"],
  icone: "python",              // id do ícone do sprite (veja lista abaixo)
  imagem: "",                   // ou "minha-imagem.jpg" (salva na pasta do projeto)
  demo: "https://link-do-projeto.com",  // pode deixar ""
  repo: "https://github.com/seu-usuario/repo",
  destaque: false               // true mostra o selo "Destaque"
}
```

Ícones disponíveis para o campo `icone`: `python`, `cplusplus`, `html5`, `css`, `javascript`,
`git`, `github`, `mysql`, `openai`, `googlegemini`, `visualstudiocode`, `figma`, `terminal`,
`code`, `server`, `sparkles`, `zap`, `brain-circuit`, `graduation-cap`, `map-pin`, `target`,
`languages`, `wrench`.

**Dica para o campo `imagem`:** abra o seu site publicado, tire um print da parte de cima e salve
o arquivo na pasta do projeto com uma proporção próxima de 16:9 (ex: 1000x550 px). A imagem
preenche a miniatura do card automaticamente. Se o campo ficar vazio, o card usa o ícone do campo
`icone`.

O card aparece automaticamente na página e entra no filtro.
Se criar uma categoria nova (ex: `java`), adicione também um botão no `index.html`, junto dos
outros `.filter-btn`.

---

## Currículo (seção + PDF para download)

O site tem a seção **Currículo** (`#curriculo`) e botões para **baixar o PDF**.

- `curriculo.html` — arquivo-fonte do currículo (serve para tela e impressão);
- `curriculo.pdf` — PDF gerado a partir dele (1 página A4, texto selecionável).

### Como atualizar o currículo

1. Edite o conteúdo em `curriculo.html`;
2. Regenere o PDF. Com o Chrome instalado, no PowerShell:

   ```powershell
   & "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new `
     --no-pdf-header-footer --virtual-time-budget=5000 `
     "--print-to-pdf=C:\Users\ALUNO SESI E SENAI\portifolio\curriculo.pdf" `
     "file:///C:/Users/ALUNO%20SESI%20E%20SENAI/portifolio/curriculo.html"
   ```

3. Alternativa sem terminal: abra `curriculo.html` no navegador, clique no botão
   **Imprimir / Salvar em PDF** e salve o arquivo como `curriculo.pdf` (na mesma pasta do
   `index.html`).

O layout é compacto de propósito: o conteúdo precisa caber em **uma página A4**. Se você adicionar
muita coisa, confira a contagem de páginas (a última seção não pode ficar cortada).

---

## Formulário de contato (já configurado)

O formulário **envia as mensagens de verdade** para `gabrielcorreialuz2000@gmail.com` usando o
[FormSubmit](https://formsubmit.co) — gratuito, sem back-end e sem cadastro.

A configuração fica na tag do formulário, no `index.html`:

```html
<form id="contactForm"
      action="https://formsubmit.co/ajax/gabrielcorreialuz2000@gmail.com"
      method="POST">
```

### Ativação (só uma vez)

1. Abra o site e envie uma mensagem de teste pelo formulário;
2. O FormSubmit manda um e-mail de confirmação para o Gmail cadastrado;
3. Abra esse e-mail e clique no link de ativação.

A partir daí, toda mensagem enviada pelo site chega direto na sua caixa de entrada.

Se o envio falhar (por exemplo, sem internet), o site abre automaticamente o aplicativo de e-mail
do visitante com a mensagem já preenchida — nenhuma mensagem se perde.

---

## Recursos já incluídos

- Design moderno com tema escuro/claro (a preferência fica salva no navegador)
- 100% responsivo: celular, tablet e desktop
- Ícones SVG vetoriais, sem depender de internet
- Efeito de digitação, animações de entrada e contadores animados
- Filtro de projetos por categoria
- Barras de habilidades, linha do tempo de formação e SEO básico
- Zero dependências: leve e rápido

---

## Como publicar de graça (GitHub Pages)

O repositório é `kaka198977/portifolio` e o site final fica em
`https://kaka198977.github.io/portifolio/`.

### Opção A — pelo navegador (não precisa instalar nada)

1. Acesse https://github.com/new, use o nome **portifolio**, marque **Public** e clique em
   **Create repository**;
2. Na página do repositório, clique em **uploading an existing file** (ou em **Add file ->
   Upload files**);
3. **Arraste a pasta do projeto inteira** para a área de upload. Ponto importante: o
   `index.html` precisa ficar na **raiz** do repositório, não dentro de uma subpasta;
4. Escreva uma mensagem (ex: `Portfolio inicial`) e clique em **Commit changes**;
5. Vá em **Settings -> Pages**; em *Source* escolha **Deploy from a branch**, branch **main**,
   pasta **/ (root)** e clique em **Save**;
6. Em 1 ou 2 minutos o site estará no ar.

### Opção B — com o Git instalado (melhor para manutenção)

Instale o Git em https://git-scm.com/download/win e depois, no PowerShell:

```powershell
cd "c:\Users\ALUNO SESI E SENAI\portifolio"
git init -b main
git add .
git commit -m "Portfolio"
git remote add origin https://github.com/kaka198977/portifolio.git
git push -u origin main
```

Na primeira vez o Git abre uma janela do navegador para você entrar na sua conta do GitHub.

### Como atualizar o site depois

- **Pelo navegador:** **Add file -> Upload files**, envie os arquivos alterados (ele substitui os
  antigos) e confirme o commit;
- **Com Git:** `git add .` , `git commit -m "ajustes"` , `git push`.

O arquivo `.nojekyll` já está no projeto: ele evita que o GitHub Pages tente processar o site como
um projeto Jekyll, mantendo a publicação simples e direta.

---

## Próximo passo

Quando o link do site que você já fez for enviado, o portfólio pode ser integrado a ele:
botão "Ver meu site" em destaque no hero, unificação do visual (cores e tipografia) ou o site
virando um card de projeto.
