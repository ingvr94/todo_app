import { TodoProvider } from './context/TodoContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Todos from './components/Todos'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {


  return (
    <TodoProvider>
        <ThemeProvider theme={darkTheme}>
        <div className='text-7xl text-white mb-7 text-center font-thin'>todos</div>
        <Todos />    
      </ThemeProvider>
    </TodoProvider>

  )
}

export default App
