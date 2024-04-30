    //主页书签控制
    let navList = document.getElementById("nav").getElementsByTagName("li");
    navList[0].getElementsByTagName("a")[0].classList.remove("active");
    navList[1].getElementsByTagName("a")[0].classList.add("active");
    //背景大小控制
    let background = document.getElementsByClassName("background")[0].getElementsByTagName("img")[0];
    let main = document.getElementsByTagName("main")[0];
    let mainHeight = getComputedStyle(main).height;
    let offset = 132;       //不确定
    mainHeight = Number(mainHeight.split("px")[0]);
    mainHeight += offset;
    background.style.width = window.screen.width + 'px';
    background.style.height = mainHeight + "px";
    background.style.top = "-80px";
    console.log(mainHeight,background.style.width,background.style.height);
    //接收参数
    var params = new URLSearchParams(window.location.search);
    var companyId = params.get('id');

    let company;
    axios.get("../../public/json/company_data.json")
    .then((res)=>{
        company = res.data[Number(companyId)];
        let content = document.getElementsByClassName("content")[0];
        let icon = document.getElementsByClassName("right")[0].getElementsByTagName("img")[0];
        for(let i = 0; i < company.data.length; i++){
            let pEle = document.createElement("p");
            pEle.innerHTML = company.data[i];
            content.appendChild(pEle);
        }
        icon.src = company.img;
    })
    .catch((err)=>{
        return Promise.reject(err);
    })
    //链接跳转
    let history = document.getElementById("history");
    let now = document.getElementById("now");
    let future = document.getElementById("future");
    now.onclick = function(){
        window.location.href = "../../now.html"+"?id="+encodeURIComponent(company.name);
    }
    history.onclick = function(){
        window.location.href = "../../history.html"+"?id="+encodeURIComponent(company.name);
    }
    future.onclick = function(){
        window.location.href = "../../future.html"+"?id="+encodeURIComponent(company.name);
    }