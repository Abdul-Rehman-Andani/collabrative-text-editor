import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp, Document, Error } from "./pages/page";
export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/document/:id" element={<Document />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
