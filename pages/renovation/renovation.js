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
        // 无限加载分类title栏名称
        loadingTitle: {
            recommend: '推荐',
            homede: '家装',
            workerde: '工装',
            villa: '别墅',
            build: '建材'
        },
        // list title栏名称
        listName: {
            region: '区域',
            sort: '综合排序',
            screen: '筛选'
        },
        isShow:{
            region: {'visibility':false, 'index': 'region'},
            sort: {'visibility':false, 'index': 'sort'},
            screen: {'visibility':false, 'index': 'screen'}
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
        // 户型类型
        screen: [
            [
                {

                    'className' :'小户型/一房',
                    'isSelected': false,
                },
                {

                    'className' :'两房',
                    'isSelected': false,
                },
                {

                    'className' :'三房',
                    'isSelected': false,
                },
                {

                    'className' :'四房',
                    'isSelected': false,
                },
            ],
            [
                {

                    'className' :'loft',
                    'isSelected': false,
                },
                {

                    'className' :'复式',
                    'isSelected': false,
                },
                {

                    'className' :'别墅',
                    'isSelected': false,
                },
                {

                    'className' :'大平房',
                    'isSelected': false,
                },
            ],
            [
                {

                    'className' :'商铺装修',
                    'isSelected': false,
                },
                {

                    'className' :'办公空间',
                    'isSelected': false,
                },
                {'className': null},
                {'className': null}
            ],
        ],
        screenBottom: [
            [
                {

                    'className' :'现代',
                    'isSelected': false,
                },
                {

                    'className' :'美式',
                    'isSelected': false,
                },
                {

                    'className' :'欧式',
                    'isSelected': false,
                },
                {

                    'className' :'中式',
                    'isSelected': false,
                },
            ],
            [
                {

                    'className' :'北欧',
                    'isSelected': false,
                },
                {

                    'className' :'混搭',
                    'isSelected': false,
                },
                {

                    'className' :'新古典',
                    'isSelected': false,
                },
                {

                    'className' :'简欧',
                    'isSelected': false,
                },
            ],
            [
                {

                    'className' :'工业',
                    'isSelected': false,
                },
                {
                    'listSort'  :11,
                    'className' :'后现代',
                    'isSelected': false,
                },
                {'className': null},
                {'className': null},
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
        for (let i in this.data.handleListClickStatus) {
            let handleStatus = 'handleListClickStatus.'+i+''
            let isShow       = 'isShow.'+i+'.visibility'
            if (i == event.currentTarget.dataset.index) {
                this.setData({
                    [handleStatus]: !this.data.handleListClickStatus[i],
                    [isShow]      : !this.data.isShow[i].visibility
                })
            } else {
                this.setData({
                    [handleStatus]: false,
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
            let handleStatus = 'handleListClickStatu.'+i+''
            let isShow       = 'isShow.'+i+'.visibility'
            let nameStatus   = 'listName.'+i+''
            if (i == event.currentTarget.dataset.label) {
                this.setData({
                    [handleStatus]: !this.data.handleListClickStatus[i],
                    [isShow]      : !this.data.isShow[i].visibility,
                    [nameStatus]  : event.currentTarget.dataset.index
                })
            }
        }
    },
    /**
     *
     * @param event 当前点击的对象
     */
    selectApply: function (event) {
        var index    = event.currentTarget.dataset.index
        var listSort = event.currentTarget.dataset.sort
        var item     = this.data.screen[listSort][index]
        //先更新数据再将数组动态渲染
        item.isSelected = !item.isSelected
        this.setData({
            screen: this.data.screen
        })
    },
    bottomSelectApply: function (event) {
        var index    = event.currentTarget.dataset.index
        var listSort = event.currentTarget.dataset.sort
        var item     = this.data.screenBottom[listSort][index]
        item.isSelected = !item.isSelected
        this.setData({
            screenBottom: this.data.screenBottom
        })
    },
    /**
     *
     * @param null
     */
    formSubmit: function () {
        this.setData({
            'isShow.screen.visibility'    : !this.data.isShow.screen.visibility,
            'handleListClickStatus.screen': !this.data.handleListClickStatus.screen
        })
    },
    /**
     * @param null
     */
    formReset: function () {
        for (let i in this.data.screen) {
            for (let k in this.data.screen[i]) {
                this.data.screen[i][k].className?this.data.screen[i][k].isSelected=false:this.data.screen[i][k].isSelected=false
            }
        }
        for (let i in this.data.screenBottom) {
            for (let k in this.data.screenBottom[i]) {
                this.data.screenBottom[i][k].className?this.data.screenBottom[i][k].isSelected=false:this.data.screenBottom[i][k].isSelected=false
            }
        }
        this.setData({
            screen: this.data.screen,
            screenBottom: this.data.screenBottom
        })
    }
})