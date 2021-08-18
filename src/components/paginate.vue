<template>
  <!-- <slot name="data" :pageNumber="pageNumber" /> -->
  <div class="paginate">
    <ul v-for="(item, index) in pages" :key="index">
      <li v-if="item === 'LEFT' || item === 'RIGHT'">
        <a>
          <span aria-hidden="true">...</span>
        </a>
      </li>
      <li
        v-else
        @click="onHandleClick(item)"
        :class="{ active: item === +pageNumber }"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  props: ["totalItems", "pageLimit", "pageNeighbours", "onPageChanged"],
  setup(props) {
    // console.log(props)
    const route = useRoute();
    const router = useRouter();
    const pageNumber = ref(route.query.pageNumber || 1);

    const totalPages = computed(() => {
      return Math.ceil(props.totalItems / props.pageLimit);
    });

    const LEFT_PAGE = ref("LEFT");
    const RIGHT_PAGE = ref("RIGHT");

    const fetchPageNumbers = () => {
      const totalPages = Math.ceil(props.totalItems / props.pageLimit);
      const currentPage = pageNumber.value;
      const pageNeighbours = +props.pageNeighbours;

      const totalNumbers = pageNeighbours * 2 + 3;
      const totalBlocks = totalNumbers + 2;

      if (totalPages > totalBlocks) {
        let pages = [];

        const leftBound = currentPage - pageNeighbours;
        const rightBound = currentPage + pageNeighbours;
        const beforeLastPage = totalPages - 1;

        const startPage = leftBound > 2 ? leftBound : 2;
        const endPage =
          rightBound < beforeLastPage ? rightBound : beforeLastPage;

        pages = range(startPage, endPage);

        const pagesCount = pages.length;
        const singleSpillOffset = totalNumbers - pagesCount - 1;

        const leftSpill = startPage > 2;
        const rightSpill = endPage < beforeLastPage;

        const leftSpillPage = LEFT_PAGE.value;
        const rightSpillPage = RIGHT_PAGE.value;

        if (leftSpill && !rightSpill) {
          const extraPages = range(
            startPage - singleSpillOffset,
            startPage - 1
          );
          pages = [leftSpillPage, ...extraPages, ...pages];
        } else if (!leftSpill && rightSpill) {
          const extraPages = range(endPage + 1, endPage + singleSpillOffset);
          pages = [...pages, ...extraPages, rightSpillPage];
        } else if (leftSpill && rightSpill) {
          pages = [leftSpillPage, ...pages, rightSpillPage];
        }

        return [1, ...pages, totalPages];
      }

      return range(1, totalPages);
    };

    const range = (from, to, step = 1) => {
      let i = from;
      const range = [];

      while (i <= to) {
        range.push(i);
        i += step;
      }

      return range;
    };

    const gotoPage = (page) => {
      const currentPage = Math.max(0, Math.min(page, totalPages.value));

      const paginationData = {
        currentPage,
        totalPages: totalPages.value,
        pageLimit: props.pageLimit,
        totalItems: props.totalItems,
      };
      pageNumber.value = currentPage;

      props.onPageChanged(paginationData);
    };

    const onHandleClick = (page) => {
      router.push({
        name: "News",
        query: { pageNumber: page },
      });
      gotoPage(page);
    };

    const pages = computed(() => fetchPageNumbers());

    onMounted(() => {
      gotoPage(route.query.pageNumber || 1);
    });

    return {
      pageNumber: computed(() => pageNumber.value),
      onHandleClick,
      totalPages: totalPages.value,
      pages,
    };
  },
};
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
