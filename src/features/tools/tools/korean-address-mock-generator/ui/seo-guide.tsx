'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";
import Link from "next/link";

export function SeoGuide() {
  return (
    <section className="bg-slate-950 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden mt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6 text-center lg:text-left">
          <Typography variant="h2" className="text-3xl font-extrabold text-slate-100">
            한국 주소 Mock 데이터가 필요한 이유
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300 leading-relaxed">
            국내 주소 체계는 도로명 주소와 지번 주소의 병행, 우편번호 5자리 체계 등 독특한 규칙을 가지고 있습니다. 
            단순히 영문 더미 데이터를 사용하는 것만으로는 실제 배송, 지도 연동, 주소 검색 UI 등을 검증하기 어렵습니다. 
            이 도구는 실제 국내 주소 규칙을 따르는 정밀한 데이터를 생성해줍니다.
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">🗺️ 좌표 데이터 기본 포함</h4>
            <p className="text-slate-400 text-sm">주소와 매칭되는 위도(Latitude)와 경도(Longitude) 정보를 함께 생성하여 카카오맵, 네이버맵 API 연동 테스트를 즉시 수행할 수 있습니다.</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">📂 다양한 포맷 지원</h4>
            <p className="text-slate-400 text-sm">JSON, CSV, TSV는 물론 TypeScript Interface 형식으로도 내보낼 수 있어 개발 환경에 맞춰 바로 사용 가능합니다.</p>
          </div>
        </div>

        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">실무 활용 팁</Typography>
          <ul className="list-disc pl-6 space-y-4 text-slate-300">
            <li><strong>주소 검색 UI 테스트:</strong> 사용자가 주소를 선택했을 때 도로명과 지번이 어떻게 매칭되어 표시되는지 확인</li>
            <li><strong>배송비 계산 로직:</strong> 특정 지역(도서산간 등) 주소를 대량 생성하여 과금 로직 검증</li>
            <li><strong>초기 DB 구축:</strong> 서비스 런칭 전 수만 건의 사용자 더미 주소 데이터를 DB에 삽입하여 성능 테스트</li>
          </ul>
        </div>

        <div className="space-y-6 text-slate-400 text-sm italic border-t border-slate-800 pt-8 text-center">
          <p>모든 데이터는 테스트 목적으로 임의 생성된 정보이며, 실존 인물이나 실제 가구와는 관계가 없습니다.</p>
        </div>
      </div>
    </section>
  );
}
