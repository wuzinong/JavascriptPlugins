function init(container,elements,itemWidth){ 
    var containerStyle = getComputedStyle(container);
    var c_width = parseInt(container.width);
    var cycle = parseInt(c_width/200);
    var fragment = document.createDocumentFragment();
    for(let i=0,len=elements.length;i<len;i++){
        let itemStyle = getComputedStyle(elements[i]);
        let i_height = itemStyle.height;
    }
}

export {init}