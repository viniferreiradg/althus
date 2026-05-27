# Contexto — Projeto Althus Eletropostos

## O que é o projeto

Plataforma de gestão de carregadores de veículos elétricos. Cliente: **Guilherme Canto**.

O projeto tem três partes:

1. **App mobile do usuário final** — já está pronto/em andamento
2. **Dashboard desktop do credenciado** (gestor da rede de carregadores) — **próxima etapa a ser desenhada**
3. **Dashboard ADM do Althus** (admin interno, captação de dados) — fase posterior

O contexto foi extraído de três reuniões de descobrimento (transcrições em DOCX):
- Reunião 1 — 14/05/2026 (jornadas do usuário final)
- Reunião 2 — 15/05/2026 (continuação usuário final + início do credenciado)
- Reunião 3 — 18/05/2026 (dashboard do credenciado completo)

---

## Decisões de negócio relevantes

- Pagamento 100% pelo app; sem pagamento presencial
- Split automático via **Stripe (BTG Pactual)** ou **PagarMe (conta Stone)** — o saldo cai direto na conta do credenciado, sem função de resgate no dashboard
- Apenas um tipo de usuário no dashboard: **administrador credenciado** (com sistema de perfis/roles)
- Dados exibidos no extrato: nome do usuário (sem e-mail/CPF), data/hora, valor carregado, valor pago, desconto, taxa Althus, forma de pagamento
- Status possíveis de um carregador: **Ativo, Inativo, Em manutenção, Instalando**
- Integração financeira com BTG (saldo, PIX, extrato, DDA) está **em avaliação** — fora do escopo original

---

## Telas levantadas — Dashboard Desktop do Credenciado

### Autenticação
- Login
- Recuperar senha

### Dashboard (Visão Geral)
- Indicadores: total de carregadores habilitados, total de recargas no período, total de faturamento

### Gestão de Locais
- Lista de locais (com filtros e status)
- Cadastrar / Editar local — nome, endereço, horário de funcionamento, fotos, localização geográfica

### Gestão de Carregadores (Dispositivos)
- Lista de carregadores — filtros: localidade, tipo de conector, potência, status
- Cadastrar / Editar carregador — marca, modelo (opcional), número de série, potência, quantidade de conectores, tipo de conector, fotos (opcional), status, habilitar reserva

### Gestão de Reservas
- Lista de reservas — usuário (nome), localidade, dispositivo, data/hora, status
- Configuração de reserva por dispositivo — dias da semana, faixas de horário habilitadas

### Gestão de Tarifas
- **Taxa de ociosidade** — valor por minuto, tempo de carência, padrão global + exceções por localidade, toggle ativo/inativo
- **Taxa de reserva** — valor, tempo de validade (carência), padrão global + exceções por localidade, toggle ativo/inativo

### Gestão de Cupons
- Lista de cupons (status: ativo, expirado, esgotado)
- Cadastrar / Editar cupom:
  - Código (sigla 3 chars da rede + sufixo)
  - Data de início e data limite
  - Quantidade total de usos
  - Limite de usos por CPF
  - Público-alvo: localidade, dispositivo, raio geográfico, usuários que já usaram no dispositivo em X dias
  - Benefício: percentual (limitado a R$ X) ou valor fixo; opção de "primeira recarga"

### Histórico de Recargas (Extrato)
- Lista de recargas — filtros: usuário, período, localidade, dispositivo, forma de pagamento
- Colunas: nome do usuário, data/hora, valor carregado, valor pago, desconto, taxa Althus, forma de pagamento (carteira / cartão)

### Log de Falhas
- Lista de erros/alertas dos carregadores — localidade, dispositivo, tipo de erro, severidade, data/hora

### Gestão de Usuários
- Lista de usuários (com perfis atribuídos)
- Cadastrar / Editar usuário
- Gestão de perfis — criar perfil, definir quais telas cada perfil acessa
- Vincular perfis a usuários (um usuário pode ter múltiplos perfis)

### Configurações / Perfil da Empresa
- Dados da rede credenciada (razão social, CNPJ, dados de contato)

### Financeiro *(a confirmar — depende de integração BTG/PagarMe)*
- Saldo e extrato bancário
- PIX / Transferências
- DDA (consulta de boletos)

---

## Onde estávamos

A lista de telas acima foi validada e o próximo passo é **detalhar cada tela** — campos, estados, fluxos e regras de negócio de cada uma delas.

Os arquivos de memória do projeto estão salvos em:
`C:\Users\viniz\.claude\projects\C--Users-viniz-Documents-02-claude-althus\memory\`
