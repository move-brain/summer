// pages/issue/issue.js
const innerAudioContext = wx.createInnerAudioContext()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // src: "",
        imagelist: [],
        width: 0,
        isselectimage: false,
        isselectvideo: false,
        // isselectaudio: false,
        videolist: [],
        audio: ""
    },
    ChooseImage() {
        wx.chooseMedia({
            camera: ['back', 'front'],
            mediaType: "image",
            success: (res) => {
                console.log(res);
                for (var i = 0; i < res.tempFiles.length; i++) {
                    this.setData({
                        imagelist: this.data.imagelist.concat(res.tempFiles[i].tempFilePath)
                    })
                }

            },

            complete: (com) => {
                if (com.errMsg == "chooseMedia:ok") {
                    this.setData({
                        isselectimage: true
                    })
                }
            }
        })

    },
    Choosevideo() {
        wx.chooseMedia({
            camera: ['back', 'front'],
            mediaType: "video",
            success: (res) => {
                console.log(res);
                for (var i = 0; i < res.tempFiles.length; i++) {
                    this.setData({
                        videolist: this.data.videolist.concat(res.tempFiles[i].tempFilePath)
                    })
                }

            },

            complete: (com) => {
                console.log(com);
                if (com.errMsg == "chooseMedia:ok") {
                    this.setData({
                        isselectvideo: true
                    })
                }
            }
        })

    },

    // Chooseaudio(e) {
    //     wx.chooseMessageFile({
    //         count: 1,
    //         type: "file",
    //         success: (res) => {
    //             this.setData({
    //                 audio: res.tempFiles[0].path
    //             })
    //             var audio = this.data.audio
    //             console.log(audio);
    //             innerAudioContext.autoplay = true
    //             innerAudioContext.src = audio
    //             innerAudioContext.onPlay(() => {
    //                 console.log('开始播放')
    //             })
    //             innerAudioContext.onError((res) => {
    //                 console.log(res.errMsg)
    //                 console.log(res.errCode)
    //             })

    //             innerAudioContext.onPause(
    //                 () => {
    //                     console.log('停止播放')
    //                 }
    //             )
    //         },
    //         complete: (com) => {
    //             console.log(com);
    //             if (com.errMsg == "chooseMessageFile:ok") {
    //                 this.setData({
    //                     isselectaudio: true
    //                 })
    //             }
    //         }
    //     })
    // },
    // audioPlay: function() {
    //     innerAudioContext.play()
    // },
    // audioPause: function() {
    //     innerAudioContext.pause()
    // },
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.imagelist,
            current: e.currentTarget.dataset.url
        });
    },
    DelImg(e) {
        wx.showModal({
            title: '召唤师',
            content: '确定要删除这段回忆吗？',
            cancelText: '再看看',
            confirmText: '再见',
            success: res => {
                console.log(res);
                if (res.confirm) {
                    this.data.imagelist.splice(e.currentTarget.dataset.index, 1);
                    if (this.data.imagelist.length == 0) {
                        this.setData({
                            isselectimage: false
                        })
                    }
                    this.setData({
                        imagelist: this.data.imagelist
                    })
                }

            }
        })
    },
    Deveo(e) {
        wx.showModal({
            title: '召唤师',
            content: '确定要删除这段回忆吗？',
            cancelText: '再看看',
            confirmText: '再见',
            success: res => {
                console.log(res);
                if (res.confirm) {
                    this.data.videolist.splice(e.currentTarget.dataset.index, 1);
                    if (this.data.videolist.length == 0) {
                        this.setData({
                            isselectvideo: false
                        })
                    }
                    this.setData({
                        videolist: this.data.videolist
                    })
                }

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {


        var width = this.data.width
        this.setData({
            width: wx.getSystemInfoSync().windowWidth
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