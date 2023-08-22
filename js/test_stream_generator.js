const position = [64,192,320,448]; //global valiable
let x = 0; //ラジオボタンメニューの個数

class sgObj{
  constructor(IN,OUT,snap,bpm,start=0,patarn=null,times=1){
    this.IN = IN;
    this.OUT = OUT;
    this.count = 0;
    this.start = parseInt(start);
    this.snap = parseInt(snap);
    this.bpm = parseFloat(bpm);
    this.default_offset = parseFloat(document.getElementById("offset").value); // 入力offset;
    this.prev_list = [0, 1];
    this.result_str = "";
    this.patarn = patarn;
    this.times = times;
    this.character_list;
    // if(IN.value == "") IN.value = flagman();  <=後から追加した自動flagman用作譜
  }
  modify_character_list(times=1){
    this.times=times;
    //start prevstart minite
    if(this.patarn==null){ // 手入力から受け取った場合
      this.character_list = this.IN.value.split('');
    }
    else{//radio buttonから受け取った場合
      let t="";
      for(let i=0; i<times; i++) t += this.patarn;
      this.character_list = t.split('');
    }
  }
  count_to_offset(count){
    let ms = 60000.0/this.bpm;
    let offset = Math.floor((ms/this.snap*count + this.default_offset)); // 1124の位置に1125のノーツの場合-0.1->-0.2 11
    return offset;
  }
  offset_to_count(offset){
    let count = offset * this.bpm * this.snap / 60000.0 - this.default_offset;
    return Math.floor(count / this.snap);
  }
  generate_notes_list(val){ // value = 1 ~ 4
    let array = []; // 出力用配列
    let prev_list = this.prev_list;
    let value = parseInt(val);
    if(value === 4){//ノーツ数4つならば
      array = [0,1,2,3];
    }else{
      while(array.length < value){ // value回だけ繰り返す
        let p = Math.floor(Math.random() * 4); // 0 ~ 2 => 1 ~ 3;
        if(array.indexOf(p) != -1) continue; // arrayにpが存在する場合continue(やり直す) <= -1 = 存在しない != わけではない場合
        if(prev_list.indexOf(p) != -1 && prev_list.length + value <= 4) continue;
        array.push(p);
      }
      this.prev_list = array;
    }
    return array;
  }
  execute(){
    if(this.character_list.length > 0){
      this.character_list.forEach((value, index) => {
        let offset = this.count_to_offset(index+this.start); //bpm(入力offset,入力BPM,内部カウンター,snap数)
        if(value >= 1 && value <= 4){ // 0が入力されたら飛ばす
          let point = this.generate_notes_list(value); // pointは配列[0,2,3]とか
          point.forEach(E => {
            this.result_str += position[E] + ",192," + offset + ",1,0,0:0:0:0:\n";
          }); // E <= [1,3] なら,0101
          this.prev_list = point;
        }
      });
    }
    else{
      console.log("Not found character_list");
      return false;
    }
    this.OUT.value = this.result_str;
    return true;
  }
}

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
    <input name="queue${x}" type="radio" id="select_radio${x}_5" value="20102010"><label for="select_radio${x}_5">20102010</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_6" value="21112111"><label for="select_radio${x}_6">21112111</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_7" value="21212121"><label for="select_radio${x}_7">21212121</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_8" value="31112111"><label for="select_radio${x}_8">31112111</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_9" value="31113111"><label for="select_radio${x}_9">31113111</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_a" value="31213121"><label for="select_radio${x}_a">31213121</label> <br>
    <input name="queue${x}" type="radio" id="select_radio${x}_b" value="32223222"><label for="select_radio${x}_b">32223222</label> <br>
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
function execute(f=false){
  const IN = document.getElementById("input");
  const OUT = document.getElementById("output");
  const snap = document.getElementById("snap").value;
  const BPM = document.getElementById("bpm").value;
  const minite = parseInt(document.getElementById("min").value);
  OUT.value = "";
  if(f){
    const obj = new sgObj(IN,OUT,snap,BPM);
    obj.modify_character_list();
    obj.execute();
  }else{
    let obj_list = [];
    for(var i=0; i<x; i++){
      const number = parseInt(document.getElementById("shell"+`${i+1}`).value);
      const patarn = parseInt(document.querySelector('input[name="queue'+ `${i+1}` +'"]:checked').value);
      const obj = new sgObj(IN,OUT,snap,BPM,number,patarn);
      obj_list.push(obj);
    }
    obj_list.sort((a,b) => {
      return a.start < b.start ? -1 : 1;
    });
    obj_list.forEach((obj,index,array)=>{
      let times=1;
      index==array.length-1 ? times=Math.floor(obj.offset_to_count(minite)/2)-obj.start : times=array[index+1].start-obj.start;
      obj.modify_character_list(times);
    });
    obj_list.forEach(E=>{
      E.execute();
    });
  }
}