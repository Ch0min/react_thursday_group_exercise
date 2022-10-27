import { useState } from 'react'
import MovieService from "./MovieService";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MovieService/>
    </div>
  )
}

export default App
