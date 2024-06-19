import { Route, Routes } from "react-router-dom";
import "./App.css";
import CategoriesPage from "./components/categories/CategoriesPage";
import Layout from "./components/Layout/Layout";
import CreateEditCategory from "./components/AddEditCategory/CreateEditCategory";
import CategoryTable from "./components/CategoryTable/CategoryTable";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CategoriesPage/>} />
        <Route path="category-table" element={<CategoryTable/>} />
        <Route path="create-edit/:id" element={<CreateEditCategory/>} />
        
      </Route>
    </Routes>
  );
}

export default App;
