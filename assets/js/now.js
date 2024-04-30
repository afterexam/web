//import HouseImg from '../../public/home-2.svg'

//请求数据
let allData;
axios.get('./public/json/format.json')
.then((res)=>{
    allData = res.data;
    renderChart(allData);
    renderPublisher(allData);
})
.catch((err)=>{
    return Promise.reject(err);
});

//接受参数
var params = new URLSearchParams(window.location.search);
var companyId = params.get('id');
console.log("id=",companyId)


let content = document.getElementsByClassName("index")[0].getElementsByClassName("content")[0];
content.innerHTML = "首页 -> " + companyId + " -> 感时势";

//索引事件
let img = document.getElementsByClassName("index")[0].getElementsByClassName("front")[0];
let index = document.getElementsByClassName("index")[0].getElementsByClassName("content")[0];
img.onclick = function(){
    index.style.right = "0%";
}
index.onclick = function(){
    index.style.right = "99%";
}

//发布人
function renderPublisher(allData){
    let publisher = document.getElementById("publisher");
    let pubData;

    for(let i = 0; i < allData.length; i++){
        if(allData[i].name == companyId){
            pubData = allData[i].now.person;
        }
    }
    let maxShow = 5;
    maxShow = (maxShow > pubData.length) ? pubData.length : maxShow;
    for(let j = 0; j < maxShow; j++){
        let item = document.createElement("li");
        let nameEle = document.createElement("p");
        let fanEle = document.createElement("p");

        //img src处理
        let baseImg = "data:image/jpeg;base64," + pubData[j].img;
        let imgEle = document.createElement("img");
        imgEle.src = baseImg;
        item.appendChild(imgEle);

        nameEle.className = "name";
        nameEle.innerHTML = pubData[j].per_name;
        fanEle.className = "fans";
        fanEle.innerHTML = "粉丝数 :" + pubData[j].followers;
        item.appendChild(nameEle);
        item.appendChild(fanEle);

        publisher.appendChild(item);
        publisher.innerHTML += "<hr>";
    }
}

//图表
function randomColor() {
    return 'rgb(' + [
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255)
    ].join(',') + ')'
}

