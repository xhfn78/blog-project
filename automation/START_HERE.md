# 🚀 도구 자동 생성 시작하기

## 빠른 시작 (30초)

```bash
npm run tool:start
```

**또는 AI에게 직접:**
```
[도구생성]

automation/START_HERE.md 파일을 읽고 시작해주세요.
```

---

## 작동 방식

1. **자동 스캔** → 기존 도구 분석
2. **AI 분석** → 트렌드 키워드 조사
3. **아이디어 생성** → 30개 도구 브레인스토밍
4. **우선순위 선정** → TOP 5 추천
5. **사용자 선택** → 1-5 숫자 입력 (유일한 사용자 액션)
6. **자동 구현** → config + 로직 + UI + SEO 콘텐츠
7. **품질 검증** → 접근성 + AI 탐지 + SEO 체크
8. **완료** → 배포 준비 완료!

---

## 예상 소요 시간

- **전체 프로세스**: 10-15분
- **사용자 액션**: 2회 (시작 + 선택)
- **AI 작업 대기**: Step별 자동 감지

---

## 문제 해결

**Q: 중간에 멈췄어요**
- A: 해당 단계의 출력 파일을 확인하세요 (`automation/cache/sessions/[날짜]/`)

**Q: 에러가 발생했어요**
- A: `automation/cache/.current/.orchestrator_state.json` 삭제 후 재시작

**Q: 트렌드 데이터를 새로고침하고 싶어요**
- A: `npm run trend-analysis -- --force` 실행 (캐시 무시)

**Q: 더 자세한 설명이 필요해요**
- A: `automation/README.md` 참고

---

## 📚 상세 문서

- **전체 가이드**: `automation/README.md`
- **아키텍처**: 프로젝트 루트 `CLAUDE.md`
- **Step별 프롬프트**: `automation/prompts/workflows/`

---

**🎯 지금 바로 시작하세요!**

```bash
npm run tool:start
```
