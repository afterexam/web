//请求数据
let allData;
axios.get('../../public/json/总体界面/cre_climate_index.json')
.then((res)=>{
    allData = res.data;
    renderClimateChart();
})
.catch((err)=>{
    return Promise.reject(err);
});

let roseData = [];
axios.get('../../public/json/总体界面/genetic_indicators.json')
.then((res)=>{
    let defaultData = res.data.indicators;
    for(let i = 0; i < defaultData.length; i++){
        roseData.push({
            "value": defaultData[i].weight,
            "name": defaultData[i].name
        });
    }
    renderRoseChart();
})
.catch((err)=>{
    return Promise.reject(err);
});

function renderClimateChart(){
    //房地产景气指数图
    let climateDOM = document.getElementById("climate");
    let climateChart = echarts.init(climateDOM);
    let xData = [];
    let climateData = [];
    for(let i = 0; i < allData.length; i++){
        if(i % 3 != 0){
            continue;
        }
        let defaultData= allData[i]["月份"];
        defaultData = String(defaultData);
        defaultData = defaultData.slice(0,4) + "-" + defaultData.slice(4);
        xData.push(defaultData);
        climateData.push(allData[i]["国房景气指数"]);
    }
    let climateOpts = {
        title:{
            show: false
        },
        legend:{
            data:["房地产行业景气指数"],
            padding: 20,
            textStyle:{
                fontSize: 16
            }
        },
        xAxis:{
            axisLabel: {
                show: true,
                margin: 15
            },
            name: "年份",
            data : xData,
            type: "category",
            nameTextStyle:{
                fontSize: "15px",
                padding: 5,
            
            }
        },
        yAxis:{
            name: "房地产行业景气指数",
            type: "value",
            axisLabel:{
                show: true,
                margin: 15
            },
            nameTextStyle:{
                fontSize: "15px",
                padding: 5
            
            },
            scale: true
        },
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
        },
        series:[{
            type:"line",
            smooth: true,
            name: "房地产行业景气指数",
            data:climateData
        }],
        toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            },
            right: 10,
            top: 5
        }
    };
    climateChart.setOption(climateOpts);
}

function renderRoseChart(){
    //玫瑰图
    let roseDOM = document.getElementById("rose");
    let roseChart = echarts.init(roseDOM);
    let roseOpts = {
        title: {
            show: true,
            text: "供应商受影响指标权重",
            left: "50%",
            padding: 10
        },
        series: [
            {
                name: '供应商受影响指标权重',
                type: 'pie',
                radius: [20, 160],
                center: ['40%', '50%'],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 8
                },
                data: roseData
            }
        ],
        legend: {
            right: "right",
            bottom : "bottom"
        },
        toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            },
            right: 10,
            top: 5
        },
        tooltip: {
            trigger: "item",
            triggerOn: "mousemove"
        }
    };
    roseChart.setOption(roseOpts);
}