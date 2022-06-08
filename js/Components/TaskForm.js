const TaskForm = (props) => {

    const [newSubject,setNewSubject] = useState('')
    const [newDate,setNewDate] = useState('')
    const [newTime,setNewTime] = useState('')

    const subjectChangeHandler = (e) => {

        setNewSubject(e.target.value)
    }

    const dateChangeHandler = (e) => {

        setNewDate(e.target.value)
    }

    const timeChangeHandler = (e) => {

        setNewTime(e.target.value)
    }

    const enableDateTime = () => {
        toggle('dateTimeBox')
    }

    const submitHandler = (e) => {

        e.preventDefault()

        let newId

        if(props.tasks.length > 0){

            newId =  props.tasks[props.tasks.length-1].id + 1
        }
        else{

            newId = 1
        }

        let newTask = {
            id:newId,
            subject:newSubject,
            date:newDate,
            time:newTime
        }

        props.addNewTask(newTask)

        setNewSubject('')
        setNewDate('')
        setNewTime('')
        toggle('dateTimeBox','off')
        
    }

    return <div>
        <form onSubmit={submitHandler}>
            <div className="formBox">
                <input type="text" className="subjectBox" placeholder="New Task.." value={newSubject} onChange={subjectChangeHandler}/>
                <div style={{display:'none'}} id="dateTimeBox">
                    <input type="date" className="datePicker" value={newDate} onChange={dateChangeHandler}/>
                    <input type="time" className="timePicker" value={newTime} onChange={timeChangeHandler}/>
                </div>
                <button type="button" className="deadlineBtn" onClick={enableDateTime}><img src="icons/calendar.svg" /></button>
                <button type="submit" className="addBtn"><img src="icons/plus.svg" /></button>
            </div>
        </form>
    </div>
}