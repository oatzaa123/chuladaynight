const catchAsync = require('../../../helpers/catchAsync')
const APIFeatures = require('../../../utils/apiFeatures')
const ErrorHandler = require('../../../helpers/errorHandler')
const Gallery = require('./../../models/gallery.model')
const {
    uploadFile,
    uploadVideo,
    uploadModel,
} = require('./../../../middleware/upload')

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

    gallery.countViews += 1

    await gallery.save()

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
    const {
        title_th,
        title_en,
        author,
        path,
        shortDescription_th,
        shortDescription_en,
        location,
        description,
    } = req.body

    var contentImages = []
    var contentVideos = []
    let contentModels = []
    var coverImageName
    var authorImageName
    if (req.files) {
        const {
            coverImage,
            authorImage,
            contentVideo,
            contentImage,
            contentModel,
        } = req.files

        if (contentModel) {
            if (contentModel.length > 0) {
                contentModels = contentModel
            } else {
                contentModels.push(contentModel)
            }
        }

        if (contentImage) {
            if (contentImage.length > 0) {
                contentImages = contentImage
            } else {
                contentImages.push(contentImage)
            }
        }

        if (contentVideo) {
            if (contentVideo.length > 0) {
                contentVideos = contentVideo
            } else {
                contentVideos.push(contentVideo)
            }
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
    } // req.file

    const arrModel = []
    if (contentModels.length > 0) {
        await Promise.all(
            contentModels.map(async (item) => {
                const name = await uploadModel(item, path)
                if (!name)
                    return next(
                        new ErrorHandler(
                            `Can't upload model! please try again.`,
                            500
                        )
                    )
                arrModel.push({
                    path,
                    contentType: 'Model',
                    contentValue: name,
                    contentName: item.name,
                })
            })
        )
    }

    var arrImg = []
    if (contentImages.length > 0) {
        await Promise.all(
            contentImages.map(async (item) => {
                const name = await uploadFile(item, path)
                if (!name)
                    return next(
                        new ErrorHandler(
                            `Can't upload image! please try again.`,
                            500
                        )
                    )
                arrImg.push({
                    path,
                    contentType: 'Image',
                    contentValue: name,
                    contentName: item.name,
                })
            })
        )
    }

    var arrVdo = []
    if (contentVideos.length > 0) {
        await Promise.all(
            contentVideos.map(async (item) => {
                const name = await uploadVideo(item, path)
                if (!name)
                    return next(
                        new ErrorHandler(
                            `Can't upload video! please try again.`,
                            500
                        )
                    )
                arrVdo.push({
                    path,
                    contentType: 'Video',
                    contentValue: name,
                    contentName: item.name,
                })
            })
        )
    }

    var contents = []
    await description.map(async (item) => {
        const model = arrModel.filter((i) => {
            return i.contentName === item
        })

        var img = arrImg.filter((i) => {
            return i.contentName === item
        })

        var vdo = arrVdo.filter((i) => {
            return i.contentName === item
        })

        if (img.length > 0) {
            contents.push({
                path: img[0].path,
                contentType: img[0].contentType,
                contentValue: img[0].contentValue,
            })
        } else if (model.length) {
            contents.push({
                path: model[0].path,
                contentType: model[0].contentType,
                contentValue: model[0].contentValue,
            })
        } else if (vdo.length) {
            contents.push({
                path: vdo[0].path,
                contentType: vdo[0].contentType,
                contentValue: vdo[0].contentValue,
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

    var gallery = new Gallery({
        title_th,
        title_en,
        author: { ...JSON.parse(author), image: authorImageName },
        coverImage: coverImageName,
        path,
        shortDescription_th,
        shortDescription_en,
        location: JSON.parse(location),
        content: contents,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    })

    await gallery.save()

    res.status(201).json({
        status: 'success',
        data: gallery,
    })
})
