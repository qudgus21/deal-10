import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PW,
  region: process.env.AWS_REGION,
});

const multerProduct = multer({
  storage: multerS3({
    s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    bucket: 'deal10/products',
  }),
});

export const uploadImage = multerProduct.array('img');
