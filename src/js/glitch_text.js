window.onload = function() {


const cols = document.querySelectorAll('.glitch.text.split-effect');

[].forEach.call(cols, (e)=>{
 console.log(e);

 var glitchSplitcanvas = document.createElement('canvas')
 var glitchSplitchCtx = glitchSplitcanvas.getContext('2d')
 var glitchSplitchShown = e
 var glitchSplitchCtxShown = glitchSplitchShown.getContext('2d')



 function init() {
    glitchSplitcanvas.width = glitchSplitchShown.width
    glitchSplitcanvas.height = glitchSplitchShown.height



    glitchSplitchCtx.clearRect(0, 0, glitchSplitchCtx.width, glitchSplitchCtx.height)
    glitchSplitchCtx.textAlign = 'center'
    glitchSplitchCtx.textBaseLine = 'middle'
    glitchSplitchCtx.font = e.dataset.font+' serif'
    glitchSplitchCtx.fillStyle = e.dataset.color;


    glitchSplitchCtx.fillText(e.dataset.text, glitchSplitcanvas.width/2, glitchSplitcanvas.height/2)

    glitchSplitchCtxShown.clearRect(0, 0, glitchSplitchShown.width, glitchSplitchShown.height)
    glitchSplitchCtxShown.drawImage(glitchSplitcanvas, 0, 0)
    var i = 10; while(i--){ glitch() }
 }

 function glitch() {
    var width = 100 + Math.random()*100
    var height = 50 + Math.random()*50

    var x = Math.random()*glitchSplitcanvas.width
    var y = Math.random()*glitchSplitcanvas.height

    var dx = x + (Math.random() * 40 - 20)
    var dy = y + (Math.random() * 30 - 15)

    glitchSplitchCtxShown.clearRect(x, y, width, height)
    glitchSplitchCtxShown.fillStyle = '#4a6';
    //glitchSplitchCtxShown.fillRect(x, y, width, height)
    glitchSplitchCtxShown.drawImage(glitchSplitcanvas, x, y, width, height, dx, dy, width, height)
 }

 setInterval(function() {
     init()
 }, 1000/15)


});




}
