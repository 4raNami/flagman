function bpm(offset,BPM,offset_count){
  const SNAP = 4.0;
  let ms = 60000.0/BPM;
  answer = Math.floor((ms/SNAP*offset_count + offset)); // 1124の位置に1125のノーツの場合-0.1->-0.2 11
  return answer;
}
function random(value,prev){ // value = 1 ~ 4
  let array = [];
  let tmp = prev;
  if(value == 4){
    array = [0,1,2,3];
  }else{
    while(array.length < value){
      let rnd = Math.floor(Math.random() * 3) + 1; // 0 ~ 2 => 1 ~ 3;
      let p = (tmp + rnd) % 4;
      if(prev == p || array.indexOf(p) != -1) continue; // -1 = 存在しない　!= わけではない場合　-> 存在する場合continue(やり直す)
      array.push(p);
      tmp = p;
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
  let row;
  let prev = 0; // 前のpoint(配列)を格納する
  let str = ""; // 一時保存
  OUT.value="";
  if(IN.value == "") IN.value = flagman();
  row = IN.value.split(''); // 1文字ずつ配列に格納する
  row.forEach(value => {
    let offset = bpm(parseFloat(first_offset.value),BPM.value,offset_count); //bpm(入力offset,入力BPM,内部カウンター)
    if(value >= 1 && value <= 4){ // 0が入力されたら飛ばす
      let memo; // temporary
      let point = random(value,prev); // pointは配列[0,2,3]とか
      point.forEach(E => {
        str += position[E] + ",192," + offset + ",1,0,0:0:0:0:\n";
        memo = E;
      }); // E <= [1,3] なら,0101
      prev = memo;
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