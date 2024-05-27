import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Modal } from '@mui/material'
import CardPicto from '@/assets/styles/organisms/CardPicto'
import Input from '@/assets/styles/atoms/Input'
import cn from 'classnames'
import styles from './ModalPicto.module.css'
import Button from '../atoms/Button'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const ModalPicto = ({ pictos, setPictos }) => {
  const [open, setOpen] = useState(false)
  const [pictograms, setPictograms] = useState([])
  const [displayedPictograms, setDisplayedPictograms] = useState([])
  const [selectedPictogram, setSelectedPictogram] = useState(null)
  const [error, setError] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)
  const pictogramsPerPage = 7

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setSelectedPictogram(null)
    setSearchText('') // Vaciar el input de búsqueda
  }

  useEffect(() => {
    const source = axios.CancelToken.source()

    async function fetchPictograms() {
      setLoading(true)
      try {
        const response = await axios('https://api.arasaac.org/api/pictograms/all/es', {
          method: 'get', cancelToken: source.token,
        })
        const pictogramsData = response.data

        const pictogramsWithImages = pictogramsData.map((pictogram) => ({
          ...pictogram,
          imageUrl: `https://static.arasaac.org/pictograms/${pictogram._id}/${pictogram._id}_300.png`,
        }))

        setPictograms(pictogramsWithImages)
        setDisplayedPictograms(pictogramsWithImages.slice(0, pictogramsPerPage))
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch pictograms')
        setLoading(false)
        console.error('Error fetching pictograms:', error)
      }
    }

    fetchPictograms().catch(err => {
      console.error('Error al seleccionar el pictograma', err)
    })
  }, [])

  // Con esta función se cargan más pictogramas al clicar el botón de "Load More"
  const loadMorePictograms = () => {
    const nextPictograms = pictograms.slice(displayedPictograms.length, displayedPictograms.length + pictogramsPerPage)
    setDisplayedPictograms((prevDisplayed) => [...prevDisplayed, ...nextPictograms])
  }

  // Con esta función actualizamos el estado de searchText cada vez que se modifica el input
  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  // Con esta función se selecciona un pictograma
  const handleSelectPictogram = (pictogram) => {
    setSelectedPictogram(pictogram)
  }

  // Con esta función se añade un pictograma a la lista de pictogramas seleccionados
  const handleSelectButtonClick = () => {
    if (selectedPictogram) {
      const newPictos = [
        ...pictos, {
          id: selectedPictogram._id,
          imageUrl: selectedPictogram.imageUrl,
          text: selectedPictogram.keywords[0].keyword,
        }]
      setPictos(newPictos)
      setSelectedPictogram(null)
      handleClose() // Llamar a handleClose para cerrar el modal y limpiar el input de búsqueda
    } else {
      console.error('No se ha seleccionado pictograma')
    }
  }

  // Con esta función se dividen los pictogramas filtrados en dos arrays:
  // uno con los pictogramas que coinciden exactamente con el texto introducido
  // y otro con los que lo contienen
  const filteredPictograms = pictograms.filter((pictogram) =>
      pictogram.keywords.some((keyword) =>
          keyword.keyword.toLowerCase().includes(searchText.toLowerCase()) ||
          keyword.keyword.toLowerCase().startsWith(searchText.toLowerCase()),
      ),
  )

  const exactMatches = filteredPictograms.filter((pictogram) =>
      pictogram.keywords.some((keyword) =>
          keyword.keyword.toLowerCase() === searchText.toLowerCase(),
      ),
  )

  const partialMatches = filteredPictograms.filter((pictogram) =>
      pictogram.keywords.some((keyword) =>
          (keyword.keyword.toLowerCase().includes(searchText.toLowerCase()) ||
              keyword.keyword.toLowerCase().startsWith(searchText.toLowerCase())) &&
          keyword.keyword.toLowerCase() !== searchText.toLowerCase(),
      ),
  )

  const combinedPictograms = [...exactMatches, ...partialMatches]
  const currentPictograms = combinedPictograms.slice(0, displayedPictograms.length)

  return (
      <>
        <button className={cn({ [styles['modalPicto__button']]: true })} onClick={handleOpen}>
          <img src="/ui/more.svg" alt=""/>
          <span>Añadir pictograma</span>
        </button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
          <Box sx={style} className={cn({ [styles.modalPicto]: true })}>
            <Input
                type="text"
                id="searchPictogram"
                label="Buscar pictograma"
                placeholder="Nombre del pictograma"
                bgColor="white"
                value={searchText}
                onChange={handleSearchChange}
            />
            {error && <p>{error}</p>}
            {loading ? (
                <p>Buscando pictogramas...</p>
            ) : (
                <section>
                  <div className={cn({ [styles['modalPicto__grid']]: true })}>
                    {currentPictograms.length > 0 ? (
                        currentPictograms.map((pictogram, index) => (
                            <CardPicto
                                key={index}
                                imageUrl={pictogram.imageUrl}
                                pictoName={pictogram.keywords[0].keyword}
                                onClick={() => handleSelectPictogram(pictogram)}
                                isSelected={selectedPictogram?._id === pictogram._id}
                            />
                        ))
                    ) : (
                        !error && <p>No hay pictogramas que coincidan con tu búsqueda</p>
                    )}
                    <div style={{ width: '100%' }}>
                      {currentPictograms.length < combinedPictograms.length && (
                          <button className={cn({ [styles['modalPicto__button']]: true })} onClick={loadMorePictograms}>
                            <img src="/ui/ojo.svg" alt="Cargar más pictogramas"/>
                            <span>Ver más</span>
                          </button>
                      )}
                    </div>
                  </div>
                </section>
            )}
            <section className={cn({ [styles['modalPicto__footer']]: true })}>
              <div className={'btnGroup'}>
                <Button tag={'button'} color="alternative" size="small" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button disabled={!selectedPictogram} tag={'button'} color="primary" size="small"
                        onClick={handleSelectButtonClick}>
                  Seleccionar
                </Button>
              </div>
            </section>
          </Box>
        </Modal>
      </>
  )
}

export default ModalPicto
