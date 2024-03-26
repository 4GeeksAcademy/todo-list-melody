import React, { useState, useEffect } from "react";

//create your first component 
const Home = () => {

	const [inputValue, setInputValue] = useState ("");
	const [todos, setTodos] = useState ([]);
	const [mouseHover, setMouseHover] = useState(null);

	useEffect(() => {
          getInfo();
    }, []);

	useEffect(() => {
		if (todos.length > 0) {
		  updateInfo(); 
		}
	  }, [todos]);

	  const handleSubmit = () => {
		setTodos(todos.concat({ label: inputValue, done: false }));
		setInputValue("");
	  };
	

	const getInfo = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/melodycn')
			.then(resp => {
				
				if (resp.status === 404) {
					console.log("creando nuevo usuario");
					createUser();
				}
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(result => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(result); // Esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
				})
			;
	
	const createUser = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/melodycn', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify([])
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
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todos),
		  })
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.error(error));
		};

	  const deleteInfo = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/melodycn', {
			method: "DELETE",
		  })
		  .then(response => response.json())
						.then(data => {
							console.log(data);
							window.location.reload();
						})
						.catch(error => console.log('Error: ', error));
		  
		
	  };

		const addTask = (e) => {
			if (e.key === "Enter") {
				handleSubmit();
				setTodos(todos.concat([inputValue]));
				setInputValue("");
				setMouseHover(null)
			}
		};
	
		const deleteTask = (index) => {
			const newList = todos.filter((_, i) => i !== index);
			setTodos(newList);
		}
		
	return (

		<div className="container-fluid text-center col-6 contenedor">
			<h1 className="display-3">My todos </h1>
			<input type="text" 
				   className="input form-control" 
				   value={inputValue} 
				   placeholder="What needs to be done?"
					onKeyDown={addTask} 
					onChange={(e) => { setInputValue(e.target.value)  }} 
					/>
				<ul className="todo-list">
					{todos.map((todos, index) => (
						<li className="task" 
							key={index} 
							onMouseEnter={() => setMouseHover(index)}
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
