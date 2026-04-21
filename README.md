# Portfólio — Alexandre De Campos

Site pessoal em página única, escrito em HTML, CSS e JavaScript puros. Trabalho prático da disciplina Fundamentos da Programação Web, do curso de Ciência de Dados na UNINTER.

Site no ar: https://SEU-USUARIO.github.io/portfolio-alexandre-decampos/

## Por que sem framework

O enunciado pede HTML, CSS e JS na mão — sem Bootstrap, Tailwind, React ou jQuery. Para mim fez sentido: prefiro entender o que o navegador está fazendo antes de pular para bibliotecas que resolvem quase tudo por mágica. O CSS usa variáveis para o tema claro/escuro, o JS usa IntersectionObserver para as animações de entrada e para destacar a seção ativa no menu, e a validação do formulário é feita com regex. Nada que um framework faria diferente, só que aqui dá para ler linha por linha.

## O que tem no site

Quatro seções navegáveis por âncoras: Sobre, Formação, Portfólio e Contato. Os projetos que mostro são reais — dashboards em Power BI e uma automação em Python que construí na função de analista de dados na Base de Apoio Logístico, aplicados à gestão orçamentária de seis unidades gestoras do Exército. O formulário de contato é validado em JavaScript (campos obrigatórios e e-mail em formato correto) e simula o envio abrindo um modal de confirmação.

Na prática, o site tem menu responsivo com hambúrguer no celular, alternância entre tema claro e escuro com preferência salva no navegador, e animações discretas ao rolar a página.

## Rodar localmente

Se quiser abrir o código na sua máquina, basta clonar o repositório e abrir o `index.html` no navegador. Para recarregamento automático enquanto edita, a extensão Live Server do VS Code resolve.

```bash
git clone https://github.com/SEU-USUARIO/portfolio-alexandre-decampos.git
cd portfolio-alexandre-decampos
```

## Estrutura

```
.
├── index.html
├── README.md
├── .gitignore
├── css/style.css
├── js/script.js
└── img/
```

## Autor

Alexandre De Campos — Sargento do Exército Brasileiro, atuando com dados e automação aplicados à gestão orçamentária pública. Rio de Janeiro, RJ.
