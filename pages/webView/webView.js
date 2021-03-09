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
        wx.request({
            url: 'https://wecm.schaoge.cn/index.php',
            method: 'GET',
            data: {
                'url': events.url.split('//')[1]
            },
            success: function (res) {
                that.setData({
                    url: 'https://wecm.schaoge.cn/news/' + res.data + '.html'
                })
            }
        })
    },
})