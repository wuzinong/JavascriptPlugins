import {addTouchEvent} from '../modules/touch';
import {addMouseEvent,removeMouseEvent} from '../modules/move';
import {init} from '../modules/waterFall';


let container = document.querySelector("#container");

let createElements = (count,className)=>{
    let eleList = [];
    for(let i=0;i<count;i++){
        let div = document.createElement("div");
        div.className = "items";
        div.style.width = "200px";
        div.style.height = parseInt(Math.random()*200)+100+"px";
        div.style.backgroundColor = getRandomColor();
        div.style.position = "absolute";
        div.style.zIndex = 10;
        div.style.boxSizing = "border-box";
        div.className = className;
        div.innerText = i;
        div.setAttribute("data-index",i);
        eleList.push(div);
    }
    return eleList;
}

let getRandomColor = function(){    
    var r = Math.floor(Math.random() * 256); //随机生成256以内r值
    var g = Math.floor(Math.random() * 256); //随机生成256以内g值
    var b = Math.floor(Math.random() * 256); //随机生成256以内b值
    return `rgb(${r},${g},${b})`; //返回rgb(r,g,b)格式颜色 
  }  
let eleList = createElements(20,"items"); 
let elements = init(container,eleList,parseInt(eleList[0].style.width),4,10);

let moveCallback = (options,event)=>{
        var target = event.target;
        var targetWidth = getComputedStyle(target).width;
        var targetHeight = getComputedStyle(target).height;
        if(target.getAttribute("class")==="items"){ 
            let left = options.EndX-parseInt(targetWidth)/2+"px";
            let top = options.EndY-parseInt(targetHeight)/2+"px";
            
            target.style.left = left;
            target.style.top = top;
            
        }
}

let endCallback = (options,event)=>{
    var target = event.target;
    let dataIndex = target.getAttribute("data-index");
    for(let i=0,len=elements.length;i<len;i++){
        let temp = elements[i];  
        let tempLeft = parseInt(temp.style.left);
        let tempTop = parseInt(temp.style.top);
        let leftEdge = tempLeft+parseInt(temp.style.width);
        let topEdge= tempTop+parseInt(temp.style.height);
        if((tempLeft<options.EndX && options.EndX<leftEdge)&&(tempTop<options.EndY && options.EndY<topEdge) && i!=dataIndex){
            elements.splice(i,0,elements.splice(dataIndex,1)[0]);
            
            console.log("succeed")
            break;
        }
        elements = init(container,eleList,parseInt(eleList[0].style.width),4,10);
    }
}


var a = addMouseEvent(container,moveCallback,endCallback);
let add = document.querySelector("#add");
add.addEventListener("click",function(){
    console.log(a)
});

let remove = document.querySelector("#remove");
remove.addEventListener("click",function(){
    removeMouseEvent(container);
})


// const settings = {
//     target:document.querySelector("#test"),
//     body:document.querySelector("body")
// }

// let mouseCallBack = (options,event)=>{
//         var target = event.target;
//         var targetWidth = getComputedStyle(target).width;
//         var targetHeight = getComputedStyle(target).height;
//         if(target.getAttribute("id")==="test"){
//             console.log(target);
//             target.style.left = options.EndX-parseInt(targetWidth)/2+"px";
//             target.style.top = options.EndY-parseInt(targetHeight)/2+"px";
//         }
// }
 
// addTouchEvent(settings.body,mouseCallBack);
// addMouseEvent(settings.body,mouseCallBack);
 

