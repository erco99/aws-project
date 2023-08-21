const state = {
    unread: 0
}

const mutations = {
    NEW_UNREAD: (state) => {
        state.unread = state.unread + 1;
    },
    RESET_UNREAD: (state) => {
        state.unread = 0;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}

