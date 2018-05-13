var canvas = document.getElementById("canvas");
var pageWidth = document.documentElement.clientWidth;
var pageHeight = document.documentElement.clientHeight;
canvas.width = pageWidth;
canvas.height = pageHeight;
window.onresize=function(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}
var ctx = canvas.getContext('2d');
var using = false;
var lastPoint={
    "x":undefined,
    "y":undefined
};

canvas.onmousedown=function (a){
    using=true;
    var x=a.clientX;
    var y=a.clientY;
    lastPoint={
        "x":x,
        "y":y
    }     
}
canvas.onmousemove=function(a){
    if(using){
        var x=a.clientX;
        var y=a.clientY;
        var newPoint={
            "x":x,
            "y":y
        }
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint=newPoint;
    }
}

canvas.onmouseup=function(){
    using=false;
}
function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineWidth= 5;
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}
