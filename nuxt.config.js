export default {
  server: {
    port: 8080, // default: 3000
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  publicRuntimeConfig: {
    appName: 'alkatech-crm',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'alkatech-crm',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  axios: {
    // proxy: true
    baseURL: 'http://192.168.1.101:80/lcrm-api/', // Used as fallback if no runtime config is provided
  }, 

  // Global Fontawesome:
  fontawesome: {
    icons: {
      solid: true
    }
  },

  // Global Route Middleware:
  router: {
    middleware: ['auth','application']
  },

  //Global Auth
  auth: {
    redirect: {
      login: '/authentication/login',
      logout: '/authentication/login',
      home:'/backend/dashboard'

    },
    strategies: {
      local: {
        token: {
          property: 'response_body.access_token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'response_body.user',
          autoFetch: true
        },
        endpoints: {
          login: { url: 'login', method: 'post' },
          logout: { url: 'logout', method: 'post' },
          user: { url: 'logged-in-user-data', method: 'post' }
        }
      }
    }
  },

  //Global Toast
  toast: {
    position: 'bottom-right',
    duration:1000*5,

  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vee-validate",
    "~/plugins/b-icon.js",
    "~/plugins/notify.js"
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    'nuxt-vue-select',
    'bootstrap-vue/nuxt',

  ],
 
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
  }
}
