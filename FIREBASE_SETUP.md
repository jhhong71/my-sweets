# Firebase 참여인원 집계 설정 가이드

참여인원 집계는 Cloudflare KV에서 **Firebase Realtime Database(Spark 무료 요금제)**로
교체됐습니다. 아래 순서대로 콘솔에서 직접 설정해야 실제로 동작합니다.

## 1. Firebase 프로젝트 생성

1. https://console.firebase.google.com 접속 → **프로젝트 추가**
2. 프로젝트 이름 입력(예: `my-sweets-test`) → 계속
3. Google Analytics는 이 용도에 필요 없으니 꺼도 됩니다 → **프로젝트 만들기**

## 2. 웹 앱 등록

1. 프로젝트 개요 화면 → **`</>`(웹)** 아이콘 클릭
2. 앱 닉네임 입력(예: `my-sweets-web`) → Firebase Hosting은 **체크하지 않음**(Cloudflare Pages를 그대로 씀) → 앱 등록
3. 표시되는 `firebaseConfig` 값을 메모해둡니다 — 3단계 환경변수에 그대로 씁니다.
   ```js
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     databaseURL: "...",   // Realtime Database 생성 후에 채워짐(4단계 먼저 진행해도 됨)
     projectId: "...",
     appId: "...",
   };
   ```

## 3. Realtime Database 생성

1. 왼쪽 메뉴 **빌드 → Realtime Database** → **데이터베이스 만들기**
2. 위치는 기본값(또는 가까운 리전) 선택
3. 보안 규칙은 일단 **잠금 모드(비공개)**로 시작 → 사용 설정
4. 생성되면 상단에 `https://<프로젝트>-default-rtdb.<region>.firebasedatabase.app` 형태의 URL이 보입니다 — 이게 `databaseURL` 값입니다.

## 4. Anonymous Authentication 활성화

1. 왼쪽 메뉴 **빌드 → Authentication** → **시작하기**
2. **Sign-in method** 탭 → **Anonymous** 선택 → **사용 설정** 토글 켜기 → 저장

이게 없으면 `ensureAnonymousAuth()`가 항상 실패해서 참여수가 절대 올라가지 않습니다.

## 5. Security Rules 적용

**Realtime Database → 규칙** 탭에서 아래 규칙을 붙여넣고 **게시**합니다.

```json
{
  "rules": {
    "participants": {
      ".read": true,
      "$testId": {
        ".write": "auth != null && ((!data.exists() && newData.val() === 1) || (data.exists() && newData.val() === data.val() + 1))",
        ".validate": "newData.isNumber() && newData.val() >= 1"
      }
    }
  }
}
```

**이 규칙이 하는 일**
- `participants/*` 숫자는 누구나 읽을 수 있음(`.read: true`) — 참여수 표시에 필요
- 쓰기는 **로그인(익명 포함)된 사용자만** 가능(`auth != null`)
- 값이 없을 때는 정확히 `1`부터 시작해야 하고, 있을 때는 **기존값 + 1**만 허용
  → 숫자를 감소시키거나 임의 값으로 바꾸는 요청은 전부 거부됩니다
- `runTransaction()`이 내부적으로 현재값을 읽고 +1한 값을 쓰기 때문에 이 규칙과 정확히 맞물립니다

> 검토 결과 이 규칙은 요구사항과 정확히 일치합니다. 그대로 쓰시면 됩니다.

## 6. 환경변수 등록

### 로컬 개발용
저장소 루트에 `.env.local` 파일을 만들고(커밋되지 않습니다) 2단계에서 메모한 값을 채웁니다.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=여기에_apiKey
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=여기에_authDomain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=여기에_databaseURL
NEXT_PUBLIC_FIREBASE_PROJECT_ID=여기에_projectId
NEXT_PUBLIC_FIREBASE_APP_ID=여기에_appId
```

`.env.example`에는 변수 이름만 있고 실제 값은 없습니다 — 위 값들로 직접 채워야 합니다.

### Cloudflare Pages (프로덕션)

1. Cloudflare 대시보드 → **my-sweets** 프로젝트 → **Settings** → **Environment variables**
2. **Production** 환경에 아래 5개를 각각 추가 (Variable name은 정확히 일치해야 함):
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
3. 저장

이 값들은 Next.js 정적 export 시 **빌드 타임에 번들에 포함**됩니다. 즉 값을 바꾸거나
새로 등록한 뒤에는 반드시 **재배포**해야 반영됩니다(이미 나온 빌드에는 소급 적용되지 않음).

## 7. Cloudflare Pages 재배포

환경변수 저장만으로는 자동 재배포되지 않습니다.

1. Cloudflare 대시보드 → my-sweets → **Deployments** 탭
2. 최신 배포 옆 **⋯** → **Retry deployment**
   (또는 저장소에 새 커밋을 push하면 자동으로 새 배포가 시작됩니다)

## 완료 후 확인 방법

1. 배포된 사이트에서 마이스윗 테스트를 실제로 한 번 진행
2. Firebase 콘솔 → Realtime Database → 데이터 탭에서 `participants/my-sweet` 값이 `1`로 생겼는지 확인
3. 사이트로 돌아와 새로고침 → 카드에 참여수가 표시되는지 확인
