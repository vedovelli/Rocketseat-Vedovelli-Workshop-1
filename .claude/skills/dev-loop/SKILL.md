---
name: dev-loop
description: Use when starting any development task that requires feature implementation, PR review cycle, and merge — especially when working in a team with code review gates before merge.
---

# Dev Loop

## Overview

Fluxo completo de desenvolvimento: exploração → plano → branch → tasks → execução paralela → commits atômicos → PR → loop de review até aprovação → squash merge.

**Regra de ouro:** nunca trabalhar no `master`. Todo trabalho vai em feature branch.

## Fluxo Completo

### 1. Explorar e Planejar

```
Explore agent  → entender padrões do codebase
Plan agent     → desenhar plano de implementação
Basic Memory   → salvar plano no projeto correto
```

Salvar o plano antes de qualquer código:
```
mcp__basic-memory-cloud__write_note(
  project="<nome-do-projeto>",
  title="Plano: <feature>",
  directory="planos"
)
```

### 2. Feature Branch

```bash
git checkout -b feat/<nome-da-feature>
```

Se um commit foi feito acidentalmente no `master`:
```bash
git checkout -b feat/<nome>          # cria branch preservando o commit
git branch -f master <sha-anterior>  # reverte master
```

### 3. Criar Tasks com Dependências

Criar todas as tasks em paralelo com `TaskCreate`, depois mapear dependências com `TaskUpdate addBlockedBy`.

Identificar ondas de execução baseadas no grafo de dependências:

```
Onda 1 (independentes)  → executar em paralelo
Onda 2 (dependem da 1)  → executar em paralelo entre si
Onda 3 (dependem da 2)  → idem
...
```

### 4. Executar por Ondas com Agentes Paralelos

Por onda: marcar tasks como `in_progress`, despachar um agente por task, aguardar todos.

```
TaskUpdate(status: "in_progress")
Agent(task 1) | Agent(task 2) | Agent(task 3)  ← em paralelo
```

Cada agente recebe: contexto completo do arquivo a modificar, conteúdo exato esperado, instrução para não fazer nada além do escopo.

### 5. Commits Atômicos por Onda

Após cada onda concluir:

```bash
git add <arquivos-da-onda>
git commit -m "feat(<escopo>): <descrição>"
```

Marcar tasks como `completed` antes do próximo commit.

### 6. Verificar Build e Abrir PR

```bash
pnpm build   # ou o comando de build do projeto — deve estar limpo
git push -u origin feat/<nome>
gh pr create --base master --head feat/<nome> --title "..." --body "..."
```

Body do PR deve conter: tabela de arquivos alterados por camada, plano de testes em checklist.

### 7. Loop de Review

Após abrir o PR, entrar no loop de review:

```
┌─────────────────────────────────────────────────────┐
│  a cada 60 segundos:                                │
│                                                     │
│  verificar estado do PR                             │
│    ├─ APPROVED → quebrar loop → ir para merge       │
│    ├─ CHANGES_REQUESTED → implementar correções     │
│    │    ├─ ler comentários do review                │
│    │    ├─ verificar cada ponto no código real      │
│    │    ├─ aplicar correções (agentes em paralelo)  │
│    │    ├─ pnpm build (deve estar limpo)            │
│    │    ├─ commit + push                            │
│    │    └─ comentar no PR: resumo + @claude         │
│    └─ sem review novo → aguardar 60s               │
└─────────────────────────────────────────────────────┘
```

**Implementação do loop:**

```bash
PR_NUMBER=<número>
REPO=<owner>/<repo>

while true; do
  STATE=$(gh pr view $PR_NUMBER \
    --repo $REPO \
    --json reviewDecision \
    --jq '.reviewDecision')

  if [ "$STATE" = "APPROVED" ]; then
    echo "PR aprovado. Prosseguindo com merge."
    break
  fi

  # verificar se há review novo não endereçado ainda
  LATEST=$(gh api repos/$REPO/pulls/$PR_NUMBER/reviews \
    --jq 'last | {state, submitted_at}')

  echo "Estado: $STATE | Último review: $LATEST"
  sleep 60
done
```

**Ao receber review com mudanças solicitadas:**

1. Ler todos os comentários antes de implementar qualquer coisa
2. Verificar cada ponto no codebase real (não aceitar cegamente)
3. Identificar quais são independentes → despachar agentes em paralelo
4. `pnpm build` deve passar antes do commit
5. Comentar no PR com tabela de correções aplicadas + `@claude` para novo review

**Ao receber review com aprovação:** quebrar o loop imediatamente.

### 8. Squash Merge

```bash
gh pr merge <número> --squash \
  --subject "feat(<escopo>): <descrição resumida>" \
  --body "..."
```

Body do squash deve resumir todas as mudanças do branch em bullet points.

## Convenções de Commit

```
feat(<escopo>): <o que foi adicionado>
fix(<escopo>):  <o que foi corrigido>
chore:          <sem impacto funcional>
```

## Checklist Rápido

- [ ] Branch criado a partir do `master` (nunca trabalhar direto no master)
- [ ] Plano salvo no Basic Memory antes de codar
- [ ] Tasks criadas com dependências mapeadas
- [ ] Uma onda por nível de dependência, agentes em paralelo dentro da onda
- [ ] Commit atômico após cada onda
- [ ] Build verificado antes de abrir PR
- [ ] PR com tabela de arquivos e checklist de testes
- [ ] Loop de review ativo até aprovação
- [ ] Squash merge após aprovação
