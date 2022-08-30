const N_NAME = "SB\\px.png";
const J_NAME = ["SB\\mania-hit300g.png","SB\\mania-hit300.png","SB\\mania-hit200.png","SB\\mania-hit100.png","SB\\mania-hit50.png","SB\\mania-hit0.png"];
let name = 0;
const SUB = Math.floor(2000 / 3);
const OFF = "  F,0,0,,0";
const EFFECT = "SB\\normal-hitnormal.wav";
const SONG_START = -1000;
const customnumber = 8;
let IN;
let OUT;
let row;
let QUEUE = [];
let Offset;
let OD;
let SCALE;
let WIDTH;
let background;
let bar;
let x_judge;
let y_judge;
let size_judge;
let TType = "";
let number = 0;
let perfect = 16;
let great = [64,61,58,55,52,49,46,43,40,37,34];
let good = [97,94,91,88,85,82,79,76,73,70,67];
let ok = [127,124,121,118,115,112,109,106,103,100,97];
let bad = [151,148,145,142,139,136,133,130,127,124,121];
let miss = [172,169,166,163,160,157,154,151,148,145,142];
let tmp = "";

function init(){
  IN = document.getElementById("input");
  OUT = document.getElementById("output");
  Offset = document.getElementById("offset").value;
  OD = document.getElementById("OD").value;
  background = document.getElementById("background");
  bar = document.getElementById("bar");
  x_judge = document.getElementById("x_judge").value;
  y_judge = document.getElementById("y_judge").value;
  size_judge = document.getElementById("size_judge").value;
  OUT.value="";
  tmp = "";
  QUEUE = [];
  TType = "";
  number = 0;
  SCALE = parseInt(document.getElementById("scale").value);
  WIDTH = SCALE * 4;
}
function header(){
  if(background.value == true){
    OUT.value += 
    'Sprite,Overlay,Centre,"' + N_NAME +'",320,240' + '\n'+
    ' S,0,' + SONG_START + ',' + Offset + ',2000' + '\n'+
    ' C,0,' + SONG_START + ',,0,0,0' + '\n'+
    'Sprite,Overlay,TopLeft,"' + N_NAME +'",0,0' + '\n'+
    ' V,0,' + SONG_START + ',' + Offset + ',640,480' + '\n';
  }
  if(bar.value == true){
    var array=[];
    for(var i=0; i<4; i++){
      array[i] = 320 - parseInt(SCALE) * 8 + i * 4 * SCALE;
    }
    OUT.value += 
    'Sprite,Overlay,TopLeft,"' + N_NAME +'",' + array[0] + ',416' + '\n'+
    ' F,0,' + SONG_START + ',,0.5' + '\n'+
    ' C,0,' + SONG_START + ',' + Offset + ',0,0,0' + '\n'+
    ' V,0,' + SONG_START + ',' + Offset + ',' + WIDTH + ',' + SCALE  + '\n'+
    ' T,HitSoundSoftWhistle,' + SONG_START + ',' + Offset + '\n'+
    '  F,0,0,100,1' + '\n'+
    '  F,0,100,,0.5' + '\n'+
    'Sprite,Overlay,TopLeft,"' + N_NAME +'",' + array[1] + ',416' + '\n'+
    ' F,0,' + SONG_START + ',,0.5' + '\n'+
    ' C,0,' + SONG_START + ',' + Offset + ',0,0,0' + '\n'+
    ' V,0,' + SONG_START + ',' + Offset + ',' + WIDTH + ',' + SCALE + '\n'+
    ' T,HitSoundNormalWhistle,' + SONG_START + ',' + Offset + '\n'+
    '  F,0,0,100,1' + '\n'+
    '  F,0,100,,0.5' + '\n'+
    'Sprite,Overlay,TopLeft,"' + N_NAME +'",' + array[2] + ',416' + '\n'+
    ' F,0,' + SONG_START + ',,0.5' + '\n'+
    ' C,0,' + SONG_START + ',' + Offset + ',0,0,0' + '\n'+
    ' V,0,' + SONG_START + ',' + Offset + ',' + WIDTH + ',' + SCALE + '\n'+
    ' T,HitSoundNormalFinish,' + SONG_START + ',' + Offset + '\n'+
    '  F,0,0,100,1' + '\n'+
    '  F,0,100,,0.5' + '\n'+
    'Sprite,Overlay,TopLeft,"' + N_NAME +'",' + array[3] + ',416' + '\n'+
    ' F,0,' + SONG_START + ',,0.5' + '\n'+
    ' C,0,' + SONG_START + ',' + Offset + ',0,0,0' + '\n'+
    ' V,0,' + SONG_START + ',' + Offset + ',' + WIDTH + ',' + SCALE + '\n'+
    ' T,HitSoundNormalClap,' + SONG_START + ',' + Offset + '\n'+
    '  F,0,0,100,1' + '\n'+
    '  F,0,100,,0.5' + '\n';
  }
}
function trigger(position){
  if(position==0){
    return "SoftWhistle";
  }else if(position == 1){
    return "NormalWhistle";
  }else if(position == 2){
    return "NormalFinish";
  }else if(position == 3){
    return "NormalClap";
  }else{
    return "NULL";
  }
}
function omit(t1,t2,a){
  if(a == 1){t2--;}else if(a == 2){t1++;}
  tmp += " T,HitSound" + TType + number + "," + t1 + "," + t2 + '\n';
}
function on(){
  tmp += "  F,2,0,120,1,0" + '\n';
}
function off(){
  tmp += OFF + '\n';
}
function judge(E1,E2,E3,E4,E5,E6,E7,E8,E9,EA,EB,EC){
  if(name==0){
    omit(E1,E2,1);off();
    omit(E2,E3,1);off();
    omit(E3,E4,1);off();
    omit(E4,E5,1);off();
    omit(E5,E6,1);off();
    omit(E6,E7,0);on();
    omit(E7,E8,2);off();
    omit(E8,E9,2);off();
    omit(E9,EA,2);off();
    omit(EA,EB,2);off();
    omit(EB,EC,2);off();
  }else if(name==1){
    omit(E1,E2,1);off();
    omit(E2,E3,1);off();
    omit(E3,E4,1);off();
    omit(E4,E5,1);off();
    omit(E5,E6,1);on();
    omit(E6,E7,0);off();
    omit(E7,E8,2);on();
    omit(E8,E9,2);off();
    omit(E9,EA,2);off();
    omit(EA,EB,2);off();
    omit(EB,EC,2);off();
  }
  else if(name==2){
    omit(E1,E2,1);off();
    omit(E2,E3,1);off();
    omit(E3,E4,1);off();
    omit(E4,E5,1);on();
    omit(E5,E6,1);off();
    omit(E6,E7,0);off();
    omit(E7,E8,2);off();
    omit(E8,E9,2);on();
    omit(E9,EA,2);off();
    omit(EA,EB,2);off();
    omit(EB,EC,2);off();
  }
  else if(name==3){
    omit(E1,E2,1);off();
    omit(E2,E3,1);off();
    omit(E3,E4,1);on();
    omit(E4,E5,1);off();
    omit(E5,E6,1);off();
    omit(E6,E7,0);off();
    omit(E7,E8,2);off();
    omit(E8,E9,2);off();
    omit(E9,EA,2);on();
    omit(EA,EB,2);off();
    omit(EB,EC,2);off();
  }
  else if(name==4){
    omit(E1,E2,1);off();
    omit(E2,E3,1);on();
    omit(E3,E4,1);off();
    omit(E4,E5,1);off();
    omit(E5,E6,1);off();
    omit(E6,E7,0);off();
    omit(E7,E8,2);off();
    omit(E8,E9,2);off();
    omit(E9,EA,2);off();
    omit(EA,EB,2);on();
    omit(EB,EC,2);off();
  }
  else if(name==5){
    omit(E1,E2,1);on();
    omit(E2,E3,1);off();
    omit(E3,E4,1);off();
    omit(E4,E5,1);off();
    omit(E5,E6,1);off();
    omit(E6,E7,0);off();
    omit(E7,E8,2);off();
    omit(E8,E9,2);off();
    omit(E9,EA,2);off();
    omit(EA,EB,2);off();
    omit(EB,EC,2);on();
  }
}
function MAP(){
  init();
  header();
  SCALE = parseInt(document.getElementById("scale").value);
  const SPEED = document.getElementById("speed").value;
  let sub = Math.floor(2000 / SPEED);
  /*var toString =Object.prototype.toString;
  console.log(typeof(SCALE));
  console.log(toString.call(SCALE));*/
  row = IN.value.split('\n');
  row.forEach(value => {
    let ele = value.split(/,|:/);
      var Fi = (parseInt(ele[0])-64) /128 * 4*SCALE + 256-(SCALE-8)*8;
      var S2 = parseInt(ele[2]) - sub;
      if(ele[3]!=128){
        OUT.value += 'Sprite,Overlay,TopLeft,"' + N_NAME + '",' + Fi + ",0" + '\n';
        OUT.value += " " + "C,0," + S2 + "," + ele[2] + ",0,0,0" + '\n';
        OUT.value += " " + "MY,0," + S2 + "," + ele[2] + ",0,416" + '\n';
        OUT.value += " " + "V,0," + S2 + "," + ele[2] + "," + WIDTH + "," + SCALE + '\n';
      }else{
        var length = Math.floor((parseInt(ele[5]) - parseInt(ele[2])) * 0.208) * SPEED + SCALE;
        console.log(length);
        var end = 416 + SCALE;
        var S5 = ele[5] - sub;
        OUT.value += 'Sprite,Overlay,BottomLeft,"' + N_NAME + '",' + Fi + ",0" + '\n';
        OUT.value += " " + "C,0," + S2 + "," + ",255,255,0" + '\n';
        OUT.value += " " + "MY,0," + S2 + "," + ele[2] + "," + SCALE + "," + end + '\n';
        OUT.value += " " + "MY,0," + ele[2] + "," + ele[5] + "," + end + '\n';
        OUT.value += " " + "V,0," + S2 + "," + ele[2] + "," + WIDTH + "," + length + '\n';
        OUT.value += " " + "V,0," + ele[2] + "," + ele[5] + "," + WIDTH + "," + length + "," + WIDTH + "," + SCALE + '\n';
      }
  });
}
function TIMING(){
  init();
  number++;
  row = IN.value.split('\n');
  var ss = -1;
  row.forEach(value => {
    let ele = value.split(/,|:/);
    if(ss!=-1||ss!=ele[2]){
      OUT.value += ele[2] + ",-100,4,1," + number + ",100,0,0" +  '\n';
    }
    else{
      var t = parseInt(ele[2])+1;
      OUT.value += t + ",-100,4,1," + number + ",100,0,0" +  '\n';
    }
    if(number<customnumber){
      number++;
    }else{
      number=1;
    }
  });
}
function JUDGE(){
  init();
  const startTime = performance.now(); // 開始時間
  for(name=0; name<=5; name++){
    console.log("name = " + name);
    tmp += 'Sprite,Overlay,Centre,"' + J_NAME[name] + '",' + x_judge + ',' + y_judge + '\n';
    tmp += " S,0,15," + Offset + "," + size_judge + '\n';
    tmp += " F,0,0,,0" + '\n';
    number = 1;
    row = IN.value.split('\n');
    row.forEach(value => {
      let ele = value.split(/,|:/);
      var position = (parseInt(ele[0])-64)/128; // 0 ~ 3
      TType = trigger(position);
      var E1 = ele[2]-miss[OD];
      var E2 = ele[2]-bad[OD];
      var E3 = ele[2]-ok[OD];
      var E4 = ele[2]-good[OD];
      var E5 = ele[2]-great[OD];
      var E6 = ele[2]-perfect;
      var E7 = parseInt(ele[2])+perfect;
      var E8 = parseInt(ele[2])+great[OD];
      var E9 = parseInt(ele[2])+good[OD];
      var EA = parseInt(ele[2])+ok[OD];
      var EB = parseInt(ele[2])+bad[OD];
      var EC = parseInt(ele[2])+miss[OD];
      const jstime = performance.now();
      judge(E1,E2,E3,E4,E5,E6,E7,E8,E9,EA,EB,EC);
      const jetime = performance.now();
      console.log(jetime - jstime +" = judge time");
      if(number<customnumber){
        number++;
      }else{
        number=1;
      }
    });
    QUEUE.push(tmp);
    tmp="";
  }
  QUEUE.forEach(e=> {
    OUT.value += e + '\n';
  });
  const endTime = performance.now(); // 終了時間
  console.log("All time is ");
  console.log(endTime - startTime); // 何ミリ秒かかったかを表示する
}
function SAMPLE(){
  init();
  row = IN.value.split('\n');
  row.forEach(value => {
    let ele = value.split(/,|:/);
    var hitObjects="";
    if(ele[3]!=128){
      if(ele[0] == "64"){
        hitObjects = 
        ele[0] + ',' + ele[1] + ',' + ele[2] + ',' + ele[3] + ',' + "2" + ',' + "2" + ':' + ele[6] + ':' + ele[7] + ':' + ele[8] + ':' + EFFECT + '\n';
      }
      else if(ele[0] == "192"){
        hitObjects = 
        ele[0] + ',' + ele[1] + ',' + ele[2] + ',' + ele[3] + ',' + "2" + ',' + "1" + ':' + ele[6] + ':' + ele[7] + ':' + ele[8] + ':' + EFFECT + '\n';
      }
      else if(ele[0] == "320"){
        hitObjects = 
        ele[0] + ',' + ele[1] + ',' + ele[2] + ',' + ele[3] + ',' + "4" + ',' + "1" + ':' + ele[6] + ':' + ele[7] + ':' + ele[8] + ':' + EFFECT + '\n';
      }
      else if(ele[0] == "448"){
        hitObjects = 
        ele[0] + ',' + ele[1] + ',' + ele[2] + ',' + ele[3] + ',' + "8" + ',' + "1" + ':' + ele[6] + ':' + ele[7] + ':' + ele[8] + ':' + EFFECT + '\n';
      }
    }else{
      if(ele[0] == "64"){
        hitObjects = 
        ele[0] + ',' + ele[1] + ',' + ele[2] + ',' + ele[3] + ',' + "2" + ',' + ele[5] + ':' + "2" + ':' + ele[7] + ':' + ele[8] + ':' + ele[9] + ':' + EFFECT + '\n';
      }else if(ele[0] == "192"){
        hitObjects = 
        ele[0] + ',' + ele[1] + ',' + ele[2] + ',' + ele[3] + ',' + "2" + ',' + ele[5] + ':' + "1" + ':' + ele[7] + ':' + ele[8] + ':' + ele[9] + ':' + EFFECT + '\n';
      }else if(ele[0] == "320"){
        hitObjects = 
        ele[0] + ',' + ele[1] + ',' + ele[2] + ',' + ele[3] + ',' + "4" + ',' + ele[5] + ':' + "1" + ':' + ele[7] + ':' + ele[8] + ':' + ele[9] + ':' + EFFECT + '\n';
      }else if(ele[0] == "448"){
        hitObjects = 
        ele[0] + ',' + ele[1] + ',' + ele[2] + ',' + ele[3] + ',' + "8" + ',' + ele[5] + ':' + "1" + ':' + ele[7] + ':' + ele[8] + ':' + ele[9] + ':' + EFFECT + '\n';
      }
    }
  });
}