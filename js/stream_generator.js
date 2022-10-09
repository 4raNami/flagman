function bpm(offset,BPM,offset_count){
  const SNAP = 4.0;
  let ms = 60000.0/BPM;
  answer = Math.floor((ms/SNAP*offset_count + offset)); // 1124の位置に1125のノーツの場合-0.1->-0.2 11
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
function change(){
  let IN = document.getElementById("input");
  let OUT = document.getElementById("output");
  const first_offset = document.getElementById("offset"); // 入力offset
  let offset_count = 0; // 内部カウンター
  const position = [64,192,320,448];
  let row; // 配列 0 0 0 1 0 0 0 1
  let prev = [0, 1]; // 前のpoint(配列)を格納する
  let str = ""; // 一時保存
  OUT.value="";
  // if(IN.value == "") IN.value = flagman();  <=後から追加した自動flagman用作譜
  row = IN.value.split(''); // 1文字ずつ配列に格納する
  row.forEach(value => {
    let offset = bpm(parseFloat(first_offset.value),BPM.value,offset_count); //bpm(入力offset,入力BPM,内部カウンター)
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