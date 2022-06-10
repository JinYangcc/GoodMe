// pages/index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: '/static/images/kele.jpg',
    SaleList: [],
    orderList: [],

  },
  //获取菜单
  async getSaleList() {
    let result = await request('/tealist')
    result.data.map((item) => {
      item.num = 0
    })
    console.log(result)
    this.setData({
      SaleList: result.data
    })
  },

  //选择数量
  chooseNum(event) {
    let {
      SaleList
    } = this.data
    let {
      tea,
      type
    } = event.currentTarget.dataset
    if (type == 'jia') {
      tea.num += 1
    } else {
      tea.num -= 1
    }
    let index = SaleList.findIndex((item) => {
      return item.id == tea.id
    })
    SaleList.splice(index, 1)
    SaleList.unshift(tea)
    this.setData({
      SaleList
    })
    let orderList = SaleList.filter((item) => {
      return item.num != 0
    })
    this.setData({
      orderList
    })
  },
  //去订单页面
  toOrder(){
    wx.setStorageSync('order', this.data.orderList)
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    this.getSaleList()
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