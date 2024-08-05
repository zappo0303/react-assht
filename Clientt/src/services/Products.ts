import axiosInstance from "../config/Axios";
import { IdProducts } from "../interfaces/Products";
import { toast } from "react-toastify";


export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/products");
    return response.data;
  } catch (error) {
    toast.error("Lỗi khi lấy danh sách sản phẩm từ server");
    console.log(error);
  }
};

export const getProductById = async (id?: number | string) => {
  try {
    const response = await axiosInstance.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    toast.error("Lỗi khi lấy thông tin sản phẩm từ server");
  }
};

export const addProduct = async (product: IdProducts) => {
  try {
    const response = await axiosInstance.post("/api/products", product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("Lỗi khi thêm sản phẩm");
  }
};

export const deleteProduct = async (id?: number | string) => {
  try {
    const response = await axiosInstance.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Lỗi khi xóa sản phẩm");
  }
};

export const updateProduct = async (product: IdProducts) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/${product._id}`,
      product
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Lỗi khi cập nhật sản phẩm");
  }
};
export const updateProductFeaturedStatus = async (id: string  , featured : boolean) => {
  try {
    const response = await axiosInstance.patch(`/api/products/${id}/featured`, { featured });
    return response.data;
  } catch (error) {
    console.error("Error updating product featured status:", error);
    toast.error("Lỗi khi cập nhật trạng thái nổi bật của sản phẩm");
  }
};