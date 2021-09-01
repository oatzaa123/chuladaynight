<template>
    <div
        class="modal fade"
        :class="{ show: isOpen }"
        id="exampleModal"
        tabindex="-1"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">กรุณา login</h5>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="onLogin">
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="username"
                                required
                            />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                v-model="password"
                                required
                            />
                        </div>
                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        const isOpen = ref(false)
        const state = reactive({
            username: '',
            password: '',
        })

        const onLogin = () => {
            if (state.username === 'demo' && state.password === '123456') {
                localStorage.setItem('isAuthenticated', true)
                store.commit('setIsAuthenticated', true)
                // isOpen.value = false
            } else {
                alert('กรุณากรอก username และ password ให้ถูกต้อง')
            }
        }

        watch(() => {
            if (!store.state.isAuthenticated) {
                isOpen.value = true
            } else {
                isOpen.value = false
            }
        })

        return { store, isOpen, onLogin, ...toRefs(state) }
    },
}
</script>

<style lang="scss" scoped>
.modal {
    &.show {
        display: block;
        background-color: rgba(169, 169, 169, 1);
    }
}
</style>
