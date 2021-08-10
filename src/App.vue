<template>
    <div id="app">
        <router-view v-slot="{ Component }">
            <transition name="route" mode="out-in">
                <component :is="Component"> </component>
            </transition>
        </router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    setup() {},
}
</script>

<style lang="scss">
@import './assets/css/font.scss';

/** route transition */

.route-enter-from {
    opacity: 0;
}

.route-enter-active {
    transition: opacity 0.3s ease-out;
}

.route-leave-to {
    opacity: 0;
}

.route-leave-active {
    transition: all 0.3s ease-in;
    opacity: 0;
}
</style>
