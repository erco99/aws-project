import router from './router/index'
import store from './store/index'
import { getToken } from './utils/authentication';

const whiteList = ["/login", "/signup", "/forgot-password", "/reset-password"];

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
        if (isWhiteListed(to.path)) {
            next();
        } else {
            next(`/login`);
            NProgress.done();
        }
    }
})

function isWhiteListed(path) {
    if (whiteList.indexOf(path) !== -1) return true
    // === For dynamic routing ===
    //for (const entry in whiteList) {
    //    if (path.match(entry)) return true
    //}
    return false
}