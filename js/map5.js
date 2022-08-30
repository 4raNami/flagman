let IN;
let OUT;
let row;
let number = 1;
function change(){
  IN = document.getElementById("input");
  OUT = document.getElementById("output");
  OUT.value="";
  row = IN.value.split('\n');
  row.forEach(value => {
    let ele = value.split(/,|:/);
    OUT.value += ele[2] + ",-100,4,1," + number + ",100,0,0" +  '\n';
    if(number<4){
      number++;
    }else{
      number=1;
    }
  });
}