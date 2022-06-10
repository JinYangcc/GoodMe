//封装request 发送请求
export default (url, data = {}, method = 'get', header = {
  'content-type': 'application/json'
}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://127.0.0.1:8000' + url,
      data,
      method,
      header,
      success: (result) => {
        console.log('请求成功', result)
        resolve(result.data)
      },
      fail: (error) => {
        console.log('请求失败', error)
        reject(error)
      }
    })
  })
}