const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

function withSplitSVGr(config) {
  return Object.assign({}, config, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      });

      config.module.rules.push({
        test: /\.svg$/i,
        use: ["@svgr/webpack"],
        resourceQuery: /svgr/, // *.svg?svgr
      });

      if (typeof config.webpack === "function") {
        return config.webpack(config, options);
      }

      return config;
    },
  });
}

const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Authorization",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536],
    // loader: "custom",
    path: "/",
  },
};

module.exports = withSplitSVGr(
  withPlugins(
    [
      [
        withPWA,
        {
          pwa: {
            disable: process.env.NODE_ENV === "development",
            dest: "public",
            runtimeCaching,
          },
        },
      ],
    ],
    nextConfig
  )
);
