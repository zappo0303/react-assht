import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import useProductMutation from "../../../hook/UseProductMutation";
import UseCategory from "../../../hook/UseCategory";
import useProductsQuery from "../../../hook/UseProductsQuerry";
import { CategoryFace } from "@/interfaces/Category";
import { FormProductAdd } from "@/interfaces/formdata";

const ProductAddPage = () => {
  const navigate = useNavigate();
  const { mutate } = useProductMutation({ action: "CREATE" });
  const { id } = useParams();
  const { data: category, isLoading: loadingCategory } = UseCategory();
  const { data, isLoading } = useProductsQuery(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [imgCategoryURLs, setImgCategoryURLs] = useState<string[]>([]);

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

  const handleImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const url = await uploadFile(files[0]);
      setImgURL(url);
    }
  };

  const handleImgCategoryChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const urls = await Promise.all(Array.from(files).map(uploadFile));
      setImgCategoryURLs(urls);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProductAdd>();

  const onSubmit = async (formData: FormProductAdd) => {
    try {
      setIsSubmitting(true); 
      await mutate({
        ...formData,
        img: imgURL || data?.img,
        imgCategory: imgCategoryURLs.length ? imgCategoryURLs : data?.imgCategory,
      });
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    } catch (error) {
      toast.error("Lỗi khi Thêm sản phẩm");
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
        Thêm sản phẩm
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
            type="file"
            onChange={handleImgChange}
            variant="outlined"
            error={!!errors.img}
            helperText={errors.img && "Không được để trống"}
          />
          {imgURL && (
            <Box mt={1}>
              <img
                src={imgURL}
                alt="Uploaded Product"
                style={{ width: "100px", height: "auto" }}
              />
            </Box>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            type="file"
            onChange={handleImgCategoryChange}
            inputProps={{ multiple: true }}
            variant="outlined"
            error={!!errors.imgCategory}
            helperText={errors.imgCategory && "Không được để trống"}
          />
          {imgCategoryURLs.length > 0 && (
            <Box mt={1} sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              {imgCategoryURLs.map((img, index) => (
                <Box key={index} sx={{ display: "flex" }}>
                  <img
                    src={img}
                    alt={`Uploaded Category ${index}`}
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
          disabled={isSubmitting}
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

export default ProductAddPage;
