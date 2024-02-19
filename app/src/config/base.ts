import { env } from "@/config";

export const base = {
  api: {
    url: env.isDev ? "localhost:5050" : "",
  },
};
