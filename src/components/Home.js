import * as React from "react"
import { useEffect, useState } from "react";
import BlogList  from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setTimeout(() => {
                fetch('http://localhost:5000/blogs')
                .then(res => {
                    if (! res.ok) {
                        throw Error("Couldn't fetch the data from the server x)");
                    }
                    return res.json();
                })
                .then(data => {
                    setBlogs(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch( err => {
                    setError(err.message);
                    setBlogs(null);
                    setIsPending(false);
                })
        }, 1000);
        console.log('use effect ran') 
      
    }, [])
    


    return ( 
        <div className="home">
           {error && <div> {error}</div>}
           {isPending && <div>Loading ...</div>}    
           {blogs && <BlogList blogs={blogs} title="All the blogs"/>}
        </div>
        
    );
}
 
export default Home;