const Websocket = require('ws')

const wss = new Websocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
  let count = 0

  ws.send(JSON.stringify({
    type: 'NAME',
    value: 'John Smith'
  }))

  const counter = setInterval(() => {
    ws.send(JSON.stringify({
      type: 'COUNT',
      value: count
    }))

    count = count + 1
  }, 1000)


  ws.on('close', () => {
    clearInterval(counter)
  })
})

console.log('Running websocket on port 8080, ws://localhost:8080')
