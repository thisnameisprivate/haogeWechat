// pages/game/game.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        weekday: ['日', '一', '二', '三', '四', '五', '六'],
        monthNum: [],
        todayTime: null,
        // 今天的日期
        date: new Date().getDate(),
        // 今日是否已签到
        enterButton: false,
        // 本月已签到
        enterDay: 0
    },
    // 获取本月日期
    onLoad: function () {
        // 实例化Date
        let date = new Date();
        // 获取当前月份
        let currMonth = date.getMonth()
        // 获取实际月份(因为getMonth获取的月份会比当前月份少1)
        date.setMonth(currMonth + 1);
        // 重置日期为0, 否则只显示当前日期
        date.setDate(0);
        this.marageDay(date.getDate());
        let getMonth = new Date().getMonth() + 1;
        this.setData({
            monthNum: this.data.monthNum,
            todayTime: new Date().getFullYear() + "年" + getMonth  + "月" + new Date().getDate() + "日"
        });
    },
    marageDay: function (arrayLength) {
        let date = new Date();
        for (var i = 1; i <= arrayLength; i ++) {
            let currDay = date.getFullYear() + "/" + date.getMonth() + 1 + "/" + i;
            this.data.monthNum.push({
                'date': i, 'day': this.data.weekday[new Date(currDay).getDay()], 'image': false,
            })
        }
        // 更改本地数据之后将数据储存到localstorage
        this.setMonthStorage(this.data.monthNum);
    },
    /**
     * 本日签到
     */
    enterButtonHandle: function () {
        // 修改页面数据
        for (let i = 0; i < this.data.monthNum.length; i ++) {
            if (this.data.date == this.data.monthNum[i].date) {
                if (this.data.monthNum[i].image == false) {
                    // 如果今天未签到修改为已签到
                    this.data.monthNum[i].image = true;
                    // 本月签到时间+1
                    this.data.enterDay += 1;
                }
            }
        }
        // 渲染到页面
        this.setData({
            enterButton: true,
            monthNum: this.data.monthNum,
            enterDay: this.data.enterDay
        })
        // 更新数据到localstorage
        this.setMonthStorage(this.data.monthNum)
    },
    /**
     *
     * @param data 本月日期签到状态数据
     * 将本月签到数据储存到localstorage
     */
    setMonthStorage: function (data) {
        wx.setStorage({
            key: 'montharray',
            data: data
        });
        // 将本次修改的数据添加到数据库
    },
    /**
     * 获取本月数据缓存
     */
    getMonthStorage: function () {
      wx.getStorage({
          key:'montharray',
          success: function (res) {

          }
      })
    }
})