/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // SSR/API 라우트가 없는 완전 정적 페이지라 정적 export로 빌드한다.
  // Cloudflare Pages는 out/ 폴더를 그대로 정적 호스팅한다.
  output: "export",
};

export default nextConfig;
