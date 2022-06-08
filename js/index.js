Neutralino.init()
const { useState,useEffect } = React
//_init()

// comment this code during development
//document.addEventListener('contextmenu', event => event.preventDefault());

const Main = (props) => {

    const [tasks,setTasks] = useState([])
    const [init,setInit] = useState(false)
    const [settings,setSettings] = useState({alwaysOnTop:true})

    useEffect(()=>{

        if(init == false){

            _getData('tasks').then((data) => {

                setTasks(data)
                setInit(true)

            }).catch((err) => {

                if(err.code == 'NE_ST_NOSTKEX'){

                    _setData('tasks',tasks)
                    setInit(true)
                }
            })

            _getData('settings').then(settings => {

                setSettings({...settings})
            })
            
        }
        else{

            _setData('tasks',tasks)
        }

    })

    const addNewTask = (newTask) => {

        setTasks([...tasks,newTask])
        
    }

    const changeSetting = (setting,value) => {

        let newSettings = {...settings}
        
        if(Number(value) !== null){
            newSettings[setting] = Number(value)
        }
        else{
            console.log(setting,value)
        }

        setSettings(newSettings)

        _setData('settings',newSettings)
    }

    const deleteTask = (id) => {

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            
            if( task.id == id){

                let newTasks = tasks
                newTasks.splice(i,1)

                setTasks([...newTasks])
            }
        }
    }

    return <div>
        <TopNav/>
        <SettingsWindow settings={settings} changeSetting={changeSetting}/>
        <UpdateWindow/>
        <TaskForm tasks={tasks} addNewTask={addNewTask}/>
        <TaskList tasks={tasks} deleteTask={deleteTask}/>
    </div>
    
}

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
)