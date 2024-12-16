import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTodo } from '../context/TodoContext';
import { KeyboardEvent } from 'react';

const TodoInput = () => {

    const {taskName,setTaskName,addTask}=useTodo()

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        setTaskName(e.target.value)
    }

    const keyPress=(e:KeyboardEvent<HTMLInputElement>)=>{
        
        if (e.key == 'Enter' && taskName.trim()) {
            e.preventDefault()
            addTask()
        }
    }
  return (
    <Box
    component="form"
    sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
    noValidate
    autoComplete="off"
  >
    <TextField inputProps={{ "data-testid": "input-task" }}  onKeyDown={keyPress}  value={taskName} onChange={handleChange} id="outlined-basic" label="What needs to be done?" variant="outlined" />
  </Box>
  )
}

export default TodoInput