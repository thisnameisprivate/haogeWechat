// pages/game/game.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        weekday: ['日', '一', '二', '三', '四', '五', '六'],
        monthNum: [],
        todayTime: null,
        //今天的日期
        date: new Date().getDate()
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
        })
    },
    marageDay: function (arrayLength) {
        let date = new Date();
        for (var i = 1; i <= arrayLength; i ++) {
            let currDay = date.getFullYear() + "/" + date.getMonth() + 1 + "/" + i;
            this.data.monthNum.push({
                'date': i, 'day': this.data.weekday[new Date(currDay).getDay()]
            })
        }
    }
})