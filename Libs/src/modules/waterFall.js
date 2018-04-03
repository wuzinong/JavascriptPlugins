let settings = {
    colPosition:[]
}


function renderLayout(ele,i){
    ele.setAttribute("data-x",parseInt(ele.style.left));
    ele.setAttribute("data-y",parseInt(ele.style.top));
    ele.setAttribute("data-width",parseInt(ele.style.width));
    ele.setAttribute("data-height",parseInt(ele.style.height));
    ele.setAttribute("data-index",i);
    container.appendChild(ele);
}

function getRealPreElement(elements,i,cycle){
    let tempIndex = i-cycle;
    if(elements[tempIndex]===false){//相邻元素返回前面一个
       return {
           ele:elements[tempIndex-1],
           index:(tempIndex-1),
           mark:1
       };
    }

    if(elements[tempIndex]){
        return {
                ele:elements[tempIndex],
                index:(tempIndex)
            };
    }else{
        if(tempIndex>=cycle){
            return getRealPreElement(elements,tempIndex,cycle)
        }else{
            return null;
        }
        
    }
   
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

            // if(i<cycle){
            //     if(i===0){
            //         ele.style.top = 0+"px";
            //         ele.style.left = paddingLeft+"px";
            //     }else{
            //         ele.style.top = 0 + "px";
            //         ele.style.left = paddingLeft+parseInt(preItemStyle.left)+itemWidth+"px";
            //     }
            // }else{
            //     let preTopIndex = (i-cycle);
            //         preEle = elements[preTopIndex]
            //     ele.style.top = parseInt(elements[preTopIndex].style.top)+parseInt(preEle.style.height)+paddingTop+"px";
            //     if(preTopIndex==0){
            //       ele.style.left = paddingLeft+"px"; 
            //     }else{
            //       ele.style.left = parseInt(preEle.style.left)+"px";
            //     }
            // }

            if(i<cycle){
                if(i===0){
                    ele.style.top = 0+"px";
                    ele.style.left = paddingLeft+"px";
                    if( parseInt(eleTimes) === 2){
                       
                        elements.splice(i+1,0,false);
                        elements.splice(cycle-i,0,null,null);
                        i++; //跳过false的 
                    }
                }else{
                    if(preEle){
                        ele.style.top = 0 + "px";
                        ele.style.left = paddingLeft+parseInt(preItemStyle.left)+itemWidth+"px";
                        //ele.style.left = i*(itemWidth+paddingLeft)+"px";
                        if( parseInt(eleTimes) === 2){
                            i++; //跳过null的 
                            elements.splice(i,0,false);//被影响到的地方占坑
                            elements.splice(i+cycle-1,0,null,null)
                        }
                    }else{//false 的情况
                        ele.style.top = 0 + "px";
                        ele.style.left = paddingLeft+parseInt(elements[i-2].style.left)+parseInt(elements[i-2].style.width)+"px";
                    }
                }

                renderLayout(ele,i)
            }else{
                if(i==8){
                    debugger
                }
                let preEleObj = getRealPreElement(elements,i,cycle);
                
                if(preEleObj){
                  let preEle = preEleObj.ele;
                  let preTopIndex = preEleObj.index;
                  if(preTopIndex==0){
                    if(preEleObj.mark){//top一致，但是left得根据其前面一个元素来确定
                        ele.style.left = parseInt(elements[i-1].style.left)+parseInt(elements[i-1].style.width)+paddingLeft+"px";
                    }else{
                        ele.style.left = paddingLeft+"px"; 
                    }        
                  }else{
                    if(preEleObj.mark){//top一致，但是left得根据其前面一个元素来确定
                        ele.style.left = parseInt(elements[i-1].style.left)+parseInt(elements[i-1].style.width)+paddingLeft+"px";
                        //ele.style.left = (i%cycle)*(itemWidth+paddingLeft)+"px";
                    }else{
                        ele.style.left = parseInt(preEle.style.left)+"px";
                    }          
                  }

                  if( parseInt(eleTimes) === 2){
                    i++; //跳过null的 
                    //let ttt = document.createElement("div").className="testItem"
                    elements.splice(i,0,false);//被影响到的地方占坑
                    elements.splice(i+cycle-1,0,null,null)
                  }

                  ele.style.top = parseInt(elements[preTopIndex].style.top)+parseInt(preEle.style.height)+paddingTop+"px";
                  renderLayout(ele,i);
                  
                }
            }

            

        }
    }
    return elements;
}

export {init}