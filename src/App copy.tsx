import { useState } from 'react'
import './App.css'
import DynamicForm from './DyanamicForms'
import { Button } from '@mui/material'

let TEMPLATE_NAMES = ["invoice", "invoice2"]
const TEMPLATE_TO_FORM_MAP = {
    invoice: {
        name : "string",
        age: "string",
        sex: "string",
        dob: "date"
    },
    invoice2: {
        name: "string",
        phone: "string",
        amount: "string"
    }
}


function App() {

  let [templateName, setTemplateName] = useState(TEMPLATE_NAMES[0])


  function handleSubmit(): import("react").MouseEventHandler<HTMLButtonElement> | undefined {

    console.log("template name", templateName)
    throw new Error('Function not implemented.')
  }

  return (
    <>
      <div>
        <select onChange={(e) => setTemplateName(e.target.value)}>
          {TEMPLATE_NAMES.map((name) => (
            <option value={name}>{name}</option>
          ))}
        </select>
        <DynamicForm map={TEMPLATE_TO_FORM_MAP[templateName as keyof typeof TEMPLATE_TO_FORM_MAP]} />
 
        </div>
    </>
  )
}

export default App
