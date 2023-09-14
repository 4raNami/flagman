let mode = "";
let modeNodeList;
let modeBPM;
let modeSpeed;
window.onload = function(){
  modeNodeList = document.getElementsByName('mode');
  modeBPM = document.querySelector('.bpmMode');
  modeSpeed = document.querySelector('.speedMode');
  modeNodeList.forEach((element)=>{
    if(element.checked)mode=element.value;
  });
  modeNodeList.forEach((element)=>{
    element.addEventListener('change',()=>{
      if(element.checked){
        mode = element.value;
        // console.log(`mode:${mode}`);
        addclass(mode);
      }
    });
  });
}
function addclass(e){
  if(e == "bpm"){
    modeBPM.classList.add('show');
    modeSpeed.classList.remove('show');
  }
  else if(e == "speed"){
    modeBPM.classList.remove('show');
    modeSpeed.classList.add('show');
  }
  // console.log(e);
}
function create(){
  const output = document.getElementById("output");
  const soff = parseInt(document.getElementById("sOffset").value);
  const sbpm = parseInt(document.getElementById("sBpm").value);
  const foff = parseInt(document.getElementById("fOffset").value);
  const fbpm = parseInt(document.getElementById("fBpm").value);
  const sspe = parseFloat(document.getElementById("sSpe").value);
  const fspe = parseFloat(document.getElementById("fSpe").value);
  let out="";
  let rowCount=0;
  if(mode == "bpm"){
    let div = (fbpm-sbpm)/(foff-soff);
    for(var i=0; i<=foff-soff; i++){
      var tmp = Math.floor(div*i);
      if(i==0 || fbpm-sbpm>0 && rowCount<tmp || fbpm-sbpm<0 && rowCount>tmp){
        out += `${soff+i},${60000/(sbpm+div*i)},4,1,0,100,1,0\n`;
        rowCount = tmp;
      }
    }
  }
  else if(mode == "speed"){
    let div = (fspe-sspe)/(foff-soff);
    for(var i=0; i<=foff-soff; i++){
      var tmp = Math.floor(div*i*10);
      if(i==0 || i==foff-soff || fspe-sspe>0 && rowCount<tmp || fspe-sspe<0 && rowCount>tmp){
        out += `${soff+i},${-100/(sspe+div*i)},4,1,0,100,0,0\n`;
        rowCount = tmp;
      }
    }
  }
  output.value = out;
}