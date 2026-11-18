import { FallingLeaves } from 'falling-leaves/react'
import { useEffect, useState } from 'react'
import './App.css'

type GalleryImage = { src: string; ratio: number; text: string }

// Cada imagen tiene su propio texto (text), que se muestra en el reverso.
// Orden intercalado por proporción (alto / ancho) para que no coincidan
// cuatro fotos del mismo tamaño en una misma fila.
const IMAGES = [
  {
    name: '20260912_175820.jpg',
    ratio: 2.16,
    text: 'Tienes un corazón tan grande que no cabe en tu pecho, y por eso lo llevas en el rostro.',
  },
  {
    name: 'IMG-20260816-WA0035.jpg',
    ratio: 1.33,
    text: 'Me encanta que siempre busques verte diferente.',
  },
  {
    name: 'IMG-20260907-WA0001.jpg',
    ratio: 1,
    text: 'Cualquier estilo combina bien con tu sonrisa.',
  },
  {
    name: 'IMG-20261009-WA0006.jpg',
    ratio: 1.62,
    text: 'Eres una mujer increible, inteligente, hermosa y con un gran corazón. Estoy muy orgulloso de ti.',
  },
  {
    name: 'IMG-20260910-WA0047.jpg',
    ratio: 1.33,
    text: 'A veces estar tristes nos recuerda que estamos vivos, y que podemos sentir.',
  },
  {
    name: '20261018_114644.jpg',
    ratio: 2.16,
    text: 'Tienes la sonrisa mas autentica que he visto en mi vida.',
  },
  {
    name: 'IMG-20260910-WA0050.jpg',
    ratio: 0.75,
    text: 'Admiro y respeto la educación que tu mamá te ha dado, y que tú has sabido mantener y mejorar.',
  },
  {
    name: 'IMG-20260910-WA0048.jpg',
    ratio: 1.33,
    text: 'Nunca vas a estar sola mientras la lleves en tu corazón.',
  },
  {
    name: 'IMG-20260910-WA0056.jpg',
    ratio: 1,
    text: 'Ella esta orgullosa, no tengo pruebas pero tampoco dudas.',
  },
  {
    name: 'IMG-20260910-WA0057.jpg',
    ratio: 1.33,
    text: 'Yo no creía en dios, sin embargo, cada que mi mamá me da su bendición me siento amado y protegido, porque es ella pidiendo por mi a todo lo sagrado en lo que ella cree. Yo no creía en dios, sin embargo, cada mañana le pido a todo lo sagrado que pueda oirme, que bendiga tu día.',
  },
  {
    name: '20261111_204051.jpg',
    ratio: 2.16,
    text: 'Si te soy sincero, una vez dije que nunca me subiria a un cablebus, pero a tu lado los malos ratos se vuelven divertidos.',
  },
  {
    name: 'IMG-20260915-WA0054.jpg',
    ratio: 1.33,
    text: 'Me encanta que no eres solo una cara bonita, sino que también eres una persona muy divertida, inteligente y con un gran corazón.',
  },
  {
    name: 'IMG-20260921-WA0029.jpg',
    ratio: 1.33,
    text: 'Me encanta tu sentido de la moda y que siempre hueles riquisimo.',
  },
  {
    name: 'IMG-20260925-WA0018.jpg',
    ratio: 1.33,
    text: 'Siempre me sorprende todas las cosas que sabes y el hecho de que a veces no eres conciente de lo inteligente que eres.',
  },
  {
    name: '20261115_015633.jpg',
    ratio: 2.16,
    text: 'Ella es un escándalo, ella te quita el oxígeno... Es una obra de arte, ella es punto y aparte, еlla es feliz con lo básico.',
  },
  {
    name: 'IMG-20261029-WA0001.jpg',
    ratio: 1.33,
    text: 'Si algun día te fallo espero que me venga a jalar las patas :v',
  },
  {
    name: 'IMG-20261030-WA0052.jpg',
    ratio: 1.33,
    text: 'El que te intereses por mis gustos me hace sentir muy especial.',
  },
  {
    name: 'Screenshot_20261023_131152_WhatsApp.jpg',
    ratio: 1.32,
    text: 'Las cosas que hago por ti no son para que me quieras, son porque te quiero.',
  },
  {
    name: 'IMG-20261031-WA0019.jpg',
    ratio: 1.33,
    text: 'No estoy esperando que me ames, estoy aquí porque es donde quiero estar.',
  },
  {
    name: 'IMG-20261104-WA0016.jpg',
    ratio: 1.33,
    text: 'Que precioso pollito.',
  },
].map(
  ({ name, ratio, text }): GalleryImage => ({
    src: `/images/${name}`,
    ratio,
    text,
  }),
)

function getColumnCount(width: number) {
  if (width < 560) return 1
  if (width < 900) return 2
  if (width < 1280) return 3
  return 4
}

function useColumnCount() {
  const [count, setCount] = useState(() => getColumnCount(window.innerWidth))
  useEffect(() => {
    const onResize = () => setCount(getColumnCount(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return count
}

function FlipCard({ src, ratio, text, index }: GalleryImage & { index: number }) {
  return (
    <div className="card" tabIndex={0}>
      <div className="card-inner">
        <div className="card-front">
          <img
            src={src}
            alt={`Foto ${index + 1}`}
            width={1000}
            height={Math.round(1000 * ratio)}
            loading="lazy"
          />
        </div>
        <div className="card-back">
          <span className="heart" aria-hidden="true">
            ♥
          </span>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const columnCount = useColumnCount()
  // Cada foto va a la columna más corta (masonry real), usando su proporción.
  const columns: (GalleryImage & { index: number })[][] = Array.from(
    { length: columnCount },
    () => [],
  )
  const heights = new Array<number>(columnCount).fill(0)
  IMAGES.forEach((image, index) => {
    const col = heights.indexOf(Math.min(...heights))
    columns[col].push({ ...image, index })
    heights[col] += image.ratio
  })

  return (
    <>
      <FallingLeaves fullScreen shapes={['ginkgo']} />
      <h1>“Todo lo que se hace por amor, se hace más allá del bien y del mal.” ― Nietzsche</h1>
      <main className="gallery">
        {columns.map((column, i) => (
          <div className="gallery-column" key={i}>
            {column.map(image => (
              <FlipCard key={image.src} {...image} />
            ))}
          </div>
        ))}
      </main>
    </>
  )
}

export default App
