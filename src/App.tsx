import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = { id: string, title: string, filter: FilterValuesType }

type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: v1(), title: "1", filter: 'completed'},
        // {id: v1(), title: "2", filter: 'all'},
    ]);

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(todoListID: string, taskID: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
        delete tasks[todoListID]

    }

    function addTask(todoListID: string, title: string) {

        let newTask = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        setTasks({...tasks, [todoListID]: [...tasks[todoListID], newTask]})
    }

    function changeStatus(todoListID: string, taskId: string, newIsDone: boolean) {

        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        })
    }


    function changeFilter(todoListId: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, filter: value} : el))

    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
    }


    return (
        <div className="App">
            {todoLists.map((el) => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={el.id}
                        todoListId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;
