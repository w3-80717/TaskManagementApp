// @ts-check
import reactPlugin from 'vite-plugin-react'

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: 'react',
  plugins: [reactPlugin],
    proxy: {
      '/api': {
              target: 'http://localhost:5000',
              changeOrigin: true,
              secure: false,
            },
    }
}

export default config
