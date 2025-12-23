import { Phase } from './types';

export const PHASES: Phase[] = [
  // ========================================
  // 1. 프로젝트 초기화
  // ========================================
  {
    id: 'project-init',
    name: '프로젝트 초기화',
    description: '새 프로젝트를 시작하고 기본 구조를 설정합니다. 가장 먼저 해야 할 단계입니다.',
    icon: 'FolderOpen',
    commands: [
      {
        id: 'mkdir-project',
        command: 'mkdir my-project && cd my-project',
        description: '프로젝트 폴더를 생성하고 이동합니다.',
        detailedDescription:
          '새 프로젝트를 시작하기 전에 먼저 프로젝트를 담을 폴더를 만들어야 합니다. mkdir은 "make directory"의 약자로, 새 폴더를 만드는 명령어입니다. &&는 앞 명령어가 성공하면 뒤 명령어를 실행합니다.',
        example: 'mkdir blog-app && cd blog-app',
        expectedOutput: '(출력 없음 - 성공 시 새 폴더로 이동됨)',
        tips: [
          '폴더명은 영문 소문자와 하이픈(-)만 사용하세요',
          '한글이나 공백은 나중에 문제를 일으킬 수 있습니다',
          '이미 존재하는 폴더명이면 에러가 납니다',
        ],
        alternatives: ['npx create-next-app@latest my-project (폴더 생성과 Next.js 설치를 한번에)'],
      },
      {
        id: 'git-init',
        command: 'git init',
        description: 'Git 저장소를 초기화합니다.',
        detailedDescription:
          'Git은 코드의 변경 이력을 추적하는 버전 관리 시스템입니다. git init을 실행하면 현재 폴더가 Git 저장소로 변환되어, 이후 모든 파일 변경사항을 추적할 수 있게 됩니다.',
        expectedOutput: 'Initialized empty Git repository in /path/to/my-project/.git/',
        tips: [
          '이 명령어는 프로젝트 루트 폴더에서 한 번만 실행하면 됩니다',
          '.git 숨김 폴더가 생성되면 성공입니다',
          'create-next-app을 사용하면 자동으로 git init이 실행됩니다',
        ],
        notes: [
          'Git이 설치되어 있어야 합니다 (git --version으로 확인)',
          '이미 Git 저장소인 폴더에서 실행하면 "Reinitialized" 메시지가 나옵니다',
        ],
        docsUrl: 'https://git-scm.com/docs/git-init',
        isRequired: true,
      },
      {
        id: 'create-next',
        command: 'npx create-next-app@latest . --typescript --tailwind --eslint --app',
        description: 'Next.js 프로젝트를 현재 폴더에 생성합니다.',
        detailedDescription:
          'create-next-app은 Next.js 공식 프로젝트 생성 도구입니다. TypeScript, Tailwind CSS, ESLint 등 현대적인 웹 개발에 필요한 모든 설정을 자동으로 해줍니다. 점(.)은 "현재 폴더"를 의미합니다.',
        example: 'npx create-next-app@latest my-blog --typescript --tailwind --eslint --app --src-dir',
        expectedOutput: `Creating a new Next.js app in /path/to/project.

Using npm.

Initializing project with template: app-tw

Installing dependencies:
- react
- react-dom
- next

...

Success! Created my-project at /path/to/project`,
        notes: [
          '--typescript: TypeScript 사용 (타입 안전성)',
          '--tailwind: Tailwind CSS 포함 (유틸리티 CSS)',
          '--eslint: ESLint 설정 포함 (코드 품질 검사)',
          '--app: App Router 사용 (Next.js 13+ 권장 방식)',
          '--src-dir: src 폴더 사용 (선택사항)',
          '--turbopack: Turbopack 번들러 사용 (더 빠른 개발 서버)',
        ],
        tips: [
          '빈 폴더에서 실행해야 합니다. 파일이 있으면 에러납니다',
          '인터넷 연결이 필요합니다 (패키지 다운로드)',
          '설치에 2-5분 정도 걸릴 수 있습니다',
          '프롬프트가 나오면 기본값(Enter)을 선택해도 됩니다',
        ],
        warning: '기존 파일이 있는 폴더에서 실행하면 덮어쓰기 경고가 나옵니다!',
        docsUrl: 'https://nextjs.org/docs/app/api-reference/cli/create-next-app',
        isRequired: true,
      },
      {
        id: 'install-state-deps',
        command: 'npm install zustand @tanstack/react-query',
        description: '상태 관리 라이브러리를 설치합니다.',
        detailedDescription:
          'Zustand는 간단하고 빠른 상태 관리 라이브러리입니다. React Query(TanStack Query)는 서버 데이터를 가져오고 캐싱하는 데 특화되어 있습니다. 둘을 함께 사용하면 클라이언트 상태와 서버 상태를 깔끔하게 분리할 수 있습니다.',
        expectedOutput: `added 15 packages, and audited 350 packages in 5s

found 0 vulnerabilities`,
        notes: [
          'zustand: 클라이언트 상태 관리 (로그인 상태, UI 상태 등)',
          '@tanstack/react-query: 서버 상태 관리 (API 데이터 캐싱)',
        ],
        tips: [
          'Redux보다 훨씬 간단하고 보일러플레이트가 적습니다',
          '작은 프로젝트라면 Zustand만으로 충분할 수 있습니다',
          'React Query는 API 호출이 많은 프로젝트에 필수입니다',
        ],
        docsUrl: 'https://zustand-demo.pmnd.rs/',
        isRequired: true,
      },
      {
        id: 'install-validation',
        command: 'npm install zod',
        description: '스키마 검증 라이브러리를 설치합니다.',
        detailedDescription:
          'Zod는 TypeScript 우선 스키마 검증 라이브러리입니다. 폼 입력값, API 응답 데이터 등을 검증할 때 사용합니다. TypeScript 타입을 자동으로 추론해주어 타입 안전성을 높여줍니다.',
        expectedOutput: 'added 1 package in 2s',
        example: `// Zod 사용 예시
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  age: z.number().min(0).max(150),
});

// 타입 자동 추론
type User = z.infer<typeof userSchema>;`,
        tips: [
          'react-hook-form과 함께 사용하면 폼 검증이 매우 편리합니다',
          'API 응답 검증에도 사용할 수 있습니다',
          'Yup보다 TypeScript 지원이 뛰어납니다',
        ],
        docsUrl: 'https://zod.dev/',
        isRequired: true,
      },
      {
        id: 'install-dev-deps',
        command: 'npm install -D prettier eslint-config-prettier',
        description: '코드 포맷팅 도구를 설치합니다.',
        detailedDescription:
          'Prettier는 코드를 자동으로 정리해주는 포맷터입니다. eslint-config-prettier는 ESLint와 Prettier가 충돌하지 않도록 해줍니다. -D는 개발 의존성으로 설치한다는 의미입니다.',
        expectedOutput: 'added 5 packages in 3s',
        notes: [
          '-D (--save-dev): 개발 환경에서만 필요한 패키지',
          'prettier: 코드 스타일 자동 정리',
          'eslint-config-prettier: ESLint-Prettier 충돌 방지',
        ],
        tips: [
          'VS Code에서 "Format on Save" 설정을 켜두면 저장할 때마다 자동 정리됩니다',
          '.prettierrc 파일로 포맷팅 규칙을 커스터마이즈할 수 있습니다',
          '팀 프로젝트에서는 반드시 Prettier를 사용하세요 (코드 스타일 통일)',
        ],
        docsUrl: 'https://prettier.io/docs/en/',
      },
      {
        id: 'create-prettierrc',
        command: 'echo \'{ "semi": true, "singleQuote": true, "tabWidth": 2 }\' > .prettierrc',
        description: 'Prettier 설정 파일을 생성합니다.',
        detailedDescription:
          '.prettierrc 파일은 Prettier의 동작을 설정합니다. 세미콜론 사용 여부, 따옴표 종류, 탭 너비 등을 지정할 수 있습니다.',
        example: `// .prettierrc 예시
{
  "semi": true,           // 세미콜론 사용
  "singleQuote": true,    // 작은따옴표 사용
  "tabWidth": 2,          // 탭 너비 2칸
  "trailingComma": "es5", // 후행 쉼표
  "printWidth": 100       // 한 줄 최대 길이
}`,
        tips: [
          '팀에서 합의된 규칙으로 설정하세요',
          'VS Code에서 Default Formatter를 Prettier로 설정하세요',
        ],
      },
      {
        id: 'first-commit',
        command: 'git add . && git commit -m "chore: 프로젝트 초기 설정"',
        description: '초기 설정을 Git에 커밋합니다.',
        detailedDescription:
          'git add .는 모든 변경사항을 스테이징(커밋 준비)하고, git commit은 스테이징된 변경사항을 저장소에 기록합니다. -m 뒤에는 커밋 메시지를 작성합니다.',
        expectedOutput: `[main (root-commit) abc1234] chore: 프로젝트 초기 설정
 25 files changed, 1500 insertions(+)
 create mode 100644 .eslintrc.json
 create mode 100644 .gitignore
 ...`,
        tips: [
          '커밋 메시지는 변경사항을 명확히 설명해야 합니다',
          'Conventional Commits 규칙: feat(기능), fix(버그), chore(설정) 등',
          '자주 커밋하세요! 작은 단위로 나누면 문제 추적이 쉽습니다',
        ],
        notes: [
          'git add .: 모든 파일 스테이징',
          'git add 파일명: 특정 파일만 스테이징',
          'git status: 현재 상태 확인',
        ],
      },
    ],
  },

  // ========================================
  // 2. DB 설계
  // ========================================
  {
    id: 'db-design',
    name: 'DB 설계',
    description: '데이터베이스 스키마를 설계하고 Prisma ORM을 설정합니다.',
    icon: 'Database',
    commands: [
      {
        id: 'install-prisma',
        command: 'npm install prisma @prisma/client',
        description: 'Prisma ORM을 설치합니다.',
        detailedDescription:
          'Prisma는 Node.js/TypeScript를 위한 차세대 ORM입니다. prisma는 CLI 도구이고, @prisma/client는 데이터베이스에 접근하는 클라이언트 라이브러리입니다.',
        expectedOutput: 'added 2 packages in 5s',
        notes: [
          'prisma: CLI 도구 (마이그레이션, 스키마 관리)',
          '@prisma/client: 타입 안전한 데이터베이스 클라이언트',
        ],
        tips: [
          'Prisma는 PostgreSQL, MySQL, SQLite, MongoDB 등을 지원합니다',
          '로컬 개발에는 SQLite를 추천합니다 (설치 없이 바로 사용)',
          '프로덕션에는 PostgreSQL이나 MySQL을 추천합니다',
        ],
        docsUrl: 'https://www.prisma.io/docs/getting-started',
        isRequired: true,
      },
      {
        id: 'prisma-init',
        command: 'npx prisma init --datasource-provider sqlite',
        description: 'Prisma 프로젝트를 SQLite로 초기화합니다.',
        detailedDescription:
          'prisma init은 Prisma 설정 파일들을 생성합니다. --datasource-provider로 데이터베이스 종류를 지정합니다. SQLite는 파일 기반 데이터베이스로, 별도 설치 없이 바로 사용할 수 있어 로컬 개발에 적합합니다.',
        example: `# PostgreSQL 사용 시
npx prisma init --datasource-provider postgresql

# MySQL 사용 시
npx prisma init --datasource-provider mysql`,
        expectedOutput: `✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

Next steps:
1. Set the DATABASE_URL in the .env file
2. Define your models in the prisma/schema.prisma file
3. Run prisma db push to create the database`,
        notes: [
          'prisma/schema.prisma: 데이터베이스 스키마 정의 파일',
          '.env: DATABASE_URL 환경변수가 추가됨',
          'SQLite: file:./dev.db (파일 기반, 설치 불필요)',
          'PostgreSQL: postgresql://user:password@localhost:5432/dbname',
        ],
        tips: [
          '처음 배우는 분은 SQLite로 시작하세요!',
          '.env 파일은 절대 Git에 커밋하지 마세요 (.gitignore에 추가됨)',
          'Vercel 배포 시에는 Neon, Supabase 등 클라우드 DB를 사용하세요',
        ],
        warning: '.env 파일에 실제 DB 비밀번호를 넣을 때는 절대 공개 저장소에 푸시하지 마세요!',
        docsUrl: 'https://www.prisma.io/docs/getting-started/setup-prisma',
        isRequired: true,
      },
      {
        id: 'edit-schema',
        command: 'code prisma/schema.prisma',
        description: 'VS Code에서 스키마 파일을 엽니다.',
        detailedDescription:
          'schema.prisma 파일에서 데이터베이스 모델(테이블)을 정의합니다. Prisma Schema Language를 사용하며, 직관적인 문법으로 테이블, 필드, 관계를 정의할 수 있습니다.',
        example: `// prisma/schema.prisma 예시
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
}`,
        tips: [
          'VS Code에 Prisma 확장 프로그램을 설치하면 자동완성이 됩니다',
          '@id: 기본 키 (Primary Key)',
          '@unique: 유니크 제약조건',
          '@default: 기본값 설정',
          '?: 선택적 필드 (null 허용)',
        ],
        docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-schema',
      },
      {
        id: 'prisma-db-push',
        command: 'npx prisma db push',
        description: '스키마 변경사항을 데이터베이스에 반영합니다.',
        detailedDescription:
          'db push는 schema.prisma의 변경사항을 데이터베이스에 직접 적용합니다. 마이그레이션 파일을 생성하지 않으므로 개발 초기 단계나 프로토타이핑에 적합합니다.',
        expectedOutput: `Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

🚀  Your database is now in sync with your Prisma schema.

✔ Generated Prisma Client in ./node_modules/@prisma/client`,
        tips: [
          '개발 초기에는 db push를 사용하세요 (빠르고 간편)',
          '스키마가 안정화되면 migrate dev로 전환하세요',
          '프로덕션에서는 절대 db push를 사용하지 마세요!',
        ],
        warning: 'db push는 데이터를 삭제할 수 있습니다! 개발 환경에서만 사용하세요.',
        docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push',
        isRequired: true,
      },
      {
        id: 'prisma-migrate',
        command: 'npx prisma migrate dev --name init',
        description: '마이그레이션을 생성하고 적용합니다.',
        detailedDescription:
          'migrate dev는 스키마 변경사항을 마이그레이션 파일로 기록하고 데이터베이스에 적용합니다. 변경 이력이 남아서 팀 작업이나 프로덕션 배포에 필수적입니다.',
        example: `# 이름을 지정하여 마이그레이션 생성
npx prisma migrate dev --name add_user_table
npx prisma migrate dev --name add_email_to_user`,
        expectedOutput: `Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

Applying migration \`20240101120000_init\`

The following migration(s) have been created and applied:

migrations/
  └─ 20240101120000_init/
    └─ migration.sql

✔ Generated Prisma Client in ./node_modules/@prisma/client`,
        notes: [
          '--name: 마이그레이션 이름 (변경 내용을 설명)',
          'migrations/ 폴더에 SQL 파일이 생성됨',
          '이 파일들은 Git에 커밋해야 합니다',
        ],
        tips: [
          '마이그레이션 이름은 변경 내용을 명확히 설명하세요',
          '예: add_user_table, add_email_field, create_posts',
          'prisma/migrations 폴더를 삭제하면 안 됩니다!',
        ],
        docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-migrate',
        isRequired: true,
      },
      {
        id: 'prisma-generate',
        command: 'npx prisma generate',
        description: 'Prisma Client를 생성합니다.',
        detailedDescription:
          'schema.prisma를 기반으로 타입 안전한 클라이언트 코드를 생성합니다. 스키마를 변경할 때마다 실행해야 합니다. migrate dev나 db push 시 자동으로 실행됩니다.',
        expectedOutput: `Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (5.x.x) to ./node_modules/@prisma/client in 150ms`,
        tips: [
          '스키마 변경 후 TypeScript 자동완성이 안 되면 이 명령어를 실행하세요',
          'VS Code에서 TypeScript 서버를 재시작해도 됩니다 (Cmd+Shift+P → Restart TS Server)',
        ],
        docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client',
        isRequired: true,
      },
      {
        id: 'prisma-studio',
        command: 'npx prisma studio',
        description: 'Prisma Studio를 실행합니다 (DB 관리 GUI).',
        detailedDescription:
          'Prisma Studio는 브라우저에서 데이터베이스를 직접 조회하고 편집할 수 있는 GUI 도구입니다. 데이터 확인, 추가, 수정, 삭제가 가능합니다.',
        expectedOutput: `Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Prisma Studio is up on http://localhost:5555`,
        tips: [
          'http://localhost:5555에서 GUI로 데이터를 관리할 수 있습니다',
          '개발 중 데이터 확인할 때 매우 유용합니다',
          'Ctrl+C로 종료합니다',
        ],
        docsUrl: 'https://www.prisma.io/docs/concepts/components/prisma-studio',
      },
      {
        id: 'create-prisma-client',
        command: 'mkdir -p src/lib && echo \'import { PrismaClient } from "@prisma/client";\n\nconst globalForPrisma = globalThis as unknown as { prisma: PrismaClient };\n\nexport const prisma = globalForPrisma.prisma || new PrismaClient();\n\nif (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;\' > src/lib/prisma.ts',
        description: 'Prisma 클라이언트 싱글톤을 생성합니다.',
        detailedDescription:
          'Next.js의 Hot Reload 때문에 Prisma Client가 여러 번 생성될 수 있습니다. 이를 방지하기 위해 전역 싱글톤 패턴을 사용합니다.',
        example: `// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;`,
        tips: [
          '이 파일을 만들지 않으면 개발 서버에서 DB 연결이 너무 많아질 수 있습니다',
          'API 라우트에서 import { prisma } from "@/lib/prisma"로 사용하세요',
        ],
        warning: '프로덕션에서는 연결 풀링(Connection Pooling)을 사용하세요!',
        isRequired: true,
      },
    ],
  },

  // ========================================
  // 3. API 개발
  // ========================================
  {
    id: 'api-development',
    name: 'API 개발',
    description: 'Next.js Route Handler를 사용하여 API 엔드포인트를 구현합니다.',
    icon: 'Server',
    commands: [
      {
        id: 'create-api-health',
        command: 'mkdir -p src/app/api/health && echo \'import { NextResponse } from "next/server";\n\nexport async function GET() {\n  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });\n}\' > src/app/api/health/route.ts',
        description: 'Health Check API를 생성합니다.',
        detailedDescription:
          'Health Check API는 서버가 정상 작동하는지 확인하는 엔드포인트입니다. 배포 환경에서 서버 상태를 모니터링하는 데 필수적입니다. Next.js 13+에서는 route.ts 파일로 API를 정의합니다.',
        example: `// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}`,
        expectedOutput: '(파일 생성됨)',
        tips: [
          'GET, POST, PUT, DELETE 등 HTTP 메서드를 함수로 export하면 됩니다',
          'Vercel 등 배포 서비스에서 Health Check URL로 사용할 수 있습니다',
          'NextResponse.json()으로 JSON 응답을 보냅니다',
        ],
        docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
        isRequired: true,
      },
      {
        id: 'create-api-users',
        command: 'mkdir -p src/app/api/users && touch src/app/api/users/route.ts',
        description: 'Users API 라우트 파일을 생성합니다.',
        detailedDescription:
          'RESTful API를 만들 때 리소스(users, posts 등)별로 폴더를 만들고 route.ts 파일을 생성합니다. 이 파일에서 CRUD 작업을 처리합니다.',
        example: `// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/users - 모든 사용자 조회
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// POST /api/users - 새 사용자 생성
export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
    },
  });
  return NextResponse.json(user, { status: 201 });
}`,
        tips: [
          '/api/users → route.ts에서 GET, POST 처리',
          '/api/users/[id] → 개별 사용자 조회/수정/삭제는 [id]/route.ts에서',
          'Prisma를 사용하면 타입 안전한 쿼리가 가능합니다',
        ],
        docsUrl: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
        isRequired: true,
      },
      {
        id: 'dev-server',
        command: 'npm run dev',
        description: '개발 서버를 시작합니다.',
        detailedDescription:
          'Next.js 개발 서버를 실행합니다. 코드 변경 시 자동으로 새로고침(Hot Reload)됩니다. 기본 포트는 3000이며, 이미 사용 중이면 3001, 3002 순으로 변경됩니다.',
        expectedOutput: `  ▲ Next.js 15.x.x (Turbopack)
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Starting...
 ✓ Ready in 2.5s`,
        tips: [
          'http://localhost:3000에서 앱을 확인할 수 있습니다',
          '코드를 수정하면 자동으로 반영됩니다',
          'Ctrl+C로 서버를 종료합니다',
          '터미널을 열어두고 다른 터미널에서 작업하세요',
        ],
        docsUrl: 'https://nextjs.org/docs/app/api-reference/cli/next#next-dev',
        isRequired: true,
      },
      {
        id: 'test-api-curl',
        command: 'curl http://localhost:3000/api/health',
        description: 'Health API를 테스트합니다.',
        detailedDescription:
          'curl은 명령줄에서 HTTP 요청을 보내는 도구입니다. API가 제대로 동작하는지 확인할 때 사용합니다.',
        expectedOutput: '{"status":"ok","timestamp":"2024-01-01T12:00:00.000Z"}',
        example: `# GET 요청
curl http://localhost:3000/api/users

# POST 요청 (JSON 데이터 포함)
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","name":"테스트"}'

# 응답 보기 좋게 포맷팅
curl http://localhost:3000/api/users | jq`,
        tips: [
          'Postman이나 Insomnia 같은 GUI 도구를 사용해도 됩니다',
          'VS Code의 Thunder Client 확장 프로그램도 추천합니다',
          '| jq를 붙이면 JSON이 보기 좋게 포맷팅됩니다 (jq 설치 필요)',
        ],
        alternatives: [
          'Postman (GUI 도구)',
          'Insomnia (GUI 도구)',
          'Thunder Client (VS Code 확장)',
          'httpie (curl 대안)',
        ],
      },
      {
        id: 'test-api-post',
        command: 'curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d \'{"email":"test@example.com","name":"테스트"}\'',
        description: 'POST 요청으로 데이터를 생성합니다.',
        detailedDescription:
          '-X POST는 POST 메서드를 사용한다는 의미입니다. -H는 헤더를 설정하고, -d는 요청 본문(body) 데이터입니다.',
        expectedOutput: '{"id":1,"email":"test@example.com","name":"테스트","createdAt":"2024-01-01T12:00:00.000Z"}',
        notes: [
          '-X POST: HTTP 메서드 지정',
          '-H "Content-Type: application/json": JSON 데이터임을 명시',
          '-d: 요청 본문 데이터',
        ],
        tips: [
          '작은따옴표 안에 JSON을 작성할 때 속성값에 큰따옴표를 사용하세요',
          'Windows에서는 큰따옴표와 이스케이프가 필요할 수 있습니다',
        ],
      },
    ],
  },

  // ========================================
  // 4. 프런트엔드 연결
  // ========================================
  {
    id: 'frontend-connect',
    name: '프런트엔드 연결',
    description: 'UI 컴포넌트와 폼 처리를 설정하고 API와 연결합니다.',
    icon: 'Layout',
    commands: [
      {
        id: 'install-form',
        command: 'npm install react-hook-form @hookform/resolvers',
        description: '폼 처리 라이브러리를 설치합니다.',
        detailedDescription:
          'react-hook-form은 성능이 뛰어난 폼 라이브러리입니다. @hookform/resolvers는 Zod, Yup 등의 검증 라이브러리와 연동할 때 사용합니다.',
        expectedOutput: 'added 3 packages in 2s',
        example: `// 폼 사용 예시
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(8, '8자 이상 입력하세요'),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">로그인</button>
    </form>
  );
}`,
        tips: [
          'Zod와 함께 사용하면 타입 안전한 폼 처리가 가능합니다',
          'register()로 입력 필드를 등록하고, handleSubmit()으로 제출을 처리합니다',
          'formState.errors에서 검증 오류를 확인할 수 있습니다',
        ],
        docsUrl: 'https://react-hook-form.com/',
        isRequired: true,
      },
      {
        id: 'install-icons',
        command: 'npm install lucide-react',
        description: '아이콘 라이브러리를 설치합니다.',
        detailedDescription:
          'Lucide는 Feather Icons의 포크로, 깔끔하고 일관된 디자인의 1000개 이상의 아이콘을 제공합니다. React 컴포넌트로 쉽게 사용할 수 있습니다.',
        expectedOutput: 'added 1 package in 1s',
        example: `import { Home, User, Settings, Search, Menu } from 'lucide-react';

export default function Nav() {
  return (
    <nav>
      <Home className="w-6 h-6" />
      <User className="w-6 h-6 text-blue-500" />
      <Settings className="w-6 h-6" strokeWidth={1.5} />
    </nav>
  );
}`,
        tips: [
          'className으로 크기와 색상을 조절할 수 있습니다',
          'strokeWidth로 선 두께를 조절할 수 있습니다',
          'https://lucide.dev/icons에서 아이콘을 검색할 수 있습니다',
        ],
        docsUrl: 'https://lucide.dev/guide/packages/lucide-react',
      },
      {
        id: 'install-shadcn',
        command: 'npx shadcn@latest init',
        description: 'ShadCN UI를 초기화합니다.',
        detailedDescription:
          'ShadCN UI는 복사해서 사용하는 재사용 가능한 컴포넌트 컬렉션입니다. 패키지를 설치하는 것이 아니라, 컴포넌트 코드가 프로젝트에 직접 추가됩니다.',
        expectedOutput: `✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS.
✔ Validating import alias.
✔ Which style would you like to use? › New York
✔ Which color would you like to use as the base color? › Zinc
✔ Would you like to use CSS variables for theming? … yes
✔ Writing components.json.
✔ Checking registry.
✔ Updating tailwind.config.ts
✔ Updating src/app/globals.css
✔ Installing dependencies.
✔ Created 1 file:
  - src/lib/utils.ts

Success! Project initialization completed.`,
        tips: [
          '스타일은 "New York"이 더 모던하고 깔끔합니다',
          '컬러는 취향껏 선택하세요 (나중에 변경 가능)',
          'CSS variables를 사용하면 다크모드 구현이 쉽습니다',
        ],
        docsUrl: 'https://ui.shadcn.com/docs/installation/next',
        isRequired: true,
      },
      {
        id: 'add-shadcn-button',
        command: 'npx shadcn@latest add button',
        description: 'Button 컴포넌트를 추가합니다.',
        detailedDescription:
          'ShadCN UI는 필요한 컴포넌트만 개별적으로 추가할 수 있습니다. 추가된 컴포넌트는 src/components/ui 폴더에 생성됩니다.',
        expectedOutput: `✔ Checking registry.
✔ Installing dependencies.
✔ Created 1 file:
  - src/components/ui/button.tsx`,
        example: `import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className="space-x-2">
      <Button>기본</Button>
      <Button variant="secondary">보조</Button>
      <Button variant="destructive">삭제</Button>
      <Button variant="outline">외곽선</Button>
      <Button variant="ghost">고스트</Button>
      <Button size="sm">작게</Button>
      <Button size="lg">크게</Button>
    </div>
  );
}`,
        tips: [
          '자주 쓰는 컴포넌트: button, card, input, form, dialog, toast',
          'npx shadcn@latest add [컴포넌트명]으로 추가합니다',
          '추가된 코드는 자유롭게 수정할 수 있습니다',
        ],
        docsUrl: 'https://ui.shadcn.com/docs/components/button',
      },
      {
        id: 'add-shadcn-form',
        command: 'npx shadcn@latest add form input label card',
        description: '폼 관련 컴포넌트들을 추가합니다.',
        detailedDescription:
          '여러 컴포넌트를 한 번에 추가할 수 있습니다. form 컴포넌트는 react-hook-form과 완벽하게 통합되어 있습니다.',
        expectedOutput: `✔ Checking registry.
✔ Installing dependencies.
✔ Created 4 files:
  - src/components/ui/form.tsx
  - src/components/ui/input.tsx
  - src/components/ui/label.tsx
  - src/components/ui/card.tsx`,
        tips: [
          'form 컴포넌트는 react-hook-form의 FormProvider를 래핑합니다',
          'FormField, FormItem, FormLabel, FormControl, FormMessage를 조합해서 사용합니다',
        ],
        docsUrl: 'https://ui.shadcn.com/docs/components/form',
      },
      {
        id: 'add-shadcn-toast',
        command: 'npx shadcn@latest add toast sonner',
        description: '토스트 알림 컴포넌트를 추가합니다.',
        detailedDescription:
          'Toast는 사용자에게 피드백을 주는 알림 컴포넌트입니다. Sonner는 더 간편한 토스트 라이브러리입니다.',
        example: `// Sonner 사용 예시 (더 간단함)
import { toast } from 'sonner';

export function SaveButton() {
  const handleSave = () => {
    toast.success('저장되었습니다!');
    // 또는
    toast.error('오류가 발생했습니다');
    toast.loading('저장 중...');
  };

  return <button onClick={handleSave}>저장</button>;
}

// layout.tsx에 Toaster 추가 필요
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}`,
        tips: [
          'Sonner가 더 간단하고 사용하기 쉽습니다',
          'layout.tsx에 <Toaster />를 추가해야 합니다',
          'toast.success(), toast.error(), toast.loading() 등을 사용합니다',
        ],
        docsUrl: 'https://sonner.emilkowal.ski/',
      },
    ],
  },

  // ========================================
  // 5. 테스트
  // ========================================
  {
    id: 'testing',
    name: '테스트',
    description: '테스트 환경을 설정하고 코드 품질을 검증합니다.',
    icon: 'TestTube2',
    commands: [
      {
        id: 'install-vitest',
        command: 'npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react',
        description: 'Vitest 테스트 환경을 설치합니다.',
        detailedDescription:
          'Vitest는 Vite 기반의 빠른 테스트 러너입니다. @testing-library/react는 React 컴포넌트 테스트를 위한 유틸리티를 제공합니다.',
        expectedOutput: 'added 50 packages in 10s',
        notes: [
          'vitest: Vite 기반 테스트 러너 (Jest보다 빠름)',
          '@testing-library/react: React 컴포넌트 테스트',
          '@testing-library/jest-dom: DOM 매처 확장',
          'jsdom: 브라우저 환경 시뮬레이션',
        ],
        tips: [
          'Vitest는 Jest와 거의 동일한 API를 사용합니다',
          'describe, it, expect 등 Jest 문법 그대로 사용 가능',
          'ES 모듈을 네이티브로 지원해서 더 빠릅니다',
        ],
        docsUrl: 'https://vitest.dev/',
        isRequired: true,
      },
      {
        id: 'create-vitest-config',
        command: 'echo \'import { defineConfig } from "vitest/config";\nimport react from "@vitejs/plugin-react";\nimport path from "path";\n\nexport default defineConfig({\n  plugins: [react()],\n  test: {\n    environment: "jsdom",\n    globals: true,\n    setupFiles: ["./vitest.setup.ts"],\n  },\n  resolve: {\n    alias: {\n      "@": path.resolve(__dirname, "./src"),\n    },\n  },\n});\' > vitest.config.ts',
        description: 'Vitest 설정 파일을 생성합니다.',
        detailedDescription:
          'vitest.config.ts는 테스트 환경을 설정합니다. jsdom 환경, 전역 설정, 경로 별칭 등을 정의합니다.',
        example: `// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});`,
        tips: [
          'globals: true로 설정하면 describe, it, expect를 import 없이 사용 가능',
          'setupFiles로 테스트 전에 실행할 설정 파일을 지정',
          '@/ 경로 별칭을 설정해야 테스트에서도 사용 가능',
        ],
        isRequired: true,
      },
      {
        id: 'create-vitest-setup',
        command: 'echo \'import "@testing-library/jest-dom";\' > vitest.setup.ts',
        description: 'Vitest 셋업 파일을 생성합니다.',
        detailedDescription:
          'vitest.setup.ts는 모든 테스트 파일 실행 전에 실행됩니다. jest-dom 매처를 추가하면 toBeInTheDocument() 같은 DOM 매처를 사용할 수 있습니다.',
        tips: [
          'jest-dom은 toBeInTheDocument, toHaveClass 등 유용한 매처를 제공합니다',
          '전역 모킹이 필요하면 이 파일에 추가하세요',
        ],
        isRequired: true,
      },
      {
        id: 'add-test-script',
        command: 'npm pkg set scripts.test="vitest" scripts.test:ui="vitest --ui" scripts.test:coverage="vitest --coverage"',
        description: 'package.json에 테스트 스크립트를 추가합니다.',
        detailedDescription:
          'npm pkg set 명령어로 package.json의 scripts를 수정합니다. test, test:ui, test:coverage 스크립트를 추가합니다.',
        expectedOutput: '(package.json 수정됨)',
        notes: [
          'npm run test: 테스트 실행 (watch 모드)',
          'npm run test:ui: 브라우저 UI로 테스트 확인',
          'npm run test:coverage: 커버리지 리포트 생성',
        ],
        tips: [
          'vitest는 기본적으로 watch 모드로 실행됩니다',
          'CI에서는 vitest run으로 한 번만 실행합니다',
          '--ui 옵션으로 브라우저에서 테스트 결과를 볼 수 있습니다',
        ],
        isRequired: true,
      },
      {
        id: 'create-example-test',
        command: 'mkdir -p src/__tests__ && echo \'import { describe, it, expect } from "vitest";\n\ndescribe("Example", () => {\n  it("should work", () => {\n    expect(1 + 1).toBe(2);\n  });\n});\' > src/__tests__/example.test.ts',
        description: '예제 테스트 파일을 생성합니다.',
        detailedDescription:
          '간단한 테스트 파일을 생성하여 테스트 환경이 제대로 설정되었는지 확인합니다.',
        example: `// src/__tests__/example.test.ts
import { describe, it, expect } from 'vitest';

describe('Example', () => {
  it('should work', () => {
    expect(1 + 1).toBe(2);
  });
});

// React 컴포넌트 테스트 예시
// src/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('클릭');
  });

  it('handles click', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>클릭</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});`,
        tips: [
          '테스트 파일은 .test.ts 또는 .spec.ts 확장자를 사용합니다',
          '__tests__ 폴더에 모아두거나, 컴포넌트 옆에 두어도 됩니다',
          'describe로 테스트를 그룹화하고, it으로 개별 테스트를 작성합니다',
        ],
      },
      {
        id: 'run-test',
        command: 'npm run test',
        description: '테스트를 실행합니다.',
        detailedDescription:
          'Vitest를 watch 모드로 실행합니다. 파일이 변경되면 관련 테스트가 자동으로 다시 실행됩니다.',
        expectedOutput: `✓ src/__tests__/example.test.ts (1)
   ✓ Example (1)
     ✓ should work

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  12:00:00
   Duration  500ms

 PASS  Waiting for file changes...
       press h to show help, press q to quit`,
        tips: [
          'h를 누르면 도움말을 볼 수 있습니다',
          'q를 누르면 종료됩니다',
          'a를 누르면 모든 테스트를 다시 실행합니다',
          'f를 누르면 실패한 테스트만 다시 실행합니다',
        ],
        isRequired: true,
      },
      {
        id: 'run-lint',
        command: 'npm run lint',
        description: 'ESLint로 코드를 검사합니다.',
        detailedDescription:
          'ESLint는 코드의 문법 오류, 스타일 문제, 잠재적 버그를 찾아줍니다. Next.js는 기본적으로 ESLint가 설정되어 있습니다.',
        expectedOutput: `✔ No ESLint warnings or errors`,
        tips: [
          '에러가 있으면 빌드가 실패할 수 있습니다',
          '--fix 옵션으로 자동 수정 가능한 문제를 고칠 수 있습니다',
          'VS Code ESLint 확장 프로그램을 설치하면 실시간으로 오류를 볼 수 있습니다',
        ],
        isRequired: true,
      },
      {
        id: 'lint-fix',
        command: 'npm run lint -- --fix',
        description: 'ESLint로 자동 수정합니다.',
        detailedDescription:
          '--fix 옵션을 사용하면 자동으로 수정 가능한 문제들을 고쳐줍니다. 따옴표 스타일, 세미콜론, 들여쓰기 등이 자동 수정됩니다.',
        tips: [
          '모든 문제가 자동 수정되는 것은 아닙니다',
          '수정된 파일은 꼭 확인하세요',
          'Prettier와 함께 사용하면 더 좋습니다',
        ],
      },
      {
        id: 'type-check',
        command: 'npx tsc --noEmit',
        description: 'TypeScript 타입 검사를 실행합니다.',
        detailedDescription:
          'TypeScript 컴파일러를 실행하여 타입 오류를 검사합니다. --noEmit은 실제 파일을 생성하지 않고 검사만 수행합니다.',
        expectedOutput: '(출력 없음 - 오류가 없으면 성공)',
        tips: [
          'Next.js 빌드 시에도 타입 검사가 실행됩니다',
          'CI에서 npm run build 전에 실행하면 좋습니다',
          '오류가 있으면 상세한 오류 메시지가 출력됩니다',
        ],
      },
    ],
  },

  // ========================================
  // 6. 배포
  // ========================================
  {
    id: 'deployment',
    name: '배포',
    description: '프로덕션 환경에 배포합니다.',
    icon: 'Rocket',
    commands: [
      {
        id: 'build',
        command: 'npm run build',
        description: '프로덕션 빌드를 생성합니다.',
        detailedDescription:
          'Next.js 앱을 프로덕션용으로 최적화하여 빌드합니다. 코드 분할, 압축, 최적화가 적용됩니다. 빌드 실패 시 에러를 확인하고 수정해야 합니다.',
        expectedOutput: `   ▲ Next.js 15.x.x

   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types
 ✓ Collecting page data
 ✓ Generating static pages (5/5)
 ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         90 kB
├ ○ /_not-found                          900 B          85 kB
├ ƒ /api/health                          0 B            0 B
└ ○ /about                               1.5 kB         86 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand`,
        tips: [
          '빌드 전에 npm run lint와 npm run test를 실행하세요',
          '빌드 실패 시 에러 메시지를 잘 읽어보세요',
          'First Load JS가 너무 크면 최적화가 필요합니다 (목표: 100kB 이하)',
        ],
        warning: '빌드 실패 시 배포할 수 없습니다. 모든 에러를 수정하세요!',
        docsUrl: 'https://nextjs.org/docs/app/building-your-application/deploying',
        isRequired: true,
      },
      {
        id: 'start-prod',
        command: 'npm run start',
        description: '프로덕션 서버를 로컬에서 실행합니다.',
        detailedDescription:
          '빌드된 앱을 프로덕션 모드로 실행합니다. 실제 배포 환경과 동일하게 테스트할 수 있습니다.',
        expectedOutput: `  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 500ms`,
        tips: [
          '빌드 후에만 실행 가능합니다 (npm run build 필요)',
          '개발 모드와 달리 Hot Reload가 없습니다',
          '배포 전 최종 테스트용으로 사용하세요',
        ],
      },
      {
        id: 'vercel-login',
        command: 'npx vercel login',
        description: 'Vercel에 로그인합니다.',
        detailedDescription:
          'Vercel CLI를 사용하기 전에 먼저 로그인해야 합니다. 브라우저가 열리고 GitHub 또는 이메일로 인증합니다.',
        expectedOutput: `Vercel CLI 32.x.x
> Log in to Vercel

? Log in to Vercel
● Continue with GitHub
○ Continue with GitLab
○ Continue with Bitbucket
○ Continue with Email
○ Continue with SAML Single Sign-On

(브라우저가 열리고 인증 진행)

✔ Success! GitHub authentication complete`,
        tips: [
          'GitHub 계정이 있으면 GitHub로 로그인하세요 (가장 간편)',
          'Vercel 무료 플랜으로 시작할 수 있습니다',
          '한 번 로그인하면 계속 유지됩니다',
        ],
        docsUrl: 'https://vercel.com/docs/cli#commands/login',
        isRequired: true,
      },
      {
        id: 'vercel-deploy',
        command: 'npx vercel',
        description: 'Vercel에 배포합니다 (미리보기).',
        detailedDescription:
          '프로젝트를 Vercel에 배포합니다. 처음 실행 시 프로젝트 설정을 묻습니다. 기본값으로 진행해도 됩니다.',
        expectedOutput: `Vercel CLI 32.x.x
? Set up and deploy "~/my-project"? [Y/n] y
? Which scope do you want to deploy to? My Account
? Link to existing project? [y/N] n
? What's your project's name? my-project
? In which directory is your code located? ./
Local settings detected in vercel.json:
Auto-detected Project Settings (Next.js):
- Build Command: next build
- Development Command: next dev --port $PORT
- Install Command: \`npm install\`
- Output Directory: Next.js default
? Want to override the settings? [y/N] n
🔗  Linked to my-account/my-project
🔍  Inspect: https://vercel.com/my-account/my-project/xxxxx
✅  Preview: https://my-project-xxxxx.vercel.app`,
        notes: [
          '미리보기 URL이 생성됩니다 (프로덕션 URL과 다름)',
          '프로젝트가 Vercel 대시보드에 추가됩니다',
          '이후에는 git push만으로 자동 배포됩니다',
        ],
        tips: [
          '처음에는 모든 질문에 Enter(기본값)를 누르면 됩니다',
          '미리보기 URL로 배포가 제대로 되었는지 확인하세요',
          '환경변수는 Vercel 대시보드에서 설정해야 합니다',
        ],
        docsUrl: 'https://vercel.com/docs/cli#commands/deploy',
        isRequired: true,
      },
      {
        id: 'vercel-prod',
        command: 'npx vercel --prod',
        description: 'Vercel 프로덕션에 배포합니다.',
        detailedDescription:
          '--prod 플래그를 붙이면 프로덕션 환경에 배포됩니다. 실제 사용자에게 제공되는 URL입니다.',
        expectedOutput: `Vercel CLI 32.x.x
🔍  Inspect: https://vercel.com/my-account/my-project/xxxxx
✅  Production: https://my-project.vercel.app`,
        notes: [
          '프로덕션 URL은 프로젝트명.vercel.app 형식',
          '커스텀 도메인을 연결할 수 있습니다',
          'main 브랜치에 push하면 자동으로 프로덕션 배포됩니다',
        ],
        tips: [
          '미리보기에서 충분히 테스트한 후 프로덕션에 배포하세요',
          'Vercel 대시보드에서 커스텀 도메인을 설정할 수 있습니다',
          '롤백이 필요하면 대시보드에서 이전 배포로 되돌릴 수 있습니다',
        ],
        docsUrl: 'https://vercel.com/docs/cli#commands/deploy',
        isRequired: true,
      },
      {
        id: 'vercel-env',
        command: 'npx vercel env pull .env.local',
        description: 'Vercel 환경변수를 로컬로 가져옵니다.',
        detailedDescription:
          'Vercel 대시보드에서 설정한 환경변수를 로컬 .env.local 파일로 가져옵니다. 프로덕션과 동일한 환경에서 개발할 때 유용합니다.',
        expectedOutput: `Vercel CLI 32.x.x
Downloading Development Environment Variables for my-project
✅  Created .env.local file`,
        tips: [
          '먼저 Vercel 대시보드에서 환경변수를 설정해야 합니다',
          '.env.local은 .gitignore에 포함되어 있습니다',
          'DATABASE_URL, API_KEY 등 민감한 정보를 관리할 때 사용하세요',
        ],
        docsUrl: 'https://vercel.com/docs/cli#commands/env',
      },
      {
        id: 'git-remote',
        command: 'git remote add origin https://github.com/username/repo.git',
        description: 'GitHub 원격 저장소를 연결합니다.',
        detailedDescription:
          'GitHub에 생성한 저장소를 로컬 Git과 연결합니다. 이후 git push로 코드를 GitHub에 업로드할 수 있습니다.',
        example: 'git remote add origin https://github.com/johndoe/my-project.git',
        tips: [
          '먼저 GitHub에서 새 저장소를 만들어야 합니다',
          'username과 repo를 실제 값으로 변경하세요',
          'SSH를 사용하려면 git@github.com:username/repo.git 형식을 사용하세요',
        ],
      },
      {
        id: 'git-push',
        command: 'git push -u origin main',
        description: 'GitHub에 코드를 푸시합니다.',
        detailedDescription:
          '로컬의 코드를 GitHub에 업로드합니다. -u 옵션은 이후 git push만으로 같은 브랜치에 푸시할 수 있게 해줍니다.',
        expectedOutput: `Enumerating objects: 50, done.
Counting objects: 100% (50/50), done.
Delta compression using up to 8 threads
Compressing objects: 100% (40/40), done.
Writing objects: 100% (50/50), 100.00 KiB | 10.00 MiB/s, done.
Total 50 (delta 5), reused 0 (delta 0)
To https://github.com/username/repo.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.`,
        tips: [
          'Vercel과 GitHub을 연결하면 push할 때마다 자동 배포됩니다',
          '처음에는 -u 옵션을 붙이고, 이후에는 git push만 사용',
          '푸시 전에 git status로 상태를 확인하세요',
        ],
      },
      {
        id: 'docker-build',
        command: 'docker build -t my-app .',
        description: 'Docker 이미지를 빌드합니다.',
        detailedDescription:
          'Dockerfile을 기반으로 Docker 이미지를 생성합니다. -t 옵션으로 이미지에 태그(이름)를 지정합니다.',
        expectedOutput: `[+] Building 60.0s (15/15) FINISHED
 => [internal] load build definition from Dockerfile
 => [internal] load .dockerignore
 => [1/10] FROM node:20-alpine
 ...
 => exporting to image
 => => naming to docker.io/library/my-app`,
        notes: [
          'Dockerfile이 프로젝트 루트에 있어야 합니다',
          '빌드에 시간이 걸릴 수 있습니다 (첫 빌드 시 더 오래 걸림)',
          '-t my-app: 이미지 이름 지정',
        ],
        tips: [
          'Next.js 공식 Docker 예제를 참고하세요',
          '.dockerignore 파일로 불필요한 파일을 제외하세요',
          'multi-stage build로 이미지 크기를 줄일 수 있습니다',
        ],
        docsUrl: 'https://nextjs.org/docs/app/building-your-application/deploying#docker-image',
      },
      {
        id: 'docker-run',
        command: 'docker run -p 3000:3000 my-app',
        description: 'Docker 컨테이너를 실행합니다.',
        detailedDescription:
          '빌드한 이미지를 컨테이너로 실행합니다. -p 옵션으로 포트를 매핑합니다 (호스트:컨테이너).',
        expectedOutput: `  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000

 ✓ Ready in 500ms`,
        tips: [
          '-p 3000:3000: 로컬 3000 포트를 컨테이너 3000 포트에 연결',
          '-d 옵션으로 백그라운드 실행 가능',
          'docker ps로 실행 중인 컨테이너 확인',
          'docker stop <container-id>로 중지',
        ],
      },
    ],
  },
];

// 전체 명령어 수 계산
export const getTotalCommands = (): number => {
  return PHASES.reduce((total, phase) => total + phase.commands.length, 0);
};

// 필수 명령어 수 계산
export const getRequiredCommands = (): number => {
  return PHASES.reduce(
    (total, phase) => total + phase.commands.filter((cmd) => cmd.isRequired).length,
    0
  );
};
