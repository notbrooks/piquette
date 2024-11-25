// /server/services/aws/upload.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "~/env"

// Initialize the S3 client
const s3 = new S3Client({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
    },    
});

export async function UploadFile(fileBuffer: Buffer, fileName: string) {
    console.log("Starting file upload to S3");
  
    const params = {
      Bucket: env.AWS_S3_BUCKET!,
      Key: fileName,
      Body: fileBuffer,
    };
  
    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
  
      return `https://${env.AWS_S3_BUCKET}.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error("Error during file upload to S3:", error);
      throw error;
    }
  }