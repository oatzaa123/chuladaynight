const catchAsync = require('../../../helpers/catchAsync')
const APIFeatures = require('../../../utils/apiFeatures')
const ErrorHandler = require('../../../helpers/errorHandler')
const Gallery = require('./../../models/gallery.model')
const { uploadFile, uploadVideo } = require('./../../../middleware/upload')

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

    // const perviousId = await Gallery.findOne({
    //     createdAt: { $lt: gallery.createdAt },
    // })

    const perviousId = AllGallery.findIndex((item) => item._id === gallery._id)

    const perviousGallery =
        perviousId > 0
            ? AllGallery.find((_, index) => index === perviousId - 1)
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
    const contents = []

    const { author, path, description } = JSON.parse(req.body.data)

    if (req.files) {
        const { coverImage, authorImage, video, contentImage } = req.files
        if (coverImage || authorImage || contentImage) {
            if (contentImage.length > 0) {
                await Promise.all(
                    contentImage.map(async (item) => {
                        contents.push({
                            path,
                            contentType: 'Image',
                            contentValue: await uploadFile(item, path),
                        })
                    })
                )
            } else if (contentImage) {
                contents.push({
                    path,
                    contentType: 'Image',
                    contentValue: await uploadFile(contentImage, path),
                })
            }

            if (coverImage) {
                coverImageName = {
                    path,
                    name: await uploadFile(coverImage, path),
                }
            }

            if (authorImage) {
                authorImageName = {
                    path,
                    name: await uploadFile(authorImage, path),
                }
            }
        }

        if (video) {
            if (video.length > 0) {
                await Promise.all(
                    video.map(async (item, index) => {
                        contents.push({
                            path,
                            contentType: 'Video',
                            contentValue: await uploadVideo(item, path),
                        })
                    })
                )
            } else {
                contents.push({
                    path,
                    contentType: 'Video',
                    contentValue: await uploadVideo(video, path),
                })
            }
        }

        let obj = {
            ...JSON.parse(req.body.data),
            coverImage: coverImageName,
            author: {
                ...author,
                image: authorImageName,
            },
        }

        gallery = new Gallery({
            ...obj,
            content: contents,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })

        if (typeof description !== 'string') {
            description.map((item) => {
                gallery.content.push({
                    contentType: 'Text',
                    contentValue: item,
                })
            })
        } else {
            gallery.content.push({
                contentType: 'Text',
                contentValue: description,
            })
        }

        await gallery.save()
    } else {
        gallery = await Gallery.create({
            ...JSON.parse(req.body.data),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })
    }

    res.status(201).json({
        status: 'success',
        data: {
            gallery,
        },
    })
})
