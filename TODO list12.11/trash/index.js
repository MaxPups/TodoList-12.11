let str = localStorage.getItem("arr"); // вызываем наш объект из локального хранилище
var DATA = JSON.parse(str) || []; // присваеваем константе, елси он существует
render();

let inp = document.querySelector("#value");
let btn = document.querySelector("#add");
let btnClear = document.querySelector("#removeAll");
//  let result = document.querySelector('.block_result');

// добавляет задачу
btn.addEventListener("click", () => {
  if (inp.value !== "") {
    let task = {
      title: inp.value,
    };
    DATA.push(task);
    render();

    // 
    inp.value = "";
    localStorage.setItem("arr", JSON.stringify(DATA)); // записываем наш массив в локальное хранилище
  }
});

// удаляет с хранилища и очищает поле
btnClear.addEventListener("click", () => {
  let result = document.querySelector(".block_result");
  localStorage.removeItem("arr");
  result.innerHTML = "";
});

// отрисовывает карточки
function render() {
  let result = document.querySelector(".block_result");
  result.innerHTML = "";

  DATA.map((i) => {
    let block = document.createElement("div");
    block.classList.add("new_task");
    let index = DATA.indexOf(i);
    block.innerHTML = `<input type="checkbox" data-index = ${index} class="checked">
    <p>${i.title}</p>
    <button data-index = ${index}>
    </button>`;
    result.append(block);
  });
}

// функция которая удаляет задачу и удаляет с localStorage
let tasks = document.querySelector(".block_result");
tasks.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    let ind = event.target.getAttribute("data-index");
    DATA.splice(ind, 1);
    console.log(DATA);
    render();
    localStorage.setItem("arr", JSON.stringify(DATA));
  }
});

// функция удаляет выполненые задачи
let btnDone = document.querySelector("#removeDone");
btnDone.addEventListener("click", () => {
  let inputs = document.querySelectorAll(".checked");
  DATA = [];
  for (i = 0; i < inputs.length; i++) {
    if (!inputs[i].checked) {
      let elem = inputs[i].nextElementSibling.textContent;
      DATA.push(elem);
      console.log(elem);
    }
  }
  render();
  localStorage.setItem("arr", JSON.stringify(DATA));
});

// // функция которая отсавляет
// tasks.addEventListener("click", (event) => {
//   console.log(event.target.tagName);

  
// });

// for(i=0; i< inputs.length; i++){

// for(let i in inputs){
//     if(inputs[i].checked){
//         let elem = inputs[i].nextElementSibling.textContent;
//         let elemInd =inputs[i].getAttribute('data-index');
//         // console.log(`text ${elem}, index ${elemInd}`);
//         DATA.splice(inputs[i],1)
//         // render();
//         // console.log(`успешно отрендерился`);
//     // console.log(DATA);

//     // localStorage.setItem("arr", JSON.stringify(DATA));
// }

// function arrayFilter(){
//     DATA.map(i=>{console.log(i!=elem)})
//}
// let indDone = inputsDone[i].getAttribute('data-index');
// DATA.splice(indDone, 1);
// render();

