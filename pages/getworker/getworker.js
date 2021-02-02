// pages/getworker/getworker.js
Page({

    /**
     * 页面的初始数据
     */
    /**
     * 页面的初始数据
     */
    data: {
        mapImg:     ['../../images/titleImage/map.png'],
        searchImg:  ['../../images/titleImage/search.png'],
        Mapres: "未找到当前位置信息",
        // 页面区分
        initType: null,
        // list title栏名称
        listName: {
            city: '全部区域',
            sort: '薪资',
            theme: '排序'
        },
        // list图标
        handleList: "/images/titleImage/handleList.png",
        // 下拉列表图标默认为0，关闭状态
        handleListClickStatus:{
            city:  false,
            sort:  false,
            theme: false,
        },
        isShow:{
            city: {'visibility':false, 'index': 'city'},
            sort: {'visibility':false, 'index': 'sort'},
            theme: {'visibility':false, 'index': 'theme'}
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
        // 智能推荐选项
        listDataSort: [
            {"sortName": "按热度"},
            {"sortName": "按好评"}
        ],
        // 主题筛选
        listDataTheme: [
            {"themeName": "生鲜果蔬"},
            {"themeName": "肉禽鱼蛋"},
            {"themeName": "休闲零食"},
            {"themeName": "乳品烘焙"},
            {"themeName": "粮油调味"},
            {"themeName": "酒水冲调"},
            {"themeName": "母婴之家"},
            {"themeName": "纸品家清"},
            {"themeName": "个护美妆"},
            {"themeName": "服饰百货"},
            {"themeName": "家用电器"},
        ],
        /**
         * 下拉加载更多内容
         */
        reachBottom: [
            [
                {"image": "", "text": "信用卡逾期催收", "wages": "5k-10k", "corporate": "广东兴业金融服务有限公司", "distance":"112"},
                {"image": "", "text": "电信客服不加班", "wages": "3k-5k", "corporate": "广东兴业金融服务有限公司", "distance":"201"},
                {"image": "", "text": "急聘店员包吃住", "wages": "3.7k-4.5k", "corporate": "广州丰名鲜农产品有限公司", "distance":"296"},
                {"image": "", "text": "模拟数据XXX", "wages": "5k-10k", "corporate": "广东兴业金融服务有限公司", "distance":"4.1"},
            ],
            [
                {"image": "", "text": "信用卡逾期催收", "wages": "5k-10k", "corporate": "广东兴业金融服务有限公司", "distance":"112"},
                {"image": "", "text": "电信客服不加班", "wages": "3k-5k", "corporate": "广东兴业金融服务有限公司", "distance":"201"},
                {"image": "", "text": "急聘店员包吃住", "wages": "3.7k-4.5k", "corporate": "广州丰名鲜农产品有限公司", "distance":"296"},
                {"image": "", "text": "模拟数据XXX", "wages": "5k-10k", "corporate": "广东兴业金融服务有限公司", "distance":"4.1"},
            ],
            [
                {"image": "", "text": "信用卡逾期催收", "wages": "5k-10k", "corporate": "广东兴业金融服务有限公司", "distance":"112"},
                {"image": "", "text": "电信客服不加班", "wages": "3k-5k", "corporate": "广东兴业金融服务有限公司", "distance":"201"},
                {"image": "", "text": "急聘店员包吃住", "wages": "3.7k-4.5k", "corporate": "广州丰名鲜农产品有限公司", "distance":"296"},
                {"image": "", "text": "模拟数据XXX", "wages": "5k-10k", "corporate": "广东兴业金融服务有限公司", "distance":"4.1"},
            ],
            [
                {"image": "", "text": "信用卡逾期催收", "wages": "5k-10k", "corporate": "广东兴业金融服务有限公司", "distance":"112"},
                {"image": "", "text": "电信客服不加班", "wages": "3k-5k", "corporate": "广东兴业金融服务有限公司", "distance":"201"},
                {"image": "", "text": "急聘店员包吃住", "wages": "3.7k-4.5k", "corporate": "广州丰名鲜农产品有限公司", "distance":"296"},
                {"image": "", "text": "模拟数据XXX", "wages": "5k-10k", "corporate": "广东兴业金融服务有限公司", "distance":"4.1"},
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
        if (parseInt(events.initType) === 5 ) {
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
        if (event.currentTarget.dataset.index == 'city') {
            this.setData({
                // 更改图标class名
                'handleListClickStatus.city':!this.data.handleListClickStatus.city,
                'handleListClickStatus.sort':false,
                'handleListClickStatus.theme':false,
                // 更改标签显示或隐藏状态
                'isShow.city.visibility':!this.data.isShow.city.visibility,
                'isShow.sort.visibility':false,
                'isShow.theme.visibility':false
            })
        }
        if (event.currentTarget.dataset.index == 'sort') {
            this.setData({
                'handleListClickStatus.sort':!this.data.handleListClickStatus.sort,
                'handleListClickStatus.city':false,
                'handleListClickStatus.theme':false,
                'isShow.city.visibility':false,
                'isShow.sort.visibility':!this.data.isShow.sort.visibility,
                'isShow.theme.visibility':false
            })
        }
        if (event.currentTarget.dataset.index == 'theme') {
            this.setData({
                'handleListClickStatus.theme':!this.data.handleListClickStatus.theme,
                'handleListClickStatus.sort':false,
                'handleListClickStatus.city':false,
                'isShow.city.visibility':false,
                'isShow.sort.visibility':false,
                'isShow.theme.visibility':!this.data.isShow.theme.visibility
            })
        }
    },
    /**
     * @param {event} 标签分辨参数 data-index
     * 人气下拉列表点击更新
     */
    handleListClickText: function (event) {
        if (event.currentTarget.dataset.label == 'city') {
            this.setData({
                'handleListClickStatus.city':!this.data.handleListClickStatus.city,
                'isShow.city.visibility':!this.data.isShow.city.visibility,
                'listName.city': event.currentTarget.dataset.index
                // 发送ajax更新数据操作
            })
        }
        if (event.currentTarget.dataset.label == 'sort') {
            this.setData({
                'handleListClickStatus.sort':!this.data.handleListClickStatus.sort,
                'isShow.sort.visibility':!this.data.isShow.sort.visibility,
                'listName.sort': event.currentTarget.dataset.index
            })
        }
        if (event.currentTarget.dataset.label == 'theme') {
            this.setData({
                'handleListClickStatus.theme':!this.data.handleListClickStatus.theme,
                'isShow.theme.visibility':!this.data.isShow.theme.visibility,
                'listName.theme': event.currentTarget.dataset.index
            })
        }
    },
    /**
     * 上拉加载
     */
    onReachBottom: function () {
        var that = this;
        // 此数据为模拟数据， 真实数据为发送request请求获取 4条/次， 以以下数据类型返回
        var getList = [[
            {"image": "", "text": "信用卡逾期催收", "wages": "5k-10k", "corporate": "广东兴业金融服务有限公司", "distance":"112"},
            {"image": "", "text": "电信客服不加班", "wages": "3k-5k", "corporate": "广东兴业金融服务有限公司", "distance":"201"},
            {"image": "", "text": "急聘店员包吃住", "wages": "3.7k-4.5k", "corporate": "广州丰名鲜农产品有限公司", "distance":"296"},
            {"image": "", "text": "模拟数据XXX", "wages": "5k-10k", "corporate": "广东兴业金融服务有限公司", "distance":"4.1"},
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