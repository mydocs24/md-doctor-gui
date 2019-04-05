import { env } from "../../settings/guiDoctor/environments/production";

module.exports = {
  NODE_ENV: env.mode || '"production"',
  API_URL: env.apiHost || '"http://api.medcenter24.com"',
};
