import { Route, Routes } from "react-router-dom";
import "./App.css";
import CategoriesPage from "./components/categories/CategoriesPage";
import Layout from "./components/Layout/Layout";
import CreateEditCategory from "./components/AddEditCategory/CreateEditCategory";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CategoriesPage/>} />
        <Route path="create-edit" element={<CreateEditCategory/>} />
      </Route>
    </Routes>
  );
}

export default App;
