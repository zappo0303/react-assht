import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addCategory, deleteCategory, updateCategory } from "../services/category/Category";

interface Category {
  _id: string;
  name: string;
  // Thêm các thuộc tính khác nếu cần
}

type useCategoryMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
};

const UseCategoryMutation = ({ action }: useCategoryMutationProps) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (category: Category) => {
      switch (action) {
        case "CREATE":
          await addCategory(category);
          toast.success("Thêm danh mục thành công");
          break;
        case "UPDATE":
          await updateCategory(category);
          toast.success("Cập nhật danh mục thành công");
          break;
        case "DELETE":
          if (window.confirm("Bạn muốn xóa danh mục không?")) {
            await deleteCategory(category._id);
            toast.success("Xóa danh mục thành công");
          }
          break;
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["CATEGORY_KEY"]);
    },
  });

  return { mutate, ...rest };
};

export default UseCategoryMutation;
