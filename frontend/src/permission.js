import router from './router/index'
import store from './store/index'
import { getToken } from './utils/authentication';

const whiteList = ["/login", "/signup", "/reset-password"];

router.beforeEach(async(to, from, next) => {

    const token = getToken()

    if(token) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
          } else {
                await store.dispatch('routes/generateRoutes')
                console.log(token)
                next()
          }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login`);
            NProgress.done();
        }
    }
})