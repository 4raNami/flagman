const NAME = "SB\\px.png";
const STD = 3;
const SUB = Math.floor(2000 / STD);
let IN;
let OUT;
let row;
function change(){
  IN = document.getElementById("input");
  OUT = document.getElementById("output");
  
  OUT.value=
`Sprite,Overlay,TopLeft,"SB\px.png",-150,-150
 S,0,15,,2000
 C,0,15,,0,0,0
Sprite,Overlay,TopLeft,"SB\px.png",0,0
 V,0,15,114071,640,480
Sprite,Overlay,TopLeft,"SB\px.png",256,416
 F,0,15,,0.5
 C,0,15,114071,0,0,0
 V,0,15,114071,32,8
 T,HitSoundSoftWhistle,15,114071
  F,0,0,100,1
  F,0,100,,0.5
Sprite,Overlay,TopLeft,"SB\px.png",288,416
 F,0,15,,0.5
 C,0,15,114071,0,0,0
 V,0,15,114071,32,8
 T,HitSoundNormalWhistle,15,114071,10
  F,0,0,100,1
  F,0,100,,0.5
Sprite,Overlay,TopLeft,"SB\px.png",320,416
 F,0,15,,0.5
 C,0,15,114071,0,0,0
 V,0,15,114071,32,8
 T,HitSoundNormalFinish,15,114071,100
  F,0,0,100,1
  F,0,100,,0.5
Sprite,Overlay,TopLeft,"SB\px.png",352,416
 F,0,15,,0.5
 C,0,15,114071,0,0,0
 V,0,15,114071,32,8
 T,HitSoundNormalClap,15,114071,1000
  F,0,0,100,1
  F,0,100,,0.5` + '\n';
row = IN.value.split('\n');
row.forEach(value => {
  let ele = value.split(/,|:/);
    var Fi = ((parseInt(ele[0])-64)/128)*32+256;
    var S2 = parseInt(ele[2]) - SUB;
    if(ele[3]!=128){
      OUT.value += 'Sprite,Overlay,TopLeft,"' + NAME + '",' + Fi + ",0" + '\n';
      OUT.value += " " + "C,0," + S2 + "," + ele[2] + ",0,0,0" + '\n';
      OUT.value += " " + "MY,0," + S2 + "," + ele[2] + ",0,416" + '\n';
      OUT.value += " " + "V,0," + S2 + "," + ele[2] + ",32,8" + '\n';
    }else{
      var length = Math.floor((parseInt(ele[5]) - parseInt(ele[2])) * 0.208) * STD + 8;
      console.log(length);
      var S5 = ele[5] - SUB;
      OUT.value += 'Sprite,Overlay,BottomLeft,"' + NAME + '",' + Fi + ",0" + '\n';
      OUT.value += " " + "C,0," + S2 + "," + ",255,0,0" + '\n';
      OUT.value += " " + "MY,0," + S2 + "," + ele[2] + ",8,424" + '\n';
      OUT.value += " " + "MY,0," + ele[2] + "," + ele[5] + ",424" + '\n';
      OUT.value += " " + "V,0," + S2 + "," + ele[2] + ",32," + length + '\n';
      OUT.value += " " + "V,0," + ele[2] + "," + ele[5] + ",32," + length + ",32,8" + '\n';
    }
});
}