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

  return (
    <div className="p-10 font-serif">
      <h1 className="text-2xl mb-6">Confirmaciones</h1>

      <table className="w-full border border-neutral-300">
        <thead className="bg-neutral-100">
          <tr>
            <th className="p-2">Token</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Confirmado</th>
            <th className="p-2">Asistencia</th>
            <th className="p-2">Boletos usados</th>
            <th className="p-2">Boletos asignados</th>
          </tr>
        </thead>

        <tbody>
          {invitados.map((inv) => (
            <tr key={inv.id} className="border-t text-center">
              <td className="p-2">{inv.id}</td>
              <td className="p-2">{inv.nombre}</td>

              <td className="p-2">
                {inv.confirmado ? "✔" : "⏳"}
              </td>

              <td className="p-2">
                {inv.asistencia === true
                  ? "Sí"
                  : inv.asistencia === false
                  ? "No"
                  : "-"}
              </td>

              <td className="p-2">{inv.boletos_usados ?? "-"}</td>
              <td className="p-2">{inv.boletos_asignados}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminRSVP