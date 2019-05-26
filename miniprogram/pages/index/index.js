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
            let res = await utils_zyk.wx("request", {
                url: "http://localhost:8080/test",
                data: {id: "aaa"}
            })
            utils_zyk.l("index.js", 35).c(res)
        } catch (e) {
            utils_zyk.l("index.js", 34).ce(e)
        }
    },
})