// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/swiper-1.jpg',
      '/images/swiper-2.jpg',
      '/images/swiper-3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    frameCode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow(){
    var that = this
    wx.getStorage({
      key: 'key',
      success: function (res) {
        if (res.data.length > 0) {
          that.setData({
            frameCode: res.data
          })
        }
      }, fail: res => {
        console.log(res)
      }
    })
  },
  onInput(event) {  
    this.setData({
      frameCode: event.detail.value.toUpperCase()
    })
  },
  onTapSearch(event){
    let frameCode = this.data.frameCode
    wx.setStorage({
      key: 'key',
      data: frameCode ,
      success:res=>{
        console.log(frameCode)
      }
    })
    wx.navigateTo({
      url: '/pages/list/list?frameCode=' + frameCode,
    })
  }
})