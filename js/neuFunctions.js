async function _init(){

    _getData('settings').then((settings) => {

        for (let setting in settings) {
            
            _window(setting,settings[setting])
        }

    })
    
    await Neutralino.window.show();


}

async function _setData(id,data){

    await Neutralino.storage.setData(id,JSON.stringify(data));
}

async function _getData(id){

    let data = await Neutralino.storage.getData(id);

    return JSON.parse(data)
}


async function _window(setting,value){

    switch (setting) {
        case 'alwaysOnTop':
            await Neutralino.window.setAlwaysOnTop(value)
            break;

        case 'setSize':
            await Neutralino.window.setSize(value)
            break;
    
        default:
            break;
    }
}


