const catchAsync = require('../../../helpers/catchAsync')
const APIFeatures = require('../../../utils/apiFeatures')
const ErrorHandler = require('../../../helpers/errorHandler')
const News = require('./../../models/news.model')
const { uploadFile } = require('./../../../middleware/upload')

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
            coverImageName = {
                path,
                name: await uploadFile(coverImage, path),
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
                arrImg.push({
                    path,
                    contentType: 'Image',
                    contentValue: await uploadFile(item, path),
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
