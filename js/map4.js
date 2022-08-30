const NAME = ["SB\\great.png","SB\\good.png","SB\\miss.png"];
let name = 0;
const SUB = 1200;
const OFF = "  F,0,0,,0";
const ON1 = "  F,0,0,10,0,1";
const ON2 = "  F,2,10,200,1,0";
let IN;
let OUT;
let row;
let Offset;
let OD;
let number = 0;
let great = [64,61,58,55,52,49,46,43,40,37,34];
let good = [127,124,121,118,115,112,109,106,103,100,97];
let miss = [172,169,166,163,160,157,154,151,148,145,142];

function size(){
  if(name == 2){
    return "0.5";
  }else{
    return "0.5757576"
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
function judge(E1,E2,E3,E4,E5,E6,TType){
  if(name==0){
    OUT.value += " T,HitSound" + TType + number + "," + E1 + "," + E2 + '\n';
    OUT.value += OFF + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E2 + "," + E3 + '\n';
    OUT.value += OFF + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E3 + "," + E4 + '\n';
    OUT.value += ON1 + '\n';
    OUT.value += ON2 + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E4 + "," + E5 + '\n';
    OUT.value += OFF + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E5 + "," + E6 + '\n';
    OUT.value += OFF + '\n';
  }else if(name==1){
    OUT.value += " T,HitSound" + TType + number + "," + E1 + "," + E2 + '\n';
    OUT.value += OFF + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E2 + "," + E3 + '\n';
    OUT.value += ON1 + '\n';
    OUT.value += ON2 + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E3 + "," + E4 + '\n';
    OUT.value += OFF + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E4 + "," + E5 + '\n';
    OUT.value += ON1 + '\n';
    OUT.value += ON2 + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E5 + "," + E6 + '\n';
    OUT.value += OFF + '\n';
  }else if(name==2){
    OUT.value += " T,HitSound" + TType + number + "," + E1 + "," + E2 + '\n';
    OUT.value += ON1 + '\n';
    OUT.value += ON2 + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E2 + "," + E3 + '\n';
    OUT.value += OFF + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E3 + "," + E4 + '\n';
    OUT.value += OFF + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E4 + "," + E5 + '\n';
    OUT.value += OFF + '\n';
    OUT.value += " T,HitSound" + TType + number + "," + E5 + "," + E6 + '\n';
    OUT.value += ON1 + '\n';
    OUT.value += ON2 + '\n';
  }
}
function change(){
  IN = document.getElementById("input");
  OUT = document.getElementById("output");
  Offset = document.getElementById("offset").value;
  OD = document.getElementById("OD").value;
  OUT.value="";
  for(name=0; name<=2; name++){
    OUT.value += 'Sprite,Overlay,Centre,"' + NAME[name] + '",96,188' + '\n';
    OUT.value += " S,0,15," + Offset + "," + size() + '\n';
    OUT.value += " F,0,0,,0" + '\n';
    number = 1;
    row = IN.value.split('\n');
    row.forEach(value => {
      let ele = value.split(/,|:/);
      var position = (parseInt(ele[0])-64)/128; // 0 ~ 3
      var TType = trigger(position);
      var E1 = ele[2]-miss[OD];
      var E2 = ele[2]-good[OD];
      var E3 = ele[2]-great[OD];
      var E4 = parseInt(ele[2])+great[OD];
      var E5 = parseInt(ele[2])+good[OD];
      var E6 = parseInt(ele[2])+miss[OD];
      judge(E1,E2,E3,E4,E5,E6,TType);
      if(number<4){
        number++;
      }else{
        number=1;
      }
    });
  }
}