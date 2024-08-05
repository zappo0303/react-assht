import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import useProductMutation from "../../../hook/UseProductMutation";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import UseCategory from "../../../hook/UseCategory";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { CategoryFace } from "@/interfaces/Category";
import { FormProductAdd } from "@/interfaces/formdata";
import useProductsQuery from "../../../hook/UseProductsQuerry";
import { useEffect } from "react";

const ProductEdit = () => {
  const navigate = useNavigate();
  const { mutate } = useProductMutation({ action: "UPDATE" });
  const { id } = useParams();
  const { data: category, isLoading: loadingCategory } = UseCategory();
  const { data, isLoading } = useProductsQuery(id);

  const uploadFile = async (file: File) => {
    const CLOUD_NAME = "dzafnopsc";
    const PRESET_NAME = "nthShop";
    const FOLDER_NAME = "NTHSHOP";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", file);

    const response = await axios.post(api, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.secure_url;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProductAdd>();

  useEffect(() => {
    if (!isLoading && data) {
      const productById = {
        ...data,
        category: data.category,
      };
      reset(productById);
    }
  }, [data, isLoading, reset]);

  const onSubmit = async (formData: FormProductAdd) => {
    try {
      // Xử lý ảnh sản phẩm chính
      const imageUrl = formData.img[0] ? await uploadFile(formData.img[0]) : data.img;

      // Xử lý ảnh danh mục
      const imgCategoryUrls = formData.imgCategory.length
        ? await Promise.all(Array.from(formData.imgCategory).map(uploadFile))
        : data.imgCategory;

      await mutate({
        ...formData,
        img: imageUrl,
        imgCategory: imgCategoryUrls,
      });
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    } catch (error) {
      toast.error("Lỗi khi sửa sản phẩm");
    }
  };

  if (isLoading || loadingCategory) return <CircularProgress />;

  return (
    <Container maxWidth="lg">
      <Typography
        style={{ fontSize: "40px", marginBottom: "30px", paddingTop: "24px" }}
        variant="h1"
        component="h1"
      >
        Sửa sản phẩm
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register("name", { required: true })}
            label="Tên sản phẩm"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name && "Không được để trống"}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register("price", {
              required: true,
              validate: (value) => !isNaN(Number(value)),
            })}
            label="Giá sản phẩm"
            variant="outlined"
            error={!!errors.price}
            helperText={
              errors.price &&
              (errors.price.type === "required"
                ? "Không được để trống"
                : "Giá sản phẩm phải là số")
            }
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register("img")}
            type="file"
            variant="outlined"
            error={!!errors.img}
            helperText={errors.img && "Không được để trống"}
          />
          {data?.img && (
            <Box mt={1}>
              <img
                src={data.img}
                alt="Current Product"
                style={{ width: "100px", height: "auto" }}
              />
            </Box>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register("imgCategory")}
            type="file"
            inputProps={{ multiple: true }}
            variant="outlined"
            error={!!errors.imgCategory}
            helperText={errors.imgCategory && "Không được để trống"}
          />
          {data?.imgCategory && (
            <Box mt={1} sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              {data.imgCategory.map((img: string, index: number) => (
                <Box key={index} sx={{ display: "flex" }}>
                  <img
                    src={img}
                    alt={`Current Category ${index}`}
                    style={{ width: "80px", height: "80px" }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register("discount", {
              required: true,
              validate: (value) => !isNaN(Number(value)),
            })}
            label="Sale"
            variant="outlined"
            error={!!errors.discount}
            helperText={
              errors.discount &&
              (errors.discount.type === "required"
                ? "Không được để trống"
                : "Sale phải là số")
            }
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register("coutInStock", {
              required: true,
              validate: (value) => !isNaN(Number(value)),
            })}
            label="Số lượng trong kho"
            variant="outlined"
            error={!!errors.coutInStock}
            helperText={
              errors.coutInStock &&
              (errors.coutInStock.type === "required"
                ? "Không được để trống"
                : "Số lượng trong kho phải là số")
            }
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            {...register("category", { required: true })}
            defaultValue={data?.category || ""}
            variant="outlined"
            label="Category"
            error={!!errors.category}
          >
            {category &&
              category.map((item: CategoryFace, index: number) => (
                <MenuItem key={index} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
          {errors.category && (
            <Box style={{ color: "red", margin: "8px 0" }}>
              Không được để trống
            </Box>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register("description", { required: true })}
            label="Mô tả sản phẩm"
            variant="outlined"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description && "Không được để trống"}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "black",
          }}
        >
          Submit
        </Button>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default ProductEdit;
