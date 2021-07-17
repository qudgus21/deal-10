import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import multer from 'multer';
import dotenv from 'dotenv';
const path = require('path');

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PW,
});

// export const localMiddlewares = (req, res, next) => {
//   res.locals.siteName = "metube";
//   res.locals.routes = routes;
//   res.locals.loggedUser = req.user || null;
//   next();
// };

// export const onlyPrivate = (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.redirect(routes.home);
//   }
// };

// export const onlyPublic = (req, res, next) => {
//   if (req.user) {
//     res.redirect(routes.home);
//   } else {
//     next();
//   }
// };

// const multerVideo = multer({
//   storage: multerS3({
//     s3,
//     acl: "public-read",
//     bucket: "mytube2/video"
//   })
// });

// const multerAvatar = multer({
//   storage: multerS3({
//     s3,
//     acl: "public-read",
//     bucket: "mytube2/avatar"
//   })
// });

// export const uploadVideo = multerVideo.single("videoFile");
// export const uploadAavatar = multerAvatar.single("avatar");
