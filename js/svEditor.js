function create(){
  const output = document.getElementById("output");
  const soff = parseInt(document.getElementById("sOffset").value);
  const sbpm = parseInt(document.getElementById("sBpm").value);
  const foff = parseInt(document.getElementById("fOffset").value);
  const fbpm = parseInt(document.getElementById("fBpm").value);
  let out="";
  let rowCount=-1;
  let div = (fbpm-sbpm)/(foff-soff);
  for(var i=0; i<=foff-soff; i++){
    var tmp = Math.floor(div*i);
    if(rowCount<tmp){
      out += `${soff+i},${60000/(sbpm+div*i)},4,1,0,100,1,0\n`;
      rowCount = tmp;
    }
  }
  output.value = out;
}