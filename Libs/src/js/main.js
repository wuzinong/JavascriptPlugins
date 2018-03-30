import {addTouchEvent} from '../modules/touch';
import {addMouseEvent} from '../modules/move';
import {init} from '../modules/waterFall';


let container = document.querySelector("#container");

let createElements = (count)=>{
    let eleList = [];
    for(let i=0;i<count;i++){
        let div = document.createElement("div");
        div.className = "items";
        div.style.height = parseInt(Math.random()*200)+"px";
        div.style.backgroundColor = getRandomColor();
        eleList.push(div);
    }
    return eleList;
}

let getRandomColor = function(){    

    return (function(m,s,c){    
      return (c ? arguments.callee(m,s,c-1) : '#') +    
        s[m.floor(m.random() * 16)]    
    })(Math,'0123456789abcdef',5)    
  } 

init(container,createElements(10),200);


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
 

