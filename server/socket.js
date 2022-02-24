/*
 * @Author: your name
 * @Date: 2021-07-26 17:02:54
 * @LastEditTime: 2021-07-26 17:24:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m\server\socket.js
 */
const ws = require('nodejs-websocket')

const socket = ws.createServer(function (net) {
  net.on('text', function (str) {
    console.log('message：' + str)
    const msg = '来自远端的socket 的 message'
    setInterval(() => {
      net.sendText(msg)
    }, 3000)
  })

  net.on('close', function (code, reason) {
    console.log('socket', code, reason)
  })
  net.on('error', function (code, reason) {
    console.log('异常关闭', code, reason)
  })
})

socket.listen('8999')
console.log('WebSocket建立完毕')

module.exports = socket
