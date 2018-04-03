let settings = {
    colPosition:[]
}

// function createDiv(){
//     let size = 200;
//     let div = document.createElement("div");
//     div.className = "items testItem";

//         div.style.width = size+"px";
//         div.style.height = size+"px";
  
//     //div.style.height = parseInt(Math.random()*200)+100+"px"; 
//     div.style.position = "absolute";
//     div.style.zIndex = 10;
//     div.style.boxSizing = "border-box"; 
//     div.innerText = "dsfsdfsdfsdf";
//     div.setAttribute("data-index",10); 
//     return div;
// }

function renderLayout(ele,i){
    ele.setAttribute("data-x",parseInt(ele.style.left));
    ele.setAttribute("data-y",parseInt(ele.style.top));
    ele.setAttribute("data-width",parseInt(ele.style.width));
    ele.setAttribute("data-height",parseInt(ele.style.height));
    ele.setAttribute("data-index",i);
    container.appendChild(ele);
}

function init(container,elements,itemWidth,paddingLeft,paddingTop){ 
    var containerStyle = getComputedStyle(container);
    var c_width = parseInt(containerStyle.width);
    var cycle = parseInt(c_width/itemWidth);
    var fragment = document.createDocumentFragment();
    for(let i=0,len=elements.length;i<len;i++){
        let ele = elements[i];
        if(ele){
            let preEle = elements[i-1];
            let preItemStyle = preEle && getComputedStyle(preEle);
            let itemStyle = getComputedStyle(ele);
            let i_height = itemStyle.height;
            let eleTimes = parseInt(ele.style.width)/itemWidth;

            if(i<cycle){
                if(i===0){
                    ele.style.top = 0+"px";
                    ele.style.left = paddingLeft+"px";
                }else{
                    ele.style.top = 0 + "px";
                    ele.style.left = paddingLeft+parseInt(preItemStyle.left)+itemWidth+"px";
                }
            }else{
                let preTopIndex = (i-cycle);
                    preEle = elements[preTopIndex]
                ele.style.top = parseInt(elements[preTopIndex].style.top)+parseInt(preEle.style.height)+paddingTop+"px";
                if(preTopIndex==0){
                  ele.style.left = paddingLeft+"px"; 
                }else{
                  ele.style.left = parseInt(preEle.style.left)+"px";
                }
            }
            renderLayout(ele,i);
        }
    }
    return elements;
}

export {init}