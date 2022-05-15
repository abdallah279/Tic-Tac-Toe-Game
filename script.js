// selecting all element
const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".playerX"),
selectBtnO = selectBox.querySelector(".playerO"),
playBoard = document.querySelector('.play-board'),
players = document.querySelector('.players'),
allBoxs = document.querySelectorAll('section span'),
resultBox = document.querySelector('.result-box'),
wonTxt = resultBox.querySelector('.won-text'),
replayBtn = resultBox.querySelector('.btn');

window.onload = ()=>{

    allBoxs.forEach((box)=>{
        box.setAttribute("onclick", "clickedBox(this)");
    });
    // for(let i=0; i < allBoxs.length; i++){
    //     allBoxs[i].setAttribute("onclick", "clickedBox(this)");
    // }

    selectBtnX.onclick = ()=>{
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
    }
    selectBtnO.onclick = ()=>{
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
        players.setAttribute("class", "players active player");
    }

}
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playSign = "x";
let runBot = true;

function clickedBox(element){
    if(players.classList.contains("player")){
        playSign = "o";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playSign);
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randomTime = Math.floor((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot(true);
    }, randomTime);
}

function bot(){
    if(runBot){
        let array = [];
        for(let i =0; i< allBoxs.length; i++){
            if(allBoxs[i].childElementCount == 0){
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){
            if(players.classList.contains("player")){
                playSign = "x";
                allBoxs[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.add("active");
                allBoxs[randomBox].setAttribute("id", playSign);
            }else{
                playSign = "o";
                allBoxs[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBoxs[randomBox].setAttribute("id", playSign);
            }
            selectWinner();
        }
        allBoxs[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playSign = "x";
    }
}

function getIdVal(className){
    return document.querySelector(".box" + className).id;
}

function checkIdSign(val1, val2, val3, sign){
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}

function selectWinner(){
    if(checkIdSign(1, 2, 3, playSign) || checkIdSign(4, 5, 6, playSign) || checkIdSign(7, 8, 9, playSign) || checkIdSign(1, 4, 7, playSign) || checkIdSign(2, 5, 8, playSign) || checkIdSign(3, 6, 9, playSign) || checkIdSign(1, 5, 9, playSign) || checkIdSign(3, 5, 7, playSign)){
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        wonTxt.innerHTML = `Player <p>${playSign}</p> won the game!`;
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);
            wonTxt.textContent = `Match has been drawn!`;
        }
    }
}

replayBtn.addEventListener("click", ()=>{
    window.location.reload();
})