import React from 'react';
import './App.css';

const App = ({ websocket }) => {
  const [name, setName] = React.useState(null)
  const [values, setValues] = React.useState([])

  React.useEffect(() => {
    const socket = new WebSocket(websocket.url)

    socket.addEventListener('message', ({ data }) => {
      const event = JSON.parse(data)

      if (event.type === 'NAME') {
        return setName(event.value)
      }

      // TYPE == 'COUNT'
      return setValues((val) => ([...val, event.value]))
    })
  }, [websocket.url])

  if (!name) {
    return (
      <div>Connecting to websocket...</div>
    )
  }

  return (
    <React.Fragment>
      <h3>Hello { name }!</h3>

      <ul>
        { values.map((value) => (
          <li key={ value }>{ value }</li>
        )) }
      </ul>
    </React.Fragment>
  )
}

export default App;
