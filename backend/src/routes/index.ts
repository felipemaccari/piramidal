import { Router } from "express";

import challengesRoutes from "./challenges.routes";
import playersRoutes from "./players.routes";
import tournamentsRoutes from "./tournaments.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use("/players", playersRoutes);
router.use("/users", usersRoutes);
router.use("/challenges", challengesRoutes);
router.use("/tournaments", tournamentsRoutes);

export default router;
