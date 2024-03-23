import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component 
const Home = () => {

	const [inputValue, setInputValue] = useState ("");
	const [todos, setTodos] = useState ([]);
	const [mouseHover, setMouseHover] = useState(null);

	const getInfo = () => {
		fetch ('https://playground.4geeks.com/apis/fake/todos/user/melodycn', {
			method: "GET",
		  })
		  .then(resp => {
			  console.log(resp.ok); // Será true si la respuesta es exitosa
			  console.log(resp.status); // El código de estado 200, 300, 400, etc.
			  if (resp.status === 404){
				console.log("creando nuevo usuario")
				createUser() } ;
			  console.log(resp.text()); // Intentará devolver el resultado exacto como string
			  return resp.json() // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
		  })
		  .then(data => {
			  // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
			  console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
		  })
		  .catch(error => {
			  // Manejo de errores
			  console.log(error);
		  });
	
	const createUser = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/melodycn', {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 200, 300, 400, etc.
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
    })
    .then(data => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    });
	}}

	const updateInfo = () =>{
		fetch('https://playground.4geeks.com/apis/fake/todos/user/melodycn', {
			method: "POST",
			body: JSON.stringify(todos),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  // console.log(resp.ok); // will be true if the response is successfull
			  // console.log(resp.status); // the status code = 200 or code = 400 etc.
			  // console.log(resp.text()); // will try return the exact result as string
			  return resp.json();        
		  })
		  .then(data => {
			  //here is where your code should start after the fetch finishes
			  console.log(data); //this will print on the console the exact object received from the server
		  })
		  .catch(error => {
			  //error handling
			  console.log(error);
		  });
		
	  };
	  const deleteInfo = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/melodycn', {
			method: "DELETE",
			body: JSON.stringify(todos),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  // console.log(resp.ok); // will be true if the response is successfull
			  console.log(resp.status); 
			  if (resp.status === 200){
				console.log("creando nuevo usuario")
				createUser()
				setTodos([])};// the status code = 200 or code = 400 etc.
			  // console.log(resp.text()); // will try return the exact result as string
					 
		  })
		  .then(data => {
			  //here is where your code should start after the fetch finishes
			  console.log(data); //this will print on the console the exact object received from the server
		  })
		  .catch(error => {
			  //error handling
			  console.log(error);
		  });
		  
		
	  };

	useEffect( () => {     //useEffect con funcion dentro que haga un fetch GET de la info del server----- POST para crear nuevo usuario
		getInfo();
	  }, [])
	
	  useEffect( () => {
		updateInfo();
		}, [todos])
	  

		const addTask = (e) => {
			if (e.key === "Enter") {
				setTodos(todos.concat([inputValue]));
				setInputValue("");
				setMouseHover(null)
			}
		};
	
		const deleteTask = (index) => {
			const newList = todos.filter((_, i) => i !== index);
			setTodos(newList);
		};
		
	return (

		<div className="container-fluid text-center col-6 contenedor">
			<h1 className="display-3">My todos </h1>
			<input type="text" className="input form-control" value={inputValue} placeholder="What needs to be done?"
					onKeyDown={addTask} onChange={(e) => { setInputValue(e.target.value) }} />
				<ul className="todo-list">
					{todos.map((todos, index) => (
						<li className="task" key={index} onMouseEnter={() => setMouseHover(index)}
							onMouseLeave={() => setMouseHover(null)}>
							{todos} 
							{mouseHover === index && (
								<span
									style={{ cursor: "pointer" }}
									onClick={() => deleteTask(index)}
								>
									&#10006;
									
								</span>
							)}
						</li>
					))}
				</ul>
				<button className="btn btn-danger" onClick={deleteInfo}>Delete everything</button>
			<div className="fw-light" >{todos.length == 0 ? 'No tasks, add a task' : todos.length + ' tasks left'}</div>
		</div>
		
	);
}

export default Home 
