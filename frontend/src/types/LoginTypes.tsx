export type TCredentials = {
  username: string; // username, email, mobile
  password: string;
};

export type TRegistrationForm = {
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
};

export type TTokens = {
  token?: string | null;
  refreshToken?: string | null;
};
