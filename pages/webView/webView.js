// pages/webView/webView.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (events) {
        let that = this;
        // 以POST方式发送当前点击的新闻链接
        that.setData({
            url: 'https://wecm.schaoge.cn/index.php?url=' + events.url
        })
    },
})