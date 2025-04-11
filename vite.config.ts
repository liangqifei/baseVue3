import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  server: {
    proxy: {
      // 代理 /api 路径的请求到 http://localhost:5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,  // 是否改变请求头中的 Origin
        rewrite: (path) => path.replace(/^\/api/, '')  // 重写请求路径
      },
      '/ws': {
        target: 'ws://localhost:4000',  // WebSocket 目标地址
        changeOrigin: true,
        ws: true,  // 启用 WebSocket 代理
      }
    }
  }
})
