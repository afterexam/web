//请求数据
let allData;
axios.get('./public/json/format.json')
.then((res)=>{
    allData = res.data;
})
.catch((err)=>{
    return Promise.reject(err);
});

接受参数
var params = new URLSearchParams(window.location.search);
var companyId = params.get('id');

let content = document.getElementsByClassName("index")[0].getElementsByClassName("content")[0];
content.innerHTML = "首页 -> " + companyId + " -> 看未来";

//索引事件
let img = document.getElementsByClassName("index")[0].getElementsByClassName("front")[0];
let index = document.getElementsByClassName("index")[0].getElementsByClassName("content")[0];
img.onclick = function(){
    index.style.right = "0%";
}
index.onclick = function(){
    index.style.right = "99%";
}
