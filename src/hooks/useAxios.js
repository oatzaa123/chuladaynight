import { reactive, toRefs } from 'vue'
import axios from '@/configs/axios'
const useAxios = (url, method, options = {}) => {
    const state = reactive({
        data: [],
        errorMessage: '',
        isFetching: false,
    })

    const fetchData = async () => {
        state.isFetching = true
        try {
            const response = await axios({
                method: method,
                url: url,
                data: options,
            })
            state.data = response.data
        } catch (e) {
            state.errorMessage = e.message
        } finally {
            state.isFetching = false
        }
    }

    return { ...toRefs(state), fetchData }
}

export default useAxios
