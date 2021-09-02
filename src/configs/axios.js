import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

axios.defaults.baseURL =
    process.env.NODE_ENV.trim() === 'production'
        ? process.env.VUE_APP_PROD_ENDPOINT
        : process.env.VUE_APP_LOCAL_ENDPOINT

export default axios
