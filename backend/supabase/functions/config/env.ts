function getEnv(name: string): string {
  const value = Deno.env.get(name);

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  supabaseUrl: getEnv("PROJECT_URL"),
  serviceRoleKey: getEnv("SERVICE_ROLE_KEY"),

  resendApiKey: getEnv("RESEND_API_KEY"),

  fromEmail: getEnv("FROM_EMAIL"),

  adminEmail: getEnv("ADMIN_EMAIL"),
};
