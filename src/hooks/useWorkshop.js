import { toRefs, reactive } from "vue";
import useAxios from "./useAxios";
export default function () {
  const workshops = reactive({
    data: [],
    errorMessage: null,
    isFetching: false,
  });
  const submitted = async () => {
    const { data, errorMessage, fetchData, isFetching } = useAxios(
      `/workshop`,
      "GET"
    );

    fetchData();

    workshops.data = data;
    workshops.errorMessage = errorMessage;
    workshops.isFetching = isFetching;
  };
  return { submitted, ...toRefs(workshops) };
}
