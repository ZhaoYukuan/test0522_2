import utils_zyk from "../../utils/utils_zyk.js";

const {regeneratorRuntime} = global
Page({
    data: {},
    async onLoad() {
    },
    onShow() {
        try {
            utils_zyk.l("index.js", 12).c(utils_zyk.getData(this, "testData"))
        } catch (e) {
            utils_zyk.l("index.js", 16).ce(e)
        }
    },
    async getUserInfoOnPage() {
        try {
            let userInfo = await utils_zyk.getUserInfo()
            utils_zyk.l("index.js", 22).c(userInfo)
        } catch (e) {
            utils_zyk.c(e)
        }
    },
    next(e) {
        wx.navigateTo({
            url: "/pages/next/next"
        })
    },
    tpjc() {
        wx.chooseImage({
            count: 1, // 默认9
            // sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (photo) {
                let tempFilesSize = photo.tempFiles[0].size; //获取图片的大小，单位B
                if (tempFilesSize <= 3000000 && tempFilesSize > 50000) { //图片小于或者等于3M时 可以执行获取图片
                    const src = photo.tempFilePaths[0]
                    wx.navigateTo({
                        url: `/pages/tpjc/tpjc?src=${src}&type=classPath`
                    })
                } else { //图片大于3M，弹出一个提示框
                    wx.showToast({
                        title: '请上传大小在50K-3M的图片!', //标题
                        icon: 'none' //图标none不使用图标，详情看官方文档
                    })
                }
            }
        })
    },
})