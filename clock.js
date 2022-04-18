var hh = new Date().getHours();
var mm = new Date().getMinutes();
var ss = new Date().getSeconds();

s=ss*6+90;
m=(mm*6+ss/10)+90;
h=(hh*30+mm/2)+90;

function runClock(){
    s+=6;
    m+=6/60;
    h+=6/720;
    milS.style.transform = 'translate(-50%, -50%) rotate(' + s + 'deg)';
    milM.style.transform = 'translate(-50%, -50%) rotate(' + m + 'deg)';
    milH.style.transform = 'translate(-50%, -50%) rotate(' + h + 'deg)';
}
runClock();

setInterval(function(){
    runClock();
},1000);

for(i = 0; i <= 11; i++){
    var line = document.createElement('div');
    line.id = "line";
    var lineIn = document.createElement('div');
    lineIn.id = "lineIn";
    lineIn.style.transform = 'translate(-50%, -50%) rotate(' + i*30 +'deg)';
    lineIn.appendChild(line);
    document.getElementById('clockWrapper').appendChild(lineIn);
}