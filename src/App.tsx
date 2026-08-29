import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainPage from './pages/MainPage';
import QuestionListPage from './pages/QuestionListPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import QuestionCreatePage from './pages/QuestionCreatePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions" element={<QuestionListPage />} />
          <Route path="/questions/create" element={<QuestionCreatePage />} />
          <Route path="/questions/:id" element={<QuestionDetailPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
