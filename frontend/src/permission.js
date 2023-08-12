import router from './router/index'
import store from './store/index'
import { getToken } from './utils/authentication';

router.beforeEach(async(to, from, next) => {

    const token = getToken()
    if(token) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        } else {
            const role = store.getters.userRole
            if (role) {
                if (hasPermission(role, to)) {
                    next()
                } else {
                    next({ path: from.path })
                }
            } else {
                // Retrieve all user data (saving it in store) and catch the user role
                const { role } = await store.dispatch('user/user')
                const accessRoutes = await store.dispatch('routes/generateRoutes', role)
                router.addRoute(accessRoutes)
                next({...to, replace: true})
            }
        }
    } else {
        if (!to.meta.authRequired) {
            return next();
        } else {
            next(`/login`);
            NProgress.done();
        }
    }
})

function hasPermission(role, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role)
    } else {
        return true
    }
}