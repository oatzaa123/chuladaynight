import { toRefs, reactive } from 'vue'
import useAxios from './useAxios'
export default function () {
    const articles = reactive({
        data: [],
        errorMessage: null,
        isFetching: false,
    })
    const getAll = () => {
        const { data, errorMessage, fetchData, isFetching } =
            useAxios(`/article`)

        fetchData()

        articles.data = data
        articles.errorMessage = errorMessage
        articles.isFetching = isFetching
    }

    return { getAll, ...toRefs(articles) }
}
