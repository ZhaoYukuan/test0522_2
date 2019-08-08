Page({
    data: {
        dataTest: [{text: "有有有有有有看"}]
    },
    onLoad() {

    },
    add() {
        let data = this.data.dataTest
        data.push({text: "有有有有有有看"})
        this.setData({
            dataTest: data
        })
    },
    bindinput(e) {
        let index = e.currentTarget.dataset.index
        let value = e.detail.value
        let data = this.data.dataTest
        data[index].text = value
        this.setData({
            dataTest: data
        })
    },
    print(){
        console.log(this.data.dataTest)
    },
})