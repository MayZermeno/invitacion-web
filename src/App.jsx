import { BrowserRouter, Routes, Route } from "react-router-dom"
import InvitationPage from "./pages/InvitationPage"
import AdminRSVP from "./components/AdminRSVP"

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/admin" element={<AdminRSVP/>} />
        <Route path="/:token" element={<InvitationPage />} />
          {/* Panel admin */}
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
