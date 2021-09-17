const catchAsync = require('../../../helpers/catchAsync')
const APIFeatures = require('../../../utils/apiFeatures')
const ErrorHandler = require('../../../helpers/errorHandler')
const Article = require('./../../models/article.model')
const { uploadFile } = require('./../../../middleware/upload')
const fs = require('fs')
const paths = require('path')
const util = require('util')
const unlink = util.promisify(fs.unlink)

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

exports.updateArticle = catchAsync(async (req, res, next) => {
    let coverImageName
    const { id } = req.params
    const { path, oldFile } = req.body
    let newArticle = {}

    let article = await Article.findById(id)

    if (!article) return next(new ErrorHandler('Data not found', 404))
    if (req.files) {
        const { coverImage } = req.files
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
                )
            }
            const name = await uploadFile(coverImage, path)
            if (!name)
                return next(new ErrorHandler(`Fail to upload image.`, 400))
            coverImageName = {
                path,
                name,
            }

            newArticle.coverImage = coverImageName
        }
    }

    newArticle = {
        ...newArticle,
        ...req.body,
    }

    const updatedArticle = await Article.findByIdAndUpdate(
        { _id: id },
        { ...newArticle, updatedAt: Date.now() },
        { new: true }
    )

    res.status(200).json({
        status: 'success',
        data: {
            updatedArticle,
        },
    })
})

exports.deleteArticle = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const article = await Article.findById(id)
    const { path, name } = article.coverImage

    const imageDirectory = paths.join(
        __dirname,
        `../../../assets/uploads/images/${path}`
    )

    await checkImages(imageDirectory, name)

    await Article.deleteOne({ _id: id })
    res.status(204).send()
})

const checkImages = async (directory, filename) => {
    const unlinkPromises = await unlink(`${directory}/${filename}`)

    return unlinkPromises
}
