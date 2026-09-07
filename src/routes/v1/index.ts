import { Router } from "express";
import genericRoutes from "./generic.routes";
import authorRoutes from "./author.routes";
import postRoutes from "./post.routes";

const router = Router();

router.use("/generic", genericRoutes);
router.use("/authors", authorRoutes);
router.use("/posts", postRoutes);

export default router;
