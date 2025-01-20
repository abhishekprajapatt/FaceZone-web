import multer from 'multer';
const upload = multer({
  storage: multer.memoryStorage(),
});
export const uploadProfile = upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'bannerPhoto', maxCount: 1 },
]);
export default upload;
