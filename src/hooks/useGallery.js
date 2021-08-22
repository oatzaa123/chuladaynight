import { toRefs, reactive } from 'vue'
import useAxios from './useAxios'
export default function () {
    const gallery = reactive({
        data: [],
        errorMessage: null,
        isFetching: false,
    })
    const getAll = async () => {
        const { data, errorMessage, fetchData, isFetching } =
            useAxios(`/gallery`)

        await fetchData()

        gallery.data = data
        gallery.errorMessage = errorMessage
        gallery.isFetching = isFetching
    }

    const getOne = async (id) => {
        const { data, errorMessage, fetchData, isFetching } = useAxios(
            `/gallery/${id}`
        )

        await fetchData()

        gallery.data = data
        gallery.errorMessage = errorMessage
        gallery.isFetching = isFetching
    }

    const nextPage = async (id) => {
        const { data, errorMessage, fetchData, isFetching } = useAxios(
            `/gallery/${id}/nextGallery`
        )

        await fetchData()

        gallery.data = data
        gallery.errorMessage = errorMessage
        gallery.isFetching = isFetching
    }

    const perviousPage = async (id) => {
        const { data, errorMessage, fetchData, isFetching } = useAxios(
            `/gallery/${id}/perviousGallery`
        )

        await fetchData()

        gallery.data = data
        gallery.errorMessage = errorMessage
        gallery.isFetching = isFetching
    }

    return { getAll, getOne, nextPage, perviousPage, ...toRefs(gallery) }
}
