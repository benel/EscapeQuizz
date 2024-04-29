import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import { base32 } from '@scure/base';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { encryptedSolution } = useParams()
  const [invalid, setInvalid] = useState(false)
  const solution = useRef()
  const [success, setSuccess] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    let { answer } = Object.fromEntries(new FormData(e.target).entries())
    setSuccess(answer === solution.current)
  }

  useEffect(() => {
    try {
      solution.current = new TextDecoder().decode(base32.decode(encryptedSolution))
    } catch(e) {
      setInvalid(true);
    }
  }, [encryptedSolution])

  if (invalid) return (
    <Alert variant="warning"> QR code invalide ! </Alert>
  )
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control placeholder="Votre réponse..." name="answer" className="mb-3" />
      <Result {...{success, solution}} className="mb-3" />
    </Form>
  )
}

function Result({success, solution}) {
  switch (success) {
    case true: return (
      <Alert variant="success"> Bravo, oui, la réponse est "{solution.current}" ! </Alert>
    )
    case false: return (
      <Alert variant="danger"> Non, ce n'est pas la réponse. Essaie encore... </Alert>
    )
  }
}

export default App
