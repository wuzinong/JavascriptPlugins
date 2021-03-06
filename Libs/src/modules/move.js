import {throttle,debounce} from '../modules/commonTool';

let options ={
    StartX:0,
    StartY:0,
    EndX:0,
    EndY:0,
    GapX:0,
    GapY:0,
    IsMouseDown:false,
    isListening:false
}

function addMouseEvent(ele,moveCallback,endCallback){ 
    let eleStyle = getComputedStyle(ele);
    let eleLeft = parseInt(eleStyle.left)+parseInt(eleStyle.marginLeft)+parseInt(eleStyle.paddingLeft);
    let eleTop = parseInt(eleStyle.top)+parseInt(eleStyle.marginTop)+parseInt(eleStyle.paddingTop);
    
    let myTarget = null;
    
    let mouseDownFunc = function(event){
        let eleStyle = getComputedStyle(ele);
        let eleLeft = parseInt(eleStyle.left)+parseInt(eleStyle.marginLeft)+parseInt(eleStyle.paddingLeft);
        let eleTop = parseInt(eleStyle.top)+parseInt(eleStyle.marginTop)+parseInt(eleStyle.paddingTop);
        options.IsMouseDown = true;
        options.StartX = event.clientX-eleLeft;
        options.StartY = event.clientY-eleTop;
        console.log(options.StartX+"-"+options.StartY);
        myTarget = event.target; 
    } 

    

    let mouseMoveFunc = function(event){
        options.EndX = event.clientX-eleLeft;
        options.EndY = event.clientY-eleTop;
        let tempTarget = event.target;
        if(options.IsMouseDown){
            if(myTarget === tempTarget){
                event.target.style.zIndex = 100;
                moveCallback(options,event);
            }else{
            }
        } 
    }

    let mouseUpFunc = function(event){
        event.target.style.zIndex = 10;
        options.IsMouseDown = false; 
        options.EndX = event.clientX-eleLeft;
        options.EndY = event.clientY-eleTop; 

        options.GapX = options.EndX - options.StartX;
        options.GapY = options.EndY - options.StartY;

        endCallback(options,event);
    }
    if(!options.isListening){
        options.isListening = true;
        ele.addEventListener("mousedown",mouseDownFunc);
        ele.addEventListener("mousemove",mouseMoveFunc);
        ele.addEventListener("mouseup",mouseUpFunc);
        return {
            remove:function(){
                options.isListening = false;
                ele.removeEventListener("mousedown",mouseDownFunc);
                ele.removeEventListener("mousemove",mouseMoveFunc);
                ele.removeEventListener("mouseup",mouseUpFunc);
            }
        }
    }
    
}


export {addMouseEvent}