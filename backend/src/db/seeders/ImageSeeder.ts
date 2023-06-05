import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { uploadFile } from "../../plugins/minio.js";
import * as fs from "fs";

export class ImageSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // image directory relative to the backend root
    const dir = "src/assets/images";

    // read all filenames in the directory
    await fs.readdir(dir, (error, filenames) => {
      // if this fails, quit
      if (error) {
        console.log(error);
        return;
      }

      // loop through filenames (as strings)
      filenames.forEach((filename) => {
        // read the file
        fs.readFile(`${dir}/${filename}`, async (fileErr, file) => {
          // if the file can't be read, log it and continue
          if (fileErr) {
            console.log(error);
          } else {
            // upload the file to minio
            await uploadFile({ filename, file });
          }
        });
      });
    });
  }
}
