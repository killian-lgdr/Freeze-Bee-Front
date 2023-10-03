import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import KeyCloakService from "./security/Keycloakservice";
import HttpService from './services/HttpService'

loadFonts()
console.log(process.env);
const renderApp = () => {
    const app = createApp(App)
    app.use(router)
    app.use(vuetify)
    app.mount('#app')
  };

KeyCloakService.CallLogin(renderApp);
HttpService.configureAxiosKeycloak();
