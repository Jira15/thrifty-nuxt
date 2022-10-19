// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
 // Global page headers:  
    head: {
        title: 'Thrifty Nuxt',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        // CSS file in the project
        '@/assets/css/main.css',
        // Reset file in the project 
        '@/assets/css/reset.css',
        // SCSS file in the project
        '@/assets/css/main.scss',
        // https://fontawesome.com/docs/web/use-with/vue/use-with
        '@fortawesome/fontawesome-svg-core/styles.css',
        // https://vue3datepicker.com/installation/#nuxt
        '@vuepic/vue-datepicker/dist/main.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [ 
        '@/plugins/fontawesome.js',  
        '@/plugins/vue-datepicker.js'   
    ],   
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [  
            [
                '@pinia/nuxt',
                {
                    autoImports: [ 
                        // automatically imports `defineStore`  //  'autoStore',  'sucursalStore'
                        'defineStore', // import { defineStore } from 'pinia'
                        // automatically imports `defineStore` as `definePiniaStore`
                        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                    ],
                },
            ]
        ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: ['@vuepic/vue-datepicker']
    }
}) 