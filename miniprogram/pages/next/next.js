import utils_zyk from "../../utils/utils_zyk/utils_zyk.js";

Page({
    data: {},
    onLoad() {
    },
    test() {
        try {
            utils_zyk.setPreData({
                testData: "test"
            })
        } catch (e) {
            utils_zyk.l("next.js", 17).ce(e)
        }

        wx.navigateBack()
    }
})