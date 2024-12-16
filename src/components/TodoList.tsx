import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useTodo } from '../context/TodoContext';


const TodoList = () => {
    const {filteredList,checked,setChecked,leftItems,setLeftItems}=useTodo()

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
            setLeftItems(leftItems-1)
          
        } else {
          newChecked.splice(currentIndex, 1);
          setLeftItems(leftItems+1)
        }
    
        setChecked(newChecked);
        
      };


  return (
    <List sx={{ width: '100%', maxWidth: 360 }} data-testid='task-list'>
      {filteredList.map((task) => {
        const labelId = `checkbox-list-label-${task.id}`;

        return (
            <>
            <ListItem
            key={task.id}
            disablePadding
            data-testid='task-item'
            
            >
                <ListItemButton data-testid='check-btn' onClick={handleToggle(task.id)} dense>
                <ListItemIcon>
                    <Checkbox
                    edge="start"
                    checked={checked.indexOf(task.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText  data-testid='list-item-text' className={checked.indexOf(task.id) !== -1 ? 'line-through text-gray-400' : ''} id={labelId} primary={task.name} />
                </ListItemButton>
          </ListItem>
            </>
        );
      })}
    </List>
  )
}

export default TodoList