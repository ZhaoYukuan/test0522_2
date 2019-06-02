import WeCropper from '../../libs/we-cropper/we-cropper.min.js'

const app = getApp()
// const config = app.globalData.config
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
Page({
    data: {
        cropperOpt: {
            id: 'cropper',
            targetId: 'targetCropper',
            pixelRatio: device.pixelRatio,
            width,
            height,
            scale: 2.5,
            zoom: 8,
            cut: {
                x: (width - 230) / 2,
                y: (height - 250) / 2,
                width: 230,
                height: 250
            },
            boundStyle: {
                color: '#04b00f',
                mask: 'rgba(0,0,0,0.8)',
                lineWidth: 1
            }
        }
    },
    touchStart(e) {
        this.cropper.touchStart(e)
    },
    touchMove(e) {
        this.cropper.touchMove(e)
    },
    touchEnd(e) {
        this.cropper.touchEnd(e)
    },
    getCropperImage() {
        this.cropper.getCropperImage((avatar) => {
            if (avatar) {
                wx.showLoading({
                    title: '上传中',
                })
                //  获取到裁剪后的图片
                const filePath = avatar
                let filename;
                if (filePath.indexOf("/") > 0) //如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
                {
                    filename = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.length);
                } else {
                    filename = filePath;
                }
                // 上传图片
                const cloudPath = filename
                wx.cloud.uploadFile({
                    cloudPath,
                    filePath,
                    success: res => {
                        // console.log('[上传文件] 成功：', res)
                        const imagePath = res.fileID
                        // console.log(this.data.name)
                        if (this.data.name == 'classPath') {
                            wx.getImageInfo({
                                src: avatar,
                                success: function (res) {
                                    let ctx = wx.createCanvasContext('photo_canvas');
                                    let ratio = 1;
                                    let canvasWidth = res.width
                                    let canvasHeight = res.height;
                                    while (canvasWidth > 300) {
                                        //比例取整
                                        canvasWidth = Math.trunc(res.width / ratio)
                                        canvasHeight = Math.trunc(res.height / ratio)
                                        ratio = ratio + 0.1;
                                    }
                                    // console.log(canvasWidth, canvasHeight)
                                    ctx.drawImage(avatar, 0, 0, parseInt(canvasWidth), parseInt(canvasHeight)) //将图片填充在canvas上
                                    // ctx.draw()
                                    ctx.draw(false, setTimeout(function () {
                                        wx.canvasToTempFilePath({
                                            width: parseInt(canvasWidth),
                                            height: parseInt(canvasHeight),
                                            destWidth: parseInt(canvasWidth),
                                            destHeight: parseInt(canvasHeight),
                                            canvasId: 'photo_canvas',
                                            quality: 1,
                                            fileType: 'jpg',
                                            success: function (res) {
                                                // console.log(res.tempFilePath)
                                                const filePath = res.tempFilePath
                                                let filename1;
                                                if (filePath.indexOf("/") > 0) //如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
                                                {
                                                    filename1 = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.length);
                                                } else {
                                                    filename1 = filePath;
                                                }
                                                const cloudPath = filename1
                                                // console.log(cloudPath)
                                                wx.cloud.uploadFile({
                                                    cloudPath,
                                                    filePath,
                                                    success: res => {
                                                        // console.log('[上传文件] 成功：', res)
                                                        const imagePath1 = res.fileID
                                                        let a = [imagePath, imagePath1]
                                                        // console.log(a)
                                                        // 往上一级页面传参
                                                        let pages = getCurrentPages();
                                                        let currPage = pages[pages.length - 1]; // 当前页面
                                                        let prevPage = pages[pages.length - 2]; // 上一级页面
                                                        // 直接调用上一级页面Page对象，存储数据到上一级页面中
                                                        prevPage.setData({
                                                            classPath: imagePath,
                                                            class_com: imagePath1
                                                        });
                                                        wx.hideLoading()
                                                        wx.navigateBack({
                                                            delta: 1
                                                        })
                                                    },
                                                    fail: e => {
                                                        // console.error('[上传文件2] 失败：', e)
                                                        wx.showToast({
                                                            icon: 'none',
                                                            title: '上传失败',
                                                        })
                                                    },
                                                    complete: () => {
                                                    }
                                                })
                                            },
                                            fail: function (error) {
                                                // console.log(error)
                                            }
                                        })
                                    }, 1000));
                                },
                                fail: function (error) {
                                    // console.log(error)
                                }
                            })
                        } else if (this.data.name == 'imagePath') {
                            let pages = getCurrentPages();
                            let currPage = pages[pages.length - 1]; // 当前页面
                            let prevPage = pages[pages.length - 2]; // 上一级页面
                            // 直接调用上一级页面Page对象，存储数据到上一级页面中
                            prevPage.setData({
                                imagePath: imagePath,
                            });
                            wx.hideLoading()
                            wx.navigateBack({
                                delta: 1
                            })
                        } else if (this.data.name == 'imagePath1') {
                            let pages = getCurrentPages();
                            let currPage = pages[pages.length - 1]; // 当前页面
                            let prevPage = pages[pages.length - 2]; // 上一级页面
                            // 直接调用上一级页面Page对象，存储数据到上一级页面中
                            prevPage.setData({
                                imagePath1: imagePath,
                            });
                            wx.hideLoading()
                            wx.navigateBack({
                                delta: 1
                            })
                        } else if (this.data.name == 'imagePath2') {
                            let pages = getCurrentPages();
                            let currPage = pages[pages.length - 1]; // 当前页面
                            let prevPage = pages[pages.length - 2]; // 上一级页面
                            // 直接调用上一级页面Page对象，存储数据到上一级页面中
                            prevPage.setData({
                                imagePath2: imagePath,
                            });
                            wx.hideLoading()
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    },
                    fail: e => {
                        // console.error('[上传文件] 失败：', e)
                    },
                    complete: () => {
                    }
                })
            } else {
                // console.log('获取图片失败，请稍后重试')
            }
        })
    },
    uploadTap() {
        this.cropper.getCropperImage()
            .then((src) => {
                wx.previewImage({
                    current: '', // 当前显示图片的http链接
                    urls: [src] // 需要预览的图片http链接列表
                })
            })
            .catch(() => {
                // console.log('获取图片地址失败，请稍后重试')
            })
    },
    onLoad(option) {
        const {
            cropperOpt
        } = this.data
        // console.log(cropperOpt)
        cropperOpt.boundStyle.color = '#04b00f'
        this.setData({
            cropperOpt,
            name: option.type
        })
        if (option.src) {
            cropperOpt.src = option.src
            this.cropper = new WeCropper(cropperOpt)
                .on('ready', (ctx) => {
                    // console.log(`wecropper is ready for work!`)
                })
                .on('beforeImageLoad', (ctx) => {
                    // console.log(`before picture loaded, i can do something`)
                    // console.log(`current canvas context:`, ctx)
                    wx.showToast({
                        title: '上传中',
                        icon: 'loading',
                        duration: 20000
                    })
                })
                .on('imageLoad', (ctx) => {
                    // console.log(`picture loaded`)
                    // console.log(`current canvas context:`, ctx)
                    wx.hideToast()
                })
                .on('beforeDraw', (ctx, instance) => {
                    // console.log(`before canvas draw,i can do something`)
                    // console.log(`current canvas context:`, ctx)
                })
        }
    }
})