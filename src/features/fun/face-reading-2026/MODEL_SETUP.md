# Face-API 모델 파일 설정

AI 관상 테스트 기능은 **무료 CDN (jsdelivr)**을 사용하여 모델을 자동으로 로드합니다.

## ✅ 별도 설치 불필요

모델 파일은 **사용자가 페이지를 처음 방문할 때 자동으로 다운로드**됩니다.

```typescript
// src/features/fun/face-reading-2026/lib/face-detector.ts
const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";
```

## 💰 비용 및 성능

| 항목 | 내용 |
|------|------|
| **CDN 비용** | **완전 무료** (제한 없음) |
| **서버 대역폭** | **0% 사용** (CDN이 처리) |
| **로딩 속도** | 전 세계 CDN 엣지 서버 (한국 포함) |
| **캐싱** | 브라우저가 자동 캐싱 (재방문 시 즉시 로드) |
| **총 모델 크기** | 약 7.1MB (최초 1회만 다운로드) |

## 🚀 동작 방식

1. 사용자가 `/fun/face-reading-2026` 방문
2. "얼굴 분석 시작" 버튼 클릭
3. 카메라 화면 로드 시 모델 자동 다운로드 시작
4. jsdelivr CDN에서 4개 모델 파일 다운로드 (약 2-5초)
5. 브라우저에 캐싱 (다음 방문 시 즉시 사용)

## 📦 사용되는 모델

| 모델 이름 | 용도 | 크기 |
|---------|------|------|
| `tiny_face_detector` | 얼굴 감지 (경량 버전) | ~200KB |
| `face_landmark_68` | 68개 얼굴 랜드마크 추출 | ~350KB |
| `face_recognition` | 얼굴 특징 벡터 추출 | ~6MB |
| `age_gender` | 나이/성별 예측 | ~420KB |

## 🔧 문제 해결

### 모델 로딩 실패

**증상**: "얼굴 인식 모델을 로드하지 못했습니다" 에러

**해결책**:
1. 인터넷 연결 상태 확인
2. 브라우저 콘솔에서 CORS 에러 확인
3. jsdelivr CDN 접근 가능 여부 확인
   ```bash
   curl https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/tiny_face_detector_model-weights_manifest.json
   ```
4. 브라우저 캐시 삭제 후 재시도

### 얼굴 감지 실패

**증상**: "얼굴을 감지하지 못했습니다" 에러

**해결책**:
1. 조명이 충분한지 확인
2. 얼굴이 화면 중앙에 정면으로 위치
3. 카메라 권한이 올바르게 허용되었는지 확인
4. Chrome/Edge 브라우저 사용 (Safari는 제한적 지원)

### 느린 로딩 속도

**증상**: 모델 로딩에 10초 이상 소요

**해결책**:
1. 네트워크 속도 확인 (최소 3G 이상 권장)
2. 브라우저 개발자 도구 Network 탭에서 다운로드 진행 확인
3. 재방문 시에는 캐시로 즉시 로드됨 (정상)

## 🎯 최적화 팁

### 브라우저 캐싱 활용

모델 파일은 자동으로 브라우저에 캐싱됩니다:
- **첫 방문**: 7.1MB 다운로드 (2-5초)
- **재방문**: 캐시에서 즉시 로드 (0.1초)

### 프로덕션 모니터링

jsdelivr CDN은 99.9% 가용성을 보장합니다:
- 실시간 상태: https://www.jsdelivr.com/network/infra
- 대체 CDN이 필요한 경우, unpkg.com도 가능:
  ```typescript
  const MODEL_URL = "https://unpkg.com/@vladmandic/face-api/model";
  ```

## 🔐 보안 및 프라이버시

- ✅ 모든 분석은 **브라우저 내에서만** 실행됩니다
- ✅ 얼굴 사진은 **서버로 전송되지 않습니다**
- ✅ 분석 결과는 **저장되지 않습니다**
- ✅ 페이지를 닫으면 모든 데이터가 삭제됩니다

## 📝 라이선스

사용된 모델들은 MIT 라이선스 하에 배포됩니다:
- 원본: [face-api.js by justadudewhohacks](https://github.com/justadudewhohacks/face-api.js)
- 포크: [@vladmandic/face-api](https://github.com/vladmandic/face-api)

## 🔗 참고 자료

- [@vladmandic/face-api Documentation](https://github.com/vladmandic/face-api)
- [jsdelivr CDN](https://www.jsdelivr.com/)
- [TensorFlow.js 공식 문서](https://www.tensorflow.org/js)
