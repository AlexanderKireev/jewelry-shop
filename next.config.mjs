/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Разрешаем картинки с любых сайтов для теста
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
