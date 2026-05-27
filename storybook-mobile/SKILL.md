---
name: storybook-mobile
description: >
  Use this skill to build screens for the Althus mobile app prototype, create
  mobile-specific Storybook components, or maintain app/CLAUDE.md.

  Trigger on: "criar tela do app", "app mobile", "app usuário", "router", "transição",
  "screen", "protótipo mobile", "componente mobile", or any work inside app/.

  Two modes:
  1. Setup — app/index.html missing → create storybook components + infrastructure
  2. Screen — app/index.html exists → build the requested screen partial
---

# Storybook Mobile Skill

Single-page shell + JS router prototype. All screens are HTML partials animated by the router.
All components — including mobile-specific ones — live in the **same shared Storybook** design
system as the desktop dashboards. Mobile components use `title: 'Mobile/ComponentName'` in their
story files to appear under a separate "Mobile" group in the Storybook sidebar.

---

## Step 0 — Always do this first

Check whether `app/index.html` exists.

- app/index.html **exists** → Mode 2 (Screen)
- app/index.html **missing** → Mode 1 (Setup)

Read `app/CLAUDE.md` and `storybook/CLAUDE.md` before doing anything.

---

## Mode 1 — Setup

Run once to build the full foundation. Three steps in order.

### Step 1 — Create missing Storybook components

Check each component against `storybook/CLAUDE.md`. If missing: create tsx + module.css + story,
update `storybook/CLAUDE.md`, then move to the next.

| Component | Purpose |
|---|---|
| BottomNav | Fixed bottom bar — 4 tabs: Mapa / Histórico / Carteira / Perfil |
| AppBar | Mobile top bar: back button + title + optional right action |
| BottomSheet | Panel that slides up from bottom |
| OTPInput | 6 individual digit fields for verification codes |
| StepIndicator | Multi-step progress indicator (registration flow) |
| StarRating | Tap-to-rate 1–5 stars (post-charge review) |
| ChargingProgress | Live charging card: kWh consumed, elapsed time, progress bar |
| WalletCard | Balance card with show/hide toggle |
| MapPin | Station marker with Althus/roaming color and status dot |
| ListItem | Generic list row: icon + title + subtitle + right element |

Rules (same as storybook skill):
- Children before parents
- Zero hardcoded values — 100% var(--token-name)
- Story with Default, all variants, edge cases
- Story title must use `'Mobile/ComponentName'` prefix
- Update storybook/CLAUDE.md after each component

### Step 2 — Build infrastructure

**app/transitions.css** — defines all 5 animation types (see Transition Types section).
Base duration: 300ms. Base easing: cubic-bezier(0.4, 0, 0.2, 1).

**app/router.js** — single-page router:
- Navigation stack (array of screen IDs)
- router.push(screenId, type?) — load partial, animate in, add to stack
- router.pop() — reverse-animate, restore previous screen
- router.replace(screenId) — swap screen, no back entry
- router.modal(screenId) — open as bottom modal with backdrop
- router.tab(screenId) — switch tab, update bottom nav highlight, no stack change
- router.init(screenId) — load initial screen on page load
- Fetches partials from screens/{screenId}.html via fetch()
- Injects HTML into #screen-container
- After each injection: calls lucide.createIcons()
- Auto-hides #bottom-nav for onboarding screen IDs
- Auto-shows #bottom-nav for main app screen IDs

**app/index.html** — the shell:
- html element: lang="pt-BR" data-theme="dark"
- meta viewport: width=device-width, initial-scale=1, viewport-fit=cover
- Phone frame wrapper (decorative div sizing the app to mobile viewport)
- All CSS preloaded in head: tokens + every storybook component used anywhere + transitions.css
- DOM inside frame: #app > #screen-container + nav#bottom-nav.bottomNav
- Lucide CDN script
- script src="router.js"
- router.init('splash') call

Note: when a new Storybook component is created later, add its link to the shell head.
That is the only reason to edit index.html after setup.

### Step 3 — Generate app/CLAUDE.md

Use the CLAUDE.md template at the end of this file.
Pre-populate the full 38-screen inventory with all statuses set to ⬜.

Tell the user: "Infraestrutura criada. Componentes mobile registrados no Storybook. Pode me pedir qualquer tela."

---

## Mode 2 — Screen Creation

### Phase 1 — Understand

Read app/CLAUDE.md and storybook/CLAUDE.md. Identify: what the screen shows, its actions,
which tab it belongs to, and what transition brings it in.

### Phase 2 — Map components

List every UI element and confirm each exists in the Storybook:

- ✅ exists: Button, Input, AppBar, ListItem...
- ❌ missing: [name] — ask for authorization before creating

If a component is missing: ask first. Follow storybook creation rules.
After creating: update storybook/CLAUDE.md and add link to app/index.html head.

### Phase 3 — Create the partial

