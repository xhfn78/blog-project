# 🚀 5분만에 새 도구 추가하기

이 가이드를 따라 5분 안에 새로운 도구를 플랫폼에 추가할 수 있습니다.

## 방법 1: 자동화 스크립트 사용 (권장)

가장 쉬운 방법은 `create-tool` 스크립트를 사용하는 것입니다.

1.  **프로젝트 루트**에서 다음 명령어를 실행하세요. `your-tool-slug` 부분을 원하는 도구의 slug로 변경하세요 (예: `json-formatter`).

    ```bash
    npm run create-tool your-tool-slug
    ```

2.  스크립트가 자동으로 다음 작업을 수행합니다:
    *   `src/features/tools/tools/your-tool-slug` 디렉터리 생성
    *   템플릿 파일들 복사
    *   `tool.config.ts` 파일의 `slug` 자동 업데이트
    *   `src/shared/config/tools-registry.ts`에 새 도구 등록

3.  `src/features/tools/tools/your-tool-slug/tool.config.ts` 파일을 열어 `name`, `description` 등 나머지 정보를 수정합니다.

4.  `src/features/tools/tools/your-tool-slug/index.tsx` 파일을 열어 도구의 UI와 로직을 구현합니다.

5.  브라우저에서 `http://localhost:3000/tools/your-tool-slug` 로 접속하여 도구를 확인합니다.

## 방법 2: 수동으로 추가하기

스크립트가 작동하지 않거나 수동으로 하고 싶을 경우 다음 단계를 따르세요.

1.  **디렉터리 복사**:
    `src/features/tools/tools/_template` 디렉터리를 복사하여 같은 위치에 새 이름으로 붙여넣습니다. (예: `json-formatter`)

2.  **`tool.config.ts` 수정**:
    새로 생성한 디렉터리의 `tool.config.ts` 파일을 열어 모든 필드를 수정합니다. **`slug`는 반드시 유니크해야 합니다.**

    ```typescript
    export const config = {
      slug: 'json-formatter',
      name: 'JSON Formatter',
      description: 'JSON을 예쁘게 포맷팅합니다.',
      category: 'formatter',
      tags: ['json', 'format'],
      author: 'Your Name',
    };
    ```

3.  **도구 등록**:
    `src/shared/config/tools-registry.ts` 파일을 열고, 새 도구를 레지스트리에 추가합니다.

    ```typescript
    import { config as jsonFormatterConfig } from '@/features/tools/tools/json-formatter/tool.config';

    export const TOOLS_REGISTRY: ToolRegistration[] = [
      // ... 다른 도구들
      {
        ...jsonFormatterConfig,
        component: lazy(() => import('@/features/tools/tools/json-formatter')),
      },
    ];
    ```

4.  **UI 구현**:
    `index.tsx` 파일을 열어 실제 도구의 UI와 로직을 구현합니다.

---

🎉 이제 당신의 도구가 플랫폼에 추가되었습니다!