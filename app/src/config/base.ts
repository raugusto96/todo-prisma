import env from "@/config/env";

const base = {
  api: {
    url: env.isDev ? "http://localhost:5050/api" : "",
  },
};

export default base;
