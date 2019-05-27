import utils_zyk from "../../utils/utils_zyk/utils_zyk.js";

global.regeneratorRuntime = require('../../utils/utils_zyk/regenerator/runtime-module')
const {regeneratorRuntime} = global
Page({
    data: {},
    onLoad() {
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
            // let res = await utils_zyk.wxf(wx.getUserInfo)
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
    async testRequest() {
        try {
            // wx.chooseImage({
            //     success(res) {
            //         const tempFilePaths = res.tempFilePaths
            //         wx.uploadFile({
            //             url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
            //             filePath: tempFilePaths[0],
            //             name: 'file',
            //             formData: {
            //                 user: 'test'
            //             },
            //             success(res) {
            //                 const data = res.data
            //                 // do something
            //             }
            //         })
            //     }
            // })
        } catch (e) {
            utils_zyk.l("index.js", 34).ce(e)
        }
    },
})