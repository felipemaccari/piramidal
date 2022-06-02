import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";

interface IImportPlayers {
  name: string;
  phone: string;
}

@injectable()
class ImportPlayersUseCase {
  constructor(
    @inject("PlayersRepository") private playersRepository: IPlayersRepository
  ) {}

  loadPlayers(file: Express.Multer.File): Promise<IImportPlayers[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const players: IImportPlayers[] = [];

      const parseFile = parse();
      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, phone] = line;

          players.push({
            name,
            phone,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(players);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadPlayers(file);

    categories.map(async (category) => {
      const { name, phone } = category;

      const existsPlayer = await this.playersRepository.findByName(name);

      if (!existsPlayer) {
        await this.playersRepository.create({
          name,
          phone,
        });
      }
    });
  }
}

export default ImportPlayersUseCase;
