// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Mapres: "未找到当前位置信息",
        mapImg:     ['../../images/titleImage/map.png'],
        searchImg:  ['../../images/titleImage/search.png'],
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        // 用户信息
        userInfo: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 从storage中获取当前定位信息
        wx.getStorage({
            key: "ipaddress",
            success: res => {
                that.setData({
                    Mapres: res.data
                })
            }
        });
        wx.getUserInfo({
            success: res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            },
        })
    },
    // 改变当前位置, 并将新的结果储存到storage
    getgps: function () {
        var that = this;
        wx.chooseLocation({
            success: function (res) {
                that.setData({
                    Mapres: res.name
                });
                wx.setStorage({
                    key: "ipaddress",
                    data: that.data.Mapres
                })
            }
        })
    },
    bindGetUserInfo (e) {
        this.setData({
            userInfo: e.detail.userInfo
        })
    }
})