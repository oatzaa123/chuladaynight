const path = require('path')
const sharp = require('sharp')

const uploadFile = async (file) => {
    const { mimetype, name } = await file
    if (
        ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].indexOf(
            mimetype
        ) < 0
    ) {
        return false
    }

    const imageName = `${Date.now()}.${name.split('.')[1]}`

    const storePath = path.join(
        __dirname,
        '/../assets/uploads/images/',
        imageName
    )

    file.mv(storePath, (err) => {
        if (err) {
            console.log(err)
            return false
        }
    })

    const img = await sharp(file.data)
        .resize(328, 328, { fit: 'fill' })
        .png()
        .toFile(storePath)

    return img ? imageName : null
}

const uploadVideo = async (file) => {
    const { mimetype, name } = await file
    if (['video/mp4'].indexOf(mimetype) < 0) {
        return false
    }

    const videoName = `${Date.now()}.${name.split('.')[1]}`

    const storePath = path.join(
        __dirname,
        '/../assets/uploads/videos/',
        videoName
    )

    file.mv(storePath, (err) => {
        if (err) return false
    })

    return videoName
}

module.exports = { uploadFile, uploadVideo }
