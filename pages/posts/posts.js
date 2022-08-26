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

        percent: 30,
        post: {},
        main_com: [{
            id: 1,
            user: 1,
            head: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJtYwG6N2IAeibb8sY1MqowH7RAwvhHwMW7KKc8O6oftpJuQ40Na8zXBiazrYKPbARpts2n3RbNXNMg/132',
            name: '姜太公',
            post_id: 15,
            text: "朱厚华真他妈帅",
            image: ["http://127.0.0.1:8083/post/images/1660659072424.jpg"],
            com_time: "2022-08-22"
        }, {
            id: 2,
            user: 1,
            head: 'https://images.pexels.com/photos/4089237/pexels-photo-4089237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            name: '覃lil',
            post_id: 15,
            image: ["http://127.0.0.1:8083/post/images/1660659072424.jpg"],
            text: "啦啦啦啦啦啦啦",
            com_time: "2022-08-22"
        }],
        br_com: [{
            id: 1,
            user_id: 1,
            main_id: 1,
            br_id: 0,
            reply_name: '',
            head: 'https://images.pexels.com/photos/4089237/pexels-photo-4089237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            name: '覃lil',
            text: "说的太对了重播健康上半场结束v保护费故事v不超过接口对接和v看完hi风格结尾部分回复IC北京",
            com_time: "2022-08-22"
        }, {
            id: 2,
            user_id: 1,
            main_id: 1,
            reply_name: '覃李路',
            head: 'https://images.pexels.com/photos/4089237/pexels-photo-4089237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            name: '覃李路',
            br_id: 1,
            text: "真有眼光",
            com_time: "2022-08-22"
        }, {
            id: 3,
            user_id: 1,
            main_id: 2,
            reply_name: '',
            head: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJtYwG6N2IAeibb8sY1MqowH7RAwvhHwMW7KKc8O6oftpJuQ40Na8zXBiazrYKPbARpts2n3RbNXNMg/132',
            name: '姜太公',
            br_id: 0,
            text: "拉个鬼哦",
            com_time: "2022-08-22"
        }, {
            id: 1,
            user_id: 1,
            main_id: 1,
            br_id: 1,
            reply_name: '',
            head: 'https://images.pexels.com/photos/4089237/pexels-photo-4089237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            name: '覃lil',
            text: "说的太对了重播健康上半场结束v保护费故事v不超过接口对接和v看完hi风格结尾部分回复IC北京",
            com_time: "2022-08-22"
        }, {
            id: 2,
            user_id: 1,
            main_id: 1,
            reply_name: '覃李路',
            head: 'https://images.pexels.com/photos/4089237/pexels-photo-4089237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            name: '覃李路',
            br_id: 1,
            text: "真有眼光",
            com_time: "2022-08-22"
        }],
        imageslwh: [],
        imagelwh: [],
        br_comdata: [],
        dialog4: false,
        new_com: false

    },
    br_com(e) {
        console.log(e);
        var index = e.currentTarget.dataset.index

        var main_com = this.data.main_com
        var com = main_com[index]

        com = JSON.stringify(com)
        console.log(com);
        wx.navigateTo({
            url: '../br_com/br_com?com=' + com,
        })
    },

    focus(e) {
        console.log(e);
        var jp = e.detail.height
        this.setData({
            jp
        })
    },
    fasong(e) {
        console.log(e);
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
            br_comdata[i] = 0

            for (var index in br_com) {

                if (main_com[i].id == br_com[index].main_id) {
                    if (num == 3) {
                        br_comdata[i] = index;
                        break;
                    } else {
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
        var main_com = this.data.main_com
        var br_com = this.data.br_com
        var br_comdata = this.data.br_comdata
        for (var i in main_com) {
            var num = 0;
            br_comdata[i] = 0
            main_com[i].com_time = time(main_com[i].com_time)
            for (var index in br_com) {
                br_com[index].com_time = time(br_com[index].com_time)
                if (main_com[i].id == br_com[index].main_id) {
                    if (num == 3) {
                        br_comdata[i] = index;
                        break;
                    } else {
                        num++;
                    }
                }
            }
        }





        this.setData({
            main_com,
            br_com,
            percent: 50,
            br_comdata
        })
        getrequest(host + '/wx_posts/look_posts', {
            islogin,
            openid,
            post_id
        }).then(res => {
            if (res.statusCode == 200) {
                res.data[0].post_time = time(res.data[0].post_time)
                this.setData({
                    percent: 70,
                    post: res.data[0]
                })
            }
        }).then(res => {
            var post = this.data.post
            getrequest(host + '/wx_post/get_com', {
                new_com: false,
                post_id: post.id
            }).then(res => {
                console.log(res);
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