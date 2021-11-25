import { toRefs, reactive } from "vue";
import useAxios from "./useAxios";
export default function () {
  const partners = reactive({
    data: [],
    errorMessage: null,
    isFetching: false,
  });
  const getAll = () => {
    const { data, errorMessage, fetchData, isFetching } = useAxios(`/partner`);

    fetchData();
    console.log("ccc", data);

    partners.data = data;
    partners.errorMessage = errorMessage;
    partners.isFetching = isFetching;
  };

  return { getAll, ...toRefs(partners) };
}
