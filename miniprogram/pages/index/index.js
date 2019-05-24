import utils_zyk from "../../utils/utils_zyk/utils_zyk.js";

global.regeneratorRuntime = require('../../utils/utils_zyk/regenerator/runtime-module')
const {regeneratorRuntime} = global
Page({
    data: {},
    onLoad() {
        ;(async () => {
            try {
                let res = await utils_zyk.yRemove("a", {
                    _openid:"oaWKa5RjCV0Idi39LA8udnXzXmLY"
                })
                utils_zyk.l("index.js", 11).c(res)

            } catch (e) {
                utils_zyk.c(e)
            }
        })();
    },
    getUserInfoOnPage() {
        ;(async () => {
            try {
                let res = await utils_zyk.wxf(wx.getUserInfo)

                utils_zyk.l("index.js", 22).c(res.userInfo)
            } catch (e) {
                utils_zyk.c(e)
            }
        })();
    }
})