// pages/toHouse/toHouse.js
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
        // 精品好房
        secommends: [
            {"image": "", "num": "99"},
            {"image": "", "num": "135"},
            {"image": "", "num": "201"},
            {"image": "", "num": "222"},
            {"image": "", "num": "109"},
        ],
        // list title栏名称
        listName: {
            city: '区域',
            classification: "分类",
            sort: '租金',
            theme: '筛选'
        },
        // list图标
        handleList: "/images/titleImage/handleList.png",
        // 下拉列表图标默认为0，关闭状态
        handleListClickStatus:{
            city:  false,
            sort:  false,
            theme: false,
            classification: false,
        },
        isShow:{
            city: {'visibility':false, 'index': 'city'},
            sort: {'visibility':false, 'index': 'sort'},
            theme: {'visibility':false, 'index': 'theme'},
            classification: {'visibility': false, 'index': 'classification'},
        },
        // 全城选项
        listDataCity: [
            {"cityName": "利州区"},
            {"cityName": "昭化区"},
            {"cityName": "朝天区"},
            {"cityName": "苍溪县"},
            {"cityName": "旺苍县"},
            {"cityName": "剑阁县"},
            {"cityName": "青川县"}
        ],
        // 分类选项
        listClass: [
            {"className": "整租"},
            {"className": "合租"},
            {"className": "招室友"},
            {"className": "短租"},
            {"className": "商用/车位"},
        ],
        // 智能推荐选项
        listDataSort: [
            {"sortName": "500"},
            {"sortName": "500-1000元"},
            {"sortName": "1000-2000元"},
            {"sortName": "2000-3000元"},
            {"sortName": "3000元以上"},
            {"sortName": "更多"},
        ],
        // 主题筛选
        listDataTheme: [
            {"themeName": "一室"},
            {"themeName": "二室"},
            {"themeName": "三室"},
            {"themeName": "三室以上"},
        ],
        /**
         * 下拉加载更多内容
         */
        reachBottom: [
            [
                {"image": "", "address": "青川县", "status": "直租", "text":"文昌世家，挨着和城原著，莲花小学附近", "room": "2", "office": "1", "toilet": "1", "wages": "500","maxmin":"99.2m", "location":"和城原著"},
                {"image": "", "address": "朝天区", "status": "", "text":"曾家镇李家镇农家出租，两层木质小楼，可整租", "room": "5", "office": "1", "toilet": "1", "wages": "1000","maxmin":"99.2m", "location":"利州广场"},
                {"image": "", "address": "利州区", "status": "转租", "text":"模拟数据XXXXXXXX", "room": "2", "office": "1", "toilet": "1", "wages": "500", "maxmin":"99.2m", "location":"和城原著"},
                {"image": "", "address": "利州区", "status": "转租", "text":"模拟数据XXXXXXXX", "room": "3", "office": "2", "toilet": "1", "wages": "700", "maxmin":"99.2m", "location":"利州广场"},


            ],
            [
                {"image": "", "address": "利州区", "status": "", "text":"模拟数据XXXXXXXX", "room": "2", "office": "1", "toilet": "1", "wages": "500", "maxmin":"99.2m", "location":"和城原著"},
                {"image": "", "address": "利州区", "status": "", "text":"模拟数据XXXXXXXX", "room": "3", "office": "2", "toilet": "1", "wages": "700", "maxmin":"99.2m", "location":"利州广场"},
                {"image": "", "address": "利州区", "status": "直租", "text":"模拟数据XXXXXXXX", "room": "3", "office": "2", "toilet": "2", "wages": "1500", "maxmin":"99.2m", "location":"天立"},
                {"image": "", "address": "利州区", "status": "", "text":"文昌世家，挨着和城原著，莲花小学附近", "room": "2", "office": "3", "toilet": "2", "wages": "1600", "maxmin":"99.2m", "location":"阳光壹号"},
            ],
        ],
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
        if (parseInt(events.initType) === 6 ) {
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
     * @param {event} 标签分辨参数 city, sort, theme
     * 人气推荐下拉列表点击展示LIST
     */
    handleListClick : function (event) {
        for (let i in this.data.handleListClickStatus) {
            let handleValue = 'handleListClickStatus.'+i+''
            let isShow      = 'isShow.'+i+'.visibility'
            if (i == event.currentTarget.dataset.index) {
                this.setData({
                    [handleValue] : !this.data.handleListClickStatus[i],
                    [isShow]      : !this.data.isShow[i].visibility
                })
            } else {
                this.setData({
                    [handleValue] : false,
                    [isShow]      : false,
                })
            }
        }
    },
    /**
     * @param {event} 标签分辨参数 data-index
     * 人气下拉列表点击更新
     */
    handleListClickText: function (event) {
        for (let i in this.data.handleListClickStatus) {
            let handleStatus = 'handleListClickStatus.'+i+''
            let isShow       = 'isShow.'+i+'.visibility'
            let nameStatus   = 'listName.'+i+''
            if (i == event.currentTarget.dataset.label) {
                this.setData({
                    [handleStatus] : !this.data.handleListClickStatus[i],
                    [isShow]       : !this.data.isShow[i].visibility,
                    [nameStatus]   : event.currentTarget.dataset.index
                })
            }
        }
    },
    /**
     * 上拉加载
     */
    onReachBottom: function () {
        var that = this;
        // 此数据为模拟数据， 真实数据为发送request请求获取 4条/次， 以以下数据类型返回
        var getList = [[
            {"image": "", "address": "利州区", "status": "直租", "text":"模拟数据XXXXXXXX", "room": "2", "office": "1", "toilet": "1", "wages": "500", "maxmin":"99.2m", "location":"和城原著"},
            {"image": "", "address": "利州区", "status": "转租", "text":"模拟数据XXXXXXXX", "room": "3", "office": "2", "toilet": "1", "wages": "700", "maxmin":"99.2m", "location":"利州广场"},
            {"image": "", "address": "利州区", "status": "", "text":"模拟数据XXXXXXXX", "room": "3", "office": "2", "toilet": "2", "wages": "1500", "maxmin":"99.2m", "location":"天立"},
            {"image": "", "address": "利州区", "status": "转租", "text":"文昌世家，挨着和城原著，莲花小学附近", "room": "2", "office": "3", "toilet": "2", "wages": "1600", "maxmin":"99.2m", "location":"阳光壹号"},
        ]]
        that.setData({
            isHideLoadMore: true,
            reachBottom:that.data.reachBottom.concat(getList)
        })
        wx.showToast({
            title:"拼命加载中...",
            icon: "loading",
            duration: 1500,
            mask:false
        })
        console.log(this.data.reachBottom)
    }
})