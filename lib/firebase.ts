/**
 * Firebase 초기화 (Realtime Database + Anonymous Auth).
 *
 * 브라우저에서만 초기화한다 — Next.js 정적 export 빌드 과정에서 클라이언트
 * 컴포넌트 모듈이 서버 측에서 한 번 평가될 수 있는데, 그 시점엔 window가 없고
 * env 값도 아직 없을 수 있어 최상위에서 initializeApp을 호출하면 빌드가 깨진다.
 * 그래서 모든 것을 지연 초기화(lazy)로 감싼다.
 */
import { type FirebaseApp, getApps, initializeApp } from "firebase/app";
import { type Auth, getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { type Database, getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** 필수 값이 모두 채워졌을 때만 true. 하나라도 비어 있으면 기능을 안전하게 끈다. */
function isConfigured(): boolean {
  return Object.values(firebaseConfig).every((v) => typeof v === "string" && v.length > 0);
}

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Database | null = null;

function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined") return null; // SSR/빌드 시점 가드
  if (!isConfigured()) return null;
  if (!app) {
    app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  const a = getFirebaseApp();
  if (!a) return null;
  authInstance ??= getAuth(a);
  return authInstance;
}

export function getFirebaseDb(): Database | null {
  const a = getFirebaseApp();
  if (!a) return null;
  dbInstance ??= getDatabase(a);
  return dbInstance;
}

let anonAuthPromise: Promise<boolean> | null = null;

/**
 * 익명 로그인을 보장한다(중복 호출해도 실제 로그인은 한 번만 일어난다).
 * 이미 로그인된 세션이 있으면 그대로 재사용한다.
 * 성공 시 true, Firebase 미설정이거나 실패하면 false.
 */
export function ensureAnonymousAuth(): Promise<boolean> {
  const auth = getFirebaseAuth();
  if (!auth) return Promise.resolve(false);

  anonAuthPromise ??= new Promise<boolean>((resolve) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        if (user) {
          resolve(true);
          return;
        }
        signInAnonymously(auth)
          .then(() => resolve(true))
          .catch(() => resolve(false));
      },
      () => {
        unsubscribe();
        resolve(false);
      },
    );
  });

  return anonAuthPromise;
}
