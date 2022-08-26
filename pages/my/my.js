// pages/my/my.js
var app = getApp()

const getquest = require('../../request.js').getrequest
const host = 'http://127.0.0.1:8083'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        headimage: "http://m.qpic.cn/psc?/V50Fs1Xr3RvV6z1kISRj26VmXM3qPEMP/ruAMsa53pVQWN7FLK88i5qXSBaCJW5fBtc8gslwiNeahMGH2zu7hRv9uPao1ynkrG7LQWAWvTDvbQBBjD4GpoWT7B8G2f3CBOPnuyvTMiFU!/b&bo=yADIAAAAAAADByI!&rf=viewer_4",
        name: "未登录"

    },
    isnologin(res) {
        return new Promise((resolve, reject) => {
            var name = this.data.name
            var headimage = this.data.headimage
            if (app.userlogin.islogin) {
                wx.previewImage({
                    urls: [headimage],
                    current: headimage
                })
            } else {
                wx.getUserProfile({
                    desc: '获取你的信息用于登录',
                    success: (res) => {
                        wx.showLoading({
                            title: '正在登陆',
                        })
                        name = res.userInfo.nickName
                        headimage = res.userInfo.avatarUrl
                        wx.setStorageSync('name', name)
                        wx.setStorageSync('headimage', headimage)

                        wx.login({
                            timeout: 2000,
                        }).then(res => {
                            getquest(host + '/wx_post/newuser', {
                                code: res.code
                            }).then(res => {
                                app.userlogin.islogin = true
                                console.log(res);
                                var openid = res.data.session.openid
                                console.log(openid);
                                wx.setStorageSync('openid', openid)
                                getquest(host + '/wx_post/set_user', {
                                    openid,
                                    name,
                                    headimage
                                }).then(res => {
                                    console.log(res);
                                    wx.hideLoading()
                                    this.setData({
                                        name,
                                        headimage
                                    })
                                    wx.reLaunch({
                                        url: '../index/index',
                                    })
                                })
                            })
                        })
                    },
                    fail: (res) => {
                        return console.log(res);
                    }
                })

            }


        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var openid = wx.getStorageSync('openid')
        console.log(openid);
        if (openid) {
            console.log(888);
            wx.checkSession({
                success: (res) => {
                    getquest(host + '/wx_post/get_user', {
                            openid
                        }).then(res => {
                            this.setData({
                                    headimage: res.data.head,
                                    name: res.data.name
                                })
                                // console.log(res);
                                // this.user.name = res.data.name
                                // this.user.headimage = res.data.head
                        })
                        // this.userlogin.openid = openid
                        // this.userlogin.islogin = true

                },
                fail: (res) => {
                    wx.showToast({
                        title: '登录信息过期',
                        icon: 'fail',
                        duration: 2000
                    })
                },

            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                select: 1
            })
        }
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