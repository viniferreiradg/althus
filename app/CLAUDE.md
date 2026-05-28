# Althus App — CLAUDE.md
_Last updated: 2026-05-27_

## Skill de referência
Este protótipo segue fielmente a skill `/prototype-mobile`. Ler a skill antes de qualquer ação.

---

## Estrutura de arquivos

```
shared/                 ← raiz do projeto (compartilhado com dashboards desktop)
  page-mobile.css       ← TODO CSS de layout/estrutura das telas mobile (zero valores literais)
  transitions.css       ← definições de animação (.screen, .modalScreen, @keyframes)
  page.css              ← CSS dos dashboards desktop (não mexer)
app/
  screens/{id}.html     ← página HTML completa e autônoma (html/head/body, carrega próprio CSS)
  partials/{id}.html    ← wrapper mínimo: <div class="screen" ...><iframe src="../screens/{id}.html"></iframe></div>
  prototipo.html        ← frame de celular + router + sidebar de navegação
  index.html            ← frame de celular simples (sem sidebar)
  router.js             ← carrega partials via fetch(), gerencia animações de transição
```

---

## Absolute Rules

1. **Screens são páginas standalone** — cada `screens/*.html` tem `<html>`, `<head>`, `<body>` e carrega seus próprios `<link>` CSS
2. **Partials são wrappers de iframe** — apenas 3 linhas: `<div class="screen" data-screen-id="..." data-transition="..."><iframe src="..."></iframe></div>`
3. **Zero CSS em HTML** — sem `<style>`, sem `style=""`. Tudo em arquivos CSS linkados
4. **Zero valores literais** — sempre `var(--token-name)` em CSS
5. **Ícones via Lucide** — `data-lucide="..."`, nunca SVG inline
6. **Logos via `Logo.module.css`** — classes `.logoDefault .logoMd`, nunca `<svg>` inline
7. **`page-mobile.css` para layout** — qualquer classe de layout/estrutura que não seja componente vai neste arquivo
8. **`transitions.css` para animações** — novos tipos de transição entram aqui, nunca inline
9. **Storybook primeiro** — nenhum componente nasce diretamente em uma tela; passa pelo Storybook
10. **Sempre atualizar `prototipo.html`** ao criar qualquer tela nova (FLOWS array)
11. **Sempre atualizar este arquivo** após criar ou concluir uma tela

---

## Stack

- Shell: `app/prototipo.html` (com sidebar de navegação) e `app/index.html` (simples)
- Router: `app/router.js` — carrega `partials/{id}.html` via fetch()
- Transitions: `shared/transitions.css` (raiz do projeto)
- Layout CSS: `shared/page-mobile.css` (raiz do projeto)
- Design system: `../../storybook/` (tokens + componentes)
- Icons: Lucide CDN via `data-lucide`
- Viewport: 393px (iPhone 14 frame), dark mode padrão (`data-theme="dark"`)

---

## Router API (chamado de dentro das telas via `window.parent.router`)

```javascript
// Nas telas, declarar o proxy no topo:
var router = (window.parent && window.parent.router)
  ? window.parent.router
  : { push(){}, pop(){}, replace(){}, modal(){}, closeModal(){}, tab(){} };

// Uso:
router.push('screen-id')      // navegar para filho (slide direita→esquerda)
router.pop()                   // voltar (slide esquerda→direita)
router.replace('screen-id')   // substituir sem entrada no histórico (cross-fade)
router.modal('screen-id')     // abrir como bottom sheet
router.closeModal()            // fechar modal do topo
router.tab('screen-id')       // trocar aba (fade + shift)
```

---

## CSS loading order (em cada screens/*.html)

```html
<link rel="stylesheet" href="../../storybook/src/tokens/tokens.css" />
<link rel="stylesheet" href="../../shared/page-mobile.css" />
<link rel="stylesheet" href="../../storybook/src/components/ComponentName/ComponentName.module.css" />
<!-- um <link> por componente realmente usado na tela -->
```

---

## Body layout

```html
<!-- Tela mobile padrão -->
<body class="layout-screen nome-screen">

<!-- Tela de mapa ou mídia full-bleed -->
<body class="layout-fullbleed">
```

---

## Transições disponíveis (`data-transition` no partial)

| Tipo | Quando usar |
|---|---|
| `push` | Navegar para filho / detalhe |
| `pop` | Botão voltar |
| `replace` | Após concluir fluxo (sem voltar) |
| `modal` | Confirmações, bottom sheets |
| `tab` | Trocar aba da bottom navbar |

---

## Infrastructure

- [x] `app/shared/transitions.css`
- [x] `app/shared/page-mobile.css`
- [x] `app/router.js`
- [x] `app/prototipo.html`
- [x] `app/index.html`
- [ ] Componentes mobile no storybook: BottomNav, AppBar, BottomSheet, OTPInput, StepIndicator, StarRating, ChargingProgress, WalletCard, MapPin, ListItem

