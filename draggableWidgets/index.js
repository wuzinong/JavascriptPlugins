;(function(){

    var screen = document.querySelector(".dragContainer");
    var ele = document.querySelector(".ele1"); 
    var pos={
        "left":0,
        "top":0,
        "ele":null
    };
    screen.addEventListener("mousedown",function(event){
        console.log(event.target.getBoundingClientRect());
        if(event.target.className.indexOf("ele")>=0){
        pos.left = event.offsetX;
        pos.top =event.offsetY;
        pos.ele = event.target;
        console.log("mousedown");
     }
    },false);
    screen.addEventListener("mousemove",function(event){
        if(pos.ele !=null){
            pos.left = event.offsetX;
            pos.top = event.offsetY;
            pos.ele.style.left = pos.left+"px";
            pos.ele.style.top = pos.top+"px";
            // console.log("pos-left:"+event.offsetX);
            // console.log("pos-right:"+event.offsetY);
            console.log(event.target);
            console.log("moving");
        }
    });
    screen.addEventListener("mouseup",function(event){
        if(pos.ele !=null){
            pos.left = event.offsetX;
            pos.top = event.offsetY;
            pos.ele.style.left = pos.left+"px";
            pos.ele.style.top = pos.top+"px";
            pos.ele = null;
        }

    },false);
    document.addEventListener("dragstart",function(){
         console.log("elements drag start");
    },false);
    // document.addEventListener("drop",function(event){
    //     var target = event.target;
    //     var data = target.getBoundingClientRect();
    //     target.style.left = data.left;
    //     target.style.right = data.right;
    //     event.preventDefault(); 
    //     var a = this;
    //     console.log(this);
    //     console.log("elements drop now XXXXXXXXXXXXXXXX")
    // });
    // document.addEventListener("dragend",function(){
    //      console.log("elements drag end")
    // },false);
    // document.addEventListener("drag",function(){
    //      console.log("screen on drag now")
    // },false);
    // document.addEventListener("dragenter",function(){
    //      console.log("screen drag enter")
    // },false);
    // document.addEventListener("dragover",function(e){
    //     e.preventDefault();
    //      //console.log("screen drag over")
    // },false);
    // document.addEventListener("dragleave",function(){
    //     console.log("screen drag leave")
    // },false);
})(window);