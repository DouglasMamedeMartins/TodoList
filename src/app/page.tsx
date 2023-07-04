'use client'

import { listReducer } from '@/reducers/listReducer'
import { useReducer, useState } from 'react'

const Page = () => {
  const [list, dispatch] = useReducer(listReducer, [])
  const [addField, setAddField] = useState('')
  const handleAddButton = () => {
    if (addField.trim() === '') return false

    dispatch({
      type: 'add',
      payload: {
        text: addField.trim(),
      },
    })

    setAddField('')
  }

  const handleDoneCheckBox = (id: number) => {
    dispatch({
      type: 'toggleDone',
      payload: {
        id,
      },
    })
  }

  const handleEdit = (id: number) => {
    const item = list.find((it) => it.id === id)
    if (!item) return false

    const newText = window.prompt('Editar Tarefa', item.text)
    if (!newText || newText?.trim() === '') return false

    dispatch({
      type: 'editText',
      payload: {
        id,
        newText,
      },
    })
  }

  const handleRemove = (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir?')) return false
    dispatch({
      type: 'remove',
      payload: {
        id,
      },
    })
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl my-4">Lista de Tarefas</h1>
      <div className="flex max-w-2xl mx-auto border bg-gray-900 border-gray-400 p-4 my-4 rounded-md">
        <input
          className="flex-1 rounded-md border -border-white p-3 bg-transparent text-white outline-none"
          type="text"
          placeholder="Digite uma tarefa"
          value={addField}
          onChange={(e) => setAddField(e.target.value)}
        />
        <button className="p-4" onClick={handleAddButton}>
          Adicionar
        </button>
      </div>
      <ul className="max-w-2xl mx-auto">
        {list.map((item) => (
          <li
            className="mt-4 bg-purple-700 p-2 rounded-md flex items-center"
            key={item.id}
          >
            <input
              type="checkbox"
              className="w-6 h-6 mr-4"
              checked={item.done}
              onClick={() => handleDoneCheckBox(item.id)}
            />
            <p className={`text-lg flex-1 ${item.done ? 'line-through' : ''}`}>
              {item.text}
            </p>
            <button
              onClick={() => handleEdit(item.id)}
              className="mx-4 text-white hover:text-gray-500"
            >
              Editar
            </button>
            <button
              onClick={() => handleRemove(item.id)}
              className="mx-4 text-white hover:text-gray-500"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
