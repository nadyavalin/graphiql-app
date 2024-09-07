import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const withNextIntl = createNextIntlPlugin("src/i18n/request.ts");

const nextConfig = {
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
