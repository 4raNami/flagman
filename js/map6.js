const NAME = ["SB\\mania-hit300g.png","SB\\mania-hit300.png","SB\\mania-hit200.png","SB\\mania-hit100.png","SB\\mania-hit50.png","SB\\mania-hit0.png"];
let name = 0;
const SUB = Math.floor(2000 / 3);
const OFF = "  F,0,0,,0";
const ON1 = "  F,0,0,10,0,1";
const ON2 = "  F,2,10,200,1,0";
let IN;
let OUT;
let QUEUE = [];
let row;
let Offset;
let OD;
let TType = "";
let number = 0;
let perfect = 16;
let great = [64,61,58,55,52,49,46,43,40,37,34];
let good = [97,94,91,88,85,82,79,76,73,70,67];
let ok = [127,124,121,118,115,112,109,106,103,100,97];
let bad = [151,148,145,142,139,136,133,130,127,124,121];
let miss = [172,169,166,163,160,157,154,151,148,145,142];
let tmp = "";

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
function omit(t1,t2){
  tmp += " T,HitSound" + TType + number + "," + t1 + "," + t2 + '\n';
}
function on(){
  tmp += ON1 + '\n';
  tmp += ON2 + '\n';
}
function off(){
  tmp += OFF + '\n';
}
function judge(E1,E2,E3,E4,E5,E6,E7,E8,E9,EA,EB,EC){
  if(name==0){
    omit(E1,E2);off();
    omit(E2,E3);off();
    omit(E3,E4);off();
    omit(E4,E5);off();
    omit(E5,E6);off();
    omit(E6,E7);on();
    omit(E7,E8);off();
    omit(E8,E9);off();
    omit(E9,EA);off();
    omit(EA,EB);off();
    omit(EB,EC);off();
  }else if(name==1){
    omit(E1,E2);off();
    omit(E2,E3);off();
    omit(E3,E4);off();
    omit(E4,E5);off();
    omit(E5,E6);on();
    omit(E6,E7);off();
    omit(E7,E8);on();
    omit(E8,E9);off();
    omit(E9,EA);off();
    omit(EA,EB);off();
    omit(EB,EC);off();
  }
  else if(name==2){
    omit(E1,E2);off();
    omit(E2,E3);off();
    omit(E3,E4);off();
    omit(E4,E5);on();
    omit(E5,E6);off();
    omit(E6,E7);off();
    omit(E7,E8);off();
    omit(E8,E9);on();
    omit(E9,EA);off();
    omit(EA,EB);off();
    omit(EB,EC);off();
  }
  else if(name==3){
    omit(E1,E2);off();
    omit(E2,E3);off();
    omit(E3,E4);on();
    omit(E4,E5);off();
    omit(E5,E6);off();
    omit(E6,E7);off();
    omit(E7,E8);off();
    omit(E8,E9);off();
    omit(E9,EA);on();
    omit(EA,EB);off();
    omit(EB,EC);off();
  }
  else if(name==4){
    omit(E1,E2);off();
    omit(E2,E3);on();
    omit(E3,E4);off();
    omit(E4,E5);off();
    omit(E5,E6);off();
    omit(E6,E7);off();
    omit(E7,E8);off();
    omit(E8,E9);off();
    omit(E9,EA);off();
    omit(EA,EB);on();
    omit(EB,EC);off();
  }
  else if(name==5){
    omit(E1,E2);on();
    omit(E2,E3);off();
    omit(E3,E4);off();
    omit(E4,E5);off();
    omit(E5,E6);off();
    omit(E6,E7);off();
    omit(E7,E8);off();
    omit(E8,E9);off();
    omit(E9,EA);off();
    omit(EA,EB);off();
    omit(EB,EC);on();
  }
}
function change(){
  IN = document.getElementById("input");
  OUT = document.getElementById("output");
  Offset = document.getElementById("offset").value;
  OD = document.getElementById("OD").value;
  tmp = "";
  QUEUE = [];
  OUT.value="";
  
  const startTime = performance.now(); // 開始時間
  for(name=0; name<=5; name++){
    console.log("name = " + name);
    tmp += 'Sprite,Overlay,Centre,"' + NAME[name] + '",96,188' + '\n';
    tmp += " S,0,15," + Offset + "," + "1" + '\n';
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
      //const jstime = performance.now();
      judge(E1,E2,E3,E4,E5,E6,E7,E8,E9,EA,EB,EC);
      //const jetime = performance.now();
      //console.log(jetime - jstime +" = judge time");
      if(number<4){
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
  console.log("All time is = ");
  console.log(endTime - startTime); // 何ミリ秒かかったかを表示する
}