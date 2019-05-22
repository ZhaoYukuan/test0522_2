import utils_zyk from "../../utils/utils_zyk/utils_zyk.js";

global.regeneratorRuntime = require('../../utils/utils_zyk/regenerator/runtime-module')
const {regeneratorRuntime} = global
Page({
    data: {},
    onLoad() {
        ;(async () => {
            try {


            } catch (e) {
                utils_zyk.c(e)
            }
        })();
    },
    getUserInfoOnPage() {
        ;(async () => {
            try {
                let res = await utils_zyk.getUserInfo()
                utils_zyk.c(res)
            } catch (e) {
                utils_zyk.c(e)
            }
        })();
    }
})