//state
const state = {
    token: null,
    tokenId: null,
}

//getters
const getters = {
    accessToken: state => {
        return state.token.accessToken
    },
}

//actions
const actions = {
    getAuth({ state, commit }, { exist, none }) {
        if (state.token == null) {
            let localAccessToken = window.localStorage.getItem('accessToken');
            let localEncryptedAccessToken = window.localStorage.getItem('encryptedAccessToken');
            let recordTime = window.localStorage.getItem('recordTime');
            let expireInSeconds = window.localStorage.getItem('expireInSeconds');
            if (expireInSeconds) {
                expireInSeconds = parseInt(expireInSeconds)
            }
            if (recordTime) {
                recordTime = parseInt(recordTime)
            }
            if (localAccessToken && localEncryptedAccessToken && expireInSeconds && recordTime && (new Date().getTime() - recordTime) < (expireInSeconds * 1000 - 3600000)) {
                commit('setToken', {
                    accessToken: localAccessToken,
                    encryptedAccessToken: localEncryptedAccessToken,
                    expireInSeconds: expireInSeconds,
                    recordTime: recordTime
                })
            }
        }

        if (state.token != null) {
            exist(state.token)
        } else {
            none()
        }
    },
    setToken(context, token) {
        context.commit('setToken', token)
        window.localStorage.setItem('accessToken', token.accessToken);
        window.localStorage.setItem('encryptedAccessToken', token.encryptedAccessToken);
        window.localStorage.setItem('expireInSeconds', token.expireInSeconds)
        window.localStorage.setItem('recordTime', token.recordTime)
            // window.localStorage.setItem('accessToken', JSON.stringify(token));
    },
    setTokenId(context, token) {
        context.commit('setTokenId', token)
        window.localStorage.setItem('tokenId', token);
            // window.localStorage.setItem('accessToken', JSON.stringify(token));
    },
}

//mutations
const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setTokenId(state, tokenId) {
        state.tokenId = tokenId
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}