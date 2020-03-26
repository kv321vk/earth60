import { global as G } from './type'
export default {
    [G.mutations.SET_LOADING_STATUS] (state, loading = false) {
        state.loading = loading
    },
    [G.mutations.SET_HEADIMG] (state, headImg ) {
        localStorage.setItem('headImg', headImg)
    }
}
