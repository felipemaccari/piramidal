import { Router } from "express";

import challengesRoutes from "./challenges.routes";
import playersRoutes from "./players.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use("/players", playersRoutes);
router.use("/users", usersRoutes);
router.use("/challenges", challengesRoutes);

export default router;
