import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import firebase from '../firebase_setup/firebase'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'react-toastify/dist/ReactToastify.css'
import newFBKey from '../utils'

export default function AddQuiz({ addQuiz }) {
  // Declare multiple state variables!
  const [label] = useState('Add a Quiz')
  const [button] = useState('Create')
  const [title, setTitle] = useState('')
  const dbRef = firebase.database().ref()

  const handleSubmit = (e) => {
    // prevent default behavior of reloading forms
    e.preventDefault()
    const uid = newFBKey()
    if (!title) toast.error('Please enter a title')
    else {
      dbRef.child(`quiz/${uid}`).set(
        {
          id: uid,
          title: title,
          completed: false,
          status: 'active',
          isEditing: false,
          countStudents: 0,
        },
        (err) => {
          if (err) {
            toast.error(err)
          } else {
            toast.success('Quiz Added Successfully')
          }
        }
      )
    }
    addQuiz(title, uid)
    setTitle('')
  }

  return (
    <div style={{ textAlign: 'center' }} className="container-content">
      <ToastContainer />
      <form className="AddQuizForm" onSubmit={handleSubmit}>
        <label>{label}</label>
        <span>: </span>
        <input
          type="text"
          placeholder="Quiz Name"
          id="quizName"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <button style={{ margin: '10px' }}>{button}</button>
      </form>
    </div>
  )
}
