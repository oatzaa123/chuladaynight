import { toRefs, reactive } from 'vue'
import useAxios from './useAxios'
export default function () {
    const workshops = reactive({
        data: [],
        errorMessage: null,
        isFetching: false,
    })
    const getAll = () => {
        const { data, errorMessage, fetchData, isFetching } = useAxios(
            `/workshop?fields=coverImage`
        )

        fetchData()

        workshops.data = data
        workshops.errorMessage = errorMessage
        workshops.isFetching = isFetching
    }

    const getOne = (id) => {
        const { data, errorMessage, fetchData, isFetching } = useAxios(
            `/workshop/${id}`
        )

        fetchData()

        workshops.data = data
        workshops.errorMessage = errorMessage
        workshops.isFetching = isFetching
    }

    return { getAll, getOne, ...toRefs(workshops) }
}
