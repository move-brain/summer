// index.js




const { getrequest } = require("../../request");
// 获取应用实例
const app = getApp()
const host = 'http://127.0.0.1:8083'
Page({

    data: {
        imagelwh: [{}],
        videolwh: [{}],
        isadd: false,
        winwidth: 0,
        posts: [],
        list: [{ text: "最新" }, { text: "视频" }, { text: "校园互助" }, { text: "避雷专区" }, { text: "游戏" }, { text: "运动" }, { text: "玩梗" }],
        TabCur: 0,
        scrollLeft: 0,
        color: "#fff",
        with: 0,
        height: 0,
        videolist: [],
        winheight: 0,
        se_tabcur: [],
        showsearch: true
    },
    animage(e) {


        var index = e.currentTarget.dataset.index

        var imagelwh = this.data.imagelwh
        var TabCur = this.data.TabCur
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
        imagelwh[TabCur][index] = {
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
        videolwh[TabCur][index] = {
            width: viewwith,
            height: viewheight
        }
        this.setData({
            videolwh
        })
    },
    search(e) {
        wx.navigateTo({
            url: '../search/search',
        })
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })

    },
    hdsearch(e) {
        var showsearch = this.data.showsearch
        if (e.detail.scrollTop > 300) {
            this.setData({
                showsearch: false
            })
        } else {
            this.setData({
                showsearch: true
            })
        }
    },
    tapChange(e) {

        this.setData({
            TabCur: e.detail.current,
            scrollLeft: (e.detail.current - 1) * 60
        })
        var posts = this.data.posts
        var TabCur = this.data.TabCur

        var islogin = app.userlogin.islogin
        var openid = app.userlogin.openid
        return new Promise((resolve, rejects) => {
                if (TabCur > 0) {
                    if (posts[TabCur] == null) {
                        wx.showLoading({
                            title: '客官稍等',
                        })
                        var list = this.data.list
                        if (TabCur == 1) {
                            var type = '视频'
                        } else {
                            var type = list[TabCur].text
                        }
                        getrequest(host + '/wx_posts/sp_posts', {
                            type,
                            islogin,
                            openid
                        }).then(res => {
                            posts[TabCur] = res.data
                            var se_tabcur = this.data.se_tabcur
                            se_tabcur[TabCur] = true
                            this.setData({
                                se_tabcur,
                                posts
                            })
                            wx.hideLoading()
                        })
                    }
                }

            })
            // if (TabCur > 0) {
            //     if (TabCur == 1) {
            //         if (posts[TabCur] == null) {
            //             wx.showToast({
            //                 title: '正在加载',
            //                 icon: 'loading'
            //             })
            //             wx.hideLoading();
            //             var list = this.data.list
            //             getrequest(host + '/wx_posts/sp_posts', {
            //                 type: '视频',
            //                 islogin,
            //                 openid
            //             }).then(res => {
            //                 posts[TabCur] = res.data
            //                 this.setData({
            //                     posts,
            //                     se_tabcur: TabCur
            //                 })
            //                 wx.hideLoading();
            //             })
            //         } else {
            //             this.setData({
            //                 se_tabcur: TabCur
            //             })
            //             wx.hideLoading();
            //         }
            //     } else {
            //         if (posts[TabCur] == null) {
            //             wx.showToast({
            //                 title: '正在加载',
            //                 icon: 'loading'
            //             })
            //             var list = this.data.list
            //             getrequest(host + '/wx_posts/sp_posts', {
            //                 type: list[TabCur].text,
            //                 islogin,
            //                 openid
            //             }).then(res => {
            //                 posts[TabCur] = res.data
            //                 this.setData({
            //                     posts,
            //                     se_tabcur: TabCur
            //                 })
            //                 wx.hideLoading();
            //             })
            //         } else {
            //             this.setData({
            //                 se_tabcur: TabCur
            //             })
            //             wx.hideLoading();
            //         }
            //     }
            // }
    },
    look_posts(e) {
        console.log(e);
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../posts/posts?post_id=' + id,
        })
    },
    look_user(e) {
        console.log(e + 'hdj');
    },
    like(e) {

        var posts = this.data.posts
        var index = e.currentTarget.dataset.index
        var islike = e.currentTarget.dataset.islike
        var TabCur = this.data.TabCur
        getrequest(host + '/wx_post/islike', {
            user_id: posts[TabCur][index].user_id,
            post_id: posts[TabCur][index].id,
            islike
        }).then(res => {
            console.log(res);
            if (res.statusCode == 200) {
                // posts[TabCur][index].is_like = !posts[TabCur][index].is_like
                for (var i in posts) {
                    if (posts[i] != null) {
                        for (var k in posts[i]) {
                            if (posts[i][k].id == posts[TabCur][index].id) {
                                posts[i][k].is_like = !posts[i][k].is_like
                            }
                        }
                    }
                }
                this.setData({
                    posts
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function(e) {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                select: 0
            })
        }
    },
    onLoad: function(e) {
        var posts = this.data.posts
        var videolwh = this.data.videolwh
        var imagelwh = this.data.imagelwh
        posts[7] = {}
        console.log(app.userlogin.islogin);
        for (var i = 0; i < 8; i++) {
            videolwh[i] = []
            imagelwh[i] = []
        }
        this.setData({
            posts,
            videolwh
        })
        console.log(e);
        return new Promise((resolve, rejects) => {
            this.setData({
                winwidth: wx.getSystemInfoSync().windowWidth,
                winheight: wx.getSystemInfoSync().windowHeight
            })
            var openid = wx.getStorageSync('openid')
            console.log(openid);
            if (openid == ' ') {
                console.log(openid);
                getrequest(host + '/wx_post/get_allpost', {
                    islogin: false
                }).then(res => {
                    if (res.statusCode == 200) {
                        var posts = this.data.posts
                        posts[0] = res.data
                        this.setData({
                            posts
                        })
                    } else { console.log(res) }
                })
            } else {
                wx.checkSession({
                    success: (res) => {
                        console.log(88888);
                        getrequest(host + '/wx_post/get_allpost', {
                            openid,
                            islogin: true
                        }).then(res => {
                            if (res.statusCode == 200) {
                                var posts = this.data.posts
                                posts[0] = res.data
                                this.setData({
                                    posts
                                })
                            } else { console.log(res) }
                        })
                    },
                    fail: (err) => {
                        getrequest(host + '/wx_post/get_allpost', {
                            islogin: false
                        }).then(res => {
                            if (res.statusCode == 200) {
                                var posts = this.data.posts
                                posts[0] = res.data
                                this.setData({
                                    posts
                                })
                            } else { console.log(res) }
                        })
                    }
                })
            }
            // getrequest(host + '/wx_post/get_allpost').then(res => {
            //     if (res.statusCode == 200) {
            //         this.setData({
            //             issue: res.data
            //         })
            //     } else { console.log(res) }
            // })
        })
    }

})