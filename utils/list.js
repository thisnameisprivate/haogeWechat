Page({
  data: {
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
      {"cityName": "元坝区"},
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
  }
})
