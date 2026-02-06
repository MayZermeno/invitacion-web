import { Home, MapPin, CheckCircle, Shirt } from "lucide-react"

function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FAF7F6] border-t border-neutral-300">
      <ul className="flex justify-around py-3 text-[11px] text-neutral-700">
        
        <li>
          <a href="#inicio" className="flex flex-col items-center gap-1 text-neutral-600 hover:text-neutral-900 transition-colors">
            <Home size={18} />
            <span>Inicio</span>
          </a>
        </li>

        <li>
          <a href="#ubicacion" className="flex flex-col items-center gap-1 text-neutral-600 hover:text-neutral-900 transition-colors">
            <MapPin size={18} />
            <span>Ubicación</span>
          </a>
        </li>

        <li>
          <a href="#rsvp" className="flex flex-col items-center gap-1 text-neutral-600 hover:text-neutral-900 transition-colors">
            <CheckCircle size={18} />
            <span>RSVP</span>
          </a>
        </li>
        <li>
          <a href="#vestimenta" className="flex flex-col items-center gap-1 text-neutral-600 hover:text-neutral-900 transition-colors">
            <Shirt size={18} />
            <span className="text-xs font-medium">Vestimenta</span>
          </a>
        </li>

      </ul>
    </nav>
  )
}

export default BottomNavigation
