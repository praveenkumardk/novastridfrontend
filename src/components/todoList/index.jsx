import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos, updateStatus, deleteTodo } from "../../store/reducers/todoListReducer";
import "./style.css"


export default function TodoList(){
    const [inputText, setInputText] = useState("")
    const [list, setList] = useState([])
    const [todoLoading, setTodoLoading] = useState(false)


    const {items, loading, error} = useSelector((store)=>store.todoListReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchTodos())
    },[dispatch])

    useEffect(()=>{
        console.log("---List---->", items)
        setList(items)
    },[items])

    useEffect(()=>{
        setTodoLoading(loading)
    },[loading])

    function handleOnChange(event){
        setInputText(event.target.value)
    }
    function handleOnClick(){
        console.log('handle on click')
        if(inputText){
            dispatch(addTodo({id:list.length+1,task:inputText, status:false}))
            setInputText("")
        }
    }

    function handleCheck(value){
        console.log(value)
        dispatch(updateStatus(value))
    }

    function handleDeleteTodo(value){
        dispatch(deleteTodo(value))
    }
    return(
        <div className="todoWrapper">
            <div className="todoSubWrapper">
            <div className="inputWrapper">
                <input type="text" value={inputText} onChange={handleOnChange} style={{width:"70%"}}/>
                <button onClick={handleOnClick} disabled={!inputText}>Add</button>
            </div>
            <hr className="devider"/>
            <div className="listWrapper">
            {todoLoading ? <div>...Loading</div> : list.map((value)=><div key={value.id} className="mapWrapper">
                <input type="radio" onClick={()=>{handleCheck(value)}}/>
                <p>{value.task}</p>
                <button onClick={()=>{handleDeleteTodo(value)}} className="dleteBtn">Delete</button>
                </div>)}
            </div>
            </div>
        </div>
    )
}