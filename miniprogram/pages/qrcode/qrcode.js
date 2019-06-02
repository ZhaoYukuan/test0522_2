import drawQrcode from '../../libs/weapp-qrcode/weapp.qrcode.esm.js'

Page({
    data: {
        windowWidth: wx.getSystemInfoSync().windowWidth,
        text: "test"
    },
    onLoad(option) {
        drawQrcode({
            width: this.data.windowWidth * 500 / 750,
            height: this.data.windowWidth * 500 / 750,
            canvasId: 'myQrcode',
            text: this.data.text,
        })
    },
})