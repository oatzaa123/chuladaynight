const path = require('path')
// const Jimp = require('jimp')
const sharp = require('sharp')

const uploadFile = async (file) => {
    const { mimetype, name } = await file
    if (['image/jpeg', 'image/png', 'image/gif'].indexOf(mimetype) < 0) {
        return false
    }

    const imageName = `${Date.now()}-${name}`

    const storePath = path.join(__dirname, '/../assets/uploads/', imageName)

    file.mv(storePath, (err) => {
        if (err) return false
    })

    // const img = await Jimp.read(storePath)
    //     .then((image) => {
    //         const data = image
    //         return data
    //             .resize(328, 328)
    //             .quality(90) // set JPEG quality
    //             .write(storePath)
    //     })
    //     .catch((error) => false)

    const img = await sharp(file.data)
        .resize(328, 328, { fit: 'fill' })
        .png()
        .toFile(storePath)

    return img ? imageName : null
}

module.exports = uploadFile
