import { useRouter } from 'vue-router'

const useRoute = (name, params = {}) => {
    console.log(name, params)
    const router = useRouter()

    return router.push({ name: name, params: params })
}

export default useRoute
