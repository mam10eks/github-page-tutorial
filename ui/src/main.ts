/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// Plugins
import { registerPlugins } from '@/plugins'
import DocumentPage from "@/views/DocumentPage.vue";
import IrDatasetsExplorer from "@/views/IrDatasetsExplorer.vue";
import { useDisplay } from 'vuetify'

export function is_mobile() {
    const { mobile } = useDisplay()
    return mobile.value
}

export default function register_app() {
    const app_selector = '#app'

    const app_elem = document.querySelector(app_selector)
    if (app_elem && '__vue_app__' in app_elem && app_elem.__vue_app__) {
      console.log('App is already mounted.')
      return;
    }

    console.log('Mount vue app to location: ' + window.location)

    const routes = [
      {path: '/', component: IrDatasetsExplorer},
      {path: '/docs', component: DocumentPage},
      {path: '/github-page-tutorial/docs', component: DocumentPage},

      // Fallback: everything matches to home.
      {path: '/:pathMatch(.*)*', component: IrDatasetsExplorer},
    ]

    const router = createRouter({
      history: createWebHistory(),
      routes,
    })

    const app = createApp(App)
    app.use(router)

    registerPlugins(app)

    app.mount(app_selector)
}

declare global { interface Window { register_app: any}}
window.register_app = register_app;

register_app()
