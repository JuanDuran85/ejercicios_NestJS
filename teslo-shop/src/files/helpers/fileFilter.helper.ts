export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file) return cb(new Error('File is empty'), false);

  const fileExtension: string = file.mimetype.split('/')[1];
  const validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif'];
  if (validExtensions.includes(fileExtension)) return cb(null, true);

  return cb(null, false);
};
