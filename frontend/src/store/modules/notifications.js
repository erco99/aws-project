const state = {
    unread: 0
}

const mutations = {
    NEW_UNREAD: (state) => {
        state.unread = state.unread + 1;
    },
    SET_UNREAD: (state, unread) => {
      state.unread = unread;
    },
    DECR_UNREAD: (state, read) => {
        const delta = state.unread - read;
        state.unread = delta > 0 ? delta : 0;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}

