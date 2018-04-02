let settings = {
    colPosition:[]
}

function init(container,elements,itemWidth,paddingLeft,paddingTop){ 
    var containerStyle = getComputedStyle(container);
    var c_width = parseInt(containerStyle.width);
    var cycle = parseInt(c_width/itemWidth);
    var fragment = document.createDocumentFragment();
    for(let i=0,len=elements.length;i<len;i++){
        let ele = elements[i];
        let preEle = elements[i-1];
        let preItemStyle = preEle && getComputedStyle(preEle);
        let itemStyle = getComputedStyle(ele);
        let i_height = itemStyle.height;
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
        ele.setAttribute("data-x",parseInt(ele.style.left));
        ele.setAttribute("data-y",parseInt(ele.style.top));
        ele.setAttribute("data-width",parseInt(ele.style.width));
        ele.setAttribute("data-height",parseInt(ele.style.height));
        ele.setAttribute("data-index",i);
        container.appendChild(ele);
    }
    return elements;
}

export {init}