export default {
    loading: state => state.loading,
    headImg: () => localStorage.getItem('headImg') ? localStorage.getItem('headImg') : null
}
