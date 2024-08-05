// Interface cho dữ liệu form
export interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Interface cho dữ liệu form
export interface LoginForm {
  email: string;
  password: string;
}

interface User {
  name: string;
  // Các thuộc tính khác nếu cần
}