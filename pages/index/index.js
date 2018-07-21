//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '惊呆乔巴的一千零一个笑话',
    userInfo: '../../images/logo.jpg',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },

  getEvent:function(e){
    // 获取绑定的id 修改用户点击类型
    app.myType = e.target.id

    app.getList() // 用于测试 显示发送请求的结果


  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
   

  },
  onShow:function(){

// 页面显示时 恢复默认值
    app.post = [] // 重置数组
    app.page = "1" // 防止数组溢出
    app.indexkey = true 
  },

    setNone: function(){
       wx.showToast({
         title: '程序员小哥哥正在开发这里哦~',
         icon: 'none',
         duration: 2000
       })
     }

    

})