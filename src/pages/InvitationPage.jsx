import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

import Header from "../components/Header"
import InvitationCard from "../components/InvitationCard"
import RSVPSection from "../components/RSVPSection"
import BottomNavigation from "../components/BottomNavigation"
import Location from "../components/Location"
import Vestimenta from "../components/Vestimenta"
import ImportantInfo from "../components/ImportantInfo"

function InvitationPage() {
  const { token } = useParams()
  const [invitado, setInvitado] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInvitado = async () => {
      try {
        const ref = doc(db, "invitados", token)
        const snap = await getDoc(ref)

        if (snap.exists()) {
          setInvitado(snap.data())
        } else {
          console.warn("Documento no encontrado")
        }
      } catch (error) {
        console.error("Error cargando invitado:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchInvitado()
    } else {
      setLoading(false)
    }
  }, [token])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-sm text-neutral-500 font-serif">Cargando invitación…</p>
        </div>
      </main>
    )
  }

  if (!invitado) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-serif font-bold text-neutral-800 mb-2">
            Invitación no encontrada
          </h2>
          <p className="text-sm text-neutral-600 mb-4">
            Verifica que el enlace sea correcto o contacta al organizador.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-4 py-2 bg-violet-500 text-white rounded-lg text-sm hover:bg-violet-600 transition font-serif"
          >
            Volver al inicio
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex justify-center relative">
      <div className="w-full max-w-3xl px-5 py-8 flex flex-col gap-12 pb-28 font-serif">
        {/* INICIO */}
        <section id="inicio">
          <Header />
          <InvitationCard invitado={invitado} />
        </section>

        {/* RSVP */}
        <section id="rsvp">
          <RSVPSection invitado={invitado} token={token} />
        </section>

        {/* INFO SORPRESA */}
        <section id="info">
          <ImportantInfo />
        </section>

         {/* Ubicación */}
        <section id="ubicacion">
          <Location />
        </section>

        {/* Vestimenta */}
        <section id="vestimenta">
          <Vestimenta />
        </section>
      </div>

      {/* ✅ Fixed navigation */}
      <div className="fixed bottom-0 left-0 right-0">
        <BottomNavigation />
      </div>
    </main>
  )
}

export default InvitationPage