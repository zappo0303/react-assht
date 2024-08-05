import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import UseCategoryMutation from "../../../hook/UseCategoryMutation";
import { useNavigate } from "react-router-dom";

interface FormValues {
    _id:string,
  name: string;
}

const AddCategory = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const { mutate } = UseCategoryMutation({ action: "CREATE" });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await mutate(data);
    setTimeout(() => {
        navigate("/admin/category"); 
    },500);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ backgroundColor: "#fff", borderRadius: 1, padding: 3, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Thêm danh mục sản phẩm
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
            Submit
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default AddCategory;
