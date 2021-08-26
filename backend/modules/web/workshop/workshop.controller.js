const catchAsync = require('../../../helpers/catchAsync')
const APIFeatures = require('../../../utils/apiFeatures')
const ErrorHandler = require('../../../helpers/errorHandler')
const Workshop = require('./../../models/workshop.model')
const { uploadFile } = require('./../../../middleware/upload')

exports.getWorkshops = catchAsync(async (req, res, next) => {
    const featuresWorkshop = new APIFeatures(Workshop.find(), req.query)
        .filter()
        .limitFields()
        .paginate()
        .sort()

    const AllWorkshop = await featuresWorkshop.query

    res.status(200).json({
        status: 'success',
        data: {
            Workshop: AllWorkshop,
        },
    })
})

exports.getWorkshop = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const workshop = await Workshop.findById(id)

    if (!workshop) return next(new ErrorHandler('Data not found', 404))

    res.status(200).json({
        status: 'success',
        data: {
            workshop,
        },
    })
})

exports.addWorkshop = catchAsync(async (req, res, next) => {
    let coverImageName, imageName
    const { contact, path } = req.body

    if (req.files) {
        const { coverImage, image } = req.files
        if (coverImage) {
            const name = await uploadFile(image, path)
            if (!name)
                return next(
                    new ErrorHandler(
                        `Can't upload image! please try again.`,
                        500
                    )
                )
            coverImageName = {
                path,
                name,
            }
        }

        if (image) {
            const name = await uploadFile(image, path)
            if (!name)
                return next(
                    new ErrorHandler(
                        `Can't upload image! please try again.`,
                        500
                    )
                )
            imageName = {
                path,
                name,
            }
        }
    }

    let obj = {
        ...req.body,
        coverImage: coverImageName,
        image: imageName,
        contact: JSON.parse(contact),
    }

    const workshop = await Workshop.create(obj)

    res.status(201).json({
        status: 'success',
        data: {
            workshop,
        },
    })
})
