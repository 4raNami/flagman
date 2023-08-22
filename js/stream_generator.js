let IN; //外部入力
let OUT; //外部出力
let default_offset; //外部入力
let snap; //外部入力
let BPM; //外部入力
let minite; //外部入力
let offset_count; //内部変数
const position = [64,192,320,448]; //global valiable
let row; //内部配列
let prev; //内部配列
let str = ""; //global valiable
let x = 0; //ラジオボタンメニューの個数

function add(){
  x++;
  document.getElementById("contents").innerHTML += 
  `<div class="shell${x}">
    <p style="position:absolute">No.${x}</p>
    <p>Start point<br><input id="shell${x}" type="number" min="0" size="1" value="${x-1}" step="1">
    <div class="error">整数のみ入力できます</div>notes数</p>
    <input name="queue${x}" type="radio" id="select_radio${x}_0" value="00000000"><label for="select_radio${x}_0">00000000</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_1" value="10000000" checked="checked"><label for="select_radio${x}_1">10000000</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_2" value="10001000"><label for="select_radio${x}_2">10001000</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_3" value="20001000"><label for="select_radio${x}_3">20001000</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_4" value="10101010"><label for="select_radio${x}_4">10101010</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_5" value="11111111"><label for="select_radio${x}_5">11111111</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_6" value="20102010"><label for="select_radio${x}_6">20102010</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_7" value="21112111"><label for="select_radio${x}_7">21112111</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_8" value="21212121"><label for="select_radio${x}_8">21212121</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_9" value="31112111"><label for="select_radio${x}_9">31112111</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_a" value="31113111"><label for="select_radio${x}_a">31113111</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_b" value="31213121"><label for="select_radio${x}_b">31213121</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_c" value="32223222"><label for="select_radio${x}_c">32223222</label> <br>
  </div>`;
}
function del(){
  const element = document.querySelector(`.shell${x}`);
  if(x > 1){
    element.remove();
    x--;
  }else{
    alert("これ以上消せません");
  }
}
function current_offset_value(offset,BPM,offset_count,s){ // カウントから現在のオフセットを返す
  var snap = parseFloat(s);
  let ms = 60000.0/BPM;
  return Math.floor((ms/snap*offset_count + offset));
}
function random_notes_list(val,prev){ // value = 1 ~ 4
  let array = []; // 出力用配列
  let value = parseInt(val);
  if(value === 4){
    array = [0,1,2,3];
  }else{ //key数以上の重ならないノーツ配置処理は無限ループの原因になる
    while(array.length < value){ // value回だけ繰り返す
      let p = Math.floor(Math.random() * 4); // 0 ~ 2 => 1 ~ 3;
      if(array.indexOf(p) != -1) continue; // -1 = 存在しない　!= わけではない場合　-> 存在する場合continue(やり直す)
      if(prev.indexOf(p) != -1 & prev.length + value <= 4) continue;
      array.push(p);
      tmp = p;
    }
  }
  return array;
}
function init(){
  IN = document.getElementById("input");
  OUT = document.getElementById("output");
  default_offset = parseFloat(document.getElementById("offset").value); // 入力offset
  snap = document.getElementById("snap").value;
  BPM = document.getElementById("bpm").value;
  minite = document.getElementById("min").value;
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
  let times = 0;
  let num_list = document.querySelectorAll('input[type="number"]');
  let list = [];
  for(let i=0; i<num_list.length; i++)list.push(parseInt(num_list[i].value));
  console.log(list);
  let result = list.map((value, index, array) => {
    let t = "";
    const patarn = document.querySelector('input[name="queue'+ `${index+1}` +'"]:checked').value;
    index==array.length-1 ? times=Math.floor(Math.floor(minite * BPM * snap / 60000.0 - default_offset) / snap /2)-value : times=array[index+1]-value;
    console.log(times);
    for(let i=0; i<times; i++) t += patarn;
    return t;
  });
  console.log(result);
  IN.value = result.join("");
  change();
}
function change(){
  init();
  row.forEach((value, index) => {
    let offset = current_offset_value(default_offset, BPM, index, snap); //bpm(入力offset,入力BPM,内部カウンター,snap数)
    if (!(value <= 0 | 4 < value)){ // 0が入力されたら飛ばす
      let point = random_notes_list(value, prev); // pointは配列[0,2,3]とか
      point.forEach(E => {
        str += position[E] + ",192," + offset + ",1,0,0:0:0:0:\n";
      }); // E <= [1,3] なら,0101
      prev = point;
    }
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