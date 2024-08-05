import axiosInstance from "../../config/Axios";
import { IFormInput, LoginForm } from "@/interfaces/Auth";
export const register = async (data: IFormInput) => {
    // try {
    const response = await axiosInstance.post(`api/v1/singup`, data);
    return response.data;
    // } catch (error) {
    //     if (error.response) {
    //         console.error(error.response.data); 
    //         alert(error.response.data.messages[0]);
    //       } else if (error.request) {
    //         console.error(error.request);
    //       } else {
    //         console.error('Error', error.message);
    //       }
    // }
}
export const Login = async (data: LoginForm) => {
    // try {
    const response = await axiosInstance.post(`api/v1/singin`, data);
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Return user data
    return user;
    // } catch (error) {
    //     if (error.response) {
    //         console.error(error.response.data); 
    //         alert(error.response.data.messages[0]);
    //       } else if (error.request) {
    //         console.error(error.request);
    //       } else {
    //         console.error('Error', error.message);
    //       }
    // }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
