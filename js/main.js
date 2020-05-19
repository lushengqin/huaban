var cvs = document.getElementById('canvas');
var context = cvs.getContext('2d');
var lineWidth =5
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
    // context.fillStyle="yellow";
    context.fill()
}

function drawLine(x1,y1,x2,y2){
    context.beginPath();
    // context.strokeStyle ="yellow"
    context.moveTo(x1,y1)
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}

// button 橡皮擦
var eraserEnabled = false
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    white.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}

white.onclick = function(){
    context.fillStyle = 'white'
    context.strokeStyle = 'white'
    black.classList.remove('active')
    white.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function () {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    black.classList.remove('active')
    green.classList.add('active')
    white.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    black.classList.remove('active')
    blue.classList.add('active')
    white.classList.remove('active')
    green.classList.remove('active')
}

thin.onclick = function (){
    lineWidth =4
}

thick.onclick = function () {
    lineWidth = 6
}

clear.onclick = function(){
    context.clearRect(0, 0, cvs.width,cvs.height)
}

download.onclick = function(){
    var url = cvs.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    // a.innerHTML ="wodehua"
    a.download= '我下载的画儿'
    a.target = "_blank"
    a.click()
    
}
//     var link = document.createElement("a");
//     link.innerHTML = 'fileName';
//     link.download = 'fileName.jpg';
//     link.href = imgUrl;
//     let evt = document.createEvent('MouseEvents');
//     evt.initEvent('click', true, true);
//     link.dispatchEvent(evt);
// }




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