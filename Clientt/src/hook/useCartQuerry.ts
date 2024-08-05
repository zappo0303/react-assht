import { useQuery } from "react-query";
import { getAllProducts } from "../services/Products";
import { getAllCart } from "../services/cart/Cart";

const useCartsQuery = (id? : number | string) => {

    const { data, ...rest } = useQuery({
        queryKey: ["CART_ORDER", id],
        queryFn: async () => {
            return id ? await getAllCart(id) : await getAllProducts();
        },
     
    });
    return { data, ...rest };
}
export default useCartsQuery;

