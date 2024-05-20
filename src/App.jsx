import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import { base32 } from '@scure/base';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const normalize = (x) => x.trim().toLowerCase()

function App() {
  const { encryptedSolution } = useParams()
  const [invalid, setInvalid] = useState(false)
  const isCorrect = useRef(() => false)
  const [answer, setAnswer] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setAnswer(e.target[0].value)
  }

  useEffect(() => {
    const decode = (x) => new TextDecoder().decode(base32.decode(x))
    const equals = (x, y) => normalize(x) === normalize(y)
    const equalsToOne = (x, l) => l.split('|').some(y => equals(y, x))
    try {
      let clause = decode(encryptedSolution)
      isCorrect.current = (x) => equalsToOne(x, clause)
    } catch(e) {
      setInvalid(true)
    }
  }, [encryptedSolution])

  if (invalid) return (
    <Alert variant="warning"> QR code invalide ! </Alert>
  )
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control placeholder="Votre réponse..." name="answer" className="mb-3" />
      <Result {...{answer, isCorrect}} className="mb-3" />
    </Form>
  )
}

function Result({answer, isCorrect}) {
  if (answer) {
    if (isCorrect.current(answer)) return (
      <Alert variant="success"> Bravo, oui, la réponse est "{normalize(answer)}" ! </Alert>
    )
    return (
      <Alert variant="danger"> Non, ce n'est pas la réponse. Essayez encore... </Alert>
    )
  }
}

export default App
