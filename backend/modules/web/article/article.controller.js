const catchAsync = require('../../../helpers/catchAsync')
const APIFeatures = require('../../../utils/apiFeatures')
const ErrorHandler = require('../../../helpers/errorHandler')
const Article = require('./../../models/article.model')
const { uploadFile } = require('./../../../middleware/upload')

exports.getArticles = catchAsync(async (req, res, next) => {
    const featuresArticle = new APIFeatures(Article.find(), req.query)
        .filter()
        .limitFields()
        .paginate()
        .sort()

    const AllArticle = await featuresArticle.query
    res.status(200).json({
        status: 'success',
        data: {
            Article: AllArticle,
        },
    })
})

exports.getArticle = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const article = await Article.findById(id)

    if (!article) return next(new ErrorHandler('Data not found', 404))

    res.status(200).json({
        status: 'success',
        data: {
            article,
        },
    })
})

exports.addArticle = catchAsync(async (req, res, next) => {
    let coverImageName
    const { path } = req.body

    if (req.files) {
        const { coverImage } = req.files
        if (coverImage) {
            const name = await uploadFile(coverImage, path)
            if (!name)
                return next(new ErrorHandler(`Fail to upload image.`, 400))
            coverImageName = {
                path,
                name,
            }
        }
    }

    let obj = {
        ...req.body,
        coverImage: coverImageName,
    }

    const article = await Article.create(obj)

    res.status(201).json({
        status: 'success',
        data: {
            article,
        },
    })
})
