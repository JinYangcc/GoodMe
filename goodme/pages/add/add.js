// pages/add/add.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    price: ''
  },
  name(event) {
    let name = event.detail.value
    console.log(name)
    this.setData({
      name
    })
  },
  price(event) {
    let price = event.detail.value
    console.log(price)
    this.setData({
      price
    })
  },
  //添加奶茶
  async addtea() {
    let {
      name,
      price
    } = this.data
    let result = await request('/addtea', {
      name,
      price
    }, 'post', {
      "Content-Type": "application/x-www-form-urlencoded"
    })
    console.log(result)
    if (result.code == 200) {
      wx.showToast({
        title: '添加成功',
      })
    }else{
      wx.showToast({
        title: '添加失败',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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