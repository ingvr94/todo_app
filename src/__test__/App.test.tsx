
import '@testing-library/jest-dom'
import { fireEvent, render,screen} from "@testing-library/react"
import App from '../App'


test("Renders the main page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})

describe("Button appearance test",()=> {

    it("Button appears if input is not empty",()=>{
    render(<App />)
    const input=screen.getByTestId('input-task')
    fireEvent.change(input,{
        target:{value:'New task'}
    })
    const btn=screen.getByTestId('add-button')
    expect(btn).toBeInTheDocument()
    })

    it ("Button doesn't appear if input empty",()=>{
        render(<App />)
        const input=screen.getByTestId('input-task')
       
        fireEvent.change(input,{
            target:{value:''}
        })

        const btn=screen.queryByTestId('add-button')
        expect(btn).toBeNull()

    })

    it ("Button doesn't appear if only spaces entered",()=>{
        render(<App />)
        const input=screen.getByTestId('input-task')
       
        fireEvent.change(input,{
            target:{value:'  '}
        })

        const btn=screen.queryByTestId('add-button')
        expect(btn).toBeNull()

    })
})

describe('Tasks tests',()=>{

    it('Add new task',()=>{
        render(<App />)
        const input=screen.getByTestId('input-task')
        const leftItems=screen.getByTestId('left-items')

        fireEvent.change(input,{
            target:{value:'New task'}
        })
        const btn=screen.getByTestId('add-button')
        fireEvent.click(btn)

        const list=screen.queryByTestId('task-list')
        const storageItems= JSON.parse(localStorage.getItem('tasks') || '')

        expect(leftItems).toHaveTextContent('1 items left')
        expect(list).toBeInTheDocument()
        expect(storageItems).toEqual([{id:0,name:'New task'}])
    })

    it('Delete task',()=>{
        render(<App />)
        const leftItems=screen.getByTestId('left-items')

        const checkBtn=screen.getByTestId('check-btn')
        const deleteBtn=screen.getByTestId('delete-btn')
        

        fireEvent.click(checkBtn)
        fireEvent.click(deleteBtn)

        const list=screen.queryByTestId('task-list')
        const storageItems= JSON.parse(localStorage.getItem('tasks') || '')

        expect(leftItems).toHaveTextContent('0 items left')
        expect(list).toBeNull()
        expect(storageItems).toEqual([])
    })

    it('Check filter of active tasks',()=>{
        render(<App />)
        const input=screen.getByTestId('input-task')


        fireEvent.change(input,{
            target:{value:'First task'}
        })

        const btn1=screen.getByTestId('add-button')

        fireEvent.click(btn1)
        fireEvent.change(input,{
            target:{value:'Second task'}
        })
        const btn2=screen.getByTestId('add-button')
        fireEvent.click(btn2)

         const checkboxes=screen.getAllByRole('checkbox')
         fireEvent.click(checkboxes[0])

        const firstTask=screen.getByText('First task')

        const activeBtn=screen.getByTestId('active-btn')
        fireEvent.click(activeBtn)

        expect(firstTask).not.toBeInTheDocument()

        const secondTask=screen.getByText('Second task')
        expect(secondTask).toBeInTheDocument()
        
    }),

    it('Check filter of completed tasks',()=>{

        render(<App />)

        const secondTask=screen.getByText('Second task')

        const completedBtn=screen.getByTestId('completed-btn')
        fireEvent.click(completedBtn)

        const firstTask=screen.getByText('First task')

        expect(secondTask).not.toBeInTheDocument()

        expect(firstTask).toBeInTheDocument()

    }),

    it('Check filter of all tasks',()=>{
        render(<App />)

        const allBtn=screen.getByTestId('all-btn')
        fireEvent.click(allBtn)

        const firstTask=screen.getByText('First task')
        const secondTask=screen.getByText('Second task')

        expect(firstTask).toBeInTheDocument()
        expect(secondTask).toBeInTheDocument()
    }),


    it('Only checked task can be deleted',()=>{
        render(<App />)

        const firstTask=screen.getByText('First task')
        const deleteBtn=screen.getByTestId('delete-btn')
        fireEvent.click(deleteBtn)

        const secondTask=screen.getByText('Second task')

        expect(firstTask).not.toBeInTheDocument()
        expect(secondTask).toBeInTheDocument()
    })

})


