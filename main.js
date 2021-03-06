var canvas = document.getElementById("canvas");
var lineWidth = 5;
var defaultColor = "black";
pageWidthAndHeight(canvas);
window.onresize=function(){
    pageWidthAndHeight(canvas);
}

var ctx = canvas.getContext('2d');
var using = false;
var eras = false;
eraser.onclick=function(){
    eras = true;
    pen.classList.remove('active');
    eraser.classList.add('active');
}
pen.onclick=function(){
    ctx.fillStyle=defaultColor;
    ctx.strokeStyle=defaultColor;
    ctx.lineWidth= lineWidth;
    eras = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
}
black.onclick=function(){
    ctx.fillStyle="black";
    ctx.strokeStyle="black";
    black.classList.add('selected');
    red.classList.remove('selected');
    green.classList.remove('selected');
    yellow.classList.remove('selected');
    defaultColor = "black";
    pen.classList.add('active');
    eraser.classList.remove('active');
}
red.onclick=function(){
    ctx.fillStyle="red";
    ctx.strokeStyle="red";
    red.classList.add('selected');
    black.classList.remove('selected');
    green.classList.remove('selected');
    yellow.classList.remove('selected');
    defaultColor = "red";
    pen.classList.add('active');
    eraser.classList.remove('active');
}
green.onclick=function(){
    ctx.fillStyle="green";
    ctx.strokeStyle="green";
    green.classList.add('selected');
    red.classList.remove('selected');
    black.classList.remove('selected');
    yellow.classList.remove('selected');
    defaultColor = "green";
    pen.classList.add('active');
    eraser.classList.remove('active');
}
yellow.onclick=function(){
    ctx.fillStyle="yellow";
    ctx.strokeStyle="yellow";
    yellow.classList.add('selected');
    red.classList.remove('selected');
    green.classList.remove('selected');
    black.classList.remove('selected');
    defaultColor = "yellow";
    pen.classList.add('active');
    eraser.classList.remove('active');
}
clear.onclick=function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
thin.onclick=function(){
    lineWidth = 3;
}
nomal.onclick=function(){
    lineWidth = 5;
}
thick.onclick=function(){
    lineWidth = 10;
}

download.onclick=function(){
    var href=canvas.toDataURL("image/png");
    var a = document.createElement('a');
    canvas.appendChild(a);
    a.href = href;
    a.download="我的画板";
    a.target="_blank";
    a.click();
}


var lastPoint={
    "x":undefined,
    "y":undefined
}

if(document.body.ontouchstart!==undefined){
    canvas.ontouchstart=function(a){
        var x=a.touches[0].clientX;
        var y=a.touches[0].clientY;
        if(eras){
            lastPoint2={
                "x":x,
                "y":y
            }
            using=true;
        }
        else{
            using=true;
            lastPoint={
                "x":x,
                "y":y
            }
        }
    }
    canvas.ontouchmove=function(a){
        var x=a.touches[0].clientX;
        var y=a.touches[0].clientY;
        var newPoint={
                "x":x,
                "y":y
            }
        if(using){
            if(eras){
                
                clipLine(lastPoint2.x,lastPoint2.y,newPoint.x,newPoint.y);
                lastPoint2=newPoint;
            }
            else{
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
            lastPoint=newPoint;
            } 
        }
    }
    canvas.ontouchend=function(){
        using=false;
        eras=false;
    }
}
else{
    canvas.onmousedown=function (a){ 
        var x=a.clientX;
        var y=a.clientY;
        if(eras){
            
            using=true;
            lastPoint2={
                "x":x,
                "y":y
            }
        }
        else{
            using=true;
            lastPoint={
                "x":x,
                "y":y
            }
        }  
    }

    canvas.onmousemove=function(a){
        var x=a.clientX;
        var y=a.clientY;
        var newPoint={
            "x":x,
            "y":y
        }
        if(using){
            if(eras){
                
                clipLine(lastPoint2.x,lastPoint2.y,newPoint.x,newPoint.y);
                lastPoint2=newPoint;
            }
            else{
            
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
            lastPoint=newPoint;
            } 
        }
    }

    canvas.onmouseup=function(){
        using=false;
        eras=false;
    }
}
function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineWidth= lineWidth;
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}
function clipLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.fillStyle="#CDD7E6";
    ctx.strokeStyle="#CDD7E6";
    ctx.lineWidth= 7;
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
    
}
function pageWidthAndHeight(canvas){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}
