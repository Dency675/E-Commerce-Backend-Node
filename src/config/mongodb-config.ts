import { Config } from "../../types/configTypes";

const config: Config = {
  development: {
    mongoURI: `mongodb+srv://neelamkavil2002:${encodeURIComponent("Mikh@el#31")}@cluster0.ljgb07q.mongodb.net/?retryWrites=true&w=majority`,
    port: 3000,
    secretKey: "your-secret-key",
  },
  production: {
    mongoURI: ``,
    port: 8080,
    secretKey: "your-production-secret-key",
  },
};

export default config;
