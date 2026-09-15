import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AgendamentoPage from '../pages/AgendamentoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agendamento" element={<AgendamentoPage />} />
      </Routes>
    </BrowserRouter>
  )
}