# 테스트모아 (TestMoa)

파스텔·소프트·프리미엄 무드의 한국형 심리테스트 플랫폼 랜딩 페이지입니다.
SSR/API 라우트가 없는 완전 정적 페이지로, Next.js 정적 export로 빌드해
Cloudflare Pages에 호스팅합니다.

**배포 주소**: https://my-sweets.pages.dev

## 기술 스택

- Next.js 15 (App Router, 정적 export)
- React 19 + TypeScript (strict)
- Tailwind CSS 3
- Framer Motion
- Lucide Icons

## 로컬 실행

```bash
npm install
npm run dev
```

`http://localhost:3000`에서 확인합니다.

## 빌드

```bash
npm run build
```

`next.config.mjs`의 `output: "export"` 설정에 따라 완전 정적 파일이
`out/` 폴더에 생성됩니다. 별도 서버나 어댑터 없이 정적 호스팅만으로 동작합니다.

## Cloudflare Pages 빌드 설정

Cloudflare 대시보드에서 이 저장소를 Git 연동할 때 아래 값을 사용합니다.

| 항목 | 값 |
|---|---|
| Framework preset | Next.js (Static HTML Export) 또는 None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` |
| Node version | `.node-version` 참조 (20) |

`main` 브랜치에 push할 때마다 자동으로 빌드·배포됩니다.

## 콘텐츠 수정

테스트·카테고리·특징 문구와 데이터는 모두 `lib/data.ts`에서만 수정합니다.
UI 코드는 건드릴 필요가 없습니다.

## 환경변수

현재 이 프로젝트는 별도 환경변수를 사용하지 않습니다.
