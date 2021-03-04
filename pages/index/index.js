/**
 * 引入腾讯地图sdklib
 */
const QQMapWX = require("../../libs/qqmap-wx-jssdk.js");
/**
 * 实例化腾讯地图API核心类
 */
var mapSdk = new QQMapWX({
  // 开发者key
  key:"FSIBZ-L2GKW-535RJ-RUSJM-WHOPK-5NFVM"
})
// 获取应用实例
const app = getApp();

Page({
  data: {
    topTitleImage: 
    [
        "../../images/01.jpg",
        "../../images/02.jpg",
        "../../images/03.jpg"
    ],
    // 热点图标
    summer: '../../images/titleImage/summer.png',
    /**
     * 
     * 首页上部title图片
     * 
     */
    titleImagegxb: ['../../images/titleImage/gxb.jpg'],
    titleImagemsh: ['../../images/titleImage/msh.jpg'],
    titleImagedgz: ['../../images/titleImage/dgz.jpg'],
    titleImagegc:  ['../../images/titleImage/gc.jpg'],
    titleImagezhl: ['../../images/titleImage/zgz.jpg'],
    titleImagezfz: ['../../images/titleImage/zfz.jpg'],
    titleImagelfz: ['../../images/titleImage/lfz.jpg'],
    titleImagejhc: ['../../images/titleImage/es.jpg'],
    titleImagegd: ['../../images/titleImage/gd.jpg'],
    titleImagewzk: ['../../images/titleImage/wzk.jpg'],
    mapImg:     ['../../images/titleImage/map.png'],
    searchImg:  ['../../images/titleImage/search.png'],
    mapplay: ['../../images/titleImage/mapplay.jpg'],
    today: ['../../images/titleImage/today.png'],
    /**
     * 定位信息变量
     */ 
    Mapres: "未找到当前位置信息",
    /**
     * 新闻信息
     */
    msgList: [],
    /**
     * 今日热搜
     */
    msgToday: [],
    /**
     * 热搜 top one
     */
    msgTodayOne: {},
    /**
     * 下拉加载更多内容
     */
    reachBottom: [
        [
          {"image": "", "text": "无需预约![意大利米兰xxxxxxxxxxxxxx]", "vip": "2", "money": "129.9"},
          {"image": "", "text": "无需预约![意大利米兰xxxxxxxxxxxxxx]", "vip": "1", "money": "119.9"},
          {"image": "", "text": "无需预约![意大利米兰xxxxxxxxxxxxxx]", "vip": "2", "money": "139.9"},
          {"image": "", "text": "无需预约![意大利米兰xxxxxxxxxxxxxx]", "vip": "2", "money": "149.9"},
        ],
        [
          {"image": "", "text": "商品1![意大利米兰xxxxxxxxxxxxxx]", "vip": "2", "money": "9.9"},
          {"image": "", "text": "商品2![意大利米兰xxxxxxxxxxxxxx]", "vip": "10", "money": "1.9"},
          {"image": "", "text": "商品3![意大利米兰xxxxxxxxxxxxxx]", "vip": "5", "money": "12.9"},
          {"image": "", "text": "商品4![意大利米兰xxxxxxxxxxxxxx]", "vip": "2", "money": "19.9"},
        ],
        [
          {"image": "", "text": "商品5![意大利米兰xxxxxxxxxxxxxx]", "vip": "2", "money": "199"},
          {"image": "", "text": "商品6![意大利米兰xxxxxxxxxxxxxx]", "vip": "2", "money": "99.9"},
          {"image": "", "text": "商品7![意大利米兰xxxxxxxxxxxxxx]", "vip": "8", "money": "199.9"},
          {"image": "", "text": "商品8![意大利米兰xxxxxxxxxxxxxx]", "vip": "2", "money": "99.9"},
        ],
        [
          {"image": "", "text": "商品9![意大利米兰xxxxxxxxxxxxxx]", "vip": "2", "money": "199.9"},
          {"image": "", "text": "商品10![意大利米兰xxxxxxxxxxxxxx]", "vip": "9", "money": "199.9"},
          {"image": "", "text": "商品11![意大利米兰xxxxxxxxxxxxxx]", "vip": "10", "money": "99.9"},
          {"image": "", "text": "商品12![意大利米兰xxxxxxxxxxxxxx]", "vip": "2", "money": "99.9"},
        ],
    ],
  },
  /**
   * 
   * 点击更换或切换地理位置信息
   */
  getgps: function () {
    var that = this
    wx.chooseLocation ({
      success: function (res) {
        that.setData({
          Mapres: res.name
        })
        // 重新选择地址之后更新storage信息
        wx.setStorage({
          key: "ipaddress",
          data: that.data.Mapres
        })
      }
    })
  },
  /**
   * 禁止IOS中下拉页面显示导航下空白
   */
  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop:0
      })
    }
  },
  /**
   * 初次加载时获取地理位置信息 
   *
   */
  onLoad: function () {
    var that = this
    // 今日热搜标题
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index?type=shehui&key=f25a49584f37cdbcce872973abd8471f',
      method: 'post',
      header: {
        'content-type': 'application/json',
      },
      success: function (data) {
        that.setData({
          msgToday: data.data.result.data,
          msgTodayOne: data.data.result.data[0]
        })
      }
    });
    // 你可能想知道的新闻标题
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index?type=junshi&key=f25a49584f37cdbcce872973abd8471f',
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      success: function (data) {
        that.setData({
          msgList: data.data.result.data
        })
      }
    });
    // 获取当前经纬度
    wx.getLocation ({
      type: 'gcj02',
      success: function (res) {
        // 经纬度
        var latitude = res.latitude
        var longitude = res.longitude
        mapSdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            // 动态更新获取到的地理位置
            that.setData({
              Mapres : res.result.address_component.city
            })
            // 将地址信息储存到storage
            wx.setStorage({
              key: "ipaddress",
              data: that.data.Mapres
            });
          },
          fail: function () {
            wx.showToast({
              title: '获取位置失败或权限未开启',
              icon: 'none',
              duration: 2000,
            })
          }
        })
      },
    })
  },
  /**
   * 
   * 搜索栏跳转
   * 
   */
  bindsearch:function () {
    wx.navigateTo({
      url: '../search/search?initType=0'
    })
  },
  /**
   * 逛乡坝/买山货/打馆子
   * @param events int 绑定index下标用于区分功能页面
   */
  shopVill: function (events) {
    wx.navigateTo({
      url: '../shopVill/shopVill?initType=' + events.currentTarget.dataset.index
    })
  },
  /**
   * 赶场
   * @param events int 绑定index下标用于区分功能页面
   */
  market: function (events) {
    wx.navigateTo({
      url: "../market/market?initType=" + events.currentTarget.dataset.index
    })
  },
  /**
   * 找活路
   * @param events init
   */
  getworker: function (events) {
    wx.navigateTo({
      url: "../getworker/getworker?initType=" + events.currentTarget.dataset.index
    })
  },
  /**
   * 找房子
   * @param events init
   *
   */
  toHouse: function (events) {
    wx.navigateTo({
      url: "../toHouse/toHouse?initType=" + events.currentTarget.dataset.index
    })
  },
  /**
   * 弄房子
   * @param events init
   */
  renovation: function (events) {
    wx.navigateTo({
      url: "../renovation/renovation?initType=" + events.currentTarget.dataset.index
    })
  },
  /**
   * 旧货场
   * @param events init
   */
  secondHand: function (events) {
    wx.navigateTo({
      url: "../secondHand/secondHand?initType=" + events.currentTarget.dataset.index
    })
  },
  /**
   * 公共页面跳转
   * 
   */
  handleDumpCommon: function () {
    wx.navigateTo({
      url: '../common/common'
    })
  },
  /**
   * 上拉加载
   */
  onReachBottom: function () {
    var that = this;
    // 此数据为模拟数据， 真实数据为发送request请求获取 4条/次， 以以下数据类型返回
    var getList = [[
      {"image": "", "text": "商品13![意大利米兰意大利米兰意大利米兰意大利米兰]", "vip": "2", "money": "199.9"},
      {"image": "", "text": "商品14![意大利米兰xxxxxxxxxxxxxx]", "vip": "9", "money": "199.9"},
      {"image": "", "text": "商品15![意大利米兰xxxxxxxxxxxxxx]", "vip": "10", "money": "99.9"},
      {"image": "", "text": "商品16![意大利米兰xxxxxxxxxxxxxx]", "vip": "2", "money": "99.9"},
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
  },
  /**
   * 跳转到内部新闻页面
   *
   */
  getNewsData: function (events) {
    if (events.currentTarget.dataset.url == null) return;
    wx.navigateTo({
      url: '../webView/webView?url=' + events.currentTarget.dataset.url
    })
  }
})