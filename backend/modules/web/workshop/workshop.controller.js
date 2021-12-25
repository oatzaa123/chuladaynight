const catchAsync = require("../../../helpers/catchAsync");
const APIFeatures = require("../../../utils/apiFeatures");
const ErrorHandler = require("../../../helpers/errorHandler");
const Workshop = require("./../../models/workshop.model");
const {
  uploadFile,
  uploadFileResize,
} = require("./../../../middleware/upload");
const paths = require("path");
const fs = require("fs");
const util = require("util");
const unlink = util.promisify(fs.unlink);

exports.getWorkshops = catchAsync(async (req, res) => {
  const featuresWorkshop = new APIFeatures(Workshop.find(), req.query)
    .filter()
    .limitFields()
    .paginate()
    .sort();

  const AllWorkshop = await featuresWorkshop.query;

  res.status(200).json({
    status: "success",
    data: {
      Workshop: AllWorkshop,
    },
  });
});

exports.getWorkshop = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const workshop = await Workshop.findById(id);

  if (!workshop) return next(new ErrorHandler("Data not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      workshop,
    },
  });
});

exports.nextWorkshop = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const AllWorkshop = await Workshop.find();
  const workshop = AllWorkshop.find((item) => item._id.toString() === id);
  if (!workshop) return next(new ErrorHandler("Data not found", 404));

  const nextId = await Workshop.findOne({
    createdAt: { $gt: workshop.createdAt },
  });

  const nextWorkshop = nextId
    ? nextId
    : AllWorkshop.find((_, index) => index === 0);

  res.status(200).json({
    status: "success",
    data: {
      workshop: nextWorkshop,
    },
  });
});

exports.perviousWorkshop = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const AllWorkshop = await Workshop.find();
  const workshop = AllWorkshop.find((item) => item._id.toString() === id);
  if (!workshop) return next(new ErrorHandler("Data not found", 404));

  const perviousId = AllWorkshop.findIndex((item) => item._id === workshop._id);

  const perviousWorkshop =
    perviousId > 0
      ? AllWorkshop.find((_, index) => index === perviousId - 1)
      : AllWorkshop.find((_, index) => index === AllWorkshop.length - 1);

  res.status(200).json({
    status: "success",
    data: {
      workshop: perviousWorkshop,
    },
  });
});

exports.addWorkshop = catchAsync(async (req, res, next) => {
  let coverImageName, imageName;
  const { contact, path } = req.body;

  console.log("contact", contact);

  if (req.files) {
    const { coverImage, image } = req.files;
    if (coverImage) {
      const name = await uploadFileResize(coverImage, path, 328);
      if (!name)
        return next(
          new ErrorHandler(`Can't upload image! please try again.`, 500)
        );
      coverImageName = {
        path,
        name,
      };
    }

    if (image) {
      const name = await uploadFile(image, path);
      if (!name)
        return next(
          new ErrorHandler(`Can't upload image! please try again.`, 500)
        );
      imageName = {
        path,
        name,
      };
    }
  }

  let obj = {
    ...req.body,
    coverImage: coverImageName,
    image: imageName,
    contact: JSON.parse(contact) || "",
  };

  const workshop = await Workshop.create(obj);

  res.status(201).json({
    status: "success",
    data: {
      workshop,
    },
  });
});

exports.updateWorkshop = async (req, res, next) => {
  const { id } = req.params;
  const { path, oldFile } = req.body;
  let coverImageName;
  let newWorkShop = {};

  const workshop = await Workshop.findById(id);
  if (!workshop) return next(new ErrorHandler("Data not found", 404));

  if (req.body.contact) {
    let { contact } = req.body;
    contact = JSON.parse(contact);
    newWorkShop.contact = contact;
  }

  if (req.files) {
    const { coverImage, image } = req.files;

    if (coverImage) {
      if (
        JSON.parse(oldFile) &&
        JSON.parse(oldFile).coverImage &&
        fs.existsSync(
          paths.join(
            __dirname,
            `../../../assets/uploads/images/${path}/${
              JSON.parse(oldFile).coverImage
            }`
          )
        )
      ) {
        fs.unlinkSync(
          paths.join(
            __dirname,
            `../../../assets/uploads/images/${path}/`,
            JSON.parse(oldFile).coverImage
          )
        );
      }
      const name = await uploadFileResize(coverImage, path, 328);
      if (!name)
        return next(
          new ErrorHandler(`Can't upload coverImage! please try again.`, 500)
        );
      coverImageName = {
        path,
        name,
      };

      newWorkShop.coverImage = coverImageName;
    }

    if (image) {
      if (
        JSON.parse(oldFile) &&
        JSON.parse(oldFile).contentImage &&
        fs.existsSync(
          paths.join(
            __dirname,
            `../../../assets/uploads/images/${path}/${
              JSON.parse(oldFile).contentImage
            }`
          )
        )
      ) {
        fs.unlinkSync(
          paths.join(
            __dirname,
            `../../../assets/uploads/images/${path}/`,
            JSON.parse(oldFile).contentImage
          )
        );
      }
      const name = await uploadFile(image, path);
      if (!name)
        return next(
          new ErrorHandler(`Can't upload image! please try again.`, 500)
        );
      const imageName = {
        path,
        name,
      };

      newWorkShop.image = imageName;
    }
  }

  newWorkShop = {
    ...newWorkShop,
    ...req.body,
  };

  const updatedWorkshop = await Workshop.findByIdAndUpdate(
    { _id: id },
    { ...newWorkShop, updatedAt: Date.now() },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedWorkshop,
  });
};

exports.deleteWorkshop = catchAsync(async (req, res) => {
  const { id } = req.params;

  const workshop = await Workshop.findById(id);
  const { path, name } = workshop.coverImage;
  const { name: imgName } = workshop.image;

  const imageDirectory = paths.join(
    __dirname,
    `../../../assets/uploads/images/${path}`
  );
  await checkImages(imageDirectory, name);
  await checkImages(imageDirectory, imgName);

  await Workshop.deleteOne({ _id: id });
  res.status(204).send();
});

const checkImages = async (directory, filename) => {
  const unlinkPromises = await unlink(`${directory}/${filename}`);

  return unlinkPromises;
};
