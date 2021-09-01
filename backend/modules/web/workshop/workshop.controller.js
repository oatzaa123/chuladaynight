import catchAsync from '../../../helpers/catchAsync'
import APIFeatures from '../../../utils/apiFeatures'
import ErrorHandler from '../../../helpers/errorHandler'
import Workshop from './../../models/workshop.model'
import { uploadFile } from './../../../middleware/upload'
import paths from 'path'
import fs from 'fs'
import util from 'util'
const unlink = util.promisify(fs.unlink)

export const getWorkshops = catchAsync(async (req, res, next) => {
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

export const getWorkshop = catchAsync(async (req, res, next) => {
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

export const addWorkshop = catchAsync(async (req, res, next) => {
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

export const updateWorkshop = async (req, res, next) => {
    const { id } = req.params
    const {
        title_th,
        title_en,
        path,
        description_th,
        description_en,
        contact,
        locationName_en,
        locationName_th,
        oldImage,
    } = req.body
    let coverImageName

    const workshop = await Workshop.findById(id)
    if (!workshop) return next(new ErrorHandler('Data not found', 404))

    if (req.files) {
        const { coverImage, image } = req.files

        if (coverImage) {
            if (
                JSON.parse(oldFile) &&
                JSON.parse(oldFile).coverImage &&
                fs.existsSync(
                    paths.join(
                        __dirname,
                        `../../../assets/uploads/images/${path}/${
                            JSON.parse(oldImage).coverImage
                        }`
                    )
                )
            ) {
                fs.unlinkSync(
                    paths.join(
                        __dirname,
                        `../../../assets/uploads/images/${path}/`,
                        JSON.parse(oldImage).coverImage
                    )
                )
            }
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

            workshop.coverImage = coverImageName
        }

        if (image) {
            if (
                JSON.parse(oldFile) &&
                JSON.parse(oldFile).contentImage &&
                fs.existsSync(
                    paths.join(
                        __dirname,
                        `../../../assets/uploads/images/${path}/${
                            JSON.parse(oldImage).contentImage
                        }`
                    )
                )
            ) {
                fs.unlinkSync(
                    paths.join(
                        __dirname,
                        `../../../assets/uploads/images/${path}/`,
                        JSON.parse(oldImage).contentImage
                    )
                )
            }
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

            workshop.image = imageName
        }
    }

    workshop.title_th = title_th
    workshop.title_en = title_en
    workshop.description_th = description_th
    workshop.description_en = description_en
    workshop.contact.facebook = JSON.parse(contact).contact.facebook
    workshop.contact.telephone = JSON.parse(contact).contact.telephone
    workshop.contact.instagram = JSON.parse(contact).contact.instagram
    workshop.contact.mailto = JSON.parse(contact).contact.mailto
    workshop.contact.location = JSON.parse(contact).contact.location
    workshop.locationName_th = locationName_th
    workshop.locationName_en = locationName_en

    await workshop.save()

    res.status(200).json({
        status: 'success',
        data: workshop,
    })
}

export const deleteWorkshop = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const workshop = await Workshop.findById(id)
    const { path, name } = workshop.coverImage
    const { name: imgName } = workshop.image

    const imageDirectory = paths.join(
        __dirname,
        `../../../assets/uploads/images/${path}`
    )
    await checkImages(imageDirectory, name)
    await checkImages(imageDirectory, imgName)

    await Workshop.deleteOne({ _id: id })
    res.status(204).send()
})

const checkImages = async (directory, filename) => {
    const unlinkPromises = await unlink(`${directory}/${filename}`)

    return unlinkPromises
}
