let IN;
let OUT;
let first_offset;
let snap;
let BPM;
let offset_count;
const position = [64,192,320,448];
let row;
let prev;
let str = "";
function test(value){
  if(value === "all"){
    console.log(`
    IN = ${IN.value}
    OUT = ${OUT.value}
    first_offset = ${first_offset}
    snap = ${snap}
    BPM = ${BPM}
    offset_count = ${offset_count}
    position = ${position}
    row = ${row}
    prev = ${prev}
    str = ${str}`);
  }
  else if(value === "str"){
    console.log(str);
  }
  else{
    console.log("order is not found :p");
  }
}
function bpm(offset,BPM,offset_count,s){
  var snap = parseFloat(s);
  let ms = 60000.0/BPM;
  answer = Math.floor((ms/snap*offset_count + offset)); // 1124の位置に1125のノーツの場合-0.1->-0.2 11
  return answer;
}
function random(value,prev){ // value = 1 ~ 4
  let array = []; // 出力用配列
  if(value == 4){
    array = [0,1,2,3];
  }else if(parseInt(prev.length)+parseInt(value) > 4){ //key数以上の重ならないノーツ配置処理は無限ループの原因になる
    while(array.length < value){
      let p = Math.floor(Math.random() * 4); // 0 ~ 2 => 1 ~ 3;
      if(prev == p || array.indexOf(p) != -1) continue; // -1 = 存在しない　!= わけではない場合　-> 存在する場合continue(やり直す)
      array.push(p);
      tmp = p;
    }
  }else{
    while(array.length < value){ // value回だけ繰り返す
      let p = Math.floor(Math.random() * 4); // 0 ~ 2 => 1 ~ 3;
      if(prev.indexOf(p) != -1 || array.indexOf(p) != -1) continue; // -1 = 存在しない　!= わけではない場合　-> 存在する場合continue(やり直す)
      array.push(p);
    }
  }
  return array;
}
function init(){
  IN = document.getElementById("input");
  OUT = document.getElementById("output");
  first_offset = parseFloat(document.getElementById("offset").value); // 入力offset
  snap = document.getElementById("snap").value;
  BPM = document.getElementById("bpm").value;
  offset_count = 0; // 内部カウンター
  row; // 配列 0 0 0 1 0 0 0 1
  prev = [0, 1]; // 前のpoint(配列)を格納する
  str = ""; // 一時保存
  OUT.value="";
  // if(IN.value == "") IN.value = flagman();  <=後から追加した自動flagman用作譜
  row = IN.value.split(''); // 1文字ずつ配列に格納する
}
function serect(){
  init();
  test("str");
}
function change(){
  init();
  row.forEach(value => {
    let offset = bpm(first_offset,BPM,offset_count,snap); //bpm(入力offset,入力BPM,内部カウンター,snap数)
    if(value >= 1 && value <= 4){ // 0が入力されたら飛ばす
      let point = random(value,prev); // pointは配列[0,2,3]とか
      point.forEach(E => {
        str += position[E] + ",192," + offset + ",1,0,0:0:0:0:\n";
      }); // E <= [1,3] なら,0101
      prev = point;
    }
    offset_count++;
  });
  OUT.value = str;
}
function flagman(){
  const N = 172 * 4;
  let str = "";
  for(var i=0;i<N;i++){
    var array = [0,0,0,0];
    array[0] = Math.round(Math.random() + 0.25);
    //array[1] = Math.round(Math.random() - 0.5);
    array[2] = Math.round(Math.random() - 0.5);
    //array[3] = Math.round(Math.random() - 0.5);
    str += array.join("");
    console.log(array.join(""));
  }
  return str;
}