import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5000,

  nodeEnv: process.env.NODE_ENV,

  databaseUrl: process.env.DATABASE_URL,

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
  },

  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
};