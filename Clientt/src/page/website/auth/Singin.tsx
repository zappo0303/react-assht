import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { LoginForm } from "@/interfaces/Auth";
import { Login } from "../../../services/Auth/Auth";
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

const Singin = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>();
  const Navigate = useNavigate();
  // =================  Submit ===============//
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await Login(data);
      toast.success("Đăng nhập thành công!");
      Navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const responseData = axiosError.response?.data as ApiResponse;
        if (responseData?.messages && responseData.messages.length > 0) {
          toast.error(responseData.messages[0]);
        }
      }
      toast.error("Đã xảy ra lỗi vui lòng thử lại !!");
    }
  };

  // =================  Submit ===============//

  return (
    <FormContainer maxWidth="md" sx={{ py: 11 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form style={{ width: 400 }} onSubmit={handleSubmit(onSubmit)}>
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
            Login
          </Button>
        </StyledBox>
      </form>
    </FormContainer>
  );
};

export default Singin;
