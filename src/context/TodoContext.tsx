import { useContext, createContext, ReactNode,useState,Dispatch,SetStateAction } from "react";
import { TaskType } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

type TodoProvider={
    children:ReactNode
}

type TodoContext={
    taskName:String
    setTaskName:Dispatch<SetStateAction<String>>
    taskList:Array<TaskType>,
    setTaskList:Dispatch<SetStateAction<TaskType[]>>
    addTask:()=>void
    filteredList:Array<TaskType>,
    setFilteredList:Dispatch<SetStateAction<TaskType[]>>
    id:number
    setId:Dispatch<SetStateAction<number>>
    checked:Array<number>
    setChecked:Dispatch<SetStateAction<number[]>>
    leftItems:number
    setLeftItems:Dispatch<SetStateAction<number>>
}

const TodoContext=createContext({} as TodoContext)

export function useTodo() {
    return useContext(TodoContext)
}

export function TodoProvider({children}:TodoProvider) {
    const [taskName,setTaskName]=useState<String>('')
    const [taskList,setTaskList]=useLocalStorage<TaskType[]>('tasks',[])
    const [filteredList,setFilteredList]=useState<Array<TaskType>>([])
    const [id,setId]=useLocalStorage<number>('id',0)
    const [checked, setChecked] = useLocalStorage<number[]>('done_tasks',[]);
    const [leftItems,setLeftItems]=useLocalStorage<number>('left_tasks',0)


    const addTask=()=>{
        setId(id+1)
        setTaskList([...taskList, {
          id:id,
          name:taskName
        }])
        setLeftItems(leftItems+1)
        setTaskName('')
      }


    return (<TodoContext.Provider value={{
        taskName,
        setTaskName,
        taskList,
        setTaskList,
        addTask,
        id,
        setId,
        checked,
        setChecked,
        filteredList,
        setFilteredList,
        leftItems,
        setLeftItems
    }}>
        {children}
    </TodoContext.Provider>)
}