import multer from 'multer';
const upload = multer({
  storage: multer.memoryStorage(),
});
export const uploadProfile = upload.fields([
  { name: 'profilePhoto' },
  { name: 'bannerPhoto' },
]);
export default upload;
