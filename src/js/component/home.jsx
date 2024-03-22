import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component 
const Home = () => {

	const [inputValue, setInputValue] = useState ("");
	const [todos, setTodos] = useState ([]);
	const [mouseHover, setMouseHover] = useState(null);

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

	return (

		<div className="container-fluid text-center col-6 contenedor">
			<h1 class="display-3">My todos </h1>
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
			<div className="fw-light" >{todos.length == 0 ? 'No tasks, add a task' : todos.length + ' tasks left'}</div>
		</div>
		
	);
}

export default Home 
