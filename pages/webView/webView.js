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
        // 渲染当前点击的新闻标题链接
        that.setData({
            url: 'https://wecm.schaoge.cn/index.php?url=' + events.url
        })
    },
})