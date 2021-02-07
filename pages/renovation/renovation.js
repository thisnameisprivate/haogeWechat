// pages/renovation/renovation.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mapImg:     ['../../images/titleImage/map.png'],
        searchImg:  ['../../images/titleImage/search.png'],
        Mapres: "未找到当前位置信息",
        // 页面区分
        initType: null,
        // list图标
        handleList: "/images/titleImage/handleList.png",
        // 下拉列表图标默认为0，关闭状态
        handleListClickStatus:{
            region:  false,
            sort:  false,
            screen: false,
        },
        isShow:{
            region: {'visibility':false, 'index': 'region'},
            sort: {'visibility':false, 'index': 'region'},
            screen: {'visibility':false, 'index': 'region'}
        },
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
    onLoad: function (events) {
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
        // 根据参数修改当前 initType 区分功能页面
        if (parseInt(events.initType) === 7 ) {
            that.data.initType = events.initType
        }
    },
    /**
     * @param null
     */
    bindsearch: function () {
        wx.navigateTo({
            url: "../search/search?initType=" + this.data.initType
        })
    },
    /**
     * @param { event } 标签分辨参数 region, sort, screen
     * list点击事件
     */
    handleListClick: function (event) {
        if (event.currentTarget.dataset.index == 'region') {
            this.setData({
                //更改图标class名改变样式
                'handleListClickStatus.region': !this.data.handleListClickStatus.region,
                'handleListClickStatus.sort':false,
                'handleListClickStatus.screen':false,
                //更改标签显示或隐藏状态
                'isShow.region.visibility': !this.data.isShow.region.visibility,
                'isShow.sort.visibility': false,
                'isShow.screen.visibility': false,
            })
        }
        if (event.currentTarget.dataset.index == 'sort') {
            this.setData({
                'handleListClickStatus.sort': !this.data.handleListClickStatus.sort,
                'handleListClickStatus.region': false,
                'handleListClickStatus.screen': false,
                'isShow.sort.visibility': !this.data.isShow.sort.visibility,
                'isShow.screen.visibility': false,
                'isShow.region.visibility': false,
            })
        }
        if (event.currentTarget.dataset.index == 'screen') {
            this.setData({
                'handleListClickStatus.screen': !this.data.handleListClickStatus.screen,
                'handleListClickStatus.sort': false,
                'handleListClickStatus.region': false,
            })
        }
    }
})