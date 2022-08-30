const SUB = 1200;
let IN;
let OUT;
let row;
let big = false;
function name(position){
  if(position == 1|| position == 2){
    if(big){
      return "SB\\don2.png";
    }else{
      return "SB\\don.png";
    }
  }else{
    if(big){
      return "SB\\katsu2.png";
    }else{
      return "SB\\katsu.png";
    }
  }
};
function change(){
  IN = document.getElementById("input");
  OUT = document.getElementById("output");
  OUT.value = 
`Sprite,Overlay,TopLeft,"SB\px.png",-150,-150
 S,0,15,,2000
 C,0,15,,0,0,0
Sprite,Overlay,TopLeft,"SB\px.png",0,0
 V,0,15,114071,640,480
Sprite,Overlay,TopLeft,"SB\px.png",64,192
 V,0,15,,512,64
 C,0,15,114071,110,110,110
Sprite,Overlay,Centre,"SB\circle.png",96,224
 C,0,15,,200,200,200
 S,0,15,114071,0.5
Sprite,Overlay,Centre,"SB\circle.png",96,224
 C,0,15,,150,150,150
 S,0,15,114071,0.25` + '\n';
  var PreOffset1 = -10;
  var PreOffset2 = -10;
  var PrePosition = -10;
  row = IN.value.split('\n');
  //row.push();
  row.forEach(value => {
    let ele = value.split(/,|:/);
    //console.log(ele);
      var position = (parseInt(ele[0])-64)/128; // 0 ~ 3
      var NowOffset1 = parseInt(ele[2]) - SUB; // 前のオフセット
      var NowOffset2 = parseInt(ele[2]); // 今のオフセット
      if(PrePosition != -10){
        if(PreOffset2 == NowOffset2 && PrePosition%2 != position%2){
          big = true;
          OUT.value += 'Sprite,Overlay,Centre,"' + name(position) + '",96,224' + '\n';
          OUT.value += " " + "S,0," + NowOffset1 + "," + NowOffset2 + ",0.8" + '\n';
          OUT.value += " " + "MX,0," + NowOffset1 + "," + NowOffset2 + ",576,96" + '\n';
        }else if(big){
          big = false;
        }
        else{
          OUT.value += 'Sprite,Overlay,Centre,"' + name(PrePosition) + '",96,224' + '\n';
          OUT.value += " " + "S,0," + PreOffset1 + "," + PreOffset2 + ",0.6" + '\n';
          OUT.value += " " + "MX,0," + PreOffset1 + "," + PreOffset2 + ",576,96" + '\n';
        }
      }
      PreOffset1 = NowOffset1;
      PreOffset2 = NowOffset2;
      PrePosition = position;
  });
}