function renderChart(allData){
    //数据处理
    let trendData;
    let cloudDataDefault;
    let sentiTrendData;
    let sentiPercentDefault;
    for(let i = 0; i < allData.length; i++){
        if(allData[i].name == companyId){
            trendData = allData[i].now.qushi;
            cloudDataDefault = allData[i].now.words;
            sentiTrendData = allData[i].now.zhishu;
            sentiPercentDefault = allData[i].now.zhanbi;
        }
    }

    let trendGraph = document.getElementById("trend-graph");
    let trendChart = echarts.init(trendGraph);
    let trendOpts = {
    legend:{
        data:["关注度"],
        orient: "horizonal",
        padding: 20,
        textStyle:{
            fontSize: 15
            }
        },
        xAxis:{
            axisLabel:{
                show: true,
                margin: 15
            },
            type: "category",
            name: "日期",
            data: ['3-18~3-20', '3-21~3-23', '3-24~3-26', '3-27~3-29', '3-30~4-1', '4-2~4-4', '4-5~4-7','4-8~4-10','4-11~4-13','4-14~4-16'],
            nameTextStyle:{
                fontSize: "15px",
            }
        },
        yAxis:{
            axisLabel:{
                show: true
            },
            type:"value",
            name:"关注度",
            nameTextStyle:{
                fontSize: 15,
                padding: 5
            }
        },
        series:[{
            type: "bar",
            name: "关注度",
            label:{
                show: false
            },
            data:trendData,
            itemStyle:{
                normal:{
                    color:function(params){
                        //var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622'];
                        var colorList = ['#c23531','#2f4554', '#61a0a8'];
                        // 自动循环已经有的颜色
                        return colorList[params.dataIndex % colorList.length];
                    }
                }
            }
        }],
        tooltip:{
            show: true,
            trigger: "axis",
            triggerOn: "mousemove",
            axisPointer:{
                type: "line",
                label:{
                    show: true
                },
                axis: "x"
            }
        }
    };
    trendChart.setOption(trendOpts);

    //数据处理
    let pEle = document.getElementsByClassName("trend-graph")[0].getElementsByTagName("p")[0];
    let total = 0;
    for(let i = 0; i < trendData.length; i++){
        total += trendData[i];
    }
    pEle.innerHTML += total

    //词云
    let keyData = Object.keys(cloudDataDefault);
    let valueData = Object.values(cloudDataDefault);
    let cloudData = [];
    for(let i = 0; i < keyData.length; i++){
        cloudData.push({
            "name": keyData[i],
            "value": valueData[i]
        });
    }

    let wordcloud = document.getElementById("wordcloud");
    let cloudChart = echarts.init(wordcloud);

    //var maskImage = new Image();
    //maskImage.src = "data:image/png;base64,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";
    let cloudOpts = {
        series: [{
            type: 'wordCloud',
            shape: 'pentagon',
            //maskImage: maskImage,
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '100%',
            height: '100%',
            sizeRange: [25, 90],
            rotationRange: [-90, 90],
            rotationStep: 30,
            gridSize: 8,
            drawOutOfBound: false,
            textStyle: {
                normal: {
                    fontFamily: 'sans-serif',
                    fontWeight: 'normal',
                },
                color: function(params){
                    var colorList = ['#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622','#c23531'];
                    // 自动循环已经有的颜色
                    return colorList[params.dataIndex % colorList.length];
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: cloudData
        }],
        tooltip:{
            show: true,
            trigger: "item",
            triggerOn: "mousemove"
        }
    };
    cloudChart.setOption(cloudOpts);
    /*
    maskImage.onload = function(){   
    console.log(maskImage)
        cloudChart.setOption(cloudOpts);
    };
    */

    let sentiPercent = document.getElementById("senti-percentage");
    let sentiPercentGraph = echarts.init(sentiPercent);
    //数据处理
    let sentiPercentData = [[],[],[]];
    for(let i = 0; i < sentiPercentDefault.length; i++){
        sentiPercentData[0].push(sentiPercentDefault[i][0]);
        sentiPercentData[1].push(sentiPercentDefault[i][1]);
        sentiPercentData[2].push(sentiPercentDefault[i][2]);
    }

    let sentiPercentOpts = {
        legend:{
            data:["消极","中立","积极"],
            padding: 20,
            textStyle:{
                fontSize: 15
                }
            },
            xAxis:{
                axisLabel:{
                    show: true,
                    margin: 15
                },
                type: "category",
                name: "日期",
                data: ['3-18~3-20', '3-21~3-23', '3-24~3-26', '3-27~3-29', '3-30~4-1', '4-2~4-4', '4-5~4-7','4-8~4-10','4-11~4-13','4-14~4-16'],
                nameTextStyle:{
                    fontSize: "15px",
                }
            },
            yAxis:{
                axisLabel:{
                    show: true
                },
                type:"value",
                name:"占比",
                nameTextStyle:{
                    fontSize: 15,
                    padding: 5
                }
            },
            series:[{
                type: "bar",
                name: "消极",
                label:{
                    show: false
                },
                data:sentiPercentData[0],
                stack: 1,
                itemStyle:{
                    normal:{
                        color:'#91c7ae'
                    }
                }
            },{
                type: "bar",
                name: "中立",
                label:{
                    show: false
                },
                data:sentiPercentData[1],
                stack: 1,
                itemStyle:{
                    normal:{
                        color:'#749f83'
                    }
                }
            },{
                type: "bar",
                name: "积极",
                label:{
                    show: false
                },
                data:sentiPercentData[2],
                stack: 1,
                itemStyle:{
                    normal:{
                        color: '#61c090'
                    }
                }
            }],
            tooltip:{
                show: true,
                trigger: "axis",
                triggerOn: "mousemove",
                axisPointer:{
                    type: "line",
                    label:{
                        show: true
                    },
                    axis: "x"
                }
            }
    };
    sentiPercentGraph.setOption(sentiPercentOpts);

    let sentiTrend = document.getElementById("senti-trend");
    let sentiTrendGraph = echarts.init(sentiTrend);
    let sentiTrendOpts = {
        legend:{
            data:["情感指数"],
            orient: "horizonal",
            padding: 20,
            textStyle:{
                fontSize: 15
                }
            },
            xAxis:{
                axisLabel:{
                    show: true,
                    margin: 15
                },
                type: "category",
                name: "日期",
                data: ['3-18~3-20', '3-21~3-23', '3-24~3-26', '3-27~3-29', '3-30~4-1', '4-2~4-4', '4-5~4-7','4-8~4-10','4-11~4-13','4-14~4-16'],
                nameTextStyle:{
                    fontSize: "15px",
                }
            },
            yAxis:{
                axisLabel:{
                    show: true
                },
                type:"value",
                name:"情感指数",
                nameTextStyle:{
                    fontSize: 15,
                    padding: 5
                }
            },
            series:[{
                type: "line",
                name: "情感指数",
                label:{
                    show: false
                },
                data:sentiTrendData,
                itemStyle:{
                    normal:{
                        color:'#61a0a8'
                    },
                    borderWidth: 10
                },
                symbolSize: 8,
                lineStyle:{
                    width: 3
                }
            }],
            tooltip:{
                show: true,
                trigger: "axis",
                triggerOn: "mousemove",
                axisPointer:{
                    type: "line",
                    label:{
                        show: true
                    },
                    axis: "x"
                }
            }
    };
    sentiTrendGraph.setOption(sentiTrendOpts);
}