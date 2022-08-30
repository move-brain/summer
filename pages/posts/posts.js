// pages/posts/posts.js
var app = getApp()




const { getrequest } = require("../../request")
const { time } = require("../../request")
const host = 'http://127.0.0.1:8083'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        jp: 0,
        not_data: false,
        main_num: 0,
        percent: 50,
        post: {},
        main_com: [],
        br_com: [],
        imageslwh: [],
        imagelwh: [],
        br_comdata: [],
        dialog4: false,
        new_com: false,
        reply_name: '',
        text: '',
        is_brmain: 'main',
        main_id: 0,
        press: true
    },
    lookimage_com(e) {
        var index = e.currentTarget.dataset.index
        var post = this.data.post
        var main_com = this.data.main_com
        wx.previewImage({
            urls: main_com[index].image
        })
    },
    lookimage_post(e) {
        var index = e.currentTarget.dataset.index
        var post = this.data.post
        wx.previewImage({
            current: post.images[index], // 当前显示图片的 http 链接
            urls: post.images // 需要预览的图片 http 链接列表
        })
    },
    lookvideo(e) {
        var index = e.currentTarget.dataset.index
        var post = this.data.post
        var sources = {
            url: post.images[index],
            type: 'video'
        }
        wx.previewMedia({
            sources: [sources],

        })
    },
    like(e) {
        var post = this.data.post

        var islike = e.currentTarget.dataset.islike

        var openid = wx.getStorageSync('openid')
        getrequest(host + '/wx_post/islike', {
            openid,
            post_id: post.id,
            islike
        }).then(res => {
            console.log(res);
            if (res.statusCode == 200) {
                post.is_like = !post.is_like
                if (islike == 'true') {
                    post.like_num--
                } else {
                    post.like_num++
                }
                this.setData({
                        post
                    })
                    // posts[TabCur][index].is_like = !posts[TabCur][index].is_like
                    // for (var i in posts) {
                    //     if (posts[i] != null) {
                    //         for (var k in posts[i]) {
                    //             if (posts[i][k].id == posts[TabCur][index].id) {
                    //                 posts[i][k].is_like = !posts[i][k].is_like
                    //             }
                    //         }
                    //     }
                    // }
                    // this.setData({
                    //     posts
                    // })


            }
        })
    },
    collect(e) {
        var post = this.data.post

        var islike = e.currentTarget.dataset.islike

        var openid = wx.getStorageSync('openid')
        getrequest(host + '/wx_post/iscollect', {
            openid,
            post_id: post.id,
            islike
        }).then(res => {
            console.log(res);
            if (res.statusCode == 200) {
                post.is_collect = !post.is_collect
                if (islike == 'true') {
                    post.collect_num--
                } else {
                    post.collect_num++
                }

                this.setData({
                        post
                    })
                    // posts[TabCur][index].is_like = !posts[TabCur][index].is_like
                    // for (var i in posts) {
                    //     if (posts[i] != null) {
                    //         for (var k in posts[i]) {
                    //             if (posts[i][k].id == posts[TabCur][index].id) {
                    //                 posts[i][k].is_like = !posts[i][k].is_like
                    //             }
                    //         }
                    //     }
                    // }
                    // this.setData({
                    //     posts
                    // })


            }
        })
    },
    press(e) {
        this.setData({
            press: false
        })
    },
    issue(e) {
        var post = this.data.post
        var text = this.data.text
        if (this.data.is_brmain == 'main') {
            getrequest(host + '/wx_post/main_com', {
                post_id: post.id,
                user_id: post.user_id,
                text
            }).then(res => {
                if (res.statusCode == 200) {
                    var name = wx.getStorageSync('name')
                    var head = wx.getStorageSync('headimage')
                    var id = res.data.id
                    var com_time = res.data.com_time
                    com_time = time(com_time)
                    var com = {
                        id,
                        com_time,
                        head,
                        name,
                        post_id: post.id,
                        text,
                        user_id: post.user_id
                    }
                    var main_com = this.data.main_com

                    if (main_com.length == 0) {
                        main_com[0] = com
                    } else {
                        main_com.unshift(com)
                    }
                    var br_comdata = this.data.br_comdata
                    if (br_comdata.length == 0) {
                        br_comdata[0] = 3
                    } else {
                        br_comdata.unshift(3)
                    }


                    // var br_com = this.data.br_com
                    this.setData({
                        main_com,
                        br_comdata,
                        text: ''
                    })
                } else {
                    wx.showToast({
                        title: "发表失败",
                        icon: 'error'
                    })
                    return 0
                }
            })
        } else {
            var openid = wx.getStorageSync('openid')
            var main_id = this.data.main_id
            var name = wx.getStorageSync('name')
            var head = wx.getStorageSync('headimage')
            getrequest(host + '/wx_post/br_com', {
                openid,
                main_id,
                br_id: 0,
                text,
                reply_name: ''
            }).then(res => {
                console.log(res);
                var com_time = time(res.data.com_time)
                var newbr_com = {
                    main_id,
                    br_id: 0,
                    name,
                    head,
                    text,
                    com_time,
                    reply_name: ''
                }
                var br_com = this.data.br_com
                if (br_com.length == 0) {
                    br_com[0] = newbr_com
                } else {
                    br_com.unshift(newbr_com)
                }
                console.log(br_com);
                var main_com = this.data.main_com
                var br_comdata = this.data.br_comdata
                for (var i in main_com) {
                    var num = 0;
                    br_comdata[i] = {
                        index: 0,
                        is_more: false
                    }
                    for (var index in br_com) {
                        if (main_com[i].id == br_com[index].main_id) {
                            console.log(num);
                            if (num == 3) {
                                br_comdata[i].index = index - 1;
                                br_comdata[i].is_more = true
                                break;
                            } else {
                                br_comdata[i].index = index;
                                num++;
                            }
                        }
                    }
                }

                this.setData({
                    br_comdata,
                    br_com,
                    main_com,
                    text: ''
                })
            })
        }
    },

    is_brmain(e) {
        var is_brmain = e.currentTarget.dataset.is_brmain
        var post = this.data.post
        var index = e.currentTarget.dataset.index
        var main_com = this.data.main_com
        if (is_brmain == 'main') {
            this.setData({
                is_brmain,
                reply_name: post.name
            })
        } else {
            this.setData({
                is_brmain,
                reply_name: main_com[index].name,
                main_id: main_com[index].id
            })
        }

    },
    text(e) {

        this.setData({
            text: e.detail.value
        })
    },
    br_com(e) {
        console.log(e);
        var index = e.currentTarget.dataset.index

        var main_com = this.data.main_com
        var com = main_com[index]
        com = JSON.stringify(com)
        console.log(com);
        wx.navigateTo({
            url: '../br_com/br_com?com=' + encodeURIComponent(com),
        })
    },

    focus(e) {
        console.log(e);
        var jp = e.detail.height
        this.setData({
            jp
        })
    },

    blur(e) {
        this.setData({
            jp: 0
        })
    },
    main_image(e) {
        console.log(e);
        var index = e.currentTarget.dataset.index

        var imagelwh = this.data.imagelwh

        var viewwith = wx.getSystemInfoSync().windowWidth / 2
        var hei_with = e.detail.height / e.detail.width
        var viewheight = hei_with * viewwith

        imagelwh[index] = {
            width: viewwith,
            height: viewheight
        }
        this.setData({
            imagelwh
        })
    },


    order(e) {
        this.setData({
            new_com: e.detail.value
        })
        var post = this.data.post
        var main_num = this.data.main_num
        getrequest(host + '/wx_post/get_allcom', {
            new_com: e.detail.value,
            post_id: post.id,
            main_num: 0
        }).then(res => {
            if (res.statusCode == 200) {
                if (res.data.id == 1) {
                    var main_com = res.data.main_com
                    var br_com = res.data.br_com
                    console.log(res.data.br_com);
                    var br_comdata = this.data.br_comdata
                    for (var i in main_com) {
                        var num = 0;
                        br_comdata[i] = {
                            index: 0,
                            is_more: false
                        }
                        main_com[i].com_time = time(main_com[i].com_time)
                        for (var index in br_com) {
                            br_com[index].com_time = time(br_com[index].com_time)
                            if (main_com[i].id == br_com[index].main_id) {
                                if (num == 3) {
                                    br_comdata[i].index = index - 1;
                                    br_comdata[i].is_more = true;
                                    break;
                                } else {
                                    br_comdata[i].index = index;
                                    num++;
                                }
                            }
                        }
                    }

                    this.setData({
                        br_comdata,
                        main_com,
                        br_com,

                        reply_name: post.name
                    })

                } else {
                    wx.showToast({
                        title: '还没有评论哦',
                        icon: 'error'
                    })
                }
            }
        })
    },

    images(e) {
        console.log(e);
        var imagewith = wx.getSystemInfoSync().windowWidth * 0.95
        var hei_wid = e.detail.height / e.detail.width
        var imageheight = hei_wid * imagewith
        var index = e.currentTarget.dataset.index
        var imageslwh = this.data.imageslwh
        imageslwh[index] = {
            imageheight,
            imagewith
        }
        this.setData({
            imageslwh
        })
    },
    videos(e) {
        console.log(e);
        var imagewith = wx.getSystemInfoSync().windowWidth * 0.95
        var hei_wid = e.detail.height / e.detail.width
        var imageheight = hei_wid * imagewith
        var index = e.currentTarget.dataset.index
        var imageslwh = this.data.imageslwh
        imageslwh[index] = {
            imageheight,
            imagewith
        }
        this.setData({
            imageslwh
        })
    },
    issueimage(e) {
        var post_id = this.data.post.id
        var user_id = this.data.post.user_id
        wx.navigateTo({
            url: '../issue_im/issue_im?post=' + post_id + '&&user_id=' + user_id
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    is_more(e) {
        var main_com = this.data.main_com
        var br_com = this.data.br_com
        var br_comdata = this.data.br_comdata
        for (var i in main_com) {
            var num = 0;
            br_comdata[i] = {
                index: 0,
                is_more: false
            }

            for (var index in br_com) {

                if (main_com[i].id == br_com[index].main_id) {
                    if (num == 3) {
                        br_comdata[i].index = index - 1;
                        br_comdata[i].is_more = true
                        break;
                    } else {
                        br_comdata[i].index = index;
                        num++;
                    }
                }
            }
        }
        this.setData({
            main_com,
            br_com,
            br_comdata
        })
    },
    onLoad(options) {
        var islogin = app.userlogin.islogin
        var post_id = options.post_id
        var openid = app.userlogin.openid
        var br_comdata = this.data.br_comdata
        console.log(post_id);
        getrequest(host + '/wx_posts/look_posts', {
            islogin,
            openid,
            post_id
        }).then(res => {
            console.log(res);
            if (res.statusCode == 200) {
                res.data[0].post_time = time(res.data[0].post_time)
                this.setData({
                    percent: 70,
                    post: res.data[0]
                })
            }
        }).then(res => {
            var post = this.data.post
            var main_num = this.data.main_num
            getrequest(host + '/wx_post/get_allcom', {
                new_com: false,
                post_id: post.id,
                main_num
            }).then(res => {
                if (res.statusCode == 200) {
                    if (res.data.id == 0) {
                        wx.showToast({
                            title: '没有评论',
                            icon: 'error'
                        })
                    } else {
                        var main_com = res.data.main_com
                        var br_com = res.data.br_com
                        for (var i in main_com) {
                            var num = 0;
                            br_comdata[i] = {
                                index: 0,
                                is_more: false
                            }
                            main_com[i].com_time = time(main_com[i].com_time)
                            for (var index in br_com) {
                                br_com[index].com_time = time(br_com[index].com_time)
                                if (main_com[i].id == br_com[index].main_id) {
                                    if (num == 3) {
                                        br_comdata[i].index = index - 1;
                                        br_comdata[i].is_more = true;
                                        break;
                                    } else {
                                        br_comdata[i].index = index;
                                        num++;
                                    }
                                }
                            }
                        }
                        var post = this.data.post

                        this.setData({
                            br_comdata,
                            main_com,
                            br_com,
                            percent: 100,
                            reply_name: post.name
                        })
                    }
                } else {
                    wx.showToast({
                        title: '请重新进入',
                        icon: 'error'
                    })
                }
            })
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

        this.is_more();


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
        console.log(11);
        var post = this.data.post
        var main_num = this.data.main_num
        var islogin = app.userlogin.islogin
        var openid = app.userlogin.openid
        var br_comdata = this.data.br_comdata
        var new_com = this.data.new_com
        getrequest(host + '/wx_posts/look_posts', {
            islogin,
            openid,
            post_id: post.id
        }).then(res => {

            if (res.statusCode == 200) {
                res.data[0].post_time = time(res.data[0].post_time)
                this.setData({
                    percent: 70,
                    post: res.data[0]
                })
            }
        }).then(res => {
            getrequest(host + '/wx_post/get_allcom', {
                new_com,
                post_id: post.id,
                main_num
            }).then(res => {
                if (res.statusCode == 200) {
                    if (res.data.id == 0) {
                        wx.showToast({
                            title: '没有评论',
                            icon: 'error'
                        })
                        wx.stopPullDownRefresh();
                    } else {
                        var main_com = res.data.main_com
                        var br_com = res.data.br_com
                        for (var i in main_com) {
                            var num = 0;
                            br_comdata[i] = {
                                index: 0,
                                is_more: false
                            }
                            main_com[i].com_time = time(main_com[i].com_time)
                            for (var index in br_com) {
                                br_com[index].com_time = time(br_com[index].com_time)
                                if (main_com[i].id == br_com[index].main_id) {
                                    if (num == 3) {
                                        br_comdata[i].index = index - 1;
                                        br_comdata[i].is_more = true;
                                        break;
                                    } else {
                                        br_comdata[i].index = index;
                                        num++;
                                    }
                                }
                            }
                        }
                        var post = this.data.post

                        this.setData({
                            br_comdata,
                            main_com,
                            br_com,
                            percent: 100,
                            reply_name: post.name
                        })
                        wx.stopPullDownRefresh();
                    }
                }
            })
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        var main_num = this.data.main_num
        main_num = main_num + 20
        var new_com = this.data.new_com
        var post = this.data.post
        getrequest(host + '/wx_post/get_allcom', {
            new_com,
            post_id: post.id,
            main_num
        }).then(res => {
            console.log(res);
            if (res.statusCode == 200) {
                if (res.data.id == 0) {
                    this.setData({
                        not_data: true
                    })

                    return 0;
                } else {

                    var main_com = this.data.main_com
                    var br_com = this.data.br_com
                    main_com = main_com.concat(res.data.main_com)
                    console.log(main_com);
                    if (res.data.br_com.length != 0) {
                        br_com = br_com.concat(res.data.br_com)
                    }
                    this.setData({
                        main_com,
                        br_com,
                        main_num
                    })
                    this.is_more();
                }
            } else {
                wx.showToast({
                    title: '请求失败',
                    icon: 'error'
                })
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})