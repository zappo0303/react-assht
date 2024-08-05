import { useMutation, useQueryClient } from "react-query";
import { IdProducts } from "../interfaces/Products";
import { addProduct, deleteProduct, updateProduct } from "../services/Products";
import { toast } from "react-toastify";

type useProductMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
};
const useProductMutation = ({ action }: useProductMutationProps) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (product: IdProducts) => {
      switch (action) {
        case "CREATE":
          await addProduct(product);
          toast.success("Thêm sản phẩm thành công");
          break;
        case "UPDATE":
          await updateProduct(product);
          toast.success("Cập nhật sản phẩm thành công");
          break;
        case "DELETE":
          if (window.confirm("Bạn muốn xóa sản phẩm không ")) {
            await deleteProduct(product._id!);
            toast.success("Xóa sản phẩm thành công !!")
          }
          break;
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PRODUCT_KEY"],
      });
    },
  });
  return { mutate, ...rest };
};
export default useProductMutation;
