// pages/order/order.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    imageURL: '/static/images/kele.jpg',
    totalPrice: 0,
    buyIndex: 0

  },
  //获取订单数据
  getOrderList() {
    let order = wx.getStorageSync('order')
    this.setData({
      orderList: order
    })
    let arr = []
    order.forEach((item) => {
      let price = item.price * item.num
      arr.push(price)
    })
    let totalPrice = arr.reduce((a, b) => {
      return a + b
    })
    console.log(totalPrice)
    this.setData({
      totalPrice
    })
    wx.clearStorageSync()
  },
  //计算总价
  buy() {
    wx.showModal({
      title: '提示',
      content: '确定要提交订单吗？',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
          wx.showToast({
            title: '提交成功',
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
          wx.showToast({
            title: '取消成功',
          })
        }
      }
    })
  },
  //获取订单号
  async getOrderIndex() {
    let result = await request('/buyid')
    this.setData({
      buyIndex:result.data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOrderList()
    this.getOrderIndex()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})