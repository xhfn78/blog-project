'use client';

import { Typography } from "@/shared/ui/typography";
import { Card } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Share2, 
  Rocket, 
  Search, 
  MousePointer2,
  Code2,
  Zap,
  Sparkles
} from "lucide-react";

export function SeoContent() {
  return (
    <div className="mt-20 space-y-24 pb-20 border-t pt-20">
      {/* 1. 도입부 */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 font-bold uppercase tracking-widest text-[10px]">Technical Deep-Dive</Badge>
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            클릭을 부르는 첫인상, <br />
            <span className="text-primary">오픈 그래프(Open Graph)</span> 마스터하기
          </Typography>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 leading-relaxed">
          <p>
            우리가 웹사이트 링크를 카카오톡이나 슬랙에 공유할 때 나타나는 풍부한 미리보기 카드, 그것이 바로 오픈 그래프(Open Graph) 프로토콜의 힘입니다. 단순히 URL만 보낼 때와 비교하여, 매력적인 제목과 이미지가 포함된 미리보기 카드는 사용자 클릭률(CTR)을 적게는 2배에서 많게는 5배 이상 증가시킵니다. 하지만 많은 개발자와 마케터들이 올바른 메타 태그를 구성하는 데 어려움을 겪거나, 각 플랫폼별로 다르게 표시되는 이미지를 확인하지 못해 배포 후 곤란을 겪곤 합니다.
          </p>
          <p>
            V-Log의 OG 메타 태그 생성기는 이러한 고충을 해결하기 위해 설계되었습니다. 단순한 텍스트 변환기를 넘어, 실시간 렌더링 엔진을 통해 실제 SNS 환경에서의 노출을 시각적으로 검증할 수 있게 돕습니다. Next.js 15의 App Router 메타데이터 객체까지 완벽하게 지원하여, 현대적인 프론트엔드 개발 환경에서 SEO 최적화 속도를 비약적으로 단축시킵니다.
          </p>
        </div>
      </section>

      {/* 2. 작동 메커니즘 시각화 */}
      <section className="bg-slate-900 rounded-[40px] p-8 md:p-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
        <div className="max-w-4xl mx-auto space-y-12 relative">
          <div className="text-center space-y-4">
            <Typography variant="h3" className="text-2xl md:text-3xl font-bold text-white">SNS 공유의 보이지 않는 엔진</Typography>
            <Typography variant="p" className="text-slate-300">사용자가 링크를 공유할 때 서버에서 벌어지는 일들</Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "Crawling", title: "크롤러 수집", desc: "페이스북, 구글 등의 봇이 페이지의 HTML 헤더를 분석합니다.", icon: <Search className="w-6 h-6" /> },
              { step: "Parsing", title: "메타데이터 파싱", desc: "og:title, og:image 등 약속된 규격의 태그를 추출합니다.", icon: <Code2 className="w-6 h-6" /> },
              { step: "Rendering", title: "카드 생성", desc: "추출된 데이터를 기반으로 소셜 앱 내에서 카드를 렌더링합니다.", icon: <MousePointer2 className="w-6 h-6" /> }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 hover:bg-white/10 transition-all duration-300">
                <div className="text-primary font-mono text-xs font-black uppercase tracking-widest">{item.step}</div>
                <div className="p-3 bg-primary/20 rounded-xl w-fit text-primary">{item.icon}</div>
                <Typography variant="h4" className="text-xl text-white font-bold">{item.title}</Typography>
                <Typography variant="p" className="text-sm text-slate-400 leading-relaxed">{item.desc}</Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 실무 가이드 및 팁 */}
      <section className="max-w-5xl mx-auto space-y-12">
        <Typography variant="h3" className="text-2xl font-bold text-center">성공적인 SEO를 위한 3가지 골든 룰</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 border-slate-200 hover:border-primary/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6" />
            </div>
            <Typography variant="h4" className="text-lg font-bold mb-3">제목의 가독성</Typography>
            <Typography variant="p" className="text-sm text-slate-500 leading-relaxed">
              가장 중요한 키워드는 앞쪽에 배치하세요. 60자 이상 길어지면 플랫폼에 따라 잘릴 수 있으므로 40~50자 사이를 권장합니다.
            </Typography>
          </Card>
          
          <Card className="p-8 border-slate-200 hover:border-primary/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <Typography variant="h4" className="text-lg font-bold mb-3">이미지 규격 준수</Typography>
            <Typography variant="p" className="text-sm text-slate-500 leading-relaxed">
              1200x630 픽셀(1.91:1)은 모든 플랫폼을 아우르는 표준입니다. 중요한 텍스트는 이미지 여백 10% 안쪽에 배치하여 잘림 현상을 방지하십시오.
            </Typography>
          </Card>

          <Card className="p-8 border-slate-200 hover:border-primary/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
              <Rocket className="text-orange-600 w-6 h-6" />
            </div>
            <Typography variant="h4" className="text-lg font-bold mb-3">캐시 갱신</Typography>
            <Typography variant="p" className="text-sm text-slate-500 leading-relaxed">
              메타 태그 수정 후 즉시 반영되지 않는다면 페이스북 디버거나 카카오톡 스크랩 캐시 삭제 도구를 사용하여 크롤러 정보를 갱신해야 합니다.
            </Typography>
          </Card>
        </div>
      </section>

      {/* 4. 기술 비교 표 */}
      <section className="max-w-4xl mx-auto space-y-8">
        <Typography variant="h3" className="text-2xl font-bold">오픈 그래프 vs 트위터 카드 비교</Typography>
        <div className="border rounded-2xl overflow-hidden shadow-sm">
          <div className="w-full overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-4 font-bold text-slate-900">속성</th>
                  <th className="px-6 py-4 font-bold text-slate-900">Open Graph (og:)</th>
                  <th className="px-6 py-4 font-bold text-slate-900">Twitter (twitter:)</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-600">
                <tr className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">제목</td>
                  <td className="px-6 py-4 font-mono text-xs">og:title</td>
                  <td className="px-6 py-4 font-mono text-xs">twitter:title</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">설명</td>
                  <td className="px-6 py-4 font-mono text-xs">og:description</td>
                  <td className="px-6 py-4 font-mono text-xs">twitter:description</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">대표 이미지</td>
                  <td className="px-6 py-4 font-mono text-xs">og:image</td>
                  <td className="px-6 py-4 font-mono text-xs">twitter:image</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">사이트 주소</td>
                  <td className="px-6 py-4 font-mono text-xs">og:url</td>
                  <td className="px-6 py-4 font-mono text-xs">twitter:url</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. FAQ 섹션 */}
      <section className="max-w-3xl mx-auto space-y-10">
        <Typography variant="h3" className="text-2xl font-bold text-center">자주 묻는 질문 (FAQ)</Typography>
        <div className="space-y-8">
          {[
            { q: "이미지 URL은 반드시 절대 경로여야 하나요?", a: "네, 반드시 https://를 포함한 절대 경로여야 합니다. 소셜 미디어 크롤러는 상대 경로를 해석할 수 없습니다." },
            { q: "태그를 넣었는데도 썸네일이 안 나와요.", a: "소셜 플랫폼의 서버에 이전 데이터가 캐싱되어 있을 가능성이 큽니다. 각 플랫폼의 '디버거' 도구를 사용하여 캐시를 강제 갱신하십시오." },
            { q: "Next.js에서 dynamic하게 적용하려면?", a: "generateMetadata 함수 내에서 비동기 데이터를 페칭한 뒤 본 도구에서 생성된 객체 구조를 반환하도록 코딩하십시오." },
            { q: "og:image 크기 제한이 있나요?", a: "파일 크기는 5MB 이하를 권장하며, 최소 200x200 픽셀 이상이어야 카드 형태로 렌더링됩니다." },
            { q: "왜 트위터 카드 태그를 따로 넣어야 하나요?", a: "트위터는 기본적으로 오픈 그래프를 지원하지만, 전용 태그(twitter:card 등)를 사용하면 더 풍부한 인터랙티브 요소와 최적화된 레이아웃을 제공할 수 있습니다." }
          ].map((faq, i) => (
            <div key={i} className="space-y-3 group">
              <Typography variant="h4" className="text-lg font-bold group-hover:text-primary transition-colors flex gap-2">
                <span className="text-primary/40 font-black">Q.</span> {faq.q}
              </Typography>
              <Typography variant="p" className="text-slate-600 leading-relaxed pl-6 border-l-2 border-primary/10">
                {faq.a}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      {/* 하단 추천 도구 섹션 (자동 주입 로직 대체) */}
      <section className="bg-primary/5 rounded-[40px] p-12 text-center space-y-8 max-w-5xl mx-auto border border-primary/10">
        <Typography variant="h3" className="text-3xl font-bold">완벽한 웹사이트 구성을 위한 다음 단계</Typography>
        <Typography variant="p" className="text-slate-600 max-w-2xl mx-auto">
          메타 태그 최적화가 끝났다면, 디자인의 완성도를 높여줄 다른 도구들도 확인해보세요.
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <Link href="/tools/generator/color-palette-generator" className="p-6 rounded-2xl border bg-white hover:shadow-xl hover:border-primary/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 mb-4 mx-auto group-hover:scale-110 transition-transform">
              <Rocket className="w-5 h-5" />
            </div>
            <p className="font-bold text-sm">색상 팔레트 생성기</p>
            <p className="text-[10px] text-slate-400 mt-1">AI가 제안하는 완벽한 색상 조화</p>
          </Link>
          <Link href="/tools/generator/code-snapshot" className="p-6 rounded-2xl border bg-white hover:shadow-xl hover:border-primary/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4 mx-auto group-hover:scale-110 transition-transform">
              <Share2 className="w-5 h-5" />
            </div>
            <p className="font-bold text-sm">코드 스냅샷</p>
            <p className="text-[10px] text-slate-400 mt-1">아름다운 소스 코드 이미지 생성</p>
          </Link>
          <Link href="/tools/converter/figma-svg-to-react" className="p-6 rounded-2xl border bg-white hover:shadow-xl hover:border-primary/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 mx-auto group-hover:scale-110 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
            <p className="font-bold text-sm">Figma to React</p>
            <p className="text-[10px] text-slate-400 mt-1">피그마 SVG를 컴포넌트로 즉시 변환</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
