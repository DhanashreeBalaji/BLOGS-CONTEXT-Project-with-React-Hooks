// In Blog page, there is a API CAll and the format of blog page 
//Useeffect is used here to do API Call when there is blogid avaiable


import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BlogDetails from '../components/BlogDetails';

const BlogPage = () => {
const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
const {setLoading,loading} = useContext(AppContext);
const location = useLocation();
const blogId = location.pathname.split("/").at(-1);
const navigate = useNavigate();
const [blog, setBlog] = useState(null);
const [relatedblogs , setRelatedBlogs] = useState([]);

async function fetchRelatedBlogs(){
   setLoading(true);
   let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
   console.log(url);

   try{
 const response = await fetch(url);
 const data = await response.json();

 setBlog(data.blog);
 setRelatedBlogs(data.relatedblogs);
   }
   catch(error){
    console.log("Error aagya in blog id wali call");
    setBlog(null);
    setRelatedBlogs([]);
   }
   setLoading(false)
}


 useEffect(() => {
    if(blogId){
        fetchRelatedBlogs();
    }
 },[location.pathname])

  return (
    <div>
    <Header/>
      <div>
        <button
        onClick={() => navigate(-1)}
        >
            Back
        </button>
      </div>
     {
        loading ?
        (
            <p>Loading</p>
        ) 
        : 
            blog ?
          (<div>
                <BlogDetails post={blog}/>
                <h2>Related Blogs</h2>
                {
                    relatedblogs.map((post) => (
                        <BlogDetails key= {post.id} post={post}/>
                    ))
                }
            </div>
          )

          :(
            <p>No Blog Found</p>
          )
        
     }
    </div>
  )
}

export default BlogPage