import catchAsync from '../../../helpers/catchAsync'
import APIFeatures from '../../../utils/apiFeatures'
import ErrorHandler from '../../../helpers/errorHandler'
import Gallery from './../../models/gallery.model'
import util from 'util'
import fs from 'fs'
import paths from 'path'

const readdir = util.promisify(fs.readdir)
const unlink = util.promisify(fs.unlink)
const rmdir = util.promisify(fs.rmdir)
import {
    uploadFile,
    uploadVideo,
    uploadModel,
} from './../../../middleware/upload'

export const getGalleries = catchAsync(async (req, res, next) => {
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

export const getGallery = catchAsync(async (req, res, next) => {
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

export const nextGallery = catchAsync(async (req, res, next) => {
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

export const perviousGallery = catchAsync(async (req, res, next) => {
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

export const addGallery = catchAsync(async (req, res, next) => {
    const {
        title_th,
        title_en,
        author,
        path,
        shortDescription_th,
        shortDescription_en,
        location,
        description,
        liveTime,
    } = req.body

    var contentImages = []
    var contentVideos = []
    let contentModels = []
    let descriptions = []
    var coverImageName
    var authorImageName
    const liveVideo = []
    if (req.files) {
        const {
            coverImage,
            authorImage,
            contentVideo,
            contentImage,
            contentModel,
            live,
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

        if (live) {
            const time = JSON.parse(liveTime).liveTime
            if (live.length > 0) {
                await Promise.all(
                    live.map(async (i, index) => {
                        const name = await uploadVideo(i, path)
                        if (!name)
                            return next(
                                new ErrorHandler(
                                    `Can't upload video! please try again.`,
                                    500
                                )
                            )
                        liveVideo.push({
                            path,
                            name,
                            liveTime: time[index],
                        })
                    })
                )
            } else {
                await Promise.all(
                    time.map(async (i) => {
                        const name = await uploadVideo(live, path)
                        if (!name)
                            return next(
                                new ErrorHandler(
                                    `Can't upload video! please try again.`,
                                    500
                                )
                            )
                        liveVideo.push({
                            path,
                            name,
                            liveTime: i,
                        })
                    })
                )
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
    if (contentVideos && contentVideos.length > 0) {
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
    if (description && description.length > 0) {
        if (typeof description === 'string') {
            descriptions.push(description)
        } else {
            descriptions = description
        }
        await descriptions.map(async (item) => {
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
    }

    var gallery = new Gallery({
        title_th,
        title_en,
        author: { ...JSON.parse(author), image: authorImageName },
        coverImage: coverImageName,
        path,
        shortDescription_th,
        shortDescription_en,
        live: {
            videos: liveVideo,
        },
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

export const updateGallery = catchAsync(async (req, res, next) => {
    const {
        title_th,
        title_en,
        author,
        path,
        shortDescription_th,
        shortDescription_en,
        location,
        description,
        oldFile,
        liveTime,
    } = req.body

    const { id } = req.params

    const gallery = await Gallery.findById(id)

    if (!gallery) return next(new ErrorHandler('Data not found', 404))

    var contentImages = []
    var contentVideos = []
    let contentModels = []
    var coverImageName
    var authorImageName
    const liveVideo = []
    if (req.files) {
        const {
            coverImage,
            authorImage,
            contentVideo,
            contentImage,
            contentModel,
            live,
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
            coverImageName = {
                path,
                name: await uploadFile(coverImage, path),
            }

            gallery.coverImage = coverImageName
        }
        if (authorImage) {
            if (
                JSON.parse(oldFile) &&
                JSON.parse(oldFile).authorImage &&
                fs.existsSync(
                    paths.join(
                        __dirname,
                        `../../../assets/uploads/images/${path}/${
                            JSON.parse(oldFile).authorImage
                        }`
                    )
                )
            ) {
                fs.unlinkSync(
                    paths.join(
                        __dirname,
                        `../../../assets/uploads/images/${path}/`,
                        JSON.parse(oldFile).authorImage
                    )
                )
            }
            authorImageName = {
                path,
                name: await uploadFile(authorImage, path),
            }

            gallery.author.image = authorImageName
        }

        if (live) {
            const time = JSON.parse(liveTime).liveTime
            if (live.length > 0) {
                if (
                    JSON.parse(oldFile) &&
                    JSON.parse(oldFile).liveVideo &&
                    fs.existsSync(
                        paths.join(
                            __dirname,
                            `../../../assets/uploads/videos/${path}/${
                                JSON.parse(oldFile).liveVideo
                            }`
                        )
                    )
                ) {
                    fs.unlinkSync(
                        paths.join(
                            __dirname,
                            `../../../assets/uploads/videos/${path}/`,
                            JSON.parse(oldFile).liveVideo
                        )
                    )
                }
                await Promise.all(
                    live.map(async (i, index) => {
                        const name = await uploadVideo(i, path)
                        if (!name)
                            return next(
                                new ErrorHandler(
                                    `Can't upload video! please try again.`,
                                    500
                                )
                            )
                        liveVideo.push({
                            path,
                            name,
                            liveTime: time[index],
                        })
                    })
                )
            } else {
                if (
                    JSON.parse(oldFile) &&
                    JSON.parse(oldFile).liveVideo &&
                    fs.existsSync(
                        paths.join(
                            __dirname,
                            `../../../assets/uploads/images/${path}/${
                                JSON.parse(oldFile).liveVideo
                            }`
                        )
                    )
                ) {
                    fs.unlinkSync(
                        paths.join(
                            __dirname,
                            `../../../assets/uploads/images/${path}/`,
                            JSON.parse(oldFile).liveVideo
                        )
                    )
                }
                await Promise.all(
                    time.map(async (i) => {
                        const name = await uploadVideo(live, path)
                        if (!name)
                            return next(
                                new ErrorHandler(
                                    `Can't upload video! please try again.`,
                                    500
                                )
                            )
                        liveVideo.push({
                            path,
                            name,
                            liveTime: i,
                        })
                    })
                )
            }
        }
    } // req.file

    const arrModel = []
    if (contentModels.length > 0) {
        if (typeof JSON.parse(oldFile).contentModel === 'string') {
            if (
                JSON.parse(oldFile) &&
                JSON.parse(oldFile).contentModel &&
                fs.existsSync(
                    paths.join(
                        __dirname,
                        `../../../assets/uploads/models/${path}/${
                            JSON.parse(oldFile).contentModel
                        }`
                    )
                )
            ) {
                fs.unlinkSync(
                    paths.join(
                        __dirname,
                        `../../../assets/uploads/models/${path}/`,
                        JSON.parse(oldFile).contentModel
                    )
                )
            }
        } else {
            JSON.parse(oldFile).contentModel.map((i) => {
                if (
                    JSON.parse(oldFile) &&
                    JSON.parse(oldFile).contentModel &&
                    fs.existsSync(
                        paths.join(
                            __dirname,
                            `../../../assets/uploads/models/${path}/${
                                JSON.parse(oldFile).contentModel
                            }`
                        )
                    )
                ) {
                    fs.unlinkSync(
                        paths.join(
                            __dirname,
                            `../../../assets/uploads/models/${path}/`,
                            i
                        )
                    )
                }
            })
        }
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
        if (typeof JSON.parse(oldFile).contentImage === 'string') {
            if (
                JSON.parse(oldFile) &&
                JSON.parse(oldFile).contentImage &&
                fs.existsSync(
                    paths.join(
                        __dirname,
                        `../../../assets/uploads/models/${path}/${
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
        } else {
            JSON.parse(oldFile).contentImage.map((i) => {
                if (
                    JSON.parse(oldFile) &&
                    JSON.parse(oldFile).contentImage &&
                    fs.existsSync(
                        paths.join(
                            __dirname,
                            `../../../assets/uploads/models/${path}/${
                                JSON.parse(oldFile).contentImage
                            }`
                        )
                    )
                ) {
                    fs.unlinkSync(
                        paths.join(
                            __dirname,
                            `../../../assets/uploads/images/${path}/`,
                            i
                        )
                    )
                }
            })
        }
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
        if (typeof JSON.parse(oldFile).contentVideo === 'string') {
            if (
                JSON.parse(oldFile) &&
                JSON.parse(oldFile).contentVideo &&
                fs.existsSync(
                    paths.join(
                        __dirname,
                        `../../../assets/uploads/videos/${path}/${
                            JSON.parse(oldFile).contentVideo
                        }`
                    )
                )
            ) {
                fs.unlinkSync(
                    paths.join(
                        __dirname,
                        `../../../assets/uploads/videos/${path}/`,
                        JSON.parse(oldFile).contentVideo
                    )
                )
            }
        }

        if (
            JSON.parse(oldFile) &&
            JSON.parse(oldFile).contentVideo &&
            JSON.parse(oldFile).contentVideo.length > 0
        ) {
            JSON.parse(oldFile).contentVideo.map((i) => {
                if (
                    fs.existsSync(
                        paths.join(
                            __dirname,
                            `../../../assets/uploads/videos/${path}/${i}`
                        )
                    )
                ) {
                    fs.unlinkSync(
                        paths.join(
                            __dirname,
                            `../../../assets/uploads/videos/${path}/`,
                            i
                        )
                    )
                }
            })
        }

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
    if (description && description.length > 0) {
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

        gallery.content = contents
    }

    gallery.title_th = title_th
    gallery.title_en = title_en
    gallery.author.name_th = JSON.parse(author).name_th
    gallery.author.name_en = JSON.parse(author).name_en
    gallery.author.group = JSON.parse(author).group
    gallery.author.contact.facebook = JSON.parse(author).contact.facebook
    gallery.author.contact.line = JSON.parse(author).contact.line
    gallery.author.contact.email = JSON.parse(author).contact.email
    gallery.author.contact.phone = JSON.parse(author).contact.phone
    gallery.path = path
    gallery.shortDescription_th = shortDescription_th
    gallery.shortDescription_en = shortDescription_en
    gallery.location = JSON.parse(location)
    gallery.updatedAt = Date.now()
    gallery.live.videos = liveVideo
    gallery.live.updatedAt = Date.now()

    await gallery.save()

    res.status(200).json({
        status: 'success',
        data: gallery,
    })
})

export const deleteGallery = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const gallery = await Gallery.findById(id)
    const { path } = gallery.coverImage
    const imageDirectory = paths.join(
        __dirname,
        `../../../assets/uploads/images/${path}`
    )
    const videoDirectory = paths.join(
        __dirname,
        `../../../assets/uploads/videos/${path}`
    )
    const modelDirectory = paths.join(
        __dirname,
        `../../../assets/uploads/models/${path}`
    )

    await checkImages(imageDirectory)
    await checkImages(videoDirectory)
    await checkImages(modelDirectory)

    await Gallery.deleteOne({ _id: id })

    res.status(204)
})

const checkImages = async (directory) => {
    const files = await readdir(directory)
    const unlinkPromises = await Promise.all(
        files.map((filename) => unlink(`${directory}/${filename}`))
    )
    await rmdir(directory)
    return unlinkPromises
}
