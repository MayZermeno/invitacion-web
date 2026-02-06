import { useEffect, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

function RSVPSection({ invitado: invitadoProp, token }) {
  const [invitado, setInvitado] = useState(invitadoProp || null)
  const [respuesta, setRespuesta] = useState("")
  const [boletosUsados, setBoletosUsados] = useState(1)
  const [loading, setLoading] = useState(!invitadoProp)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!invitadoProp) {
      const fetchInvitado = async () => {
        setLoading(true)
        try {
          const ref = doc(db, "invitados", token)
          const snap = await getDoc(ref)

          if (!snap.exists()) {
            setError("Invitación no encontrada")
          } else {
            const data = snap.data()
            setInvitado(data)
            setRespuesta(data.asistencia === true ? "yes" : data.asistencia === false ? "no" : "")
            setBoletosUsados(data.boletos_usados > 0 ? data.boletos_usados : 1)
          }
        } catch (err) {
          console.error(err)
          setError("Error al cargar la invitación")
        } finally {
          setLoading(false)
        }
      }

      fetchInvitado()
    }
  }, [token, invitadoProp])

  const yaConfirmo = invitado?.confirmado === true

  const handleSave = async () => {
    if (!invitado || yaConfirmo) return

    if (respuesta === "") {
      setError("Selecciona tu asistencia")
      return
    }

    if (
      respuesta === "yes" &&
      (boletosUsados < 1 || boletosUsados > invitado.boletos_asignados)
    ) {
      setError("Cantidad de boletos inválida")
      return
    }

    try {
      const ref = doc(db, "invitados", token)

      await updateDoc(ref, {
        asistencia: respuesta === "yes",
        confirmado: true,
        boletos_usados: respuesta === "yes" ? boletosUsados : 0
      })

      setInvitado({
        ...invitado,
        asistencia: respuesta === "yes",
        confirmado: true,
        boletos_usados: respuesta === "yes" ? boletosUsados : 0
      })

      setError("")
    } catch (err) {
      console.error(err)
      setError("No se pudo guardar la respuesta")
    }
  }

  if (loading) return <p className="text-center mt-10">Cargando invitación…</p>
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>

  return (
    <section className="px-6 py-6 text-center bg-[#FAF7F2] font-serif">
      <h2 className="text-2xl tracking-wide text-neutral-700">
        {invitado.boletos_asignados > 1 ? "Queridos" : "Querid@"}
      </h2>

      <p className="mt-2 text-lg text-neutral-700">{invitado.nombre}</p>

      {!yaConfirmo && (
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          Nos encantaría saber si{" "}
          {invitado.boletos_asignados > 1 ? "podrán" : "podrás"}{" "}
          acompañarnos en este día tan especial.
        </p>
      )}

      {!yaConfirmo ? (
        <div className="mt-6 flex flex-col items-center gap-4">
          {/* Asistencia */}
          <select
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            className="w-full max-w-xs rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm text-neutral-700 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400"
          >
            <option value="">Selecciona una opción</option>
            <option value="yes">Confirmo asistencia</option>
            <option value="no">No podré asistir</option>
          </select>

          {/* Boletos: solo si hay 2 o más */}
          {respuesta === "yes" && invitado.boletos_asignados > 1 && (
            <div className="w-full max-w-xs">
              <label className="text-sm text-neutral-700">
                ¿Cuántos boletos usarás?
              </label>
              <select
                value={boletosUsados}
                onChange={(e) => setBoletosUsados(Number(e.target.value))}
                className="w-full mt-1 rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm text-neutral-700 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              >
                {Array.from(
                  { length: invitado.boletos_asignados },
                  (_, i) => i + 1
                ).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <p className="text-xs text-neutral-500 mt-1">
                Asignados: {invitado.boletos_asignados}
              </p>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={yaConfirmo}
            className={`mt-4 px-6 py-2 rounded-full transition
              ${
                yaConfirmo
                  ? "bg-neutral-300 cursor-not-allowed"
                  : "bg-mauve text-white hover:brightness-110"
              }`}
          >
            Enviar
          </button>
        </div>
      ) : (
        <p className="mt-6 text-sm text-neutral-700">
          ✨ {invitado.nombre},{" "}
          {invitado.asistencia
            ? `gracias por acompañarnos. ${
                invitado.boletos_usados
              } boleto${invitado.boletos_usados > 1 ? "s" : ""} reservado${
                invitado.boletos_usados > 1 ? "s" : ""
              }. ¡Te esperamos 🎉!`
            : "qué lástima que no puedas venir, te mandamos un abrazo 🤍"}
        </p>
      )}
    </section>
  )
}

export default RSVPSection
