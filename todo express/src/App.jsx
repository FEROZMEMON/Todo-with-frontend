
// import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
// import axios from "axios";

// function App() {
//   const inputValue = useRef(null);
//   const [data, setData] = useState([]);

//   useEffect(() => {

//     axios.get("http://localhost:3000/api/v1/users")
//       .then((res) => {
//         console.log(res.data);

//         setData(res.data)
//         console.log(data);

//       })
//       .catch((err) => {
//         console.log("Error fetching data: ", err);
//       });
  
//         setData([...data])   
//        }, []);

//  const dataPost = async (e) => {
   
//   e.preventDefault()
//  // console.log(inputValue.current.value);
// try {
  
//   const post = await axios.post("http://localhost:3000/api/v1/users" , {title: inputValue.current.value} )
//  console.log(post.data);

// } catch (error) {

//   console.log(error);
// } 
// }


// const deletedTodo =async (id)=>{
//   try{
//   const response = await axios.delete(`http://localhost:3000/api/v1/users/${id}`)
//   console.log(response.data);

//   }
//   catch(error){
//     console.log(error);
//   }
  
// }

// const editTodo =async (id)=>{
//   const newvalue =prompt('enter new todo')
//   try{
//   const response = await axios.put(`http://localhost:3000/api/v1/users/${id}`, {
//     title : newvalue
//   })
//   console.log(response.data);

//   }
//   catch(error){
//     console.log(error);
//   }
  
// }


//   return (
//     <>
//       <div>
//         <h1>feroz</h1>

//         <form onSubmit={dataPost}>
//           <input type="text" placeholder="enter todo" ref={inputValue} />

//           <input type="submit" value="submit" />
//         </form>

//   {
//     data.length > 0 ? data.map((item)=> {

    
//    return  <div key={item.id}>
//       <p>{item.title}</p>
//      <button onClick={()=>deletedTodo(item.id)}>delete</button>
//      <button onClick={()=>editTodo(item.id)} >edit</button> 
//      </div>
//     }): <h1>enter todo</h1>
//   }


//       </div>
//     </>
//   );
// }



// export default App;



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const inputValue = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users");
      setData(res.data);
    } catch (err) {
      console.log("Error fetching data: ", err);
    }
  };

  const dataPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/users", {
        title: inputValue.current.value,
      });
      // Clear input after adding todo
      inputValue.current.value = "";
      // Fetch updated data after adding todo
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${id}`);
      // Filter out the deleted item from the state

      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (id) => {
    const newTitle = prompt("Enter new todo");
    if (newTitle !== null) {
      try {
        await axios.put(`http://localhost:3000/api/v1/users/${id}`, {
          title: newTitle,
        });
        // Fetch updated data after editing todo
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div>
        <h1>Todo List</h1>

        <form onSubmit={dataPost}>
          <input type="text" placeholder="Enter todo" ref={inputValue} />
          <button type="submit">Add Todo</button>
        </form>

        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <button onClick={() => deleteTodo(item.id)}>Delete</button>
              <button onClick={() => editTodo(item.id)}>Edit</button>
            </div>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </div>
    </>
  );
}

export default App;
