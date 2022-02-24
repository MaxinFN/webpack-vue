/*
 * @Author: your name
 * @Date: 2021-07-26 17:12:08
 * @LastEditTime: 2021-07-26 17:25:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m\src\global\socket.js
 */
export const init = function init () {
  if (!window.WebSocket) return
  const ws = new WebSocket('ws://localhost:8999')
  ws.onopen = function (e) {
    console.log('socket server && vue success')
    // 向服务器发送消息
    ws.send('i am vue message')
  }
  ws.onclose = function (e) {
    console.log('socket----close')
  }
  ws.onerror = function (e) {
    console.log('socket----error')
  }
  ws.onmessage = function (e) {
    console.log('e---', e)
    const message = 'message from socket server:' + e.data
    console.log(message)
    document.getElementById('test').innerHTML = message
  }
}
