import { Client } from "minio";
import dotenv from "dotenv";

dotenv.config();

export const minioClient = new Client({
  endPoint: process.env.MINIO_HOST,
  port: Number(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: "admin",
  secretKey: "password",
});

export const uploadFile = async (file: any) => {
  await minioClient.putObject("possessedprops", file.filename, file.file);
};
