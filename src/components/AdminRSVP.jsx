import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase"

function AdminRSVP() {
  const [invitados, setInvitados] = useState([])

  useEffect(() => {
    const fetchInvitados = async () => {
      const snapshot = await getDocs(collection(db, "invitados"))

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setInvitados(data)
    }

    fetchInvitados()
  }, [])

  const confirmados = invitados.filter(i => i.confirmado === true).length

  const pendientes = invitados.filter(i => i.confirmado !== true).length

  const totalPersonas = invitados.reduce((total, inv) => {
    if (inv.confirmado && inv.asistencia) {
      return total + (inv.boletos_usados || 0)
    }
    return total
  }, 0)

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-8 font-sans">

      <h1 className="text-2xl mb-6 text-neutral-700">
        Panel de Confirmaciones
      </h1>

      {/* Panel resumen */}
      <div className="flex gap-6 mb-6">

        <div className="bg-white border rounded-lg px-4 py-3 w-40">
          <p className="text-xs text-neutral-500">Confirmados</p>
          <p className="text-xl text-green-600 font-semibold">
            {confirmados}
          </p>
        </div>

        <div className="bg-white border rounded-lg px-4 py-3 w-40">
          <p className="text-xs text-neutral-500">Personas</p>
          <p className="text-xl text-neutral-700 font-semibold">
            {totalPersonas}
          </p>
        </div>

        <div className="bg-white border rounded-lg px-4 py-3 w-40">
          <p className="text-xs text-neutral-500">Pendientes</p>
          <p className="text-xl text-blue-500 font-semibold">
            {pendientes}
          </p>
        </div>

      </div>

      {/* Tabla */}
      <div className="bg-white border rounded-lg overflow-hidden">

        <div className="max-h-[500px] overflow-y-auto">

          <table className="w-full text-sm">

            <thead className="bg-neutral-100 sticky top-0">
              <tr>
                <th className="p-3 text-left">Token</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-center">Confirmados</th>
                <th className="p-3 text-center">Usados</th>
                <th className="p-3 text-center">Asignados</th>
              </tr>
            </thead>

            <tbody>

              {invitados.map((inv) => (
                <tr key={inv.id} className="border-t hover:bg-neutral-50">

                  <td className="p-2 text-neutral-500">
                    {inv.id}
                  </td>

                  <td className="p-2">
                    {inv.nombre}
                  </td>

                  <td className="p-2 text-center text-lg">
                    {inv.confirmado && (
                      <span
                        className={
                          inv.boletos_usados === inv.boletos_asignados
                            ? "text-green-600"
                            : "text-blue-500"
                        }
                      >
                        ✔
                      </span>
                    )}
                  </td>

                  <td className="p-2 text-center">
                    {inv.confirmado ? inv.boletos_usados : ""}
                  </td>

                  <td className="p-2 text-center text-neutral-500">
                    {inv.boletos_asignados}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default AdminRSVP