# CourseSphere

CourseSphere é uma aplicação de exemplo para gestão de cursos, instrutores e aulas, construída com Next.js (app router) no frontend e um backend simples baseado em json-server (mock API). O workspace contém duas pastas principais: `frontend/` e `backend/`.

Este README descreve o projeto, como instalar e rodar localmente, e fornece dicas de desenvolvimento.

---

## Visão geral

- Frontend: Next.js (TypeScript), SWR para cache/consulta, Tailwind CSS para estilos.
- Backend: json-server (mock REST API) usando o arquivo `backend/db.json`.
- Persistência: `backend/db.json` contém dados iniciais (Users, Courses, Lessons).

Ports padrão
- Frontend (Next dev): `http://localhost:3000`
- Backend (json-server): `http://localhost:3001`

---

## Funcionalidades principais

- Autenticação simples (usuário armazenado em cookie de sessão local)
- CRUD de cursos (criar/editar/excluir)
- Adicionar/remover instrutores de um curso
- Gerenciar aulas por curso com filtros e paginação
- Atualizações otimistas no frontend para UX (SWR mutate)

---

## Estrutura do repositório (resumo)

- `frontend/` – aplicação Next.js (código fonte, hooks, componentes)
- `backend/` – json-server + `db.json` com dados de exemplo

---

## Pré-requisitos

- Node.js 18+ (recomendado)
- pnpm (o projeto usa `pnpm` como package manager). Instale globalmente se necessário:

```powershell
npm install -g pnpm
```

> Observação: os comandos abaixo mostram PowerShell (Windows). Em macOS/Linux use bash/zsh.

---

## Instalação (passo a passo)

1. Clone o repositório e entre na pasta:

```powershell
git clone <repo-url> CourseSphere
cd CourseSphere
```

2. Instale dependências do frontend e backend:

```powershell
cd frontend
pnpm install

cd ../backend
pnpm install

cd ..
```

---

## Rodando em desenvolvimento

1. Inicie o backend (json-server):

```powershell
cd backend
pnpm start
# inicia em http://localhost:3001
```

2. Inicie o frontend (Next.js):

```powershell
cd frontend
pnpm dev
# Next.js dev server em http://localhost:3000
```

Abra `http://localhost:3000` no navegador.

---

## Variáveis de ambiente

O frontend usa `NEXT_PUBLIC_API_URL` para configurar a URL da API. Se não estiver definida, usa `http://localhost:3001`.

Exemplo (PowerShell):

```powershell
$env:NEXT_PUBLIC_API_URL = 'http://localhost:3001'
pnpm dev
```

---

## Dados de exemplo (backend/db.json)

O arquivo `backend/db.json` contém usuários de teste, cursos e aulas. Credenciais úteis:

- email: `taffarelramon1@gmail.com`, password: `123123123` (id `5885`)
- email: `taffarelramon2@gmail.com`, password: `123123123` (id `1`)

Edite `db.json` se quiser outros dados locais; reinicie o json-server após alterações.

---

## Scripts úteis

- Frontend (`frontend`):
  - `pnpm dev` — iniciar desenvolvimento
  - `pnpm build` — build de produção
  - `pnpm start` — iniciar build
  - `pnpm lint` — rodar ESLint

- Backend (`backend`):
  - `pnpm start` — inicia json-server

---

## Convenções e boas práticas adotadas

- API client: `frontend/src/lib/api.ts` (centraliza baseURL e interceptors se necessário).
- Hooks:
  - `frontend/src/hooks/Querys` — hooks que consultam dados (useSWR)
  - `frontend/src/hooks/Mutations` — hooks que fazem mudanças (POST/PATCH/DELETE) e executam `mutate()` do SWR
- Componentes organizados em `atoms/`, `molecules/`, `organisms/`.
- Atualizações otimistas e revalidação: onde faz sentido o código usa `mutate(key, optimisticData, false)` seguido do request e `mutate(key)` para revalidação. Isso dá boa UX e consistência.

---

## Depuração e problemas comuns

- Se o frontend não consegue alcançar a API, verifique se o json-server está rodando em `:3001` e se `NEXT_PUBLIC_API_URL` aponta corretamente.
- Evite revalidar a key do recurso que acabou de ser deletado antes de navegar (isso pode causar mensagens de "não encontrado" na UI) — o projeto já trata esse caso em algumas mutações.

---

## Testes manuais rápidos

1. Rodar backend + frontend conforme indicado.
2. Fazer login com um usuário do `db.json`.
3. Testar:
   - criar/editar/excluir curso
   - adicionar instrutor (deve aparecer imediatamente via mutate no cache `/users`)
   - excluir curso (dialogue mostra loading e só navega após conclusão)

---

## Contribuição

- Abra uma issue descrevendo a mudança.
- Crie branch `feature/xxx`, faça commits descritivos e abra um PR.

---

Se quiser, eu posso:

- Adicionar instruções de deploy (ex.: Vercel) e configuração de variáveis de ambiente para produção;
- Incluir um script root para executar frontend+backend em paralelo (usando `concurrently`);
- Gerar exemplos de chamadas API (curl/Postman collection).

Diga qual extra prefere que eu adicione.
