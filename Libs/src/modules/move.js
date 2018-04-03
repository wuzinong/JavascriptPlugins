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

function boundFunction(obj,fn){
    return function(){ 
        fn.apply(obj,[arguments]);
    }
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

function removeMouseEvent(ele){
    debugger
    ele.removeEventListener("mousedown",function(event){
        event.preventDefault();
    });
    ele.removeEventListener("mousemove",function(){
        event.preventDefault();
    });
    ele.removeEventListener("mouseup",function(){
        event.preventDefault();
    });
}

export {addMouseEvent,removeMouseEvent}