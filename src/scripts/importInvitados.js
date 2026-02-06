import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

// ===============================
// 🔥 CONFIGURA FIREBASE
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyCF5209wbUsucjhlAZ9nb9YGXhbmX3Q_pg",
  authDomain: "invitacion-web-2dbce.firebaseapp.com",
  projectId: "invitacion-web-2dbce",
  storageBucket: "invitacion-web-2dbce.firebasestorage.app",
  messagingSenderId: "338849220751",
  appId: "1:338849220751:web:815ea5240fa6d8c705c8fa"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// ===============================
// 📁 RUTA SEGURA AL CSV
// ===============================
const __dirname = new URL('.', import.meta.url).pathname
const csvPath = path.resolve(__dirname, '../../invitados.csv')

// ===============================
// 🚀 IMPORTAR CSV → FIRESTORE
// ===============================
async function importarInvitados() {
  const invitados = []

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => {
      invitados.push(row)
    })
    .on('end', async () => {
      console.log(`📄 CSV leído. Invitaciones encontradas: ${invitados.length}`)

      for (const inv of invitados) {
        const token = inv.token?.trim()

        if (!token) {
          console.log('⚠️ Fila sin token, se omite')
          continue
        }

        const ref = doc(db, 'invitados', token)

        const data = {
          token,
          nombre: inv.nombre || '',
          boletos_asignados: Number(inv.boletos_asignados || 0),
          boletos_usados: Number(inv.boletos_usados || 0),
          asistencia: inv.asistencia === 'TRUE' || inv.asistencia === 'true',
          telefono: inv.telefono || '',
          mensaje: inv.mensaje || '',
          createdAt: new Date()
        }

        try {
          await setDoc(ref, data)
          console.log(`✅ Invitación importada: ${token}`)
        } catch (error) {
          console.error(`❌ Error con ${token}:`, error.message)
        }
      }

      console.log('🎉 Importación finalizada')
      process.exit(0)
    })
}

importarInvitados()