const catchAsync = require('../../../helpers/catchAsync')
const APIFeatures = require('../../../utils/apiFeatures')
const ErrorHandler = require('../../../helpers/errorHandler')
const News = require('./../../models/news.model')
const { uploadFile } = require('./../../../middleware/upload')
const util = require('util')
const fs = require('fs')
const readdir = util.promisify(fs.readdir)
const unlink = util.promisify(fs.unlink)
const rmdir = util.promisify(fs.rmdir)
const paths = require('path')

exports.getNews = catchAsync(async (req, res, next) => {
    const featuresNews = new APIFeatures(News.find(), req.query)
        .filter()
        .limitFields()
        .paginate()
        .sort()

    const AllNews = await featuresNews.query
    const totalItems = await News.find()

    res.status(200).json({
        status: 'success',
        data: {
            page: req.query.page,
            perPage: req.query.limit,
            totalItems: totalItems.length,
            News: AllNews,
        },
    })
})

exports.getOneNews = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const news = await News.findById(id)

    if (!news) return next(new ErrorHandler('Data not found', 404))

    res.status(200).json({
        status: 'success',
        data: {
            news,
        },
    })
})

exports.nextNews = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const AllNews = await News.find()
    const news = AllNews.find((item) => item._id.toString() === id)

    if (!news) return next(new ErrorHandler('Data not found', 404))

    const nextId = await News.findOne({
        createdAt: { $gt: news.createdAt },
    })

    const nextNews = nextId ? nextId : AllNews.find((_, index) => index === 0)

    res.status(200).json({
        status: 'success',
        data: {
            news: nextNews,
        },
    })
})

exports.perviousNews = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const AllNews = await News.find()
    const news = AllNews.find((item) => item._id.toString() === id)

    if (!news) return next(new ErrorHandler('Data not found', 404))

    // const perviousId = await news.findOne({
    //     createdAt: { $lt: news.createdAt },
    // })

    const perviousId = AllNews.findIndex((item) => item._id === news._id)

    const perviousNews =
        perviousId > 0
            ? AllNews.find((_, index) => index === perviousId - 1)
            : AllNews.find((_, index) => index === AllNews.length - 1)

    res.status(200).json({
        status: 'success',
        data: {
            news: perviousNews,
        },
    })
})

exports.addNews = catchAsync(async (req, res, next) => {
    const { title_th, title_en, path, description } = req.body
    const contentImages = []
    let coverImageName

    if (req.files) {
        const { coverImage, contentImage } = req.files

        if (coverImage) {
            const name = await uploadFile(coverImage, path)
            if (!name)
                return next(new ErrorHandler(`Fail to upload image.`, 400))
            coverImageName = {
                path,
                name,
            }
        }

        if (contentImage) {
            if (contentImage.length > 0) {
                contentImages = contentImage
            } else {
                contentImages.push(contentImage)
            }
        }
    }

    const arrImg = []
    if (contentImages.length > 0) {
        await Promise.all(
            contentImages.map(async (item) => {
                const name = await uploadFile(item, path)
                if (!name)
                    return next(new ErrorHandler(`Fail to upload image.`, 400))
                arrImg.push({
                    path,
                    contentType: 'Image',
                    contentValue: name,
                    contentName: item.name,
                })
            })
        )
    }

    const contents = []
    await description.map(async (item) => {
        const img = arrImg.find((i) => i.contentName === item) || null

        if (img) {
            contents.push({
                path: img.path,
                contentType: img.contentType,
                contentValue: img.contentValue,
            })
        } else {
            const { th, en } = JSON.parse(item)
            contents.push({
                contentType: 'Text',
                contentValue_th: th,
                contentValue_en: en,
            })
        }
    })

    const news = new News({
        title_th,
        title_en,
        coverImage: coverImageName,
        path,
        content: contents,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    })

    await news.save()
    res.status(201).json({
        status: 'success',
        data: news,
    })
})

exports.updateNews = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { title_th, title_en, path, description, oldFile } = req.body
    const contentImages = []
    let coverImageName

    const news = await News.findById(id)

    if (!news) return next(new ErrorHandler('Data not found', 404))

    if (req.files) {
        const { coverImage, contentImage } = req.files

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

            news.coverImage = coverImageName
        }

        if (contentImage) {
            if (contentImage.length > 0) {
                contentImages = contentImage
            } else {
                contentImages.push(contentImage)
            }
        }
    }

    const arrImg = []
    if (contentImages.length > 0) {
        await Promise.all(
            contentImages.map(async (item) => {
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
                    )
                }
                const name = await uploadFile(item, path)
                if (!name)
                    return next(new ErrorHandler(`Fail to upload image.`, 400))
                arrImg.push({
                    path,
                    contentType: 'Image',
                    contentValue: name,
                    contentName: item.name,
                })
            })
        )
    }

    const contents = []
    if (description && description.length > 0) {
        await description.map(async (item) => {
            const img = arrImg.find((i) => i.contentName === item) || null

            if (img) {
                contents.push({
                    path: img.path,
                    contentType: img.contentType,
                    contentValue: img.contentValue,
                })
            } else {
                const { th, en } = JSON.parse(item)
                contents.push({
                    contentType: 'Text',
                    contentValue_th: th,
                    contentValue_en: en,
                })
            }
        })
    }

    news.title_th = title_th
    news.title_en = title_en
    news.path = path
    news.content = contents
    news.updatedAt = Date.now()

    await news.save()
    res.status(200).json({
        status: 'success',
        data: news,
    })
})

exports.deleteNews = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const news = await News.findById(id)
    const { path, name } = news.coverImage
    const image = news.content.filter((i) => i.contentType === 'Image')

    const imageDirectory = paths.join(
        __dirname,
        `../../../assets/uploads/images/${path}`
    )

    await checkImages(imageDirectory, name)
    if (image.length > 0) {
        image.map(
            async (i) => await checkImages(imageDirectory, i.contentValue)
        )
    }

    await News.deleteOne({ _id: id })
    res.status(204).send()
})

const checkImages = async (directory, filename) => {
    const unlinkPromises = await unlink(`${directory}/${filename}`)

    return unlinkPromises
}
