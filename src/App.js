import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
 import { useSearchParams } from "react-router-dom";
 import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";



export default function App() {
  const { fetchBlog} = useContext(AppContext);
  const[searchParams , setSearchParams] = useSearchParams();
  const location = useLocation();


  useEffect(() => {
    const page = searchParams.get("page") ?? 1;
 //Checking which URL has to be called for API Call

    if(location.pathname.includes("tags")){
     const tag = location.pathname.split("/").at(-1).replaceAll("-","");
      fetchBlog(Number(page),tag);
    }
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replaceAll("-","");
      fetchBlog(Number(page),null,category);
    }
    else{
      fetchBlog(Number(page));
    }
     
  }, [location.pathname, location.search]);

  return (
    <div>
      <Routes>
        <Route path= "/" element= {<Home/>} />
        <Route path= "/tag/:tag" element= {<TagPage/>} />
        <Route path= "/categories/:category" element= {<CategoryPage/>} />
        <Route path= "/blog/:blogId" element= {<BlogPage/>} />
      </Routes>

    </div>
  
  );
}
