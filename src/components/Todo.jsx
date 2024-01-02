import React, { useState } from 'react'
import close from './Images/close.png'
import empty from './Images/empty.png'
import full from './Images/full.png'
import edit from './Images/edit.png'

const Todo = () => {

    // InputData to get value from Input 
    const [inputData, setInputData] = useState('');

    // todos to store data array to show on display
    const [todos, setTodos] = useState([])


    // addtodo Function to add data into todos array
    const addTodo = (e) => {
        e.preventDefault();

        // Check if inputdata in empty or not
        if (!inputData) {
            alert('Pls Add Todo')
        }
        else if (inputData.trim() === "") {
            alert('Pls Add Todo')
            setInputData('')
        }
        else {
            // adding unique id to all todos
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
                task: false,
            }
            // sprade todos to add all toso into todos array 
            // add inputdata Into todos array
            setTodos([...todos, myNewInputData])
            // after adding todo in todos array make empty input
            setInputData('')
        }
    };


    // On click of delete Icon we'll get it's id and filter out that todo from todos array and update todos array
    const deleteItem = (index) => {
        const newItem = todos.filter((curElem) => {
            return curElem.id !== index
        })
        setTodos(newItem)
    }

    // On click task we can done that task
    const taskDone = (item) => {
        // iterate through todos array using map and check if clicked task id match than change it's state (task) value 
        // and update todos array
        let updatedData = todos.map((todo) =>
            todo.id === item.id ? { ...todo, task: !todo.task } : todo
        )
        setTodos(updatedData)
    }
    return (
        <>
            <div className="todo-card">
                <h1>Todo App</h1>
                <form>
                    <input type="text" placeholder='Enter Your Todo Here...' value={inputData} onChange={(event) => setInputData(event.target.value)} />
                    <input type="submit" value={"submit"} onClick={addTodo} />
                </form>
                <div className="todo-box">
                    {/* Add map methods on todos array to show data on screen */}
                    {
                        todos.map((curItem) => {
                            return (
                                <div className="todo" key={curItem.id}>
                                    <div className={`text ${curItem.task == false ? "" : "done"}`} onClick={() => taskDone(curItem)}>
                                        < img src={curItem.task === true ? full : empty} />
                                        <p>{curItem.name}</p>
                                    </div>
                                    <div className='edit-box'>
                                        <img src={edit} alt="remove Icon" />
                                        <img src={close} alt="remove Icon" onClick={() => deleteItem(curItem.id)} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Todo