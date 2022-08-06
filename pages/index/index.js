// index.js
// 获取应用实例
const app = getApp()

Page({

    data: {
        issue: [{
            islike: true,
            name: "将老头",
            time: "2017-01-20",
            headimage: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJtYwG6N2IAeibb8sY1MqowH7RAwvhHwMW7KKc8O6oftpJuQ40Na8zXBiazrYKPbARpts2n3RbNXNMg/132",
            text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, delectus quo eius repellendus harum mollitia quos similique quisquam officia esse iure alias consectetur facere culpa praesentium voluptatum sit assumenda magnam.",
            images: ["https://w.wallhaven.cc/full/y8/wallhaven-y8d6qx.jpg"]
        }, {
            islike: true,
            name: "将老头",
            time: "2017-01-20",
            headimage: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJtYwG6N2IAeibb8sY1MqowH7RAwvhHwMW7KKc8O6oftpJuQ40Na8zXBiazrYKPbARpts2n3RbNXNMg/132",
            text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, delectus quo eius repellendus harum mollitia quos similique quisquam officia esse iure alias consectetur facere culpa praesentium voluptatum sit assumenda magnam.",
            images: ["https://w.wallhaven.cc/full/y8/wallhaven-y8d6qx.jpg"]
        }],
        list: [{ text: "最新" }, { text: "图片" }, { text: "视频" }, { text: "交易" }],
        TabCur: 0,
        scrollLeft: 0,
        color: "#fff"
    },

    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
    },
    like(e) {
        console.log(e);
        var issue = this.data.issue
        var index = e.currentTarget.dataset.index
        issue[index].islike = !issue[index].islike
        this.setData({
            issue
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                select: 0
            })
        }
    },

})