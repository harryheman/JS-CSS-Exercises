import React, { useState } from 'react'

function Form(props) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) {
      return
    }
    props.addTask(name)
    setName('')
  }

  function handleChange(e) {
    setName(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <input
        type='text'
        className='input'
        autoComplete='off'
        value={name}
        onChange={handleChange}
      />
      <button type='submit' className='btn'>
        Add
      </button>
    </form>
  )
}

export default Form
