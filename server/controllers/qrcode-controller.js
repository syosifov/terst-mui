const QRCode = require('qrcode');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

exports.generateQR = async (req, res) => {
    try {

        const url = req.query.url || 'https://example.com';
        const qrCodeImage = await QRCode.toDataURL(url, {width: 600});
        // res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
        return res.status(StatusCodes.OK).json({dataUrl: qrCodeImage});

    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send('Internal Server Error');
    }
};