let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementsByClassName("search-icon")[0];

let companyData;
axios.get("../../public/json/format.json")
.then((res)=>{
    companyData = res.data;
})
.catch((err)=>{
    return Promise.reject(err);
})

function searchHandler(){
    let company = searchInput.value;
    console.log(company);
    searchInput.value = "";
    for(let i = 0; i < companyData.length; i++){
        if(companyData[i].name == company){
            //用url传递参数
            window.location.href = "../../company.html"+"?id="+encodeURIComponent(i);
            return ;
        }
    }
    alert("无效的企业名！\n");
}

searchBtn.onclick = searchHandler;

document.onkeydown = function(e) {
    if(e.key == "Enter") {
        searchHandler();
        return false;
    }
}