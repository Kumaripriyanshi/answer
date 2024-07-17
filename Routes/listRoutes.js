import express from "express";
import {
  addLists,
  deleteList,
  deleteListContent,
  fetchAllImage,
  getListByUserId,
  getListContent,
  updateList,
} from "../Controllers/listControllers.js";
import { requireSignIn } from "../Middlewares/authMiddlewares.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/addLists", requireSignIn, addLists);

router.get("/fetchLists", fetchAllImage);

router.get("/fetchListsByUserId", requireSignIn, getListByUserId);

router.get("/listpage/:listId", requireSignIn, getListContent);

router.delete("/deleteList/:listId", requireSignIn, deleteList);

router.delete(
  "/deleteListContent/:listContentId",
  requireSignIn,
  deleteListContent
);

router.put("/updateList/:listId", requireSignIn, updateList);

export default router;
