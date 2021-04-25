const net = require('net')

const port = 3000
const host = '127.0.0.1'

const client = net.createConnection(port, host)

client.on('connect', () => {
  console.log('client is connected server')
})

client.on('data', data => {
  const serverData = data.toString()
  console.log(`这是client端，来自server传输的data：${serverData}`)
})

client.end('this is client data')