// `<input type="checkbox" data-index = ${index}>
//     <p>${i}</p>
//     <button data-index = ${index}>
//         <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//         <path d="M0 16.12H16V0.12H0V16.12Z" fill="url(#pattern0)"/>
//         <defs>
//         <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
//         <use xlink:href="#image0_3018_1035" transform="scale(0.015625)"/>
//         </pattern>
//         <image id="image0_3018_1035" width="64" height="64" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFcUlEQVR4AdWbA7BkRxSGz0Ns27a9tr3FlFKKbRvFqBAUY5uLQmzbGHvm+s7uzf+yp6pO1JPpHvQ7Vd967/T33R7P0P+Z5owZZzVnzRpPo2Sw1oOx5mvjmTPXI8UkRMPUauKJE6+It946iffa65d49uzDbZeP58zZNT7ooA+iLbdM4jFj7sXvh/UPNnnyFfFWWyUR0Z/E++33HQ5obYR47txd48MOeycaHl6z5k02SeLx4+9WRFDLj1QMiRgwMJBEHMFG+QjyIeTlmqONNxYRTOTVEeyTl7QTIYJ8CPlAHEASiAiRBREiIa9cMyJEiBBxhFbyrUGEkCP0Wz5g+ZaoIoRKeXWEsA8RQsiHCnlVhBAR8P/XREhmzBiKp069woe8T9Q+iBBwhF7L+5DXWjPvhGT27PWpcMQRF0d8V+cB2yMEJvLsGIIm7iKLRxxxD904MLBoOVFlNVESA08XRPARIUCEbsoHkPcgr7VGlk/Au0ThzQMDpxJhLiSaigj5kQgRcK2LYC7vCvn3iLwriE4kORchwjJEWCUiaNHpCCzvQ96FvO66AiF/uZSXcyEivMoRQuBYEMFInh38/5RXRGhyNUcXRPAQwTeI4EPeg7wDea01CPl3W8qLuYAjxByh0fMI5vIN4IHVreXVOyHmig1dEMFFBK+NCB7kXcg3IK91mSy/CryjIy8jvIIIEUeodz2CuXwduEL+MpbXngtEBA/UdWkVQcjXIa91GSzfBG9ryysihByhZhDB+Y8ILP+2rnwNOOby6ggvcwQX1HThCK54ec3Fy1gO5GuQ1zomy8fgLXP51hECjlA1iNDYd9/v3Pnz93UXLtzGRL4KGhry2nM+IrzEERxQNaBxyCHfNo455oMq5LWPASLwJuQvNZLXiOBzhIpuBOyE6tCQ1v+tgHpP5RURGqDSS1g+NJM3n/MQ4UVE8DhCuQfiZVBj+Tf6KS8jvMAR6qDcTVg+YPlLpLwNEVyOUOqCeAlUWf51K+QVEWqg1ElY3mf5i6W8zRGKHRAvCnlx5u2dMxHhKUTgGy0ImFHmmCshfx7LWz8XrbXW8cvWWuu3mjiLutTBe8PDxSvXWms+jZb5fNy4Hb/eeeevCyxRMKAEvt9669RnY8YcMirkg4UL9/GPOOKj2rrrsoQ5lbXWSrwDDvg5WLDgeKvla3Pm7FM++OCP84ODSZ6o45T22efX6uzZdkaoasjrULYuAsuXWD7XRfmc2AkVRLBKPsfyvaJoQ4SKgfyoj1CGfBHyWchnibTIMVkDCohQ7nWEirE836AxBZAxiFCUEWyXz7BwBbxCVHuKKMMPeDiCpTtBymcgj8W2TZrlq2AZUf0colmnEh3xBNGvZX7UmAYZTWQEy+SBkH8V8ucTLSWes4jGdDDCL5VORyh34Mzn/0P+7xFKHYogd4KxfAHyachjUe3D8hWWPw/yiqfSYx7nCAWQNiCPCCVE6Kt8CuRU8ooIRY6QMopgsBNKPTzzdu0Els+zfMrwzL+ilm+9Ezik1jqYHEdoSz7F8u3yO98vlw3kZYTHRITfNdYjIxQRoevyOYW8LREskLcsQnHu3K7JWxthzpw1Ebxp046tHHLIp92QtzkCXlT5zZ0+fSY9tsUWt3wB+RLfcnZK3t4I/EozeHyLLR6l04i2upHo/i/5bittr7x5BJb/CdxGtOwUol0IQ6cSrXeTjGAgb3MEIf8qnLciOacpIhjI2xFByN8O+dOkvDKCgbxNEaS8PPNtRFDLWxdBS14RIaV4eGttBIV82xHqCnkbIxR4zT/qyssItyDC10TJCiJPytsc4Wmi1Ij8nUTLWF7/K+RnE61/FdE9FxGdRKNkLiSacS3RQ+cQbU8t5g9mxhwsQlgwdwAAAABJRU5ErkJggg=="/>
//         </defs>
//         </svg>
//     </button>`
