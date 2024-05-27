'use client'
import { useState } from 'react'

const TextoAVoz = ({ texts }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speakAll = () => {
    setIsSpeaking(true)
    texts.forEach((text, index) => {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onend = () => {
        if (index === texts.length - 1) {
          setIsSpeaking(false)
        }
      }
      speechSynthesis.speak(utterance)
    })
  }

  return (
      <button className={'playRutina'} onClick={speakAll} disabled={isSpeaking}>
        <img src="/ui/play.svg" alt="Cargar más pictogramas"/>
        Escuchar
      </button>
  )
}

export default TextoAVoz
