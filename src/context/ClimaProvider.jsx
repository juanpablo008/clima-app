import { useState, createContext } from "react"
import Swal from 'sweetalert2'
import axios from "axios"

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {

  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: ""
  })

  const [resultado, setResultado] = useState({})

  const datosBusqueda = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value

    })
  } 

  const newAlert = (title, text, icon, showConfirmButton, timer) => {
    Swal.fire({
      title,
      text,
      icon,
      showConfirmButton,
      timer
    })
  }

  const consultarClima = async () => {

    const appId = import.meta.env.VITE_API_KEY
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${busqueda.ciudad},${busqueda.pais}&limit=1&appid=${appId}`

    try {
      const { data } = await axios.get(url)
      const { lat, lon } = data[0]
      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
      const { data : clima } = await axios.get(urlClima)
      setResultado(clima)
      newAlert("Success", "Clima obtenido correctamente", "success", false, 1500)
    } catch (error) {
      setResultado({})
      newAlert("Error", "No se pudo obtener el clima", "error", true, 10000)
    }
  }

  return (
    <ClimaContext.Provider 
      value={{
        busqueda,
        datosBusqueda,
        newAlert,
        consultarClima,
        resultado
      }}
    >
      {children}
    </ClimaContext.Provider>
  )
}

export { 
  ClimaProvider 
}

export default ClimaContext