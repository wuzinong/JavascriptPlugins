
let options = {
    StartX:0,
    StartY:0,
    EndX:0,
    EndY:0,
    GapX:0,
    GapY:0,
    direction:"",
    IsMouseDown:false
}

function goDirection(){
    options.GapX = options.EndX - options.StartX;
    options.GapY = options.EndY - options.StartY; 

    if(Math.abs(options.GapX)<50 && Math.abs(options.GapY)<50)//移动距离过小则不做任何操作
    {
          return false;
    }
    else{
      if(Math.abs(options.GapX) > Math.abs(options.GapY)){//左右滑动
              if(options.GapX<0){
                      options.direction = "Left";
              }else{
                      options.direction = "Right";
              }
      }else{//上下滑动
            if(options.GapY<0){
                      options.direction = "Up";
              }else{
                      options.direction = "Down";
              }
      }
  }
}


 function addTouchEvent(ele,callback){
    ele.addEventListener("touchstart",function(e){
        options.IsMouseDown = true;
        options.StartX = e.targetTouches[0].pageX;
        options.StartY = e.targetTouches[0].pageY;
        e.preventDefault(); 

    });
    ele.addEventListener("touchmove",function(e){
        options.EndX  = e.changedTouches[0].pageX;
        options.EndY  = e.changedTouches[0].pageY;
        if(options.IsMouseDown){
            callback(options,event);
        } 
    });
    ele.addEventListener("touchend",function(e){
        options.IsMouseDown = false;
        options.EndX  = e.changedTouches[0].pageX;
        options.EndY  = e.changedTouches[0].pageY;
    });

    //goDirection();
    // switch(options.direction){
    //   case "Left":game.moveLeft();break;
    //   case "Up":game.moveUp();break;
    //   case "Right":game.moveRight();break;
    //   case "Down()":game.moveDown();break;
    //   default:break;
    // }
     

}


export {addTouchEvent}