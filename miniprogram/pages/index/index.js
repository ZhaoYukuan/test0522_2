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
    cropper() {
        wx.navigateTo({
            url: "/pages/cropper/cropper"
        })
    },
    qrcode() {
        wx.navigateTo({
            url: "/pages/qrcode/qrcode"
        })
    }
})