// pages/secondHand/secondHand.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mapImg:     ['../../images/titleImage/map.png'],
        searchImg:  ['../../images/titleImage/search.png'],
        Mapres: "未找到当前位置信息",
        // list图标
        handleList: "/images/titleImage/handleList.png",
        // 页面区分
        initType: null,
        // 顶部title分类
        classUnit:[
            {'name': '手机通讯'},
            {'name': '电脑数码'},
            {'name': '运动鞋靴'},
            {'name': '精品服饰'},
            {'name': '钟表奢品'},
            {'name': '母婴玩具'},
            {'name': '家居车品'},
            {'name': '家用电器'},
            {'name': '全部商品'},
        ],
        // 成色选项
        cond: [
            {'name': '5成新'},
            {'name': '6成新'},
            {'name': '7成新'},
            {'name': '8成新'},
            {'name': '9成新'},
            {'name': '99成新'},
            {'name': '准新品'},
        ],
        // tabbar 选项
        tabbarHandleList: {
            'all': '综合',
            'num': '销量',
            'price': '价格',
            'cond': '成色'
        },
        // tabbar 选项样式是否点击
        tabbarHandleListIsShow: {
            'num': false,
            'price': false,
            'cond': false,
        },
        // 下拉加载更多内容
        reachBottom: [
            [
                {"image": "","size": "2XL", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"},
                {"image": "","size": "XL", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"},
                {"image": "","size": "L", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"},
                {"image": "","size": "XL", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"}
            ],
            [
                {"image": "","size": "M", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"},
                {"image": "","size": "2XL", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":false, "comment":"18"},
                {"image": "","size": "2XL", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":false, "comment":"18"},
                {"image": "","size": "L", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":false, "comment":"18"}
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
        if (parseInt(events.initType) === 8 ) {
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
     *
     * @param event 区分当前tabbar点击对象
     */
    tabbarHandle: function (event) {
        if (event.currentTarget.dataset.index == this.data.tabbarHandleList.num) {
            this.data.tabbarHandleListIsShow.num = !this.data.tabbarHandleListIsShow.num;
        }
        if (event.currentTarget.dataset.index == this.data.tabbarHandleList.price) {
            this.data.tabbarHandleListIsShow.price = !this.data.tabbarHandleListIsShow.price;
        }
        if (event.currentTarget.dataset.index == this.data.tabbarHandleList.cond) {
            this.data.tabbarHandleListIsShow.cond = !this.data.tabbarHandleListIsShow.cond;
        }
        this.setData({
            tabbarHandleListIsShow: this.data.tabbarHandleListIsShow
        })
    },
    /**
     *
     * @param event 更新为当前点击对象
     */
    condHandle: function (event) {
        this.data.tabbarHandleList.cond = event.currentTarget.dataset.index;
        this.data.tabbarHandleListIsShow.cond = !this.data.tabbarHandleListIsShow.cond
        this.setData({
            tabbarHandleList: this.data.tabbarHandleList,
            tabbarHandleListIsShow: this.data.tabbarHandleListIsShow
        })
    },
    /**
     * 上拉加载
     */
    onReachBottom: function () {
        var that = this;
        // 此数据为模拟数据， 真实数据为发送Request请求获取 4条/次，以以下数据类型返回
        var getList = [
            [
                {"image": "","size": "2XL", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"},
                {"image": "","size": "XL", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"},
                {"image": "","size": "L", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"},
                {"image": "","size": "XL", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"}
            ],
            [
                {"image": "","size": "2XL", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"},
                {"image": "","size": "XL", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"},
                {"image": "","size": "L", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"},
                {"image": "","size": "XL", "text": "【备件库8成新】阿迪达斯ADIDAS NEO 男子 运动...", "money": "131.81", "dis": "119", "selfup":true, "comment":"18"}
            ],
        ]
        that.setData({
            reachBottom:that.data.reachBottom.concat(getList)
        })
        wx.showToast({
            title: '拼命加载中',
            icon: 'loading',
            duration: 1500,
            mask: false,
        })
        console.log(this.data.reachBottom)
    }
})