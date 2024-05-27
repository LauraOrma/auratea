'use client'
import { useEffect, useState } from 'react'
import SelectorProvincia from '@/assets/styles/atoms/SelectorProvincia'
import Input from '@/assets/styles/atoms/Input'
import Button from '@/assets/styles/atoms/Button'
import axios from 'axios'
import CardResource from '@/assets/styles/organisms/CardResource'
import Slider from '@/assets/styles/sections/Slider'

const GuiaClient = () => {
  const bgColors = ['yellow', 'lightPurple', 'pink', 'darkPurple']
  const [provinciaCode, setProvinciaCode] = useState('')
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')
  const [inquietudes, setInquietudes] = useState({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
  })
  const [diagnostico, setDiagnostico] = useState(null)  // Cambiado a null
  const [currentStep, setCurrentStep] = useState(1)
  const [recursos, setRecursos] = useState([])
  const [terapeutas, setTerapeutas] = useState([])
  const [pasoFinal, setPasoFinal] = useState(false)

  const addInquietud = (inquietud) => {
    setInquietudes({
      ...inquietudes,
      [inquietud]: !inquietudes[inquietud],
    })
  }

  useEffect(() => {
    console.log('Inquietudes:', inquietudes)
  }, [inquietudes])

  const nextStep = async () => {
    if (currentStep < 6) {
      setCurrentStep((prevStep) => prevStep + 1)
    } else {
      await fetchRecursos()
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }

  const resetForm = () => {
    setProvinciaCode('')
    setNombre('')
    setEdad('')
    setInquietudes({
      comunicacion: false,
      comportamiento: false,
      terapeutas: false,
      educacion: false,
      rutinas: false,
      saludMental: false,
    })
    setDiagnostico(null)  // Cambiado a null
    setCurrentStep(1)
    setRecursos([])
    setTerapeutas([])
    setPasoFinal(false)
  }

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return false
      case 2:
        return provinciaCode === ''
      case 3:
        return nombre === ''
      case 4:
        return edad === ''
      case 5:
        return !Object.values(inquietudes).some(value => value)
      case 6:
        return diagnostico === null  // Cambiado a null
      default:
        return true
    }
  }

  const fetchRecursos = async () => {
    const selectedInquietudes = Object.keys(inquietudes).filter(key => inquietudes[key])
    try {
      const response = await axios(`${process.env.NEXT_PUBLIC_APIURI}api/recursos/getRecursosFiltrados`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        data: {
          edad,
          inquietudes: selectedInquietudes,
          provinciaCode,
        },
      })
      const data = response.data
      if (!data.error) {
        setRecursos(data?.recursos || [])
        setTerapeutas(data?.terapeutas || [])
        setPasoFinal(true)
      } else {
        console.error('Error fetching resources:', data.message)
      }
    } catch (error) {
      console.error('Error al obtener los recursos filtrados', error)
    }
  }

  return (
      <>
        <section className={''}>
          {!pasoFinal ? <>
            {currentStep === 1 && (
                <div className={'guia__paso guia__paso1'}>
                  <p>Contesta a algunas preguntas y te ayudamos a entender mejor el proceso de diagnóstico con recursos
                    personalizados</p>
                </div>
            )}
            {currentStep === 2 && (
                <div className={'guia__paso guia__paso2'}>
                  <h2>¿En qué provincia vives?</h2>
                  <SelectorProvincia setProvincia={setProvinciaCode}/> {/* Cambio aquí */}
                </div>
            )}
            {currentStep === 3 && (
                <div className={'guia__paso guia__paso3'}>
                  <h2>¿Cómo se llama tu hijo o hija?</h2>
                  <Input type={'text'} id={'nombre'} label={'Nombre'} placeholder={'Nombre de tu hijo o hija'}
                         bgColor={'white'} value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                </div>
            )}
            {currentStep === 4 && (
                <div className={'guia__paso guia__paso4'}>
                  <h2>¿Qué edad tiene {nombre}?</h2>
                  <Input type={'text'} id={'edad'} label={'Introduce aquí la edad'} placeholder={'Edad'}
                         bgColor={'white'}
                         value={edad} onChange={(e) => setEdad(e.target.value)}/>
                </div>
            )}
            {currentStep === 5 && (
                <div className={'guia__paso guia__paso5'}>
                  <h2>Selecciona tus inquietudes</h2>
                  <span>(Puedes seleccionar más de una)</span>
                  <div className={'btnGroup'}>
                    <Button tag={'button'} color={inquietudes['1'] ? 'active' : 'alternative'} size={'medium'}
                            onClick={() => addInquietud('1')}>
                      Comunicación
                    </Button>
                    <Button tag={'button'} color={inquietudes['2'] ? 'active' : 'alternative'} size={'medium'}
                            onClick={() => addInquietud('2')}>
                      Comportamiento
                    </Button>
                    <Button tag={'button'} color={inquietudes['3'] ? 'active' : 'alternative'} size={'medium'}
                            onClick={() => addInquietud('3')}>
                      Terapeutas
                    </Button>
                    <Button tag={'button'} color={inquietudes['4'] ? 'active' : 'alternative'} size={'medium'}
                            onClick={() => addInquietud('4')}>
                      Educación
                    </Button>
                    <Button tag={'button'} color={inquietudes['5'] ? 'active' : 'alternative'} size={'medium'}
                            onClick={() => addInquietud('5')}>
                      Rutinas
                    </Button>
                    <Button tag={'button'} color={inquietudes['6'] ? 'active' : 'alternative'} size={'medium'}
                            onClick={() => addInquietud('6')}>
                      Salud mental
                    </Button>
                  </div>
                </div>
            )}
            {currentStep === 6 && (
                <div className={'guia__paso guia__paso6'}>
                  <h2>¿{nombre} tiene un diagnóstico realizado por un profesional?</h2>
                  <div className={'btnGroup'}>
                    <Button tag={'button'} color={diagnostico === true ? 'active' : 'alternative'} size={'large'}
                            onClick={() => setDiagnostico(true)}>
                      Sí
                    </Button>
                    <Button tag={'button'} color={diagnostico === false ? 'active' : 'alternative'} size={'large'}
                            onClick={() => setDiagnostico(false)}>
                      No
                    </Button>
                  </div>
                </div>
            )}
            <div className={'btnGroup guia__btn'}>
              {currentStep > 1 && (
                  <Button tag={'button'} color="secondary" size="medium" onClick={previousStep}>
                    Anterior
                  </Button>
              )}
              <Button tag={'button'} color="primary" size="medium" onClick={nextStep} disabled={isNextDisabled()}>
                {currentStep < 6 ? 'Siguiente' : 'Finalizar'}
              </Button>
            </div>
            <div className={'cancelBtn'}>
              <button onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </> : <>
            {recursos.length > 0
                ? <>
                  <div className="resourceSection">
                    <h2>Recursos recomendados</h2>
                    <Slider>
                      {recursos.map((recurso, index) => (
                          <CardResource
                              key={recurso.id}
                              resourceTitle={recurso.titulo}
                              bgColor={bgColors[index % bgColors.length]}
                              resourceId={recurso.id}
                              resourceImage={recurso.imagen}
                          />
                      ))}
                    </Slider>
                  </div>
                </>
                : <>
                  <h2>No se han encontrado recursos</h2>
                  <p>No se han encontrado recursos para tu ciudad en nuestra base de datos</p>
                </>
            }
            {terapeutas.length > 0
                ? <>
                  <div className="resourceSection">
                    <h2>Terapeutas recomendados</h2>
                    <Slider>
                      {terapeutas.map((terapeuta, index) => (
                          <article key={index} className="terapeutaCard">
                            <h3>{terapeuta.nombre}</h3>
                            <p><span>Teléfono:</span> <a href={`tel:${terapeuta.telefono}`}>{terapeuta.telefono}</a></p>
                            <p><span>Email:</span> <a href={`mailto:${terapeuta.correo}`}>{terapeuta.correo}</a></p>
                          </article>
                      ))}
                    </Slider>
                  </div>
                </>
                : <>
                  <h2>No se han encontrado terapeutas</h2>
                  <p>No se han encontrado terapeutas para tu ciudad en nuestra base de datos</p>
                </>
            }
          </>}
        </section>
      </>
  )
}

export default GuiaClient