Create app/screens/{screen-id}.html following Screen Partial Rules below.

### Phase 4 — Register

Update app/CLAUDE.md: mark screen as ✅ in the inventory table.

---

## Screen Partial Rules

Every partial is a single div.screen — never html, head, or body tags.

Structure:

    <div class="screen" data-screen-id="login">

      <!-- AppBar: only on screens needing a back button or title.
           Omit on: splash, home-map, and the four tab root screens. -->
      <div class="appBar">
        <button class="btn ghost iconOnly appBarBack"
                aria-label="Voltar" onclick="router.pop()">
          <i data-lucide="chevron-left" width="24" height="24"></i>
        </button>
        <span class="appBarTitle">Entrar</span>
      </div>

      <main class="screenContent">
        <!-- screen body -->
      </main>

    </div>

**No CSS links in partials.** All CSS is preloaded in the shell. Use classes directly.

**No hardcoded values.** Every color, spacing, radius, shadow must use var(--token).

**Screen-specific layout** with no matching token: use a style block scoped to the screen ID,
still using only var(--token):

    <style>
      [data-screen-id="login"] .loginLogo {
        margin-top: var(--spacing-2xl);
        margin-bottom: var(--spacing-xl);
      }
    </style>

Never use style="" inline attributes.

**Navigation calls:**

    router.push('cadastro-step1')       <!-- go to child screen -->
    router.pop()                         <!-- back -->
    router.replace('home-map')           <!-- no back — after completing auth -->
    router.modal('reserva-confirmar')    <!-- open as bottom sheet -->
    router.tab('historico-lista')        <!-- switch tab -->

**Icons:** data-lucide only. Router calls lucide.createIcons() — never call it in partials.

    <i data-lucide="zap" width="20" height="20"></i>

**Bottom navbar** lives only in the shell. Never add BottomNav markup inside a partial.

**Safe area** — screens with content near bottom edges:

    padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom));

---

## Transition Types

| Type | Animation | When to use |
|---|---|---|
| push | New slides in from right (100%→0); current recedes left (0→-30%) | Navigate to child / detail |
| pop | Current exits right (0→100%); previous re-enters from left (-30%→0) | Back button |
| replace | Cross-fade: out fades to 0, in fades from 0 to 1 | After completing auth or flow |
| modal | New slides up from bottom (100vh→0); backdrop fades 0→0.6 | Confirmations, bottom sheets |
| tab | Fade + 8px upward shift | Switching bottom navbar tabs |

All: cubic-bezier(0.4, 0, 0.2, 1), 300ms.

---

## Screen Inventory — 38 screens

### Onboarding (bottom nav hidden)

| ID | Title | Transition in |
|---|---|---|
| splash | Splash Screen | — initial |
| login | Login | replace |
| cadastro-step1 | Cadastro — Dados pessoais | push |
| cadastro-step2 | Cadastro — Verificação OTP | push |
| cadastro-step3 | Cadastro — Dados financeiros | push |
| cadastro-step4 | Cadastro — Definir senha | push |
| cadastro-step5 | Cadastro — Aceitar termos | push |
| recuperar-canal | Recuperar senha — Canal | push |
| recuperar-otp | Recuperar senha — Código OTP | push |
| recuperar-senha | Recuperar senha — Nova senha | push |

### Tab: Mapa

| ID | Title | Transition in |
|---|---|---|
| home-map | Home — Mapa | replace |
| map-sheet | Detalhe da localidade | modal |
| map-device | Detalhe completo do dispositivo | push |
| map-filters | Filtros de busca | modal |
| recarga-metodo | Iniciar Recarga — QR / Código | push |
| recarga-pagamento | Iniciar Recarga — Pagamento | push |
| recarga-andamento | Recarga em andamento | replace |
| recarga-avaliacao | Avaliação pós-recarga | modal |
| reserva-confirmar | Fazer reserva — Confirmação | modal |
| reserva-confirmada | Reserva confirmada | replace |

### Tab: Histórico

| ID | Title | Transition in |
|---|---|---|
| historico-lista | Histórico de abastecimentos | tab |
| historico-detalhe | Abastecimento — Detalhe | push |
| reservas-lista | Histórico de reservas | push |
| reservas-detalhe | Reserva — Detalhe | push |
| reserva-cancelar | Cancelar reserva — Confirmação | modal |

### Tab: Carteira

| ID | Title | Transition in |
|---|---|---|
| carteira | Carteira digital | tab |
| carteira-pix | Adicionar saldo — PIX | push |
| carteira-cartao | Adicionar saldo — Cartão | push |
| extrato | Extrato de créditos | push |
| cupons | Meus cupons | push |
| cartoes | Gerenciar cartões | push |

### Tab: Perfil

