//app.js
App({
  appid: '70354', // 你的appid
  sign: '1bb8936a2bcc41f4b06a87714815dff1', // 你的密钥
  myType: "0",
  page: "1",
  allpages:0, // 获取该菜单选项共有多少页
  post: [],
  flag: true,
  indexkey: true, // 用于识别是否转入首页

  onLaunch: function() {

  },
  globalData: {
    userInfo: null
  },



  getList: function() {
    // 获取故事列表 存入post数组
    var that = this
    var doSuccessInit = this.doSuccessInit
    wx.request({

      url: 'http://route.showapi.com/255-1?showapi_res_gzip=0&&showapi_appid=' + that.appid + '&&showapi_sign=' + that.sign + '&&type=' + that.myType + '&&page=' + that.page,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: doSuccessInit,
      fail: function(res) {
        wx.showToast({
          title: '网络异常，请稍后...',
          icon: 'none',
          duration: 2000
        })
      }
    })

  },
  doSuccessInit: function(res) {

    if (res.data.showapi_res_body.pagebean) {
      if (this.flag) {
        this.flag = false;
        var that = this
        this.allpages = res.data.showapi_res_body.pagebean.allPages // 获取总页数

        this.page = Math.ceil(Math.random() * that.allpages) // 生成总页数之内的数组页 
        this.getList() // 重新调用自身 因开关已改变 故不会进入此模块
      } else {
        this.flag = true; // 若第二次点击该按钮， 则再次生成随机值

        this.post = res.data.showapi_res_body.pagebean.contentlist

        if (this.indexkey && this.myType!="0") {
          this.indexkey = false
          var gopage = this.myType // 获取点击的菜单项标识码
          switch (gopage) {
            case '10':
              wx.showToast({
                title: '拼命加载中，请稍后...',
                icon: 'loading',
                duration: 2000
              })
              wx.navigateTo({
                // 跳转到内容页面
                url: '../content/content'
              });
              break;
            case '29':
              wx.showToast({
                title: '拼命加载中，请稍后...',
                icon: 'loading',
                duration: 2000
              })
              wx.navigateTo({
                // 跳转到内容页面
                url: '../duanzi/duanzi'
              });
              break;

            case '41':
              wx.showToast({
                title: '拼命加载中，请稍后...',
                icon: 'loading',
                duration: 2000
              })
              wx.navigateTo({
                // 跳转到内容页面
                url: '../video/video'
              });
              break;

          }
        }else{
          // 不用跳转 只刷新数据

          
        }


      }


    } else {
      wx.showToast({
        title: '小傻瓜，这还没故事哦',
        icon: 'none',
        duration: 2000
      })
    }


  },
  comPickOther: function(that) {

    that.setData({
      loveSrc: '../../images/love.png', // 未点赞 
      hateSrc: '../../images/love.png', // 未踩 
    })
    that.data.keylove = true
    that.data.keyhate = true

    that.data.num++
    try {
      that.render(that.data.num)
    } catch (e) {

    }
    var len = that.data.contentList.length;

    if (that.data.num == len-1) {

      var self = this
      this.page = Math.ceil(Math.random() * self.allpages) // 生成总页数之内的数组页

      
      this.getList() // 重新调用自身
      that.getProterty()
      that.data.num = 0;

    }
  }

})