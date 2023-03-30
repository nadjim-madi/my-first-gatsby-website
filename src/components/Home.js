import * as React from "react"
import { useEffect, useState } from "react";
import BlogList  from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState([
        // {title:'my new website', body:'Lorem ipsum ...', author:'mario',id:'1'}, 
        // {title:'welcome party', body:'Lorem ipsum ...', author:'yoshi', id:'2'},
        // {title:'Web dev top tips', body:'Lorem ipsum ...', author:'mario', id:'3'}
    ]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    // const [name, setName] = useState("nadjim1");
    // const [age, setAge] = useState(30);

    // const handleClick = () => {
    // setName("nadjim");
    // setAge(25);
    // }
    useEffect(() => {
        setTimeout(() => {
                fetch('http://localhost:8000/blogs')
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
    

    // const handleDelete = (id) => {
    //     const newBlogs = blogs.filter(blog => blog.id !== id);
    //     setBlogs(newBlogs);
    // }

    return ( 
        <div className="home">
           {error && <div> {error}</div>}
           {isPending && <div>Loading ...</div>}    
           {blogs && <BlogList blogs={blogs} title="All the blogs"/>}
               

                {/* <BlogList blogs={blogs.filter((blog)=> blog.author === "mario")} title="Mario's Blogs" /> */}
            
            {/* <h2>Home page</h2>
            <p>{name} is {age} years old</p>
            <button onClick={handleClick}>Click me</button> */}
        </div>
        
    );
}
 
export default Home;