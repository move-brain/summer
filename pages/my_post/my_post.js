// pages/my_post/my_post.js
const { getrequest } = require("../../request");
const app = getApp()
const host = 'http://127.0.0.1:8083'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imagelwh: [{}],
        videolwh: [{}],
        none: false,
        type: '',
        not_posts: false
    },

    order(e) {
        var openid = wx.getStorageSync('openid')
        if (e.detail.value) {

            getrequest(host + '/wx_post/newcom_post', {
                openid
            }).then(res => {
                if (res.data.id == 1) {
                    this.setData({
                        posts: res.data.posts
                    })
                } else {
                    this.setData({
                        not_posts: true
                    })
                }
            })
        } else {
            getrequest(host + '/wx_post/get_newposts', {
                openid
            }).then(res => {
                if (res.data.id == 1) {
                    this.setData({
                        posts: res.data.posts
                    })
                } else {
                    this.setData({
                        not_posts: true
                    })
                }
            })
        }
    },
    de_post(e) {
        var posts = this.data.posts
        console.log(e);
        var index = e.currentTarget.dataset.index
        var TabCur = this.data.TabCur
        posts[TabCur].splice(index, 1)
        console.log(posts);
        this.setData({
            posts: posts
        })
    },
    collect(e) {
        console.log(e);
        var posts = this.data.posts
        var index = e.currentTarget.dataset.index
        var islike = e.currentTarget.dataset.islike

        var openid = wx.getStorageSync('openid')
        getrequest(host + '/wx_post/iscollect', {
            openid,
            post_id: posts[index].id,
            islike
        }).then(res => {
            console.log(res);
            if (res.statusCode == 200) {
                // posts[TabCur][index].is_like = !posts[TabCur][index].
                posts[index].is_collect = !posts[index].is_collect
                if (islike == 'true') {
                    posts[index].collect_num--
                }
                if (islike == 'false') {
                    posts[index].collect_num++
                }
                this.setData({
                    posts
                })
            }
        })
    },
    like(e) {
        console.log(e);
        var posts = this.data.posts
        var index = e.currentTarget.dataset.index
        var islike = e.currentTarget.dataset.islike

        var openid = wx.getStorageSync('openid')
        getrequest(host + '/wx_post/islike', {
            openid,
            post_id: posts[index].id,
            islike
        }).then(res => {
            console.log(res);
            if (res.statusCode == 200) {
                // posts[TabCur][index].is_like = !posts[TabCur][index].
                posts[index].is_like = !posts[index].is_like
                if (islike == 'true') {
                    posts[index].like_num--
                }
                if (islike == 'false') {
                    posts[index].like_num++
                }
                this.setData({
                    posts
                })
            }
        })
    },
    look_posts(e) {
        console.log(e);
        var id = e.currentTarget.dataset.id
        console.log(id);
        wx.navigateTo({
            url: '../posts/posts?post_id=' + id,
        })
    },
    lookimage(e) {
        var posts = this.data.posts
        var index = e.currentTarget.dataset.index
        var index_image = e.currentTarget.dataset.index_image
        if (posts[index].type == 'url_image') {
            var sources = [{
                url: posts[index].images[index_image],
                type: 'image'
            }]
        } else {
            var sources = [{
                url: posts[index].images[index_image],
                type: 'video'
            }]
        }

        wx.previewMedia({
            sources: sources,
            success(e) {
                console.log(e);
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    animage(e) {


        var index = e.currentTarget.dataset.index

        var imagelwh = this.data.imagelwh

        var viewwith = wx.getSystemInfoSync().windowWidth / 2

        if (e.detail.height < e.detail.width) {
            var viewheight = wx.getSystemInfoSync().windowHeight / 4

        } else {
            if (e.detail.height > e.detail.width) {
                var viewheight = wx.getSystemInfoSync().windowHeight / 2.5

            } else {
                var viewheight = viewwith
            }
        }
        imagelwh[index] = {
            width: viewwith,
            height: viewheight
        }
        this.setData({
            imagelwh
        })

    },

    anvideo(e) {


        var videolwh = this.data.videolwh

        var index = e.currentTarget.dataset.index
        var TabCur = this.data.TabCur
        if (e.detail.height < e.detail.width) {
            var viewwith = "100%"
            var viewheight = wx.getSystemInfoSync().windowHeight / 3
        } else {
            if (e.detail.height > e.detail.width) {
                var viewwith = "50%"
                var viewheight = wx.getSystemInfoSync().windowHeight / 2.5
            } else {
                var viewheight = viewwith
            }
        }
        videolwh[index] = {
            width: viewwith,
            height: viewheight
        }
        this.setData({
            videolwh
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var openid = wx.getStorageSync('openid')
        getrequest(host + '/wx_post/get_newposts', {
            openid
        }).then(res => {
            if (res.data.id == 1) {
                this.setData({
                    posts: res.data.posts
                })
            } else {
                this.setData({
                    not_posts: true
                })
            }
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