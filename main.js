objects=[]
Value="";
Status="";
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
Value=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("model Loaded");
    Status=true;
}

function draw(){
    image(video,0,0,600,500);
    if(Status!=""){
objectDetector.detect(video,gotResult);

for(i=0; i<objects.length; i++){
    document.getElementById("status").innerHTML="Status: Objects Detected";
    percent=floor(objects[i].confidence*100);
    fill("red");
    text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
    noFill();
    stroke("red");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

if(objects[i].label=Value){
    video.stop();
    objectDetector.detect(gotResult);
    document.getElementById("object_status").innerHTML=objects[i].label+" found";
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(Value+"found");
    synth.speak(utterThis);
}
else{
    document.getElementById("object_status").innerHTML=objects[i].label+" not found";   
}
}

    }
}

function gotResult(error,results){
   if(error){
       console.log(error);

} 
else{
 console.log(results);
 objects=results;
}
}