import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

axios.defaults.baseURL = 'http://localhost:5000/api_v1'

export default axios
