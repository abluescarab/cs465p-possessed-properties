import { Client } from "minio";

export const minioClient = new Client({
  endPoint: "127.0.0.1",
  port: 9000,
  useSSL: false,
  accessKey: "admin",
  secretKey: "password",
});

export const uploadFile = async (file: any) => {
  await minioClient.putObject("possessedprops", file.filename, file.file);
};
