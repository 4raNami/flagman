const NAME = "SB\\hole.png";
let IN;
let OUT;
let sub;
let row;
function change(){
  sub = document.getElementById("sub").value;
  IN = document.getElementById("input");
  OUT = document.getElementById("output");
  OUT.value="";
  row = IN.value.split('\n');
  row.forEach(value => {
    let ele = value.split(",");
      var Mi = ((parseInt(ele[0])-64)/128+1)*127+11;
      var Si = parseInt(ele[2]) - sub;
      OUT.value += 'Sprite,Overlay,Centre,"'+ NAME +'",320,240' + '\n';
      OUT.value += " " + "S,0," + Si + "," + ele[2] + ",4,1" + '\n';
      OUT.value += " " + "M,0,"+ ele[2] +",,"+ Mi +",74" + '\n';
  });
}