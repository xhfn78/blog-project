'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";

export function SeoGuide() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <Typography variant="p">
        이 가이드는 Tailwind CSS 초보자들이 AI와 함께 효율적으로 코드를 작성하고 검증하는 데 필요한 모든 것을 담고 있습니다. '테일윈드 클래스 시각화기'는 여러분의 학습 과정을 가속화하고, 실제 프로젝트에서 발생할 수 있는 오류를 미리 방지하는 데 도움을 줄 것입니다.
      </Typography>

      <Typography variant="h2">Tailwind CSS를 AI와 함께 사용할 때 주의점</Typography>
      <Typography variant="p">
        AI는 놀라운 속도로 코드를 생성하지만, 때로는 프로젝트의 특정 설정이나 최신 Tailwind 버전에 맞지 않는 클래스를 제안할 수 있습니다. 예를 들어, 존재하지 않는 색상 스케일(예: `text-blue-9000`)이나 더 이상 사용되지 않는 유틸리티 클래스(예: v1의 `space-x`)를 사용할 수 있습니다. 이 시각화기를 통해 AI가 생성한 클래스들이 실제 Tailwind 유틸리티인지, 그리고 어떤 의미를 가지는지 즉시 확인할 수 있습니다. 항상 AI의 결과물을 맹신하기보다는 도구를 활용하여 검증하는 습관을 들이는 것이 중요합니다. 특히, 커스텀 Tailwind 설정을 사용하는 경우 AI가 이를 반영하기 어렵기 때문에 더욱 세심한 검토가 필요합니다.
      </Typography>
      <Typography variant="p">
        AI는 종종 가장 일반적인 사용 사례에 초점을 맞추므로, 복잡한 레이아웃이나 미묘한 디자인 요구사항에는 수동 조정이 필요할 수 있습니다. AI가 제공하는 코드를 시작점으로 삼고, 이 시각화기를 이용해 각 클래스의 의미를 파악하며 필요한 부분을 수정해 나가는 것이 현명한 접근법입니다.
      </Typography>

      <Typography variant="h3">반응형 접두사(sm, md, lg)의 의미와 활용법</Typography>
      <Typography variant="p">
        Tailwind CSS는 모바일 우선(Mobile-First) 접근 방식을 따르며, `sm:`, `md:`, `lg:`와 같은 반응형 접두사를 사용하여 다양한 화면 크기에 맞는 스타일을 쉽게 적용할 수 있습니다.
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-2 border">접두사</th>
              <th className="p-2 border">의미</th>
              <th className="p-2 border">적용되는 화면 크기</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">`sm:`</td>
              <td className="p-2 border">Small 이상</td>
              <td className="p-2 border">640px 이상 (기본)</td>
            </tr>
            <tr>
              <td className="p-2 border">`md:`</td>
              <td className="p-2 border">Medium 이상</td>
              <td className="p-2 border">768px 이상 (기본)</td>
            </tr>
            <tr>
              <td className="p-2 border">`lg:`</td>
              <td className="p-2 border">Large 이상</td>
              <td className="p-2 border">1024px 이상 (기본)</td>
            </tr>
            <tr>
              <td className="p-2 border">`xl:`</td>
              <td className="p-2 border">Extra Large 이상</td>
              <td className="p-2 border">1280px 이상 (기본)</td>
            </tr>
            <tr>
              <td className="p-2 border">`2xl:`</td>
              <td className="p-2 border">2 Extra Large 이상</td>
              <td className="p-2 border">1536px 이상 (기본)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Typography variant="p" className="mt-2">
        예를 들어, `md:flex md:justify-center`는 화면 너비가 medium(768px) 이상일 때 해당 요소가 flex 컨테이너가 되고 내용이 중앙 정렬됨을 의미합니다. 모바일에서는 기본 스타일이 적용됩니다. 이 시각화기는 반응형 접두사가 붙은 클래스도 정확하게 해석하여 보여줍니다.
      </Typography>

      <Typography variant="h3">왜 인라인 CSS보다 테일윈드가 유리한가?</Typography>
      <Typography variant="p">
        인라인 CSS는 HTML 요소 내에 직접 스타일을 선언하는 방식입니다. 간단한 스타일에는 편리하지만, 재사용성이 낮고 유지보수가 어렵다는 단점이 있습니다. 모든 요소에 스타일을 개별적으로 적용해야 하므로 코드의 가독성이 떨어지고, 스타일 변경 시 여러 곳을 수정해야 하는 번거로움이 있습니다.
      </Typography>
      <Typography variant="p">
        반면 Tailwind CSS는 유틸리티 클래스를 사용하여 스타일을 적용합니다. 미리 정의된 클래스들을 조합하여 원하는 디자인을 빠르게 구현할 수 있으며, 디자인 시스템을 일관성 있게 유지할 수 있습니다. 또한, 한 번 정의된 클래스는 여러 곳에서 재사용할 수 있어 코드의 중복을 줄이고 생산성을 높입니다. 인라인 CSS와 비교했을 때, Tailwind는 클래스 이름만 보고도 어떤 스타일이 적용되었는지 직관적으로 파악하기 쉽고, 빌드 시 사용되지 않는 CSS를 제거하여 최종 번들 크기를 최적화하는 장점도 있습니다.
      </Typography>
      <Typography variant="p">
        이러한 장점들 때문에 많은 프론트엔드 개발자들이 Tailwind CSS를 선택하고 있으며, '테일윈드 클래스 시각화기'는 이러한 유틸리티 클래스들의 의미를 명확히 이해하고 효과적으로 활용하는 데 큰 도움을 줄 것입니다.
      </Typography>

      <Typography variant="h3">자주 묻는 질문 (FAQ)</Typography>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Typography variant="h4" className="inline font-semibold">Q: 클래스가 너무 길어지면 어떻게 하나요?</Typography>
          <Typography variant="p" className="mt-1">
            A: Tailwind CSS의 유틸리티 클래스는 의도적으로 길어질 수 있습니다. 이는 CSS 파일을 작게 유지하고, HTML에서 직접 스타일을 관리할 수 있게 하기 위함입니다. 만약 너무 길어져 가독성이 떨어진다고 생각되면, `@apply` 디렉티브를 사용하여 재사용 가능한 커스텀 CSS 클래스로 묶거나, 컴포넌트 기반 접근 방식을 사용하여 복잡한 UI를 작은 단위로 분리하는 것을 고려해볼 수 있습니다.
          </Typography>
        </li>
        <li>
          <Typography variant="h4" className="inline font-semibold">Q: 이 도구는 모든 Tailwind 클래스를 지원하나요?</Typography>
          <Typography variant="p" className="mt-1">
            A: 현재 이 시각화기는 가장 많이 사용되는 150개 이상의 Tailwind 유틸리티 클래스를 포함하고 있습니다. 계속해서 업데이트될 예정이며, 목록에 없는 클래스는 '커스텀 또는 기타 설정'으로 분류됩니다. 커뮤니티 기여를 통해 사전의 범위를 넓힐 계획입니다.
          </Typography>
        </li>
        <li>
          <Typography variant="h4" className="inline font-semibold">Q: 반응형 디자인을 어떻게 테스트하나요?</Typography>
          <Typography variant="p" className="mt-1">
            A: 브라우저의 개발자 도구(F12)를 사용하여 '반응형 디자인 모드'를 활성화하고, 다양한 화면 크기로 조절하면서 실시간 프리뷰를 확인하세요. 이 시각화기는 반응형 접두사가 적용된 클래스의 의미를 명확히 보여주어, 각 브레이크포인트에서 어떤 스타일이 적용될지 이해하는 데 도움을 줍니다.
          </Typography>
        </li>
      </ul>
    </div>
  );
}