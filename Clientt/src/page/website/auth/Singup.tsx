import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { IFormInput } from "@/interfaces/Auth";
import { register } from "../../../services/Auth/Auth";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ApiResponse } from "@/interfaces/Messages";
import { useNavigate } from "react-router-dom";

const FormContainer = styled(Container)({
  marginTop: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledBox = styled(Box)({
  width: "100%",
  marginTop: "10px",
  maxWidth: "400px",
});

const RegisterForm = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const password = watch("password");
  const Navigate = useNavigate();
  // =================  Submit ===============//
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await register(data);
      toast.success("Đăng ký thành công!");
      Navigate("/signin")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400) {
          const responseData = axiosError.response.data as ApiResponse;
          if (responseData.messages && responseData.messages.length > 0) {
            toast.error(responseData.messages[0]);
          } 
        } 
      } 
      toast.error("Đã xảy ra lỗi vui lòng thử lại !!");
    }
  };
  // =================  Submit ===============//

  return (
    <FormContainer maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
      Register
      </Typography>
      <form style={{ width: 400 }} onSubmit={handleSubmit(onSubmit)}>
        <StyledBox>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name là bắt buộc" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />
        </StyledBox>
        <StyledBox>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email là bắt buộc",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Email không hợp lệ",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />
        </StyledBox>
        <StyledBox>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password là bắt buộc",
              minLength: {
                value: 6,
                message: "Password phải có ít nhất 6 ký tự",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />
        </StyledBox>
        <StyledBox>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Confirm Password là bắt buộc",
              validate: (value) => value === password || "Passwords không khớp",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
              />
            )}
          />
        </StyledBox>
        <StyledBox>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "black",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.8)",
              },
              color: "white",
            }}
            fullWidth
          >
           Register
          </Button>
        </StyledBox>
      </form>
    </FormContainer>
  );
};

export default RegisterForm;
