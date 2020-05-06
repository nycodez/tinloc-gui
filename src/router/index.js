import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MatchManager from '@/components/MatchManager'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-290523.okta.com/oauth2/default',
  client_id: '0oab20corlIMt8mvD4x6',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/matches',
      name: 'MatchManager',
      component: MatchManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
