import utils_zyk from "../../utils/utils_zyk.js";

const {regeneratorRuntime} = global
Page({
    data: {},
    async onLoad() {

        try {
            let res
        } catch (e) {
            utils_zyk.l("index.js", 10).ce(e)
        }
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
    },
    async formSubmit(e) {
        if (e.detail.formId != "the formId is a mock one") {
            try {
                let openid = await utils_zyk.getOpenid()
                let res = await utils_zyk.sendTemplateMessage(
                    openid,
                    "/pages/index/index",
                    {
                        keyword1: {
                            value: '339208499'
                        },
                        keyword2: {
                            value: '2015年01月05日 12:30'
                        },
                        keyword3: {
                            value: '腾讯微信总部'
                        },
                        keyword4: {
                            value: '广州市海珠区新港中路397号'
                        },
                        keyword5: {
                            value: '339208499'
                        },
                        keyword6: {
                            value: '2015年01月05日 12:30'
                        },
                        keyword7: {
                            value: '腾讯微信总部'
                        },
                        keyword8: {
                            value: '广州市海珠区新港中路397号'
                        },
                        keyword9: {
                            value: '腾讯微信总部'
                        },
                        keyword10: {
                            value: '广州市海珠区新港中路397号'
                        }
                    },
                    "XPUkNRmZRb7Nb7rRt2IHtoeEi5AfO2ubUzNm5GQFg8I",
                    e.detail.formId,
                    // 'keyword1.DATA'
                )
                utils_zyk.l("index.js", 49).c(res)
            } catch (e) {

            }
        }
    },
})