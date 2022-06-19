Neutralino.init()
const { useState,useEffect } = React
_init()

// comment this code during development
document.addEventListener('contextmenu', event => event.preventDefault());

const Main = (props) => {

    const [tasks,setTasks] = useState([])
    const [init,setInit] = useState(false)
    const [settings,setSettings] = useState({"alwaysOnTop":0,setSize:{"width":1387,"height":790}})
    const [latestVersion,setLatestVersion] = useState('1.1.1')
    const [currentVersion,setCurrentVersion] = useState('1.1.1')

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

            }).catch((err) => {

                if(err.code == 'NE_ST_NOSTKEX'){

                    _setData('settings',{"alwaysOnTop":0,setSize:{"width":1387,"height":790}})
                }
            })

            fetch('http://neu.binsinfotech.com')
            .then(data => data.text())
            .then(data => {

                let newData = JSON.parse(data)

                setLatestVersion(newData.tasks.latestVersion)
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
        
        newSettings[setting] = value

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
        <TopNav latestVersion = {latestVersion} currentVersion = {currentVersion}/>
        <SettingsWindow settings={settings} changeSetting={changeSetting}/>
        <UpdateWindow latestVersion = {latestVersion} currentVersion = {currentVersion}/>
        <TaskForm tasks={tasks} addNewTask={addNewTask}/>
        <TaskList tasks={tasks} deleteTask={deleteTask}/>
    </div>
    
}

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
)