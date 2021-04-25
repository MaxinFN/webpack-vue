const { Socket } = require('dgram')
const net = require('net')

const port = 3000
const host = '127.0.0.1'

const server = net.createServer(socket => {
  console.log('server is connected~~~')
  socket.on('data', data => {
    console.log('来自client的data：', data.toString())
    socket.write('this is server')
  })
})

server.listen(port, host, () => {
  console.log(`server已启用监听端口号：${port}`)
})
