Page({
    data: {
        /**
         * 顶部搜索按钮参数
         */
        initType: null,
        /**
         * 顶部搜索栏中的文字
         */
        searchText: "",
        /**
         * 限时砍价
         */
        attractions: [
            {"image": "", "name": "剑门关景区", "price": "299", "priceDis": "320", "numPeople": "89"},
            {"image": "", "name": "翠云廊景区", "price": "198", "priceDis": "320", "numPeople": "89"},
            {"image": "", "name": "鼓城山景区", "price": "233", "priceDis": "320", "numPeople": "89"},
            {"image": "", "name": "剑门关景区", "price": "200", "priceDis": "320", "numPeople": "89"},
        ],
        /**
         * 人气推荐
         */
        attractionsRec: [
            {"image":"", "name": "剑门关", "recImg":"☆☆☆☆☆", "rec": "5.0", "numPeople":"1606"},
            {"image":"", "name": "翠云廊", "recImg":"☆☆☆☆☆", "rec": "4.0", "numPeople":"1999"},
            {"image":"", "name": "鼓城山", "recImg":"☆☆☆☆☆", "rec": "4.9", "numPeople":"2333"},
            {"image":"", "name": "剑门关", "recImg":"☆☆☆☆☆", "rec": "3.5", "numPeople":"1131"},
        ],
        /**
         * 全部景点
         */
        attractionsSort: [
            {"image": "", "name": "剑门关景区", "recImg": "☆☆☆☆☆", "rec": "5.0", "priceDis":"178", "distance":"999", "theme": "自然风光", "numPeople": "192"},
            {"image": "", "name": "翠云廊景区", "recImg": "☆☆☆☆☆", "rec": "4.0", "priceDis":"178", "distance":"200", "theme": "动植物园", "numPeople": "1000+"},
            {"image": "", "name": "鼓城山景区", "recImg": "☆☆☆☆☆", "rec": "3.9", "priceDis":"178", "distance":">999", "theme": "名胜古迹", "numPeople": "767"},
            {"image": "", "name": "xxx景区", "recImg": "☆☆☆☆☆", "rec": "4.9", "priceDis":"178", "distance":"518", "theme": "温泉", "numPeople": "552"},
            {"image": "", "name": "xxx景区", "recImg": "☆☆☆☆☆", "rec": "5.0", "priceDis":"178", "distance":"882", "theme": "带孩子", "numPeople": "999"},
            {"image": "", "name": "xxx景区", "recImg": "☆☆☆☆☆", "rec": "5.0", "priceDis":"178", "distance":"200", "theme": "动植物园", "numPeople": "321"},
        ],
        handleList: "/images/titleImage/handleList.png",
        // list title栏名称
        listName: {
            city: '全城',
            sort: '智能推荐',
            theme: '主题筛选'
        },
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
            {"themeName": "自然风光"},
            {"themeName": "动植物园"},
            {"themeName": "名胜古迹"},
            {"themeName": "公园游乐场"},
            {"themeName": "带孩子"},
            {"themeName": "温泉"}
        ],
    },
    /**
     *
     * @param events int 根据选择的功能来确认加载的数据
     */
    onLoad: function (events) {
        if (events.initType == 1) {
            this.setData({
                searchText: "风景/目的地",
                initType: events.initType
            })
        }
        if (events.initType == 2) {
            this.setData({
                searchText: "买山货",
                initType: events.initType
            })
        }
        if (events.initType == 3) {
            this.setData({
                searchText: "打馆子",
                initType: events.initType,
                listDataTheme: [
                    {"themeName": "西餐"},
                    {"themeName": "中餐"},
                    {"themeName": "汤锅"},
                    {"themeName": "干锅"},
                    {"themeName": "烤鱼"},
                    {"themeName": "烤肉"},
                    {"themeName": "小龙虾"},
                    {"themeName": "火锅"},
                    {"themeName": "串串"},
                    {"themeName": "甜品"},
                    {"themeName": "小吃"},
                    {"themeName": "网红饮品"},
                ],
            })
        }
    },
    /**
     * @param null
     * 自定义导航的tab返回按钮
     */
    handlerGobackClick: function () {
        wx.navigateBack({
          delta: 0,
        })
    },
    /**
     * @param null
     * 自定义导航的搜索按钮
     */
    handleSearch : function () {
        wx.navigateTo({
            url:'../search/search?initType=' + this.data.initType
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
});