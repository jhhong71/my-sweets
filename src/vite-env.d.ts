/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_ADFIT_ENABLED?: string;
  readonly VITE_KAKAO_ADFIT_START_UNIT_ID?: string;
  readonly VITE_KAKAO_ADFIT_RESULT_UNIT_ID?: string;
  readonly VITE_COUPANG_PARTNERS_ENABLED?: string;
  readonly VITE_COUPANG_PARTNERS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
