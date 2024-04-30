接受参数
var params = new URLSearchParams(window.location.search);
var companyId = params.get('id');

let content = document.getElementsByClassName("index")[0].getElementsByClassName("content")[0];
content.innerHTML = "首页 -> " + companyId + " -> 听历史";

//请求数据
let historyData;
axios.get('./public/json/format.json')
.then((res)=>{
    let allData = res.data;

    for(let i = 0; i < allData.length; i++){
        if(allData[i].name == companyId){
            historyData = allData[i].history;
        }
    }

    renderRating();
    renderRadar();
})
.catch((err)=>{
    return Promise.reject(err);
});

//索引事件
let img = document.getElementsByClassName("index")[0].getElementsByClassName("front")[0];
let index = document.getElementsByClassName("index")[0].getElementsByClassName("content")[0];
img.onclick = function(){
    index.style.right = "0%";
}
index.onclick = function(){
    index.style.right = "99%";
}

//评分渲染
function renderRating(){
    let container = document.getElementById("item");
    let itemList = historyData.company;

    for(let i = 0; i < itemList.length; i++){
        let nameEle = document.createElement("span");
        nameEle.className = "name";
        nameEle.innerHTML = itemList[i]["供应商"];

        let rating = document.createElement("span");
        rating.className = "rating";
        let score = itemList[i]["供应商等级"];
        rating.innerHTML = score;

        if(score == 'AAA'){
            rating.classList.add("rating-1");
        }
        else if(score == 'AA'){
            rating.classList.add("rating-2");
        }
        else if(score == 'A'){
            rating.classList.add("rating-3");
        }
        else if(score == 'BBB'){
            rating.classList.add("rating-4");
        }
        else if(score == 'BB' || score == 'B'){
            rating.classList.add("rating-5");
        }
        else if(score == '无'){
            rating.classList.add("rating-unknown");
        }

        nameEle.addEventListener("click",function clickHandler(e){
            //修改报告名
            title.innerHTML = e.target.innerHTML + "<br>健康程度报告";
        });

        let curItem = document.createElement("li");
        curItem.className = "item";
        curItem.appendChild(nameEle);
        curItem.appendChild(rating);
        container.appendChild(curItem);
    }

    //分析报告
    var title = document.getElementsByClassName("report")[0].getElementsByClassName("title")[0];
    title.innerHTML = itemList[0]["供应商"] + "<br>健康程度报告";
}

//图表渲染
function renderRadar(){
    let itemList = historyData.company;
    let radarData = [{
        name: itemList[0]["供应商"],
        value: [itemList[0]["偿债能力指标"],itemList[0]["营运能力指标"],itemList[0]["盈利能力指标"],itemList[0]["总发展状况"],itemList[0]["发展能力"]]
    }];
    let companyList = document.getElementById("item").getElementsByClassName("name");
    for(let i = 0; i < companyList.length; i++){
        companyList[i].addEventListener("click",function(e){
            let thisCompany = e.target.innerHTML;
            for(let j = 0; j < itemList.length; j++){
                if(itemList[j]["供应商"] == thisCompany){
                    radarData = [{
                        name: thisCompany,
                        value: [itemList[j]["偿债能力指标"],itemList[j]["营运能力指标"],itemList[j]["盈利能力指标"],itemList[j]["总发展状况"],itemList[j]["发展能力"]]
                    }];
                    radarChart.setOption({
                        series:{
                            data: radarData
                        }
                    })
                }
            }
        })
    }


    let radarChart = echarts.init(document.getElementById("radar"));
    let radarOpts = {
        title:{
            show: true
        },
        legend:{
            data: ["分数"],
            right: "right"
        },
        radar:{
            //坐标系
            indicator: [
                { name: '偿债能力指标', max: 100 },
                { name: '营运能力指标', max: 100 },
                { name: '盈利能力\n指标', max: 100 },
                { name: '总发展状况', max: 100 },
                { name: '发展能力', max: 100 }
            ],
            startAngle: 45,
            axisName:{
                show: true,
                color: "black",
                fontSize: 15,
                lineHeight: 20
            },
            
            /*
            splitNumber: 2,
            splitArea:{
                areaStyle:{
                    color: ["rgba(195, 54, 54, 0.882)","rgba(250,250,250,0.3)"],
                    opacity: 0.9
                }
            },
            */
            axisLine:{
                show: true
            },
            shape: "circle"
        },
        tooltip:{
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
        },
        series: [
            {
              name: '分数',
              type: 'radar',
              data: radarData
            }
          ]
    };
    radarChart.setOption(radarOpts);
}
