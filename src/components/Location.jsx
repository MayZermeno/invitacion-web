function Location() {

  
    return (
      <section className="mt-10 space-y-4 text-center text-neutral-700">
        
        {/* Título */}
        <h1 className="text-2xl font-serif tracking-wide">
          Ubicación
        </h1>
  
        {/* Dirección */}
        <p className="text-md leading-relaxed">
          Av. Durazno 85, Izcalli Cuauhtémoc, 52176 San Salvador Tizatlalli, Méx.
        </p>
  
        {/* Mapa */}
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md grayscale-[20%">
          <iframe
            title="Mapa ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6017.262212824082!2d-99.59289032327045!3d19.26905764588054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd8a554e05b713%3A0x3620be885a360d72!2sSal%C3%B3n%20BURGOS!5e1!3m2!1ses!2smx!4v1770091647329!5m2!1ses!2smx" 
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
  
        {/* Links */}
        <div className="flex gap-4 justify-center pt-2">
          <a
            href="https://maps.app.goo.gl/ms9si4KEPSm1rg8B8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4"
          >
            Abrir en Google Maps
          </a>
  
       
        </div>
  
      </section>
    )
  }
  
  export default Location
  