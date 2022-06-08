const toggle = (id,assert) => {

    let el = document.getElementById(id)

    if(!assert){

        if(el.style.display == 'none'){

            document.getElementById(id).style.display = 'block'
        }
        else{

            document.getElementById(id).style.display = 'none'
        }
    }
    else{
        if(assert == 'on'){

            document.getElementById(id).style.display = 'block'
        }
        else if(assert =='off'){

            document.getElementById(id).style.display = 'none'
        }
    }
}