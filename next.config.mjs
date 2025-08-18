/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '',
  assetPrefix: '', // absolute URL for _next assets
  images: { unoptimized: true },
}
export default nextConfig
