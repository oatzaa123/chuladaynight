import { reactive } from 'vue'

const state = reactive({
    mainBackground: null,
})

const methods = {
    changeBackground: (background) => {
        state.mainBackground = background
    },
}

export default {
    state,
    ...methods,
}
