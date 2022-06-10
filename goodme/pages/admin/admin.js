// pages/admin/admin.js

import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: '',
  },
  //获取用户名密码
  userName(event) {
    let userName = event.detail.value
    console.log(userName)
    this.setData({
      name: userName
    })
  },
  password(event) {
    let password = event.detail.value
    console.log(password)
    this.setData({
      password
    })
  },
  //登录
  async login() {
    let {
      name,
      password
    } = this.data
    if (name != 'admin') {
      wx.showToast({
        title: '用户名错误',
      })
      return
    }
    if (password != 'admin') {
      wx.showToast({
        title: '密码错误',
      })
      return
    }
    let result = await request('/login', {
      name,
      password
    }, 'post', {
      "Content-Type": "application/x-www-form-urlencoded"
    })
    if (result.code == 200) {
      wx.showToast({
        title: '登录成功',
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/add/add',
        })
      }, 1000)
    } else {
      wx.showToast({
        title: '登录失败',
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