const { time } = require("console");
const { getrequest } = require("../../request");
const host = "http://127.0.0.1:8083"
    // pages/br_com/br_com.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imagelwh: {},
        com: {},
        keyboard_hei: 0,
        text: '',
        br_id: 0
    },
    main_image(e) {
        console.log(e);
        var index = e.currentTarget.dataset.index

        var imagelwh = this.data.imagelwh

        var viewwith = wx.getSystemInfoSync().windowWidth / 2
        var hei_with = e.detail.height / e.detail.width
        var viewheight = hei_with * viewwith

        imagelwh = {
            width: viewwith,
            height: viewheight
        }
        this.setData({
            imagelwh
        })
    },
    issue_br(e) {
        var openid = wx.getStorageSync('openid')
        var head = wx.getStorageSync('headimage')
        var name = wx.getStorageSync('name')
        var main_id = this.data.com.id
        var br_id = this.data.br_id
        var text = this.data.text
        wx.showLoading({
            title: '正在发表',
        })
        getrequest(host + '/wx_post/br_com', {
            openid,
            main_id,
            br_id,
            text
        }).then(res => {
            console.log(res);
            var com_time = time
            if (res.data.statusCode == 200) {
                this.setData
            }
        })
    },
    br_text(e) {
        this.setData({
            text: e.detail.value
        })
    },

    focus(e) {
        var keyboard_hei = e.detail.height
        this.setData({
            keyboard_hei
        })
    },
    blur(e) {
        this.setData({
            keyboard_hei: 0
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        var com = options.com
        com = JSON.parse(com)
        console.log(com);
        this.setData({
            com
        })
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