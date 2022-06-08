

const TaskList = (props) => {

    const deleteHandler = (e) => {

        props.deleteTask(e.target.id)
    }

    return <div>

        <hr/>
        <table class="tasksTable">
            <tbody>
                {
                    props.tasks.map((task) => {

                        if(task.date && task.time){

                            return <tr key={task.id}>
                                <td style={{textAlign:'left'}}>{task.subject}</td>

                                <td className='' style={{textAlign:'left',fontSize:'13px',width:'85px'}}>
                                    <span style={{color:'#8b8b8b',marginRight:'3px'}}><ion-icon name="calendar"></ion-icon></span>{task.date}<br/>
                                    <span style={{color:'#8b8b8b',marginRight:'3px'}}><ion-icon name="alarm"></ion-icon></span>{task.time}
                                </td>

                                <td className='' style={{width:'5px'}}><button id={task.id} onClick={deleteHandler}><img src="icons/trash.svg" /></button></td>
                            </tr>
                        }
                        else if(task.date){
                            return <tr key={task.id}>
                                <td style={{textAlign:'left'}}>{task.subject}</td>

                                <td className='' style={{textAlign:'left',fontSize:'13px',width:'85px'}}>
                                    <span style={{color:'#8b8b8b',marginRight:'3px'}}>date</span>{task.date}
                                </td>

                                <td className='' style={{width:'5px'}}><button id={task.id} onClick={deleteHandler}><img src="icons/trash.svg" /></button></td>
                            </tr>
                        }
                        else if(task.time){
                            return <tr key={task.id}>
                                <td style={{textAlign:'left'}}>{task.subject}</td>

                                <td className='' style={{textAlign:'left',fontSize:'13px',width:'85px'}}>
                                    <span style={{color:'#8b8b8b',marginRight:'3px'}}>time</span>{task.time}
                                </td>

                                <td className='' style={{width:'5px'}}><button id={task.id} onClick={deleteHandler}><img src="icons/trash.svg" /></button></td>
                            </tr>
                        }
                        else{
                            return <tr key={task.id}>
                                <td style={{textAlign:'left'}}>{task.subject}</td>

                                <td className='' style={{textAlign:'left',fontSize:'13px',width:'85px'}}>
                                    
                                </td>

                                <td className='' style={{width:'5px'}}><button id={task.id} onClick={deleteHandler}><img src="icons/trash.svg" /></button></td>
                            </tr>
                        }
                    })
                }
            </tbody>
        </table>
    </div>
}