import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { uploadFile } from "../../minio.js";
import * as fs from "fs";

export class ImageSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const dir = "src/assets/images";

    await fs.readdir(dir, (error, filenames) => {
      if (error) {
        console.log(error);
      } else {
        filenames.forEach((filename) => {
          fs.readFile(`${dir}/${filename}`, async (fileErr, file) => {
            if (fileErr) {
              console.log(error);
            } else {
              await uploadFile({
                filename,
                file,
              });
            }
          });
        });
      }
    });
  }
}
