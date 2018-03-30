let options ={
    StartX:0,
    StartY:0,
    EndX:0,
    EndY:0,
    GapX:0,
    GapY:0,
    IsMouseDown:false
}


function addMouseEvent(ele,callback){ 
    ele.addEventListener("mousedown",function(event){
        options.IsMouseDown = true;
        options.StartX = event.pageX;
        options.StartY = event.pageY;
    });

    ele.addEventListener("mousemove",function(event){
        options.EndX = event.pageX;
        options.EndY = event.pageY;
        
        if(options.IsMouseDown){
            callback(options,event);
        }   
    });

    ele.addEventListener("mouseup",function(event){
        options.IsMouseDown = false;
        // console.log(event.pageX+"-"+event.pageY);
      options.EndX = event.pageX;
      options.EndY = event.pageY;

      options.GapX = options.EndX - options.StartX;
      options.GapY = options.EndY - options.StartY;
  });
}

export {addMouseEvent}