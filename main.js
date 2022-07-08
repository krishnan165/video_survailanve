video="";
status="";
objects=[];
function preload()
{
   video=createVideo("video.mp4");
   video.hide();
}

function setup()
{
   canvas=createCanvas(480,380);
   canvas.center();

   
}

function start()
{
    objectdetect=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting";
}

function modelLoaded()
{
   console.log("model is loading");
   status=true;
   video.speed(1);
   video.volume(0);
   console.log(status);
   video.loop();
}

function gotResults(error,results)
{
  if(error)
  {
   console.log(error);
  }
  else
  {
   console.log(results);
   objects=results;
  }
}

function draw()
{
   image(video,0,0,480,380);
   if (status != "")
   {
      objectdetect.detect(video,gotResults);

      for(i=0;i<objects.length;i++)
      {
        document.getElementById("status").innerHTML="Status:Objects Detected";
        document.getElementById("number").innerHTML="Number of Objects:"+objects.length;
        r=random(255);
        g=random(255);
        b=random(255);
        fill(r,g,b);
        percentage=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percentage+" %",objects[i].x+20,objects[i].y+20);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

      }
   }
}