![Logo Mentis](frontend/src/assets/logo-geral.png)
# Mentis: Cuidando de quem cuida

O Mentis é uma plataforma de acompanhamento e documentação de atividades psicossociais. O software automatiza o preenchimento de documentos de atividades psicossociais e permite o monitoramento dos pacientes em tempo real.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como rodar localmente](#como-rodar-localmente)
    - [Pré-requisitos](#pré-requisitos)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Credenciais de teste](#credenciais-de-teste)
- [Deploy](#deploy)
- [Padrão de commits e branches](#padrão-de-commits-e-branches)

## Funcionalidades

- **Gestão de pacientes e profisionais**: cadastro de pacientes, profissionais e estabelecimentos de saúde.
- **Diagnósticos (CID-10)**: registro de diagnósticos vinculados aos pacientes com base na classificação CID-10.
- **Preenchimento de Formulário RAAS**: automatização do preenchimento de formulários RAAS e exportação em PDF.
- **Check-in de humor**: pacientes registram diariamente seu estado emocional, sendo permitido o monitoramento em tempo real pelos profissionais.
- **Conquistas**: sistema de gamificação para engajamento dos pacientes durante o acompanhamento.

## Tecnologias

**Frontend**
- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Axios

**Backend**
- Java 21
- Spring Boot 4
- Spring JPA / Hibernate
- Lombok
- Maven

**Banco de dados**
- PostgreSQL


## Como rodar localmente

### Pré-requisitos

- [Java 21](https://adoptium.net/) (JDK)
- [Node.js 18+]() e npm
- [PostgreSQL]() instalado e em execução localmente
- Maven não é obrigatório instalar globalmente pois o projeto inclui o Maven Wrapper (`mvnw`)

### Backend

1. Criar banco de dados PostgreSQL com o nome `ProjetoMentis`:

```sql
    CREATE DATABASE "ProjetoMentis";
```

2. Acesse a pasta do backend:

```bash
    cd backend
```

3. Configurar variáveis de ambiente (opcional). Por padrão, a aplicação já assume os valores abaixo caso nada seja definido:

   | Variável       | Valor padrão                                         |
   |----------------|-------------------------------------------------------|
   | `DB_URL`       | `jdbc:postgresql://localhost:5432/ProjetoMentis`       |
   | `DB_USERNAME`  | `postgres`                                             |
   | `DB_PASSWORD`  | `root`                                                 |

 > Ao usar um arquivo `.env`, atenção: a variável precisa se chamar exatamente `DB_USERNAME` para ser reconhecida pelo Spring Boot.

 4. Rode a aplicação:

 ```bash
    ./mvnw spring-boot:run
```

    No Windows: `mvnw.cmd spring-boot:run`

5. A API sobe em `http://localhost:8080`.

### Frontend 

1. Acesse a pasta do frontend:

```bash
    cd frontend
```

2. Instale as dependências:

```bash
    npm install
```

3. Rode a aplicação:

```bash
    npm run dev
```

4. A aplicação sobe em `http://localhost:5173`.

### Credenciais de teste

...

## Deploy

A aplicação está hospedada em dois serviços distintos:

- **Frontend (React + Vite)** -> hospedado na **Vercel** como uma SPA estática. A variável de ambiente `VITE_API_URL` deve ser configurada no painel da Vercel apontando para a URL pública do backend. 
- **Backend (Spring Boot)** -> containerizado via `Dockerfile` e hospedado no **Render** expondo a porta `8080`. As variáveis de ambiente `DB_URL`, `DB_USERNAME` e `DB_PASSWORD` devem ser configuradas no deploy.

## Padrão de commits e branches

**Commits**

```
<tipo>: <descrição>
```

Tipos disponíveis: 

- `feat`: Nova funcionalidade ou feature adicionada.
- `fix`: Correção de bug.
- `docs`: Alterações na documentação.
- `perf`:  Mudanças que melhoram a performance da aplicação
- `style`: Formatação, espaços em branco, etc. (sem alteração de código funcional).
- `refactor`: Alterações que não corrigem bugs nem adicionam novas funcionalidades.
- `test`: Adição ou modificação de testes.
- `chore`: Tarefas de build, configuração, etc.

**Branches**
```
<tipo>/ <nome-do-recurso>
```

Exemplo: `feature/telaDeLogin`
