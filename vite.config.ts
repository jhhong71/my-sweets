import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // 상대 경로로 에셋을 참조해 루트/하위 경로/파일 열기에서 모두 이미지·스크립트가 로드되게 한다.
  base: "./",
  plugins: [react()],
  server: {
    port: 5180,
  },
});
