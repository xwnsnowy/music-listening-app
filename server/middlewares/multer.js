import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "picture") {
      cb(null, "/uploads/images");
    } else if (file.fieldname === "song") {
      cb(null, "/uploads/songs");
    } else {
      cb(null, "/uploads");
    }
  },
  filename: (req, file, cb) => {
    let fileExt = file.originalname.split(".").pop();

    const fileName = `${new Date().getTime()}.${fileExt}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "picture") {
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/gif"
    ) {
      req.fileValidationError = "File type must be JPEG, PNG, or GIF";

      return cb(null, false, req.fileValidationError);
    }
  } else if (file.fieldname === "song") {
    if (file.mimetype !== "audio/mpeg" && file.mimetype !== "audio/mp3") {
      req.fileValidationError = "File type must be audio/mp3 or audio/mpeg";

      return cb(null, false, req.fileValidationError);
    }
  }

  cb(null, true);
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
