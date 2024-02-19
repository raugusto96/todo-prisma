import { env } from "./env";

export const base = {
  api: {
    url: env.isDev ? "localhost:5050" : "",
  },
};
