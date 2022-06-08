const TopNav = () => {
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
        }
    }

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

const SettingsWindow = (props) => {

    const css = {
        windowMain: {
            margin: 'auto',
            width: '300px',
            paddingLeft:'5px'
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

    const submitHandler = (e) => {

        e.preventDefault()
    }

    const closeHandler = () => {

        toggle('settingsWindow')
        toggle('cover')
    }

    const changeHandler = (e) => {

        props.changeSetting(e.target.name,e.target.value)
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
                        <td style={{textAlign:'center'}}><input type="checkbox" name="alwaysOnTop" onClick={changeHandler} checked={props.settings.alwaysOnTop} value={props.settings.alwaysOnTop}/></td>
                    </tr>
                    <tr>
                        <td>Window size</td>
                        <td style={{textAlign:'center'}}>
                            <input style={{width:'50px'}} name="length" type="number" onClick={changeHandler} value={props.settings.length}/>
                            <span style={{paddingLeft:"5px",paddingRight:"5px",fontFamily:"Arial"}}>X</span>
                            <input style={{width:'50px'}} name="height" type="number" onClick={changeHandler} value={props.settings.height}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{fontSize:'12px',textAlign:'center'}} colspan="2">Restart app to apply changes</td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
}

const UpdateWindow = (props) => {

    const [latestVerion,setLatestVersion] = useState('No Internet')

    const css = {
        windowMain: {
            margin: 'auto',
            width: '200px',
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
        }
    }

    useEffect(() => {

        fetch('http://neu.binsinfotech.com')
        .then(data => data.text())
        .then(data => {

            let newData = JSON.parse(data)

            setLatestVersion(newData.tasks.latestVersion)
        })
    })

    const submitHandler = (e) => {

        e.preventDefault()
    }

    const closeHandler = () => {

        toggle('updateWindow')
        toggle('cover')
    }


    return <div style={css.updateWindow} id='updateWindow'>

        <button style={css.windowCloseBtn} onClick={closeHandler}>
            <img src="icons/cross.svg" />
        </button>
        
        <div style={css.windowMain}>

            <form onSubmit={submitHandler}>
                <table>
                    <tr>
                        <td>Current Version</td>
                        <td>1.1.0</td>
                    </tr>
                    <tr>
                        <td>Latest Version</td>
                        <td>{latestVerion}</td>
                    </tr>
                    <tr>
                        <td style={{textAlign:'center'}} colspan="2"><a style={css.downloadBtn} href="https://github.com/JebinBabu/Compressed/raw/main/tasks.zip">Download V{latestVerion}</a></td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
}