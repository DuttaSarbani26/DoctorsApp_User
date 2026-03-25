export interface RegistrePayload {
    first_name: string,
    last_name: string,
    email: string,
    address: string,
    password: string,
    confirm_password: string,
    status: boolean,
    message: string
}

export interface RegisterResponse {
    status: boolean,
    message: string,
    token?: string,
    data?: {
      id: string;
      [key: string]: any;
    }
}




export interface VerifyOtpPayload {
  userId: string;
  otp: string;
}

export interface VerifyOtpResponse {
  status: boolean;
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
  refreshToken?: string;
  data: {
    id: string;
    email: string;
    role: string;
  };
}

export interface Department {
  _id: string;
  name: string;
}




type DoctorFilterPayload = {
  department?: string[];
  search?: string;
};

export type DoctorListResponse = {
  status: boolean;
  message: string;
  data: any[];
};
