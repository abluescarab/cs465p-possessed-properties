import { Client } from "minio";

export const minioClient = new Client({
  endPoint: "127.0.0.1",
  port: 9000,
  useSSL: false,
  accessKey: "admin",
  secretKey: "password",
});

export const uploadFile = async (file: any): Promise<boolean> => {
  let success = false;

  try {
    await minioClient.putObject(
      "minio-possessedprops",
      file.filename,
      file.file,
      (error: any, etag: any) => {
        if (error) {
          console.log(`Failed to upload file: ${error}`);
          success = false;
        } else {
          console.log("File upload successful");
          success = true;
        }
      }
    );
  } catch (error) {
    console.log(`Failed to upload file: ${error}`);
    success = false;
  }

  return success;
};
