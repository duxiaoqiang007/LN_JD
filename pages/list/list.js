const util = require('../../utils/util.js')
const statusMap={
  '0':'未派工',
  '1':'已派工',
  '2': '已开工',
  '3': '完工',
}
Page({


  data: {
    list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let frameCode = options.frameCode
    console.log(frameCode)
    this.getList(frameCode)
    },
  getList(frameCode){
    wx.request({
      url: 'http://localhost:8080/tasklist/frameCode/' + frameCode,
      success:res=>{
          let list = {}
          let assignmentDetail = []
          if(res.data.jcdId= null){
            list.jcdId = res.data.jcdId
            list.frameCode = res.data.frameCode
            assignmentDetail = res.data.assignmentDetailForTaskListList.map(item => {
              let itemDate = new Date(item.expectCompletionTime)
              item.expectCompletionTime = util.formatTime(itemDate).substring(0, 10)
              item.statusText = statusMap[item.status]
              return item
            })
            list.assignmentDetailForTaskListList = assignmentDetail
            this.setData({
              list: list
            })
          }
          console.log(list)
      },
      fail:err=>{
        console.log(err)
        wx.showLoading({
          icon:'none',
          title: '加载失败，请重试',
        })
      }
    })
  }
})