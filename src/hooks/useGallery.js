import { toRefs, reactive } from 'vue'
import useAxios from './useAxios'
export default function () {
    const gallery = reactive({
        data: [],
        errorMessage: null,
        isFetching: false,
    })
    const getAll = () => {
        const { data, errorMessage, fetchData, isFetching } =
            useAxios(`/gallery`)

        fetchData()

        gallery.data = data
        gallery.errorMessage = errorMessage
        gallery.isFetching = isFetching
    }

    const getOne = (id) => {
        const { data, errorMessage, fetchData, isFetching } = useAxios(
            `/gallery/${id}`
        )

        fetchData()

        gallery.data = data
        gallery.errorMessage = errorMessage
        gallery.isFetching = isFetching
    }

    return { getAll, getOne, ...toRefs(gallery) }
}
