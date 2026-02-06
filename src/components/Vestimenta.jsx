// src/components/Vestimenta.jsx

function Vestimenta() {
  return (
    <section id="vestimenta" className="px-6 py-8 ">
      <h2 className="text-2xl font-serif text-center  text-neutral-800 mb-4">
        Código de Vestimenta
      </h2>
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img 
              src="/images/Cvest.png" 
              alt="Ejemplo de vestimenta casual" 
              className="h-48 w-full object-cover md:h-full md:w-64"
            />
          </div>
          
          <div className="p-6">
            {/* ✅ Título más fino */}
            <h3 className="text-xl font-serif font-light text-neutral-700 mb-3">
              ¿Qué llevar?
            </h3>
            
            {/* ✅ Texto más pequeño y fino */}
            <p className="text-sm font-serif font-light text-neutral-600 mb-4">
              Para este evento especial, recomendamos:
            </p>
            
            {/* ✅ Lista con alineación perfecta */}
            <ul className="list-none space-y-2.5 font-serif font-light text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5 flex-shrink-0">👔</span>
                <span>
                  <span className="font-medium">Caballeros:</span> Jeans o pantalón casual + playera o camisa bonita.
                </span>
              </li>
              
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5 flex-shrink-0">👗</span>
                <span>
                  <span className="font-medium">Damas:</span> Un conjunto lindo y cómodo, o vestido casual si te apetece. Lo importante: que te sientas tú.
                </span>
              </li>
              
              <li className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5 flex-shrink-0">👟</span>
                <span>
                  <span className="font-medium">Calzado:</span> ¡Cómodo es clave!
                </span>
              </li>
            </ul>
            
            {/* ✅ Nota importante con estilo fino */}
            <div className="mt-5 p-3.5 bg-[#FBF7F1] rounded-lg border-l-2 border-[#D4B896]">
              <p className="text-xs font-serif font-light text-neutral-600">
                <span className="text-violet-500 mr-1">💡</span>
                <span className="font-medium">¡Trae abrigo!</span> Por acá el clima es juguetón: soleado a las 2pm, nublado a las 4pm, y quizás una llovizna al atardecer. Mejor venir preparado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Vestimenta