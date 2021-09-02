import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

axios.defaults.baseURL = 'https://www.chulaartpark.art/api_v1'

export default axios
