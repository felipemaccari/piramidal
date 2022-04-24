import { Router } from "express";

import playersRoutes from "./players.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use("/players", playersRoutes);
router.use("/users", usersRoutes);

export default router;
