import { useQuery } from "react-query";
import { getAllProducts, getProductById } from "../services/Products";

const useProductsQuery = (id? : number | string) => {

    const { data, ...rest } = useQuery({
        queryKey: ["PRODUCT_KEY", id],
        queryFn: async () => {
            return id ? await getProductById(id) : await getAllProducts();
        },
    });
    return { data, ...rest };
}
export default useProductsQuery;

