const catchAsync = require('../../../helpers/catchAsync')
const APIFeatures = require('../../../utils/apiFeatures')
const ErrorHandler = require('../../../helpers/errorHandler')
const Gallery = require('./../../models/gallery.model')
const { uploadFile, uploadVideo } = require('./../../../middleware/upload')
const moment = require('moment')

exports.getGalleries = catchAsync(async (req, res, next) => {
    const featuresGallery = new APIFeatures(Gallery.find(), req.query)
        .filter()
        .limitFields()
        .paginate()
        .sort()

    const AllGallery = await featuresGallery.query

    res.status(200).json({
        status: 'success',
        data: {
            total: AllGallery.length,
            Gallery: AllGallery,
        },
    })
})

exports.getGallery = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const gallery = await Gallery.findById(id)

    if (!gallery) return next(new ErrorHandler('Data not found', 404))

    res.status(200).json({
        status: 'success',
        data: {
            gallery,
        },
    })
})

exports.nextGallery = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const AllGallery = await Gallery.find()
    const gallery = AllGallery.find((item) => item._id.toString() === id)

    if (!gallery) return next(new ErrorHandler('Data not found', 404))

    const nextId = await Gallery.findOne({
        createdAt: { $gt: gallery.createdAt },
    })

    const nextGallery = nextId
        ? nextId
        : AllGallery.find((_, index) => index === 0)

    res.status(200).json({
        status: 'success',
        data: {
            gallery: nextGallery,
        },
    })
})

exports.perviousGallery = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const AllGallery = await Gallery.find()
    const gallery = AllGallery.find((item) => item._id.toString() === id)

    if (!gallery) return next(new ErrorHandler('Data not found', 404))

    const perviousId = await Gallery.findOne({
        createdAt: { $lt: gallery.createdAt },
    })

    const perviousGallery = perviousId
        ? perviousId
        : AllGallery.find((_, index) => index === AllGallery.length - 1)

    res.status(200).json({
        status: 'success',
        data: {
            gallery: perviousGallery,
        },
    })
})

exports.addGallery = catchAsync(async (req, res, next) => {
    let coverImageName, authorImageName, gallery
    let videoName = []
    let contentImageName = []

    const { author, content } = JSON.parse(req.body.data)

    if (req.files) {
        const { coverImage, authorImage, video, contentImage } = req.files
        if (coverImage || authorImage || contentImage) {
            if (contentImage.length > 0) {
                await Promise.all(
                    contentImage.map(async (item, index) => {
                        contentImageName.push({ name: await uploadFile(item) })
                    })
                )
            } else if (contentImage) {
                contentImageName.push({ name: await uploadFile(contentImage) })
            }
            coverImageName = await uploadFile(coverImage)
            authorImageName = await uploadFile(authorImage)
            if (!coverImageName || !authorImageName || !contentImageName)
                return next(new ErrorHandler(`Fail to upload image.`, 400))
        }

        if (video) {
            if (video.length > 0) {
                await Promise.all(
                    video.map(async (item, index) => {
                        videoName.push({ name: await uploadVideo(item) })
                    })
                )
            } else {
                videoName.push({ name: await uploadVideo(video) })
            }
            if (!videoName)
                return next(new ErrorHandler(`Fail to upload video.`, 400))
        }

        let obj = {
            ...JSON.parse(req.body.data),
            coverImage: coverImageName,
            author: {
                ...author,
                image: authorImageName,
            },
            content: {
                image: contentImageName,
                description: content.description,
                video: videoName,
            },
        }

        gallery = await Gallery.create(obj)
    } else {
        gallery = await Gallery.create({ ...JSON.parse(req.body.data) })
    }

    res.status(201).json({
        status: 'success',
        data: {
            gallery,
        },
    })
})
