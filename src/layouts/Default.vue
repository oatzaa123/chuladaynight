<template>
    <div class="default">
        <div class="menu" @click="showMenu">
            <img :src="require('../assets/images/MENU@1X.png')" />
            <Menu :class="{ show: state.show }" />
        </div>
        <router-view />
    </div>
</template>

<script>
import { reactive } from 'vue'
import Menu from './../components/menu/menu.vue'
export default {
    name: 'default',
    components: {
        Menu,
    },
    setup: () => {
        const state = reactive({ show: false })
        const showMenu = () => {
            state.show = !state.show
        }

        return { state, showMenu }
    },
}
</script>

<style lang="scss" scoped>
.default {
    padding: 1.5rem;
    background-image: url('../assets/images/home/section1/Rectangle 47.png');
    min-height: 100vh;
    background-size: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    .menu {
        float: right;
        cursor: pointer;
    }
}
</style>
