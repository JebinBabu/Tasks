const css = {
    topNav:{
        background: '#F8F9FA',
        position: 'fixed',
        top: '0px',
        width: '100%',
        textAlign: 'left',
        padding: '0px',
        zIndex:999
    },
        
    topNavLi:{
        cursor: 'pointer',
        fontSize: 'large',
        marginLeft: '-19px',
        marginBottom:'10px',
        listStyle:'none'
    },
    
    toggle:{
        background: 'none',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        fontSize: 'x-large',
        padding: '2px'
    },
    cover:{
        width:'100%',
        height:'100vh',
        background:'rgb(248,249,250)',
        display:'none',
    },
    windowMain: {
        margin: 'auto',
        width: '360px',
        paddingLeft:'5px'
    },
    updateWindow:{
        textAlign:'left',
        width: '100%',
        height: '100vh', 
        backgroundColor: 'rgb(248,249,250)',
        position: 'absolute',
        zIndex: 999,
        display:'none'
    },
    windowCloseBtn:{
        background: 'none',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        fontSize: 'large',
        padding:'2px',
        fontSize:'x-large'
    },
    downloadBtn:{
        textDecoration:'none',
        background:'#007BFF',
        color:'white',
        paddingTop:'5px',
        paddingBottom:'5px',
        paddingLeft:'9px',
        paddingRight:'9px',
        borderRadius:'3px'
    },
    settingsWindow:{
        textAlign:'left',
        width: '100%',
        height: '100vh', 
        backgroundColor: 'rgb(248,249,250)',
        position: 'absolute',
        zIndex: 999,
        display:'none'
    },
    windowCloseBtn:{
        background: 'none',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        fontSize: 'large',
        padding:'2px',
        fontSize:'x-large'
    }
}

const TopNav = (props) => {

    const openSettings = () => {

        toggle('NavElements')
        toggle('settingsWindow')
    }

    const openUpdate = () => {

        toggle('NavElements')
        toggle('updateWindow')
    }

    const toggleHandler = () => {

        toggle('NavElements')
        toggle('cover')
    }

    const updateHandler = () => {

        toggleHandler()
        openUpdate()
    }

    
    if(props.currentVersion == props.latestVersion){

        return <div style={css.topNav}>
            <button style={css.toggle} onClick={toggleHandler}>
                <img src="icons/menu-burger.svg" />
            </button>
            

            <div style={{display:'none'}} id="NavElements">
                <ul>
                    <li style={css.topNavLi} onClick={openSettings}>Settings</li>
                    <li style={css.topNavLi} onClick={openUpdate}>Update</li>
                </ul>
            </div>
            <div style={css.cover} id="cover"></div>
        </div>
    }
    else{

        return <div style={css.topNav}>
            <button style={css.toggle} onClick={toggleHandler}>
                <img src="icons/menu-burger.svg" />
            </button>
            
            <button style={css.toggle} onClick={updateHandler}>
                <img src="icons/exclamation.svg" />
            </button>

            <div style={{display:'none'}} id="NavElements">
                <ul>
                    <li style={css.topNavLi} onClick={openSettings}>Settings</li>
                    <li style={css.topNavLi} onClick={openUpdate}>Update</li>
                </ul>
            </div>
            <div style={css.cover} id="cover"></div>
        </div>
    }
}

const SettingsWindow = (props) => {


    const submitHandler = (e) => {

        e.preventDefault()
    }

    const closeHandler = () => {

        toggle('settingsWindow')
        toggle('cover')
    }

    const applyHandler = () => {

        location.reload()
    }

    const changeHandler = (e) => {

        let setting = e.target.name
        let value = e.target.value

        if(setting == 'alwaysOnTop'){
            props.changeSetting(setting,e.target.checked)
        }
        else if(setting == 'width'){
            
            props.changeSetting('setSize',{width:Number(value),height:props.settings.setSize.height})
        }
        else if( setting == 'height'){

            props.changeSetting('setSize',{height:Number(value),width:props.settings.setSize.width})
        }
        
    }

    return <div style={css.settingsWindow} id='settingsWindow'>

        <button style={css.windowCloseBtn} onClick={closeHandler}>
            <img src="icons/cross.svg" />
        </button>
        
        <div style={css.windowMain}>

            <form onSubmit={submitHandler}>
                <table>
                    <tr>
                        <td>Always On Top</td>
                        <td style={{textAlign:'center'}}><input type="checkbox" name="alwaysOnTop" onClick={changeHandler} checked={props.settings.alwaysOnTop}/></td>
                    </tr>
                    <tr>
                        <td>Window size</td>
                        <td style={{textAlign:'center'}}>
                            <input style={{width:'50px'}} name="width" type="number" onChange={changeHandler} value={props.settings.setSize.width}/>
                            <span style={{paddingLeft:"5px",paddingRight:"5px",fontFamily:"Arial"}}>X</span>
                            <input style={{width:'50px'}} name="height" type="number" onChange={changeHandler} value={props.settings.setSize.height}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{fontSize:'12px',textAlign:'left'}} colspan="2"><button onClick={applyHandler} style={css.downloadBtn}>Apply</button></td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
}

const UpdateWindow = (props) => {


    const submitHandler = (e) => {

        e.preventDefault()
    }

    const closeHandler = () => {

        toggle('updateWindow')
        toggle('cover')
    }

    if(props.currentVersion == props.latestVersion){

        return <div style={css.updateWindow} id='updateWindow'>

            <button style={css.windowCloseBtn} onClick={closeHandler}>
                <img src="icons/cross.svg" />
            </button>
            
            <div style={css.windowMain}>

                <form onSubmit={submitHandler}>
                    <table>
                        
                        <tr>
                            <td>Current Version</td>
                            <td>{props.currentVersion}</td>
                        </tr>
                        <tr>
                            <td colspan="2">What's New</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <ul>
                                    <li>More window settings</li>
                                    <li>Minor performance tweaks</li>
                                </ul>
                            </td>
                        </tr>

                    </table>
                </form>
            </div>
        </div>
    }
    else{
        return <div style={css.updateWindow} id='updateWindow'>

        <button style={css.windowCloseBtn} onClick={closeHandler}>
            <img src="icons/cross.svg" />
        </button>
        
        <div style={css.windowMain}>

            <form onSubmit={submitHandler}>
                <table>
                    <tr>
                        <td style={{textAlign:'left'}} colspan="2"><a style={css.downloadBtn} href="https://github.com/JebinBabu/Compressed/raw/main/tasks.zip">Download V{props.latestVersion}</a></td>
                    </tr>
                    <tr>
                        <td>Current Version</td>
                        <td>{props.currentVersion}</td>
                    </tr>
    
                </table>
            </form>
        </div>
    </div>
    }
}