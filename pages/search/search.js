Page({
    data: {
        initType: 'on',
    },
    onLoad: function (events) {
        var that = this;
        if (events.initType == 0) {
            that.setData({
                initType: "搜索你想知道的"
            });
        }
        if (events.initType == 1) {
            that.setData({
                initType: "风景/目的地"
            })
        }
        if (events.initType == 2) {
            that.setData({
                initType: "买山货"
            })
        }
        if (events.initType == 3) {
            that.setData({
                initType: "打馆子"
            })
        }
        if (events.initType == 4) {
            that.setData({
                initType: "赶场"
            })
        }
        if (events.initType == 5) {
            that.setData({
                initType: "找工作"
            })
        }
        if (events.initType == 6) {
            that.setData({
                initType: "找房子"
            })
        }
        if (events.initType == 7) {
            that.setData({
                initType: "装房子"
            })
        }
        if (events.initType == 8) {
            that.setData({
                initType: "旧货场"
            })
        }
    },
    /**
     * 
     * @param {inputValue} events 
     * 获取input中的值来更改data中的initType的值
     */
    searchText: function (events) {
        this.initType = events.detail.value;
    },
    /**
     * @param Null
     * 获取搜索内容发送ajax request.
     */
    searchButton: function () {
        // this.initType 为用户要搜索的内容
        console.log(this.initType)
    }
})