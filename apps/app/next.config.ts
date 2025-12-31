// import { withToolbar } from "@repo/feature-flags/lib/toolbar";
// import { config, withAnalyzer } from "@repo/next-config";
// import { withLogging, withSentry } from "@repo/observability/next-config";
// import type { NextConfig } from "next";
// import { env } from "@/env";

// let nextConfig: NextConfig = withToolbar(withLogging(config));

// if (env.VERCEL) {
//   nextConfig = withSentry(nextConfig);
// }

// if (env.ANALYZE === "true") {
//   nextConfig = withAnalyzer(nextConfig);
// }

// export default nextConfig;
import { config, withAnalyzer } from "@repo/next-config";
import type { NextConfig } from "next";

let nextConfig: NextConfig = config;

// 如果需要分析打包，可以通过环境变量启用
if (process.env.ANALYZE === "true") {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;