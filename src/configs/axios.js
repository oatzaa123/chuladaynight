import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] =
    'http://localhost:5000'

axios.defaults.baseURL = 'http://localhost:5000'

export default axios
