let startGame = document.querySelector(".start")
let button = document.querySelector("button")
let name = document.querySelector("input")
let userName = ""

let blockat = Array.from(document.querySelectorAll(".img-game .block"))
let orderNum = [...Array(blockat.length).keys()]
let timer = document.getElementById("timer");
timer.style.display = "none"

let blockGame = document.querySelector(".img-game") 

let counter = 0
let end = document.createElement("div")
end.innerHTML = "congratulation"
end.classList.add("endMassage")

let again = document.createElement("button")
again.innerHTML= "play again"


button.addEventListener("click", click)
again.onclick = function(){
    location.reload()
}

function click(){
    document.querySelector(".name span").innerHTML = ""
    userName = name.value
    if(userName == ""| userName == " "){
        document.querySelector(".name span").appendChild(document.createTextNode("unKnown"))
    }else{
        document.querySelector(".name span").appendChild(document.createTextNode(userName))
    }
    document.querySelector(".start div").style.display = "none"
    timer.style.display = "block"

    function time() {
    document.getElementById("down").play()
    timer.innerHTML --;
    if ( timer.innerHTML === "0") { 
        clearInterval(count);
        timer.style.display = "none"
        startGame.style.display = "none"
    }
}
    let count = setInterval(time, 1500);
    
    
    setTimeout(() => {
        function countMint (){ 
            document.querySelector(".time .ment").innerHTML-- 
            if(document.querySelector(".time .ment").innerHTML == 0){
                clearInterval(stop)
            }
        }
        let stop = setInterval(countMint, 1000 * 59);
        function countSec (){
            document.querySelector(".time .second").innerHTML--
            if(document.querySelector(".time .second").innerHTML == 0){
                document.querySelector(".time .second").innerHTML = 59
            } 
        }    
        let num = 0
            stopSec = setInterval(function() {
                countSec() 
                num++
                if (num === 2 * 58) {
                    clearInterval(stopSec);
                }
            }, 1000);
        document.getElementById("background").play()
    }, 1500 * 5);
}
shuffle(orderNum)

blockat.forEach(function(ele, index){
    ele.style.order = orderNum[index]
    ele.addEventListener("click" ,function(){
        flipBlock(ele);
    })
})

function shuffle(array){
    let current = array.length,
    temp,
    random;

    while(current > 0){
        random = Math.floor(Math.random() * current)
        current--

        temp = array[current]

        array[current] = array[random]

        array[random] = temp
    }
}

function flipBlock(ele){

    ele.classList.add("rotate")

    let allRotate = blockat.filter(el => el.classList.contains('rotate'));

    if (allRotate.length == 2){
        stopClick()
        chickBlock(allRotate[0],allRotate[1])
    }
}

function stopClick(){
    blockGame.classList.add("stopClick")

    setTimeout(function(){
        blockGame.classList.remove("stopClick")
    },1000)
}
function chickBlock(firstBlock,secondBlock){
    if (firstBlock.dataset.game == secondBlock.dataset.game){

        firstBlock.classList.remove("rotate")
        secondBlock.classList.remove("rotate")

        firstBlock.classList.add("rota")
        secondBlock.classList.add("rota")
        counter += 2
        if (counter == blockat.length){
            document.getElementById("background").pause()
            document.getElementById("end").play()
            document.querySelector(".start").style.display ="block" 
            document.querySelector(".content1").style.display ="none" 
            end.appendChild(again)
            document.querySelector(".start").appendChild(end)
        }
    }else{
        document.querySelector(".wrong span").innerHTML++

        setTimeout(()=>{
            firstBlock.classList.remove("rotate")
            secondBlock.classList.remove("rotate")
        },1000)
    }
}