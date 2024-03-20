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
};

export default Home;
