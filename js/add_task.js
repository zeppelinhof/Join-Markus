function colorRed(){
    let btn = document.getElementById('btn_urgent');
    if(btn.classList.length>1){
        btn.classList.remove('button-red');
    }
    else{
        btn.classList.add('button-red');
    }
    document.getElementById('btn_medium').classList.remove('button-yellow');
    document.getElementById('btn_low').classList.remove('button-green');
}
function colorYellow(){
    let btn = document.getElementById('btn_medium');
    if(btn.classList.length>1){
        btn.classList.remove('button-yellow');
    }
    else{
        btn.classList.add('button-yellow');
    }
    document.getElementById('btn_urgent').classList.remove('button-red');
    document.getElementById('btn_low').classList.remove('button-green');
}
function colorGreen(){
    let btn = document.getElementById('btn_low');
    if(btn.classList.length>1){
        btn.classList.remove('button-green');
    }
    else{
        btn.classList.add('button-green');
    }
    document.getElementById('btn_urgent').classList.remove('button-red');
    document.getElementById('btn_medium').classList.remove('button-yellow');
}