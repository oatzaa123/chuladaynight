<template>
    <div class="section5">
        <News :limit="3" parent="section5" />
    </div>
</template>

<script>
import News from '@/pages/New/News'
export default {
    components: {
        News,
    },
    setup() {
        return {}
    },
}
</script>

<style>
.section5 {
    background-color: #030124;
    min-height: 100vh;
    padding: 3rem;
}
</style>
