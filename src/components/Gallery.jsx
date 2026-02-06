// src/components/Gallery.jsx

function Gallery() {
  // Lista de imágenes (agrega tus propias rutas)
  const images = [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
    '/images/gallery-5.jpg',
    '/images/gallery-6.jpg'
  ]

  return (
    <section className="px-6 py-12 bg-neutral-50">
      <h2 className="text-2xl font-serif text-center font-bold text-neutral-800 mb-8">
        Galería de Fotos
      </h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-md group">
            <img 
              src={img} 
              alt={`Foto de boda ${index + 1}`} 
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 w-full h-full flex items-center justify-center">
              <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery