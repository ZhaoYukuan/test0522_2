global.regeneratorRuntime = require('./regenerator/runtime-module')
const {regeneratorRuntime} = global
/*
    在 pages index index.js 中这样引用
    import utils_zyk from "../../utils/utils_zyk/utils_zyk.js";
    global.regeneratorRuntime = require('../../utils/utils_zyk/regenerator/runtime-module')
    const {regeneratorRuntime} = global
*/
let utils_zyk = {
    cloudFunctionName: "utils_zyk",
    cloudAction: {
        returnOpenid: 'returnOpenid',
        returnNowDate: 'returnNowDate',
        updateInc: 'updateInc',
        update: 'update',
        remove: 'remove'
    },
    /*
        从Storage中取 _openid 如果没有 调用云函数 并设置 Storage
    */
    getOpenid() {
        return new Promise((resolve, reject) => {
            try {
                const value = wx.getStorageSync('_openid')
                if (value) {
                    resolve(value);
                } else {
                    this.getOpenidFromCloudFunction().then((openid) => {
                        wx.setStorageSync('_openid', openid);
                        resolve(openid);
                    }).catch((e) => {
                        reject(e);
                    })
                }
            } catch (e) {
                reject(e);
            }
        })
    },
    /*
        使用云函数拿到 _openid 此方法被 getOpenid 方法调用
    */
    getOpenidFromCloudFunction() {
        return new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                name: this.cloudFunctionName,
                data: {
                    action: this.cloudAction.returnOpenid
                },
                success: res => {
                    resolve(res.result.openid);
                },
                fail: err => {
                    reject(err);
                }
            })
        });
    },
    /*
        从云函数中拿到 Date 对象
    */
    returnServerDate() {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await wx.cloud.callFunction({
                    name: this.cloudFunctionName,
                    data: {
                        action: this.cloudAction.returnNowDate
                    },
                });
                let time = new Date(res.result)
                resolve(time)
            } catch (e) {
                reject(e)
            }
        })
    },
    /*
        根据表名返回 微信的 DB 对象
    */
    returnDBFromTable(tableName) {
        return wx.cloud.database().collection(tableName);
    },
    /*
        返回 command
    */
    returnCommand() {
        return wx.cloud.database().command;
    },
    /*
        本地调用数据库
    */
    bGet(tableName, whereData, skipNumber = 0, getNumber = 20) {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let res
                    if (skipNumber === 0) {
                        res = await this.returnDBFromTable(tableName)
                            .where(whereData)
                            .limit(getNumber)
                            .get()
                    } else {
                        res = await this.returnDBFromTable(tableName)
                            .where(whereData)
                            .skip(skipNumber)
                            .limit(getNumber)
                            .get()
                    }
                    if (!res) {
                        reject("utils_zyk.js bGet res error")
                    }
                    resolve(res.data)
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    bGetOrderBy(tableName, whereData, field, order, skipNumber = 0, getNumber = 20) {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let res
                    if (skipNumber === 0) {
                        res = await this.returnDBFromTable(tableName)
                            .where(whereData)
                            .orderBy(field, order)
                            .limit(getNumber)
                            .get()
                    } else {
                        res = await this.returnDBFromTable(tableName)
                            .where(whereData)
                            .orderBy(field, order)
                            .skip(skipNumber)
                            .limit(getNumber)
                            .get()
                    }
                    if (!res) {
                        reject("utils_zyk.js bGetOrderBy res error")
                    }
                    resolve(res.data)
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    bCount(tableName, whereData) {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let res
                    res = await this.returnDBFromTable(tableName)
                        .where(whereData)
                        .count()
                    if (!res) {
                        reject("utils_zyk.js bCount res error")
                    }
                    resolve(res.total)
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    bAdd(tableName, addData) {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let res = await this.returnDBFromTable(tableName)
                        .add({data: addData})
                    if (!res) {
                        reject("utils_zyk.js bAdd res error")
                    }
                    if (res.errMsg && res.errMsg === "collection.add:ok") {
                        resolve({
                            flag: true,
                            _id: res._id
                        })
                    } else {
                        reject("utils_zyk.js bAdd collection.add:error")
                    }
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    bUpdate(tableName, _id, updateData) {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let res = await this.returnDBFromTable(tableName)
                        .doc(_id)
                        .update({
                            data: updateData
                        })
                    if (!res) {
                        reject("utils_zyk.js bUpdate res error")
                    }
                    if (res.errMsg && res.errMsg === "document.update:ok") {
                        resolve({
                            flag: true,
                            updated: res.stats.updated
                        })
                    } else {
                        reject("utils_zyk.js bUpdate document.update:error")
                    }
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    bRemove(tableName, _id) {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let res = await this.returnDBFromTable(tableName)
                        .doc(_id)
                        .remove()
                    if (!res) {
                        reject("utils_zyk.js bRemove res error")
                    }
                    if (res.errMsg && res.errMsg === "document.remove:ok") {
                        resolve({
                            flag: true,
                            removed: res.stats.removed
                        })
                    } else {
                        reject("utils_zyk.js bRemove document.remove:error")
                    }
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    yUpdateInc(tableName, whereData, updateField, incNumber) {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let res
                    res = await this.wxc("callFunction", {
                        name: this.cloudFunctionName,
                        data: {
                            action: this.cloudAction.updateInc,
                            tableName: tableName,
                            whereData: whereData,
                            updateField: updateField,
                            updateNumber: incNumber,
                        }
                    })
                    if (!res) {
                        reject("utils_zyk.js yUpdateInc res error")
                    }
                    if (res.errMsg && res.errMsg === "cloud.callFunction:ok") {
                        if (res.result && res.result.errMsg && res.result.errMsg === "collection.update:ok") {
                            resolve({
                                flag: true,
                                updated: res.result.stats.updated
                            })
                        } else {
                            reject("utils_zyk.js yUpdateInc collection.update:error")
                        }
                    } else {
                        reject("utils_zyk yUpdateInc cloud.callFunction:error")
                    }
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    yUpdate(tableName, whereData, updateData) {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let res
                    res = await this.wxc("callFunction", {
                        name: this.cloudFunctionName,
                        data: {
                            action: this.cloudAction.update,
                            tableName: tableName,
                            whereData: whereData,
                            updateData: updateData
                        }
                    })
                    if (!res) {
                        reject("utils_zyk.js yUpdate res error")
                    }
                    if (res.errMsg && res.errMsg === "cloud.callFunction:ok") {
                        if (res.result && res.result.errMsg && res.result.errMsg === "collection.update:ok") {
                            resolve({
                                flag: true,
                                updated: res.result.stats.updated
                            })
                        } else {
                            reject("utils_zyk.js yUpdate collection.update:error")
                        }
                    } else {
                        reject("utils_zyk.js yUpdate cloud.callFunction:error")
                    }
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    yRemove(tableName, whereData) {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let res
                    res = await this.wxc("callFunction", {
                        name: this.cloudFunctionName,
                        data: {
                            action: this.cloudAction.remove,
                            tableName: tableName,
                            whereData: whereData
                        }
                    })
                    if (!res) {
                        reject("utils_zyk.js yRemove res error")
                    }
                    if (res.errMsg && res.errMsg === "cloud.callFunction:ok") {
                        if (res.result && res.result.errMsg && res.result.errMsg === "collection.remove:ok") {
                            resolve({
                                flag: true,
                                removed: res.result.stats.removed
                            })
                        } else {
                            reject("utils_zyk.js yRemove collection.remove:error")
                        }
                    } else {
                        reject("utils_zyk.js yRemove cloud.callFunction:error")
                    }
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    wx(functionName, params = {}) {
        return new Promise((resolve, reject) => {
            wx[functionName]({
                ...params,
                success: res => resolve(res),
                fail: res => reject(res)
            });
        });
    },
    wxc(functionName, params = {}) {
        return new Promise((resolve, reject) => {
            wx.cloud[functionName]({
                ...params,
                success: res => resolve(res),
                fail: res => reject(res)
            });
        });
    },
    wxf(functionObj, params = {}) {
        return new Promise((resolve, reject) => {
            functionObj({
                ...params,
                success: res => resolve(res),
                fail: res => reject(res)
            });
        });
    },
    setData(self, data) {
        let _data = {}
        Object.keys(data).forEach((item) => {
            if (typeof (data[item]) === "undefined") {
                throw ("one of setData undefined error")
            } else {
                _data[item] = data[item]
            }
        })
        self.setData(_data)
    },
    getData(self, name) {
        if (typeof (self.data[name]) === "undefined") {
            throw ("one of getData undefined error")
        }
        return self.data[name]
    },
    /*
        计算总页数
    */
    totalPage(totalNumber, onePageNumber) {
        let totalPage
        let shang = parseInt(totalNumber / onePageNumber)
        let yushu = totalNumber % onePageNumber
        if (yushu > 0) {
            totalPage = shang + 1
        } else {
            totalPage = shang
        }
        return totalPage
    },
    /*
        换取 图片 临时链接
    */
    getTempFileURL(fileList) {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let array = []
                    if (fileList.length === 0) {
                        reject("fileList length === 0")
                    }
                    let res = await this.wxc("getTempFileURL", {
                        fileList: fileList
                    })
                    res.fileList.forEach((item) => {
                        array.push(item.tempFileURL)
                    })
                    resolve(array)
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    /*
        计算两个 Date 间隔的 天数
    */
    datedifference(Date1, Date2) {
        let dateSpan, iDays;
        dateSpan = Date2 - Date1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
    },
    /*
        把一个时间转成字符串 2019-01-01 01:01:01
    */
    formatTime(date) {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()
        return [year, month, day].map(this.formatNumber).join('-') + ' ' +
            [hour, minute, second].map(this.formatNumber).join(':')
    },
    /*
        把一个时间转成字符串 2019-01-01
    */
    formatDate(date) {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        return [year, month, day].map(this.formatNumber).join('-')
    },
    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    /*
        返回昨天的 Date对象 Date(2019-05-22 00:00:00)
    */
    yesterdayDate() {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let _now = await utils_zyk.returnServerDate()
                    let _now2 = new Date(_now.getTime() - (24 * 3600 * 1000))
                    let _now3 = new Date(this.formatDate(_now2) + " 00:00:00")
                    resolve(_now3)
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    /*
       检测是否授权
    */
    isAuth() {
        return new Promise((resolve, reject) => {
            ;(async () => {
                try {
                    let res
                    res = await this.wx("getSetting")
                    if (res.authSetting['scope.userInfo']) {
                        resolve({
                            flag: true
                        })
                    } else {
                        resolve({
                            flag: false
                        })
                    }
                } catch (e) {
                    reject(e)
                }
            })();
        })
    },
    /*
        拿到 userinfo
        <button open-type="getUserInfo" bindgetuserinfo="getUserInfoOnPage">授权</button>
        getUserInfoOnPage() {
            ;(async () => {
                try {
                    let res = await utils_zyk.getUserInfo()
                } catch (e) {
                }
            })();
        }
    */
    getUserInfo() {
        return new Promise(async (resolve, reject) => {
            // ;(async () => {
            try {
                let res = await this.wx("getUserInfo")
                resolve(res.userInfo)
            } catch (e) {
                reject(e)
            }
            // })();
        })
    },
    /*
        打印log
    */
    l(fileName, lineNumber) {
        this.fileName = fileName;
        this.lineNumber = lineNumber;
        this.cFlag = true;
        return this
    },
    c(...p) {
        if (this.cFlag) {
            console.log("zyk log " + this.fileName + " " + this.lineNumber + " " + this.formatTime(new Date) + "\n", ...p)
        } else {
            console.log("zyk log " + this.formatTime(new Date) + "\n", ...p)
        }
        this.fileName = null;
        this.lineNumber = null;
        this.cFlag = null;
    },
    ce(...p) {
        if (this.cFlag) {
            console.log("%c%s", "color: red;", "zyk log " + this.fileName + " " + this.lineNumber + " " + "error " + this.formatTime(new Date) + "\n", ...p)
        } else {
            console.log("%c%s", "color: red;", "zyk log " + "error " + this.formatTime(new Date) + "\n", ...p)
        }
        this.fileName = null;
        this.lineNumber = null;
        this.cFlag = null;
    },
    /*设置上一个页面的 data*/
    setPreData(data) {
        let pages = getCurrentPages();
        let currPage = null; //当前页面
        let prevPage = null; //上一个页面
        if (pages.length >= 2) {
            currPage = pages[pages.length - 1]; //当前页面
            prevPage = pages[pages.length - 2]; //上一个页面
        }
        if (prevPage) {
            this.setData(prevPage, data)
        }
    },
    /*取 input 值 或 dataset 参数*/
    getEventValue(e, param) {
        if (param === "value") {
            return e.detail[param]
        } else {
            return e.currentTarget.dataset[param]
        }
    },
    /*检测是否有空值*/
    isNull(...o) {
        let returnboolean = false;
        o.forEach((item) => {
            if (item === null || item === '') {
                returnboolean = true;
            }
            let regu = "^[ ]+$";
            let re = new RegExp(regu);
            returnboolean = re.test(str);
        })
        return returnboolean;
    },
    /* 封装 request*/
    // get() {
    // },
    // post() {
    // },
    // postFile() {
    // },
    // postFiles() {
    // },
    // 模糊查询
    // name: {
    //     $regex: '.*' + that.data.Word,
    //     $options: 'i'
    // }
    // 判断字段是否存在
    // vipFlag: {
    //     $exists: false
    // }
};
export default utils_zyk;
