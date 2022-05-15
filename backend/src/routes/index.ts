import { Router } from "express";

import authenticateRoutes from "./authenticate.routes";
import challengesRoutes from "./challenges.routes";
import playersRoutes from "./players.routes";
import tournamentsRoutes from "./tournaments.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use("/players", playersRoutes);
router.use("/users", usersRoutes);
router.use("/challenges", challengesRoutes);
router.use("/tournaments", tournamentsRoutes);
router.use(authenticateRoutes);

export default router;
