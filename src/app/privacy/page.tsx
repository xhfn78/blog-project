import { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "Dev Toolbox의 개인정보 처리 방침 및 쿠키 사용 정책",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">개인정보처리방침</h1>

      <div className="prose dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. 수집하는 정보</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Dev Toolbox는 기본적으로 사용자의 개인정보를 수집하지 않습니다.
            본 사이트의 모든 도구는 브라우저 내에서 실행되며, 입력하신 데이터는 서버로 전송되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. 쿠키 및 추적 기술</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            본 사이트는 다음과 같은 서비스를 통해 쿠키를 사용할 수 있습니다:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Google Analytics:</strong> 웹사이트 방문 통계 분석을 위해 사용됩니다.
              익명화된 데이터만 수집되며, IP 주소는 부분적으로 마스킹됩니다.
            </li>
            <li>
              <strong>Google AdSense:</strong> 맞춤형 광고를 제공하기 위해 쿠키를 사용합니다.
              사용자는 Google 광고 설정에서 개인 맞춤 광고를 비활성화할 수 있습니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. 정보의 사용 목적</h2>
          <p className="text-gray-700 dark:text-gray-300">
            수집된 익명 통계 정보는 다음 목적으로만 사용됩니다:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>웹사이트 트래픽 분석 및 사용자 경험 개선</li>
            <li>콘텐츠 및 도구의 인기도 측정</li>
            <li>기술적 문제 해결 및 성능 최적화</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. 제3자 서비스</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            본 사이트는 다음 제3자 서비스를 사용합니다:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Google AdSense:</strong> 광고 제공 서비스입니다.
              Google의 개인정보 보호정책은
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                여기
              </a>
              에서 확인할 수 있습니다.
            </li>
            <li>
              <strong>Google Analytics:</strong> 웹 분석 서비스입니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. 사용자 권리</h2>
          <p className="text-gray-700 dark:text-gray-300">
            사용자는 다음과 같은 권리를 가집니다:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>브라우저 설정을 통해 쿠키를 거부하거나 삭제할 권리</li>
            <li>Google 광고 설정에서 맞춤형 광고를 비활성화할 권리</li>
            <li>언제든지 본 사이트의 사용을 중단할 권리</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. 아동의 개인정보 보호</h2>
          <p className="text-gray-700 dark:text-gray-300">
            본 사이트는 만 14세 미만의 아동으로부터 의도적으로 개인정보를 수집하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. 정책 변경</h2>
          <p className="text-gray-700 dark:text-gray-300">
            본 개인정보처리방침은 관련 법령 또는 서비스 정책 변경에 따라 수정될 수 있습니다.
            중요한 변경 사항이 있을 경우 웹사이트를 통해 공지하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. 문의</h2>
          <p className="text-gray-700 dark:text-gray-300">
            개인정보 처리와 관련한 문의사항이 있으시면
            <a href="/contact" className="text-blue-600 hover:underline"> 문의 페이지</a>
            를 통해 연락 주시기 바랍니다.
          </p>
        </section>

        <div className="mt-12 pt-6 border-t text-sm text-gray-500">
          <p>최종 업데이트: 2025년 12월 17일</p>
        </div>
      </div>
    </div>
  );
}
