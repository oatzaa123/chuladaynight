const catchAsync = require("../../../helpers/catchAsync");
const APIFeatures = require("../../../utils/apiFeatures");
const ErrorHandler = require("../../../helpers/errorHandler");
const Partner = require("../../models/partner.model");
const { uploadFileResize } = require("../../../middleware/upload");

exports.getPartners = catchAsync(async (req, res) => {
  const featuresPartner = new APIFeatures(Partner.find(), req.query)
    .filter()
    .limitFields()
    .paginate()
    .sort();

  const AllPartner = await featuresPartner.query;

  res.status(200).json({
    status: "success",
    data: {
      Partner: AllPartner,
    },
  });
});

exports.addPartner = catchAsync(async (req, res, next) => {
  let coverImageName;
  const { path } = req.body;

  if (req.files) {
    const { coverImage } = req.files;
    if (coverImage) {
      const name = await uploadFileResize(coverImage, path);
      if (!name)
        return next(
          new ErrorHandler(`Can't upload image! please try again.`, 500)
        );
      coverImageName = {
        path,
        name,
      };
    }
  }

  let obj = {
    ...req.body,
    coverImage: coverImageName,
  };

  const partner = await Partner.create(obj);

  res.status(201).json({
    status: "success",
    data: {
      partner,
    },
  });
});
