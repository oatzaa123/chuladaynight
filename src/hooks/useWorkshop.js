import { ref, toRefs, reactive } from '@vue/composition-api'
import useAxios from './useAxios'
export default function () {
    const breweries = reactive({
        list: [],
        errorMessage: null,
        isFetching: false,
    })
    const val = ref('')
    const submitted = async () => {
        const { data, errorMessage, fetchData, isFetching } = useAxios(
            `https://api.openbrewerydb.org/breweries/?by_name=${val.value}`,
            'GET'
        )
        fetchData()
        breweries.list = data
        breweries.errorMessage = errorMessage
        breweries.isFetching = isFetching
    }
    return { submitted, ...toRefs(breweries), val }
}
