import React, { useEffect, useRef, useState } from 'react'

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')

  const editFieldRef = useRef(null)
  const editButtonRef = useRef(null)

  const wasEditing = usePrevious(isEditing)

  function handleChange(e) {
    setNewName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!newName.trim()) {
      return
    }
    props.editTask(props.id, newName)
    setNewName('')
    setEditing(false)
  }

  const editingTemplate = (
    <form className='form' onSubmit={handleSubmit}>
      <input
        className='input'
        type='text'
        value={newName}
        onChange={handleChange}
        ref={editFieldRef}
      />
      <button className='btn warning' onClick={() => setEditing(false)}>
        Cancel
      </button>
      <button type='submit' className='btn success'>
        Save
      </button>
    </form>
  )

  const viewTemplate = (
    <>
      <input
        id={props.id}
        type='checkbox'
        className='checkbox'
        defaultChecked={props.completed}
        onChange={() => props.toggleTaskCompleted(props.id)}
      />
      <label
        className={`text ${props.completed && 'completed'}`}
        htmlFor={props.id}
      >
        {props.name}
      </label>
      <button
        className={`btn info ${props.completed && 'disabled'}`}
        onClick={() => setEditing(true)}
        ref={editButtonRef}
      >
        Update
      </button>
      <button
        type='button'
        className='btn danger'
        onClick={() => props.deleteTask(props.id)}
      >
        Delete
      </button>
    </>
  )

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus()
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus()
    }
  }, [wasEditing, isEditing])

  return <li className='item'>{isEditing ? editingTemplate : viewTemplate}</li>
}
