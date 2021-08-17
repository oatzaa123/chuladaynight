<template>
    <slot :blocksCurrent="blocksCurrent"></slot>
</template>

<script>
import { computed } from 'vue'
export default {
    props: ['slideCurrent', 'blocks'],
    setup(props) {
        const blocksCurrent = computed(() => {
            const numShown = 3
            const blocksCurrent = []

            for (let i = 0; i < numShown; i++) {
                const index = (props.slideCurrent + i) % props.blocks.length
                blocksCurrent.push(props.blocks[index])
            }
            return blocksCurrent
        })

        return {
            blocksCurrent,
        }
    },
}
</script>
