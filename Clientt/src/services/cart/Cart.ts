import { CartOrder } from "@/interfaces/Cart";
import axiosInstance from "../../config/Axios";
import { toast } from "react-toastify";

export const getAllCart = async (userId: number | string) => {
  try {
    const response = await axiosInstance.get(`api/v1/carts/${userId}`);
    return response.data;
  } catch (error) {
    toast.error("Lỗi khi lấy danh sách sản phẩm từ server");
    console.log(error);
  }
};

export const addCart = async ({ userId, productId, quantity }: CartOrder) => {
  try {
    const response = await axiosInstance.post("api/v1/carts/add-to-cart", {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!!");
  }
};


// // Hàm tăng số lượng
// export const incrementQuantity = async ({ userId, productId }: CartOrder) => {
//   try {
//     const response = await axiosInstance.put("api/v1/carts/increase", { userId, productId });
//     return response.data;
//   } catch (error) {
//     toast.error("Có lỗi xảy ra khi tăng số lượng sản phẩm !!");
//     throw error; // Ném lỗi ra ngoài để xử lý nếu cần
//   }
// };
// Hàm giảm số lượng
export const removeProduct = async ( userId : string, productId: string ) => {
  try {
    const response = await axiosInstance.post("api/v1/carts/remove", { userId, productId } );
    return response.data;
  } catch (error) {
    toast.error("Có lỗi xảy ra khi giảm số lượng sản phẩm !!");
    throw error; 
  }
};
