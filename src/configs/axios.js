import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

axios.defaults.baseURL = `${process.env.VUE_APP_LOCAL_ENDPOINT}`

export default axios
