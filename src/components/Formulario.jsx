import { useState } from "react"
import useClima from "../hooks/useClima"

const Formulario = () => {

  const { busqueda, datosBusqueda, newAlert, consultarClima } = useClima()

  const { ciudad, pais } = busqueda 

  const handleSubmit = e => {
    e.preventDefault()

    if(Object.values(busqueda).includes("")){
      newAlert("Error", "Todos los campos son obligatorios", "error", true, 10000)
      return
    }

    consultarClima()

  }

  return (
    <div className='contenedor'>
      <form onSubmit={handleSubmit}>
        <div className='campo'>
          <label htmlFor="ciudad">Ciudad</label>
          <input type="text" name="ciudad" id="ciudad" onChange={datosBusqueda} value={ciudad} />
        </div>
        <div className='campo'>
          <label htmlFor="pais">País</label>
          <select name="pais" id="pais" onChange={datosBusqueda} value={pais} >
            <option value=""> -- Selecciona un País -- </option>
            <option value="US">Estados Unidos</option>
            <option value="CO">Colombia</option>
            <option value="MX">Mexico</option>
            <option value="AR">Argentina</option>
            <option value="CR">Costa Rica</option>
            <option value="ES">España</option>
            <option value="PE">Perú</option>
          </select>
        </div>
        <input type="submit" value="Consultar Clima" />
      </form>
    </div>
  )
}

export default Formulario