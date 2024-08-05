import { getCategorys, getCategorysById } from "../services/category/Category";
import { useQuery } from "react-query";

const UseCategory = (id? : number | string) => {

    const { data, ...rest } = useQuery({
        queryKey: ["CATEGORY_KEY", id],
        queryFn: async () => {
            return id ? await getCategorysById(id) : await getCategorys();
        },
    });
    return { data, ...rest };
}
export default UseCategory;
