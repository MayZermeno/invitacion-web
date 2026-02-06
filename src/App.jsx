import { BrowserRouter, Routes, Route } from "react-router-dom"
import InvitationPage from "./pages/InvitationPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:token" element={<InvitationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
