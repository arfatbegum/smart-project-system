import bcrypt from "bcrypt";
import { createToken } from "../../helpers/jwtHelpers";
import { ILoginUser, IRegisterUser } from "./auth.interface";
import { prisma } from "../../config/prisma";

const registerUser = async (payload: IRegisterUser) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
  });

  return user;
};

const loginUser = async (payload: ILoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!passwordMatched) {
    throw new Error("Invalid email or password");
  }

const accessToken = createToken(
  {
    id: user.id,
    email: user.email,
    role: user.role,
  },
  process.env.JWT_ACCESS_SECRET!,
  process.env.JWT_ACCESS_EXPIRES_IN
);


  return {
    accessToken,
    user,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};