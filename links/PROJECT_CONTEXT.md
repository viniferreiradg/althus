# Althus — Contexto do Projeto
_Última atualização: 2026-05-22_

---

## O que é esse projeto

**Althus Eletropostos** é um produto SaaS para gestão de rede de eletropostos.
Este repositório contém o **design system** e os **protótipos HTML** do produto.

---

## Estrutura de pastas

```
althus/
├── storybook/              ← Design system (React + Vite + TS + Storybook 8)
│   ├── src/
│   │   ├── tokens/
│   │   │   └── tokens.css  ← Fonte única de todos os tokens (cores, espaço, tipo...)
│   │   ├── components/     ← Componentes do design system
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Sidebar/
│   │   │   ├── Table/
│   │   │   ├── AuthCard/
│   │   │   ├── PasswordStrength/
│   │   │   ├── Divider/
│   │   │   ├── AppHeader/
│   │   │   ├── Feedback/
│   │   │   ├── Dialog/
│   │   │   ├── Dropdown/
│   │   │   ├── Accordion/
│   │   │   ├── Checkbox/
│   │   │   ├── RadioButton/
│   │   │   ├── Tab/
│   │   │   ├── Toggle/
│   │   │   ├── Tooltip/
│   │   │   ├── Breadcrumb/
│   │   │   └── Logo/
│   │   └── stories/        ← Foundations (Colors, Typography, Spacing, etc.)
│   └── CLAUDE.md           ← Documentação COMPLETA de todos os componentes e tokens
│
├── dashboard-rede/         ← Telas HTML do portal da rede (cliente)
│   └── criar-senha.html    ← Exemplo: tela de criação de senha
│
├── storybook-skill/
│   └── SKILL.md            ← Skill "storybook" para usar no Claude Code
│
└── PROJECT_CONTEXT.md      ← Este arquivo
```

---

## Como rodar localmente

```bash
# Storybook (porta 6006)
cd storybook
npm install
npm run storybook

# Páginas HTML (porta 3001) — rodar da pasta althus/
cd ..   # voltar para a raiz do repositório (onde ficam storybook/ e dashboard-rede/)
python -m http.server 3001
# ou: npx serve -p 3001
```

Acessos:
- Storybook: `http://localhost:6006`
- Páginas HTML: `http://localhost:3001/dashboard-rede/criar-senha.html`

---

## Como as telas HTML consomem o design system

As telas HTML **não têm CSS próprio de componente**. Elas linkam diretamente os arquivos
`.module.css` do storybook via caminho relativo:

```html
<link rel="stylesheet" href="../storybook/src/tokens/tokens.css" />
<link rel="stylesheet" href="../storybook/src/components/Button/Button.module.css" />
```

Consequência: **alterar um componente no storybook atualiza todas as telas automaticamente.**

Ícones são carregados via Lucide CDN:
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<i data-lucide="mail" width="16" height="16"></i>
<script>lucide.createIcons();</script>
```

---

## Regras absolutas (nunca quebrar)

1. **Zero valores hardcoded no CSS** — sempre `var(--token-name)`. Se o token não existir, perguntar antes de inventar valor bruto.
2. **Ícones: somente Lucide** — nunca SVG manual, nunca outra lib.
3. **Nunca recriar componente existente** — verificar o CLAUDE.md antes de criar qualquer coisa.
4. **Componente filho primeiro** — ao criar componentes com sub-componentes, criar o filho mais profundo primeiro.
5. **Novo componente** → pedir autorização → criar `.tsx` + `.module.css` + `.stories.tsx` → atualizar `CLAUDE.md`.
6. **CSS via `<link>`** nas telas HTML — nunca embutir CSS de componente em `<style>` inline.
7. **Logos via classes CSS** — nunca colar código SVG inline de logos.

---

## Tema

- **Dark mode por padrão** (`:root`)
- Light mode via `[data-theme="light"]`
- Sempre usar tokens semânticos (`--color-text-primary`, `--color-bg-default`, etc.) — nunca tokens de paleta bruta

---

## Skill "storybook" (Claude Code)

Foi criada uma skill chamada `storybook` para automatizar o fluxo de trabalho.
O arquivo está em `storybook-skill/SKILL.md`.

**O que ela faz:**

- **Modo 1 (primeira vez):** analisa todo o storybook e gera um `rules.md` como fonte de verdade
- **Modo 2 (criação de tela):** lê o `rules.md`, mapeia componentes necessários, mostra o que existe vs. o que falta, cria os componentes faltantes (filhos primeiro), e cria a tela `.html`

**Como instalar no Claude Code do outro PC:**
Copiar o conteúdo de `storybook-skill/SKILL.md` e instalar via interface de skills do Claude Code.

---

## Estado atual do projeto

### Componentes existentes (19)
Button, Input, Sidebar, Table, AuthCard, PasswordStrength, Divider, AppHeader,
Feedback, Dialog, Dropdown, Accordion, Checkbox, RadioButton, Tab, Toggle,
Tooltip, Breadcrumb, Logo/LogoSymbol

### Telas HTML existentes
- `dashboard-rede/criar-senha.html` — tela de criação de senha (fluxo de convite)

### Próximos passos sugeridos
- Inicializar git e subir no GitHub para facilitar trabalho entre PCs
- Rodar o Modo 1 da skill storybook para gerar o `rules.md`
- Criar demais telas do dashboard-rede

---

## Como retomar no outro PC

1. Clone o repositório (ou copie a pasta)
2. Rode `npm install` dentro de `storybook/`
3. Abra o Claude Code na pasta raiz do projeto
4. Diga ao Claude: **"Leia o PROJECT_CONTEXT.md e o storybook/CLAUDE.md para entender o projeto antes de começar"**
5. Instale a skill `storybook` a partir do arquivo `storybook-skill/SKILL.md`
6. Continue de onde parou

---

## Referência rápida de tokens semânticos

| Categoria | Token | Uso |
|-----------|-------|-----|
| Texto | `--color-text-primary` | Texto principal |
| Texto | `--color-text-secondary` | Texto secundário |
| Texto | `--color-text-tertiary` | Labels, hints |
| Texto | `--color-text-brand` | Links e destaques brand |
| Fundo | `--color-bg-default` | Fundo da página |
| Fundo | `--color-bg-surface` | Cards e painéis |
| Fundo | `--color-bg-elevated` | Dropdowns, tooltips |
| Borda | `--color-border-default` | Bordas visíveis |
| Borda | `--color-border-subtle` | Divisórias sutis |
| Borda | `--color-border-focus` | Foco de inputs |
| Espaço | `--spacing-xs` → `--spacing-7xl` | 4px → 200px |
| Radius | `--radius-xs` → `--radius-full` | 4px → 9999px |
| Tipo | `--font-size-xs` → `--font-size-9xl` | 12px → 96px |
| Sombra glow | `--shadow-glow-sm/md/lg` | Glow vermelho brand |
