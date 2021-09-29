const catchAsync = require('../../../helpers/catchAsync')
const Network = require('../../models/network.model')

exports.addNetwork = catchAsync(async (req, res, next) => {
    const { gallery_id } = req.body
    const checkId = await Network.findOne({ gallery_id })

    if (checkId) {
        await Network.findOneAndUpdate(
            { gallery_id },
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        )
        return res.status(200).json({
            status: 'success',
            message: 'Updated Successfully',
        })
    }

    await Network.create(req.body)

    res.status(200).json({
        status: 'success',
        message: 'Added Successfully',
    })
})
