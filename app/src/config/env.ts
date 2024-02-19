import { config } from "dotenv";
config();

export const env = {
  isDev: process.env.NODE,
};
