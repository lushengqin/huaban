
var cvs = document.getElementById('canvas');
var context = cvs.getContext('2d');
//获取页面宽高
aotoPageWidthAndHeight(cvs)
/**** */
listenToUser(cvs)
function listenToUser(canvas){

    var using = false
    var lastPoint = { x: undefined, y: undefined }

    //特性检测
    if(document.body.ontouchstart !== undefined){
        //触屏设备
        canvas.ontouchstart = function(a){
           var x= a.touches[0].clientX;
           var y= a.touches[0].clientY
           using = true
           if(eraserEnabled){
               context.clearRect(x-5,y-5,10,10)
           }else{
               lastPoint={x:x,y:y}
           }
        }
        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (!using) {
                return;
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { "x": x, "y": y }
                drawCircle(x, y, 2)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function (a) {
            using = false
        }
    }else{
        //非触屏设备
        canvas.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            using = true
            if (eraserEnabled){
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { "x": x, "y": y }
                // drawCircle(x,y,2)
            }
        }
        canvas.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (!using) {
                return;
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { "x": x, "y": y }
                drawCircle(x, y, 2)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
    
}



function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle="yellow";
    context.fill()
}

function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.strokeStyle ="yellow"
    context.moveTo(x1,y1)
    context.lineWidth = 5
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}

// button 橡皮擦
var eraserEnabled = false
eraser.onclick=function(){
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}

//
function aotoPageWidthAndHeight(cvs) {
    PageWidthAndHeight()

    window.onresize = function () {
        PageWidthAndHeight()
    }

    function PageWidthAndHeight() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        cvs.width = pageWidth
        cvs.height = pageHeight
    }
}