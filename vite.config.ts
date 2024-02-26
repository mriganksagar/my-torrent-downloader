import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import basicSsl from '@vitejs/plugin-basic-ssl'
import {fileURLToPath} from 'url'
import path from 'path'

export default defineConfig({
  plugins: [basicSsl({name: "torrentdownloader"}), svgr(), react()],
  resolve: {
    alias: {
      'webtorrent': fileURLToPath(new URL('./node_modules/webtorrent/dist/webtorrent.min.js', import.meta.url)),
      '@': path.resolve(__dirname, "./src"),
    },
  },
})
