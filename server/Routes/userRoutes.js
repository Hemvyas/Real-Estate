import { Router } from "express";
const router = Router();
import {
  getAllBooking,
  bookVisit,
  register,
  cancelBooking,
  addFav,
  removeFav,
  getAllFavorites,
  updateUser,
} from "../Controllers/userController.js";
import jwt from "../auth.js";

router.post("/register",jwt, register);
router.put("/update/:id",jwt, updateUser);
router.post("/bookVisit/:id", bookVisit);
router.get("/allBooking", getAllBooking);
router.put("/removeBook/:bookingId",jwt, cancelBooking);
router.post("/addFav/:propertyId",jwt, addFav);
router.put("/removeFav/:propertyId",jwt, removeFav);
router.get("/allFav", getAllFavorites);
export default router;
