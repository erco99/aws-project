import router from './router/index'
import store from './store/index'
import { getToken } from './utils/authentication';

router.beforeEach(async(to, from, next) => {

    if (!to.meta.authRequired) return next();

    const token = getToken()

    if(token) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
          } else {
            const hasRole = store.getters.userRole
            if (hasRole) {
                next()
            } else {
                // Retrieve all user data (saving it in store) and catch the user role
                const { role } = await store.dispatch('user/user')
                await store.dispatch('routes/generateRoutes', role)
                // console.log(token)
                next()
            }
          }
    } else {
        next(`/login`);
        NProgress.done();
    }
})