| ID | Title | Transition in |
|---|---|---|
| perfil | Perfil — Menu | tab |
| perfil-dados | Editar dados pessoais | push |
| perfil-senha | Alterar senha | push |
| veiculos-lista | Meus veículos | push |
| veiculos-form | Cadastrar / Editar veículo | push |
| notificacoes | Notificações | push |
| notificacao-detalhe | Detalhe da notificação | push |
| termos | Termos e Políticas | push |

---

## CLAUDE.md template

Generate this file at app/CLAUDE.md during Mode 1 Step 3.
Pre-populate the inventory with all statuses as ⬜.

---

# Althus App — CLAUDE.md
_Last updated: <date>_

## Stack
- Shell: app/index.html
- Router: app/router.js
- Transitions: app/transitions.css
- Screens (partials): app/screens/
- Design system: ../storybook/ (tokens + components)
- Icons: Lucide CDN via data-lucide
- Viewport: 390px, dark mode default (data-theme="dark")

## Absolute Rules
1. Partials never have html/head/body — only div.screen[data-screen-id]
2. No link tags in partials — all CSS loaded in shell
3. Zero hardcoded values — always var(--token)
4. Bottom navbar lives in shell only — never in partials
5. Always read storybook/CLAUDE.md before creating components
6. Always update this file after creating or finishing a screen
7. lucide.createIcons() is called by the router — never call it manually

## Infrastructure
- [ ] app/transitions.css
- [ ] app/router.js
- [ ] app/index.html
- [ ] Storybook mobile components: BottomNav, AppBar, BottomSheet, OTPInput, StepIndicator, StarRating, ChargingProgress, WalletCard, MapPin, ListItem

## Screens

### Onboarding
| Status | ID | Title |
|---|---|---|
| ⬜ | splash | Splash Screen |
| ⬜ | login | Login |
| ⬜ | cadastro-step1 | Cadastro — Dados pessoais |
| ⬜ | cadastro-step2 | Cadastro — Verificação OTP |
| ⬜ | cadastro-step3 | Cadastro — Dados financeiros |
| ⬜ | cadastro-step4 | Cadastro — Definir senha |
| ⬜ | cadastro-step5 | Cadastro — Aceitar termos |
| ⬜ | recuperar-canal | Recuperar senha — Canal |
| ⬜ | recuperar-otp | Recuperar senha — OTP |
| ⬜ | recuperar-senha | Recuperar senha — Nova senha |

### Tab: Mapa
| Status | ID | Title |
|---|---|---|
| ⬜ | home-map | Home — Mapa |
| ⬜ | map-sheet | Detalhe da localidade |
| ⬜ | map-device | Detalhe do dispositivo |
| ⬜ | map-filters | Filtros de busca |
| ⬜ | recarga-metodo | Iniciar Recarga — QR / Código |
| ⬜ | recarga-pagamento | Iniciar Recarga — Pagamento |
| ⬜ | recarga-andamento | Recarga em andamento |
| ⬜ | recarga-avaliacao | Avaliação pós-recarga |
| ⬜ | reserva-confirmar | Fazer reserva — Confirmação |
| ⬜ | reserva-confirmada | Reserva confirmada |

### Tab: Histórico
| Status | ID | Title |
|---|---|---|
| ⬜ | historico-lista | Histórico de abastecimentos |
| ⬜ | historico-detalhe | Abastecimento — Detalhe |
| ⬜ | reservas-lista | Histórico de reservas |
| ⬜ | reservas-detalhe | Reserva — Detalhe |
| ⬜ | reserva-cancelar | Cancelar reserva |

### Tab: Carteira
| Status | ID | Title |
|---|---|---|
| ⬜ | carteira | Carteira digital |
| ⬜ | carteira-pix | Adicionar saldo — PIX |
| ⬜ | carteira-cartao | Adicionar saldo — Cartão |
| ⬜ | extrato | Extrato de créditos |
| ⬜ | cupons | Meus cupons |
| ⬜ | cartoes | Gerenciar cartões |

### Tab: Perfil
| Status | ID | Title |
|---|---|---|
| ⬜ | perfil | Perfil — Menu |
| ⬜ | perfil-dados | Editar dados pessoais |
| ⬜ | perfil-senha | Alterar senha |
| ⬜ | veiculos-lista | Meus veículos |
| ⬜ | veiculos-form | Cadastrar / Editar veículo |
| ⬜ | notificacoes | Notificações |
| ⬜ | notificacao-detalhe | Detalhe da notificação |
| ⬜ | termos | Termos e Políticas |

---

## Key Principles

- **Shell rarely changes** — index.html is built once; only add link tags when a new component is created
- **Partials are pure** — each screen is a self-contained div with no external dependencies
- **Source of truth** — app/CLAUDE.md tracks what is done and what is pending
- **Storybook first** — no component is born directly in a partial; it goes through the Storybook
- **Tokens always** — if a value has no token, report to the user instead of hardcoding
- **Accessibility** — aria-label on icon-only buttons, for/id on all form fields