---

## Screens

### RF002 — Login
| Status | ID | Title |
|---|---|---|
| ✅ | jornada-1-2-0-splash | Splash Screen |
| ✅ | jornada-1-2-1-login | Login |
| ✅ | jornada-1-2-2-cadastro-step1 | Cadastro — Dados pessoais |
| ✅ | jornada-1-2-3-cadastro-step2 | Cadastro — Verificação OTP |
| ✅ | jornada-1-2-4-cadastro-step3 | Cadastro — Dados financeiros |
| ✅ | jornada-1-2-5-cadastro-step4 | Cadastro — Definir senha |
| ✅ | jornada-1-2-6-cadastro-step5 | Cadastro — Aceitar termos |

### RF003 — Recuperação de Senha
| Status | ID | Title |
|---|---|---|
| ✅ | jornada-1-3-1-recuperar-canal | Recuperar senha — Canal |
| ✅ | jornada-1-3-2-recuperar-otp | Recuperar senha — OTP |
| ✅ | jornada-1-3-3-recuperar-senha | Recuperar senha — Nova senha |

### RF004 — Mapa de Postos
| Status | ID | Title |
|---|---|---|
| ✅ | jornada-1-4-1-home-map | Home — Mapa |
| ✅ | jornada-1-4-lista-postos | Lista de postos |
| ✅ | jornada-1-4-2-map-sheet-guest | Detalhe da localidade — Guest (sem conta) |
| ✅ | jornada-1-4-2-map-sheet-no-car | Detalhe da localidade — Sem veículo cadastrado |
| ✅ | jornada-1-4-2-map-sheet | Detalhe da localidade |
| ⬜ | jornada-1-4-3-map-device | Detalhe do dispositivo |
| ⬜ | jornada-1-4-4-map-filters | Filtros de busca |
| ⬜ | jornada-1-4-5-recarga-metodo | Iniciar Recarga — QR / Código |
| ⬜ | jornada-1-4-6-recarga-pagamento | Iniciar Recarga — Pagamento |
| ⬜ | jornada-1-4-7-recarga-andamento | Recarga em andamento |
| ⬜ | jornada-1-4-8-recarga-avaliacao | Avaliação pós-recarga |
| ⬜ | jornada-1-4-9-reserva-confirmar | Fazer reserva — Confirmação |
| ⬜ | jornada-1-4-10-reserva-confirmada | Reserva confirmada |

### RF005 — Histórico
| Status | ID | Title |
|---|---|---|
| ⬜ | jornada-1-5-1-historico-lista | Histórico de abastecimentos |
| ⬜ | jornada-1-5-2-historico-detalhe | Abastecimento — Detalhe |
| ⬜ | jornada-1-5-3-reservas-lista | Histórico de reservas |
| ⬜ | jornada-1-5-4-reservas-detalhe | Reserva — Detalhe |
| ⬜ | jornada-1-5-5-reserva-cancelar | Cancelar reserva |

### RF006 — Carteira
| Status | ID | Title |
|---|---|---|
| ⬜ | jornada-1-6-1-carteira | Carteira digital |
| ⬜ | jornada-1-6-2-carteira-pix | Adicionar saldo — PIX |
| ⬜ | jornada-1-6-3-carteira-cartao | Adicionar saldo — Cartão |
| ⬜ | jornada-1-6-4-extrato | Extrato de créditos |
| ⬜ | jornada-1-6-5-cupons | Meus cupons |
| ⬜ | jornada-1-6-6-cartoes | Gerenciar cartões |

### RF007 — Perfil
| Status | ID | Title |
|---|---|---|
| ⬜ | jornada-1-7-1-perfil | Perfil — Menu |
| ⬜ | jornada-1-7-2-perfil-dados | Editar dados pessoais |
| ⬜ | jornada-1-7-3-perfil-senha | Alterar senha |
| ⬜ | jornada-1-7-4-veiculos-lista | Meus veículos |
| ⬜ | jornada-1-7-5-veiculos-form | Cadastrar / Editar veículo |
| ⬜ | jornada-1-7-6-notificacoes | Notificações |
| ⬜ | jornada-1-7-7-notificacao-detalhe | Detalhe da notificação |
| ⬜ | jornada-1-7-8-termos | Termos e Políticas |

---

## Key Principles

- **Screens são autônomas** — funcionam sozinhas sem o router ou o frame
- **Partials são wrappers** — 3 linhas, sem conteúdo, só um iframe apontando para a screen
- **page-mobile.css é a única fonte** — todo CSS de layout/estrutura (não-componente) vai aqui
- **transitions.css é extensível** — novos tipos de transição entram neste arquivo, nunca inline
- **Storybook primeiro** — componentes novos nascem no Storybook, não nas telas
- **prototipo.html é obrigatório** — toda tela nova deve ser registrada no array FLOWS
- **Tokens sempre** — se um valor não tem token, reportar ao usuário em vez de hardcodar
