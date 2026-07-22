# 나는 어떤 간식? 🍬

7가지 질문으로 알아보는 나와 닮은 간식 테스트. 진함·발랄함·다정함 세 가지 취향
축으로, **초콜릿·사탕·비스킷·마시멜로우·푸딩** 중 나와 가장 가까운 하나를 찾아줍니다.

> 선택한 상황과 취향을 바탕으로 결과를 제공하는 **엔터테인먼트 콘텐츠**입니다.
> 과학적 성격검사나 전문적인 심리 진단을 목적으로 하지 않습니다.

## 기술 구성

- React 18 + TypeScript + Vite
- 결과 저장: 결과 화면을 그대로 캡처(`html-to-image`)
- 상대 경로 배포(`base: "./"`) — 루트/하위 경로 어디서든 동작

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:5180
```

## 빌드

```bash
npm run build    # 결과물: dist/
npm run preview  # 빌드 결과 미리보기
```

## Cloudflare Pages 배포 설정

이 저장소를 Cloudflare Pages에 연결한 뒤, 빌드 설정을 다음과 같이 지정합니다.

| 항목 | 값 |
| --- | --- |
| Framework preset | Vite (또는 None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (저장소 루트) |
| Node version | `20` (`.node-version` 로 지정됨) |

## 광고 / 제휴 (선택)

카카오 애드핏·쿠팡파트너스 연동을 위한 환경변수 구조는 `.env.example` 참고.
값이 없으면 광고는 안전하게 비활성화되며(미리보기 placeholder만 표시), 실제 광고
네트워크는 호출하지 않습니다. 실제 값은 `.env`(커밋 금지)에 넣습니다.

## 라이선스 / 저작권

간식 일러스트 이미지와 문항·결과 문구는 이 프로젝트에서 제작한 것입니다.
