import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,

  nodeEnv: process.env.NODE_ENV,

  databaseUrl: process.env.DATABASE_URL,

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "",
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "1d",

    refreshSecret: process.env.JWT_REFRESH_SECRET || "",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },
};

export default config;