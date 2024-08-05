import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addCart, removeProduct } from "../services/cart/Cart";
import { CartOrder } from "../interfaces/Cart";

type UseCartMutation = {
  action: "CREATE" | "UPDATE" | "DELETE";
};
const useCartMutation = ({ action }: UseCartMutation) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (Cart: CartOrder) => {
      switch (action) {
        case "CREATE":
          await addCart(Cart);
          toast.success("Thêm sản phẩm vào giỏ hàng thành công !!" )
          break;
        case "UPDATE":
          // await updateProduct(product);
          toast.success("Cập nhật sản phẩm thành công");
          break;
        case "DELETE":
          if (window.confirm("Bạn muốn xóa sản phẩm không ")) {
            await removeProduct(Cart.userId, Cart.productId);
            toast.success("Xóa sản phẩm thành công");
          }
          break;
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["CART_ORDER"],
      });
    },
  });
  return { mutate, ...rest };
};
export default useCartMutation;
