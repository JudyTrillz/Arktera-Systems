export interface ContactSubmission {
  first_name: string;
  last_name: string;
  business: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}

export interface ApiSuccessResponse<T = null> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
}
