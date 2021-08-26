import { toRefs, reactive } from 'vue'
import useAxios from './useAxios'
export default function () {
    const news = reactive({
        data: [],
        errorMessage: null,
        isFetching: false,
    })
    const getAll = async (page = 1, limit = 5) => {
        const { data, errorMessage, fetchData, isFetching } = useAxios(
            `/news?page=${page}&limit=${limit}`
        )

        await fetchData()

        news.data = data
        news.errorMessage = errorMessage
        news.isFetching = isFetching
    }

    const getOne = async (id) => {
        const { data, errorMessage, fetchData, isFetching } = useAxios(
            `/news/${id}`
        )

        await fetchData()

        news.data = data
        news.errorMessage = errorMessage
        news.isFetching = isFetching
    }

    // const nextPage = async (id) => {
    //     const { data, errorMessage, fetchData, isFetching } = useAxios(
    //         `/news/${id}/nextnews`
    //     )

    //     await fetchData()

    //     news.data = data
    //     news.errorMessage = errorMessage
    //     news.isFetching = isFetching
    // }

    // const perviousPage = async (id) => {
    //     const { data, errorMessage, fetchData, isFetching } = useAxios(
    //         `/news/${id}/perviousnews`
    //     )

    //     await fetchData()

    //     news.data = data
    //     news.errorMessage = errorMessage
    //     gallery.isFetching = isFetching
    // }

    return { getAll, getOne, ...toRefs(news) }
}
