const canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");
const toolsBtn = document.querySelectorAll(".tool");
const fillColor  = document.querySelector("#fill-color");
const sizeSlider = document.querySelector("#size-slider");
//gloabl variables with default values  
let prevMouseX, prevMouseY;
let isDrawing = false;
brushwidth = 5 ;
selectedTool = "brush";



window.addEventListener("load",()=>{
    //setting canvas width/height.. offsetwidth/height returns viewable  width/height of an element   
    canvas.width = canvas.offsetWidth ;
    canvas.height = canvas.offsetHeight;
});

const startDraw = (e)=>{
     isDrawing = true;
     prevMouseX = e.offsetX;
     prevMouseY = e.offsetY;
     ctx.beginPath(); //creating a new path to draw
     ctx.lineWidth = brushwidth;
     snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);
     //copying the canvas  data and  passing as snapshot value 
    //  this avoid dragging the image 

}
const drawRect = (e) =>{
    if(!fillColor.checked){
        return ctx.strokeRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX , prevMouseY-e.offsetY) ; 
        // strokeRect(xcoordinate,ycoordinate,width,height)    
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

const drawCircle = (e) => {
    ctx.beginPath();
    // getting radius of the circle according to the mouse pointer 
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX,prevMouseY,radius,0,2*Math.PI)
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    if (!fillColor.checked) {
        ctx.stroke()    ;
    }else {
        ctx.fill();
    }
    
}
const drawTriangle = (e)=>{
    ctx.beginPath();
    ctx.moveTo(prevMouseX,prevMouseY);// moving triangle to the mouse pointer 
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.lineTo(prevMouseX*2 - e.offsetX,e.offsetY);//creating bottom line of the traingle 
    ctx.closePath();// closing path of a triangle so third line draw automatically 
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const stopDraw = () =>{
    isDrawing = false;
}

const drawing = (e) => {
    if(!isDrawing) return ; // if isDrawing is true return from here 
    ctx.putImageData(snapshot,0,0); //adding copied canvas data on to the canvas
    if(selectedTool==="brush"){
        ctx.lineTo(e.offsetX,e.offsetY);
       //  offsetX and offsetY returns x and y coordinate of the mouse pointer 
       ctx.stroke(); //drawing/filing line with color 
    } else if(selectedTool === "rectangle"){
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else if (selectedTool === "triangle") {
        drawTriangle(e);
    } 
    


}
toolsBtn.forEach(btn => {
    btn.addEventListener("click",()=> {
        //adding the click event  to all  option 
        //removing active class from the   previous  option  and adding on current clicked option 
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool=btn.id;
        console.log(selectedTool);
    })
} );

sizeSlider.addEventListener("change",()=> brushwidth = sizeSlider.value);
canvas.addEventListener("mousedown",startDraw); 
canvas.addEventListener("mousemove",drawing);   
canvas.addEventListener("mouseup", stopDraw);   