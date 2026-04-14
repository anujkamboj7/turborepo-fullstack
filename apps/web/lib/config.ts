// src/lib/config.ts

type Config = {
  NODE_ENV: "development" | "production" | "test";
  DATABASE_URL: string;
  NEXT_PUBLIC_API_URL: string;
  JWT_SECRET: string;
  BASE_URL: string;
  API_URL: string;
};

function getEnv(key: string, required = true): string {
  const value = process.env[key];

  if (!value && required) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value as string;
}

export const config: Config = {
  NODE_ENV: getEnv("NODE_ENV") as Config["NODE_ENV"],
  DATABASE_URL: getEnv("DATABASE_URL"),
  NEXT_PUBLIC_API_URL: getEnv("NEXT_PUBLIC_API_URL"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  BASE_URL: getEnv("BASE_URL"),
  API_URL: getEnv("API_URL"),
};
