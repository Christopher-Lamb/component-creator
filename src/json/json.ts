import { routes } from "./routes.ts";
import { companyInfo } from "./companyInfo.ts";
import { linkBoxes } from "./linkboxes.ts";
import { slidesArray } from "./slidesArray.ts";
import { css } from "./css.ts";
import { vars } from "./vars.ts";

export const allJson = {
  routes,
  ...companyInfo,
  linkBoxes,
  slidesArray,
  ...css,
  ...vars,
};
