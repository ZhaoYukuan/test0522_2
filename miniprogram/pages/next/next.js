import utils_zyk from "../../utils/utils_zyk/utils_zyk.js";

Page({
    data: {},
    onLoad() {
    },
    test() {
        let a = {}
        try {
            utils_zyk.setPreData({
                testData: a.aa
            })
        } catch (e) {
            utils_zyk.l("next.js", 17).ce(e)
        }

        wx.navigateBack()
    }
})