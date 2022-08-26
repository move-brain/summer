// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchtext: "",
        searchlist: ["hhhh", "哈哈哈哈", "谢谢正好看", "彼此", "hfdugfudghvcxhdcvuedghfugeufhweuibfuygeu9"],
        list: [{
            select: false,
            text: " 太古十凶之一——鲲鹏，其遗巢惊现，就横陈在前方，那种惊心动魄的景象令人瞠目，随之而颤！"
        }, {
            select: false,
            text: "太古十凶之一——鲲鹏，其遗巢惊现，就横陈在前方，那种惊心动魄的景象令人瞠目，随之而颤"
        }, {
            select: false,
            text: "海面都红了，漂浮着众多尸体，各个种族的都有，喊杀震天，鲲鹏之无上宝术将出，各族精英尽出。"
        }],
        delete: false
    },
    delete(e) {
        this.setData({
            delete: !this.data.delete
        })
    },
    delete__(e) {
        console.log(e);
        var searchlist = this.data.searchlist
        var index = e.currentTarget.dataset.index
        searchlist.splice(index, 1)
        this.setData({
            searchlist
        })
    },
    record(e) {

        this.setData({
            searchtext: e.detail.value
        })
    },
    search(e) {
        return new Promise((resolve, reject) => {
            var list = this.data.list
            var searchtext = this.data.searchtext
            for (var index in list) {
                var re = new RegExp(searchtext, "ig")
                if (re.test(list[index].text)) {
                    console.log(index);
                    list[index].select = true
                    this.setData({
                        list
                    })
                }
            }
            resolve();
        }).then(res => {
            wx.navigateTo({
                url: '../select/select',
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})