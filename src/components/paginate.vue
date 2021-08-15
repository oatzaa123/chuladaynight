<template>
    <!-- <slot name="data" :pageNumber="pageNumber" /> -->
    <div class="paginate">
        <ul v-for="(item, index) in totalPages" :key="index">
            <!-- <li :key="index" v-if="item === LEFT_PAGE">
                <a>
                    <span aria-hidden="true">...</span>
                </a>
            </li>
            <li :key="index" v-if="item === RIGHT_PAGE">
                <a>
                    <span aria-hidden="true">...</span>
                </a>
            </li> -->
            <li
                @click="onHandleClick(index + 1)"
                :class="{ active: index + 1 === +pageNumber }"
            >
                {{ index + 1 }}
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
    props: ['totalItems', 'perPage'],
    setup(props, { emit }) {
        const route = useRoute()
        const router = useRouter()
        const pageNumber = ref(route.query.pageNumber || 1)
        // const defaultPagesToDisplay = ref(5)

        const totalPages = computed(() =>
            Math.ceil(props.totalItems / props.perPage)
        )

        // const perPages = computed(() => {
        //     return totalPages.value > 0 &&
        //         totalPages.value < defaultPagesToDisplay.value
        //         ? totalPages.value
        //         : defaultPagesToDisplay.value
        // })

        // const minPage = computed(() => {
        //     if (pageNumber.value >= perPages.value) {
        //         const pagesToAdd = Math.floor(perPages.value / 2)
        //         const newMaxPage = pagesToAdd + pageNumber.value
        //         if (newMaxPage > totalPages.value) {
        //             return totalPages.value - perPages.value + 1
        //         }
        //         return pageNumber.value - pagesToAdd
        //     } else {
        //         return 1
        //     }
        // })

        // const maxPage = computed(() => {
        //     if (pageNumber.value >= perPages.value) {
        //         const pagesToAdd = Math.floor(perPages.value / 2)
        //         const newMaxPage = pagesToAdd + pageNumber.value
        //         if (newMaxPage < totalPages.value) {
        //             return newMaxPage
        //         } else {
        //             return totalPages.value
        //         }
        //     } else {
        //         return perPages.value
        //     }
        // })

        // const range = (from, to, step = 1) => {
        //     let i = from
        //     const range = []

        //     while (i <= to) {
        //         range.push(i)
        //         i += step
        //     }

        //     return range
        // }

        const onHandleClick = (page) => {
            pageNumber.value = page
            emit('page', pageNumber.value)
            router.push({
                name: 'News',
                query: { pageNumber: pageNumber.value },
            })
        }

        return {
            pageNumber: computed(() => pageNumber.value),
            // minPage: minPage.value,
            // maxPage: maxPage.value,
            // perPage: perPages.value,
            onHandleClick,
            totalPages: totalPages.value,
            // range,
        }
    },
}
</script>

<style lang="scss">
.paginate {
    display: flex;
    padding-left: 0;
    ul {
        padding-left: 0;
    }
    li {
        list-style: none;
        margin-right: 25px;
        border: 1px solid transparent;
        border-radius: 100%;
        background-color: transparent;
        padding: 7px 15px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        &.active {
            background-color: #7948e6;
        }
    }
}
</style>
