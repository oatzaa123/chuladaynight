const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

const uploadFile = async (file, pathFolder) => {
  const { mimetype, name } = await file;
  if (
    ["image/jpeg", "image/jpg", "image/png", "image/gif"].indexOf(mimetype) < 0
  ) {
    return false;
  }

  const imageName = `${Date.now()}.${
    name.split(".")[name.split(".").length - 1]
  }`;

  const storePath = path.join(
    __dirname,
    `/../assets/uploads/images/${pathFolder}/`,
    imageName
  );

  if (
    !fs.existsSync(
      path.join(__dirname, `/../assets/uploads/images/${pathFolder}/`)
    )
  ) {
    fs.mkdirSync(
      path.join(__dirname, `/../assets/uploads/images/${pathFolder}/`)
    );
  }

  file.mv(storePath, (err) => {
    if (err) {
      console.log(err);
      return false;
    }
  });

  // const img = await sharp(file.data)
  //     .resize({ height: '500px', fit: 'fill' })
  //     .png()
  //     .toFile(storePath)

  // return img ? imageName : null
  return imageName;
};

const uploadVideo = async (file, pathFolder) => {
  const { mimetype, name } = await file;
  if (["video/mp4", "video/x-matroska"].indexOf(mimetype) < 0) {
    return false;
  }

  const videoName = `${Date.now()}.${
    name.split(".")[name.split(".").length - 1]
  }`;

  const storePath = path.join(
    __dirname,
    `/../assets/uploads/videos/${pathFolder}/`,
    videoName
  );

  if (
    !fs.existsSync(
      path.join(__dirname, `/../assets/uploads/videos/${pathFolder}/`)
    )
  ) {
    fs.mkdirSync(
      path.join(__dirname, `/../assets/uploads/videos/${pathFolder}/`)
    );
  }

  file.mv(storePath, (err) => {
    if (err) return false;
  });

  return videoName;
};

const uploadSubtitle = async (file, pathFolder) => {
  const { mimetype, name } = await file;
  if (["text/vtt"].indexOf(mimetype) < 0) {
    return false;
  }

  const subtitleName = `${Date.now()}.${
    name.split(".")[name.split(".").length - 1]
  }`;

  const storePath = path.join(
    __dirname,
    `/../assets/uploads/videos/${pathFolder}/`,
    subtitleName
  );

  if (
    !fs.existsSync(
      path.join(__dirname, `/../assets/uploads/videos/${pathFolder}/`)
    )
  ) {
    fs.mkdirSync(
      path.join(__dirname, `/../assets/uploads/videos/${pathFolder}/`)
    );
  }

  file.mv(storePath, (err) => {
    if (err) return false;
  });

  return subtitleName;
};

const uploadModel = async (file, pathFolder) => {
  const { mimetype, name } = await file;
  if (["model/glb", "model/gltf-binary"].indexOf(mimetype) < 0) {
    return false;
  }

  const modelName = `${Date.now()}.${
    name.split(".")[name.split(".").length - 1]
  }`;

  const storePath = path.join(
    __dirname,
    `/../assets/uploads/models/${pathFolder}/`,
    modelName
  );

  if (
    !fs.existsSync(
      path.join(__dirname, `/../assets/uploads/models/${pathFolder}/`)
    )
  ) {
    fs.mkdirSync(
      path.join(__dirname, `/../assets/uploads/models/${pathFolder}/`)
    );
  }

  file.mv(storePath, (err) => {
    if (err) return false;
  });

  return modelName;
};

module.exports = { uploadFile, uploadVideo, uploadModel, uploadSubtitle };
