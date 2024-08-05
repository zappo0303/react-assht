import  { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import UseCategoryMutation from "../../../hook/UseCategoryMutation";
import { useNavigate, useParams } from "react-router-dom";
import UseCategory from "../../../hook/UseCategory";

// Định nghĩa kiểu dữ liệu cho form
interface FormValues {
  name: string;
}

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const { data, isLoading } = UseCategory(id);

  useEffect(() => {
    if (!isLoading && data) {
      reset({ name: data.category.name });
    }
  }, [data, isLoading, reset]);

  const { mutate } = UseCategoryMutation({
    action: "UPDATE"
  });

  // Hàm xử lý khi gửi form
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await mutate({ _id: id!, name: data.name });
    setTimeout(() => {
        navigate("/admin/category"); 
    }, 500);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ backgroundColor: "#fff", borderRadius: 1, padding: 3, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Cập nhật danh mục sản phẩm
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              label="Tên Danh mục"
              variant="outlined"
              fullWidth
              {...register("name", { required: "Không được để trống" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Cập nhật
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default EditCategory;
