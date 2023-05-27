import { Client } from "minio";
import app from "./app.js";

export const minioClient = new Client({
  endPoint: "127.0.0.1",
  port: 9000,
  useSSL: false,
  accessKey: "admin",
  secretKey: "password",
});

export const uploadFile = async (file: any): Promise<void> => {
  try {
    await minioClient.putObject(
      "possessedprops",
      file.filename,
      file.file,
      (error: any, etag: any) => {
        if (error) {
          app.log.error(`Failed to upload file: ${error}`);
        } else {
          app.log.info("File upload successful");
        }
      }
    );
  } catch (error) {
    app.log.error(`Failed to upload file: ${error}`);
  }
};
