import Router from "express"
import { createProperty, deleteProperty, getAllProperties, getProperty, getRandom, updateProperty } from "../Controllers/propertyController.js";
import jwt from "../auth.js";

const router = new Router();
router.post('/create',jwt,createProperty);
router.get("/getAllProperty", getAllProperties);
router.get("/:propId", getProperty);
router.get("/random",getRandom);
router.put("/update/:id", updateProperty);
router.delete("/delete/:id", deleteProperty);


export default router;