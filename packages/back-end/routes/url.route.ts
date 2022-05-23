import express from "express";
import { generateUrl } from "../controllers/generateUrl";
import { getRealUrl } from "../controllers/getRealUrl";

export const urlRoute = () => {
  const urlRouter = express.Router();
  urlRouter.route("/url").post(generateUrl).get(getRealUrl);

  return urlRouter;
};
