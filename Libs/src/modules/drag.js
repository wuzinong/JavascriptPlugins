
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

//About drag event:
//https://developer.mozilla.org/zh-CN/docs/Web/Events/drag

function addDragEvent(ele,moveCallback,endCallback){ 
    let eleStyle = getComputedStyle(ele);
    let eleLeft = parseInt(eleStyle.left)+parseInt(eleStyle.marginLeft)+parseInt(eleStyle.paddingLeft);
    let eleTop = parseInt(eleStyle.top)+parseInt(eleStyle.marginTop)+parseInt(eleStyle.paddingTop);
    
    let myTarget = null;
    
    let mouseDownFunc = function(event){
        let eleStyle = getComputedStyle(ele);
        let eleLeft = parseInt(eleStyle.left)+parseInt(eleStyle.marginLeft)+parseInt(eleStyle.paddingLeft);
        let eleTop = parseInt(eleStyle.top)+parseInt(eleStyle.marginTop)+parseInt(eleStyle.paddingTop);
        options.IsMouseDown = true;
        options.StartX = event.pageX-eleLeft;
        options.StartY = event.pageY-eleTop;
        console.log(options.StartX+"-"+options.StartY);
        myTarget = event.target; 
    } 

    

    let mouseMoveFunc = function(event){
        options.EndX = event.pageX-eleLeft;
        options.EndY = event.pageY-eleTop;
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
        options.EndX = event.pageX-eleLeft;
        options.EndY = event.pageY-eleTop; 

        options.GapX = options.EndX - options.StartX;
        options.GapY = options.EndY - options.StartY;

        endCallback(options,event);
    }
    if(!options.isListening){
        options.isListening = true;
        ele.addEventListener("dragstart",mouseDownFunc);
        ele.addEventListener("drag",mouseMoveFunc);
        ele.addEventListener("dragend",mouseUpFunc);
        return {
            remove:function(){
                options.isListening = false;
                ele.removeEventListener("dragstart",mouseDownFunc);
                ele.removeEventListener("drag",mouseMoveFunc);
                ele.removeEventListener("dragend",mouseUpFunc);
            }
        }
    }
    
}


export {addDragEvent}