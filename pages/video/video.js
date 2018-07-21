//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    contentPage: null, // 获取首页的菜单选项回传页数
    contentType: null, // 获取首页的点击类型
    contentList: [],
    imgSrc: null, // 图片地址

    text: null, // 正文内容
    love: 0, // 点赞
    hate: 0, // 踩踩
    username: '', // 用户名
    iconSrc: '', // 用户头像
    eyenums: 0, //用户浏览量
    num: 1, // 用于biu跳转
    video_uri: "", // 视频地址


    loveSrc: '../../images/love.png', // 未点赞 
    hateSrc: '../../images/love.png', // 未踩 

    keylove: true,
    keyhate: true,

  },
  loveClick: function() {
    var that = this
    if (this.data.keylove) {
      this.data.keylove = false
      this.setData({
        loveSrc: '../../images/love2.png',
        love: that.data.love + 1
      })
    }

  },
  hateClick: function() {
    var that = this
    if (this.data.keyhate) {
      this.data.keyhate = false
      this.setData({
        hateSrc: '../../images/love2.png',
        hate: that.data.hate + 1
      })
    }

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.getProterty()
  },
  getProterty: function() {
    var that = this
    this.setData({
      contentPage: app.page,
      contentType: app.myType,
      contentList: app.post,
    })

    this.render(that.data.num)
  },
  render: function(index) {
    var that = this
    this.setData({
      text: that.data.contentList[index].text, // 正文内容
      love: Math.ceil(Math.random() * 1000 + 800) + Number.call(that.data.contentList[index].love), // 点赞
      hate: Math.ceil(Math.random() * 1000 + 500) + Number.call(that.data.contentList[index].hate), // 踩踩
      // 
      video_uri: that.data.contentList[index].video_uri,
      username: that.data.contentList[index].name, // 用户名
      iconSrc: that.data.contentList[index].profile_image, // 用户头像

    })
    this.setData({
      eyenums: Math.ceil((that.data.love + that.data.hate) * 1.5),
    })
  },

  pickshipin: function() {
    var that = this
    if(this.data.contentList !== app.post){
      // 数组侦测 将
      this.setData({
        contentList: app.post
      })
    }
    
    app.comPickOther(that)
  }


})