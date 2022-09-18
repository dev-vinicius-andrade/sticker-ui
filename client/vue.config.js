const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  outputDir:process.env.CLIENT_RELEASE_PATH ? process.env.CLIENT_RELEASE_PATH:undefined,
  devServer:{
    allowedHosts: 'all',
    devMiddleware:{
      writeToDisk: true,
    }
  },
  configureWebpack:  {
    devtool: "source-map",
    watchOptions: {
      poll: 1000,
      ignored: ['**/node_modules'] 
    },
    optimization: {
      runtimeChunk: 'single',
    },
    resolve: {
      alias: {
          '@assets': path.resolve(__dirname, 'src','assets'),
          '@components': path.resolve(__dirname, 'src','components'),   
          '@constants': path.resolve(__dirname, 'src','constants'),     
          '@views': path.resolve(__dirname, 'src','views'),
          '@layouts': path.resolve(__dirname, 'src','layouts'),
          '@partials': path.resolve(__dirname, 'src','partials'),
          '@plugins': path.resolve(__dirname, 'src','plugins'),
          '@locales': path.resolve(__dirname, 'src','locales'),
          '@modals': path.resolve(__dirname, 'src','modals'),
          '@store': path.resolve(__dirname, 'src','store'),
          '@router': path.resolve(__dirname, 'src','router'),
          '@mixins': path.resolve(__dirname, 'src','mixins'),

      }
  }
},

pwa: {
  themeColor: "#1e1e1e",
  msTileColor: "#1c1c1c",
  start_url: "/",
  name: "figurinhas.io",
  iconPaths:{
    favicon32: "image/icons/light/favicon-32x32.png",
    favicon16: "image/icons/light/favicon-16x16.png",
    favicon96: "image/icons/favicon-96x96.png",
    appleTouchIcon: "image/icons/light/apple-touch-icon.png",
    maskIcon: 'image/icons/light/icon.svg',
    msTitleImage: "image/icons/light/msapplication-icon-144x144.png"
  },
  manifestOptions: {
    icons: [
      {
        src: "image/icons/light/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "image/icons/light/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "image/icons/light/android-chrome-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "image/icons/light/android-chrome-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "image/icons/light/apple-touch-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        src: "image/icons/light/apple-touch-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        src: "image/icons/light/apple-touch-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: "image/icons/light/apple-touch-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "image/icons/light/apple-touch-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "image/icons/light/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "image/icons/light/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "image/icons/light/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "image/icons/light/msapplication-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "image/icons/light/mstile-150x150.png",
        sizes: "150x150",
        type: "image/png",
      },
    ],
  },
},
});
