import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import { useEffect} from 'react';
import AddCircle from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import {ButtonGroup} from '@mui/material';
import { useTodo } from '../context/TodoContext';


const Todos = () => {

  const {taskName,taskList,setTaskList,addTask,checked,filteredList,setFilteredList,leftItems}=useTodo()


  useEffect(()=>{
    setFilteredList(taskList)
  },[taskList])


  const filterDoneTasks=()=> {
    setFilteredList(taskList.filter(task=>checked.indexOf(task.id) !== -1))
  }

  const filterActiveTasks=()=> {
    setFilteredList(taskList.filter(task=>checked.indexOf(task.id)==-1))
  }

  const filterAllTasks=()=>{
    setFilteredList(taskList)
  }

  const removeDoneTasks=()=>{
    setTaskList(taskList.filter(task=>checked.indexOf(task.id)==-1))
  }

  return (
  <Card sx={{ minWidth:'100%',maxHeight:'100vh', border:'1px solid white'}}>
    <CardContent className=' break-all'>
      <div className='flex items-center justify-around w-full'>
        <TodoInput />
        {taskName.trim() &&
        <IconButton onClick={addTask} data-testid="add-button"  aria-label='add tasks'>
          <AddCircle sx={{ fontSize: 30 }} color='primary'/>
        </IconButton>
        }
      </div>
      {filteredList.length>0 ? <TodoList /> : <span className='w-full flex justify-center py-4 text-gray-300'>No todos at the moment</span>}
    </CardContent>
    <CardActions className='flex justify-between items-center border-t-[1px]'>
      <div data-testid='left-items' className='text-sm'>{leftItems} items left</div>
      <ButtonGroup  variant="text">
        <Button data-testid='all-btn' onClick={filterAllTasks} sx={{fontSize:12}}>All</Button>
        <Button data-testid='active-btn' onClick={filterActiveTasks} sx={{fontSize:12}}>Active</Button>
        <Button data-testid='completed-btn' onClick={filterDoneTasks} sx={{fontSize:12}}>Completed</Button>
      </ButtonGroup>
      <Button data-testid='delete-btn' onClick={removeDoneTasks} sx={{fontSize:12}}>Clear completed</Button>
    </CardActions>
  </Card>
  )
}

export default Todos