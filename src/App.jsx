import React from 'react'
import { nanoid } from 'nanoid'

function App() {

  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null)

  const handleChange = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log('Elemento vacio');
      setError('Escriba algo por favor...')
      return
    }
    console.log(tarea);
    setTareas([
      ...tareas,
      { id: nanoid(10), nombreTarea: tarea }
    ])

    setTarea('')
    setError(null)
  }

  const deletiarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editTarea = item => {
    console.log(item);
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  const handleUpdate = e => {
    e.preventDefault()

    if (!tarea.trim()) {
      console.log('Elemento vacio');
      setError('Escriba algo por favor...')
      return
    }

    const arrayEditado = tareas.map(item => item.id === id ? { id, nombreTarea: tarea } : item)
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Crud Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">
            Lista de tareas
          </h4>
          <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li className='list-group-item'>No hay tareas</li>
              ) : (
                tareas.map((elemento, index) => (
                  <li key={elemento.id} className="list-group-item">{elemento.nombreTarea}
                    <button
                      className="btn btn-warning btn-sm float-end mx-2"
                      onClick={() => editTarea(elemento)}
                    > Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm float-end"
                      onClick={() => deletiarTarea(elemento.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))
              )
            }
          </ul>
          <ul>



          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? handleUpdate : handleChange}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />
            {
              modoEdicion ? (
                <button className="btn btn-warning w-100" type="submit">Editar</button>
              ) :
                (
                  <button className="btn btn-dark w-100" type="submit">Agregar</button>
                )
            }

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
