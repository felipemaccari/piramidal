import { Router } from "express";
import multer from "multer";

import CreatePlayerController from "@modules/players/useCases/createPlayer/CreatePlayerController";
import ImportPlayersController from "@modules/players/useCases/importPlayers/ImportPlayersController";
import ListPlayersController from "@modules/players/useCases/listPlayers/ListPlayersController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const upload = multer({
  dest: "./tmp",
});

const playersRoutes = Router();

const createPlayerController = new CreatePlayerController();
const listPlayersController = new ListPlayersController();
const importPlayersController = new ImportPlayersController();

playersRoutes.use(ensureAuthenticated);
playersRoutes.post("/", createPlayerController.handle);
playersRoutes.get("/", listPlayersController.handle);
playersRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  importPlayersController.handle
);

export default playersRoutes;
