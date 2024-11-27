import { Routes, Route } from "react-router-dom";

import DesenvolvedorPage from "@/pages/desenvolvedores";
import NivelPage from "@/pages/niveis";
import NotFoundPage from "@/pages/notfound";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DesenvolvedorPage />} />
        <Route path="/niveis" element={<NivelPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;