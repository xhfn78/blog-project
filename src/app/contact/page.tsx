import { Metadata } from "next";
import { Mail, MessageSquare, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "문의하기",
  description: "바이브코딩 도구 모음에 문의사항이 있으신가요? 언제든지 연락 주세요.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">문의하기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12">
        Dev Toolbox에 대한 문의사항, 제안사항, 버그 리포트 등 무엇이든 환영합니다.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-6 border rounded-lg bg-white dark:bg-zinc-900">
            <Mail className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">이메일</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                가장 빠르고 확실한 연락 방법입니다.
              </p>
              <a
                href="mailto:kyjneo@gmail.com"
                className="text-blue-600 hover:underline font-medium"
              >
                kyjneo@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 border rounded-lg bg-white dark:bg-zinc-900">
            <Clock className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">응답 시간</h3>
              <p className="text-gray-600 dark:text-gray-400">
                평일 기준 1-2 영업일 내에 답변 드리겠습니다.
                주말 및 공휴일에는 응답이 지연될 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 border rounded-lg bg-white dark:bg-zinc-900">
            <MessageSquare className="w-6 h-6 text-purple-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">문의 유형</h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 도구 사용법 및 기술 지원</li>
                <li>• 새로운 도구 제안</li>
                <li>• 버그 리포트</li>
                <li>• 제휴 및 협업 문의</li>
                <li>• 기타 문의사항</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <h3 className="text-lg font-semibold mb-4">자주 묻는 질문</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-1">Q. 도구 사용은 무료인가요?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A. 네, 모든 도구는 완전 무료로 제공됩니다.
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">Q. 입력한 데이터는 안전한가요?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A. 모든 도구는 브라우저에서 실행되며, 데이터는 서버로 전송되지 않습니다.
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">Q. 새로운 도구를 제안할 수 있나요?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A. 물론입니다! 이메일로 제안해주시면 검토 후 개발하겠습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-white dark:bg-zinc-900">
            <h3 className="text-lg font-semibold mb-4">운영 정보</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dev Toolbox는 개발자들의 생산성 향상을 위해 만들어진
              오픈 웹 도구 플랫폼입니다.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              지속적으로 새로운 도구를 추가하고 있으며,
              사용자 여러분의 피드백을 소중히 생각합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
