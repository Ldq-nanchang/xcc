<template>
    <div class="wrapper" style="background: #f6f6f6">
        <div class="school-home-title flex-row">
            <div class="school-home-title-left">
                <span>{{gps_school_house.name}}</span>
            </div>
            <div class="school-home-title-right flex-row">
                <yd-radio-group v-model="accord" color="#34c3cb">
                    <yd-radio val="6">
                        <span>半年</span>
                    </yd-radio>
                    <yd-radio val="12">
                        <span>一年</span>
                    </yd-radio>
                </yd-radio-group>
            </div>
        </div>
        <div style="width:100%;height:3.4rem;text-align:left;">
            <!-- <chart style="width:100%;height:100%" :options="line"></chart> -->
            <div style="height:100%;width:100%;" ref="mychart"></div>
        </div>
        
    </div>
</template>

<script>

// import ECharts from 'vue-echarts';
// import 'echarts/lib/chart/line';
// import 'echarts/lib/component/tooltip';

export default {
    components:{
        // 'chart': ECharts
    },
    props:{
        gps_school_house: {
            type: Object
        }
    },
    data(){
        return {
            num_price: [],
            min: null,
            max: null,
            accord: '6',
            now_year: (new Date).getFullYear(),
            now_month: (new Date).getMonth()+1,
            line: {
                title: {
                        // text: 'Try Dragging these Points'
                },
                
                legend: {
                    x: 'left',
                    data:['1月', '2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    selected:{
                        '11月': true
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    show: false,
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [1,2,3,4,5,6,7,8,9,10,11,12],                   
                },
                yAxis: {
                    type: 'value',
                    splitNumber: 2,
                    minInterval:null,
                    maxInterval:null,
                    axisLabel: {
                        formatter: '{value}w'
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    lineStyle: {
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    },
                    // min: null,
                    // max: null

                },
                series: [
                    // {
                    //     id: 'a',
                    //     name:'恒大名都',
                    //     type: 'line',
                    //     color: "#fd7d74",
                    //     smooth: true,
                    //     symbolSize: symbolSize,
                    //     data: data
                    // },
                    // {
                    //     id: 'b',
                    //     name:'金域华府',
                    //     type: 'line',
                    //     color: "#fbd333",
                    //     smooth: true,
                    //     symbolSize: symbolSize,
                    //     data: data_s
                    // },
                    // {
                    //     id: 'c',
                    //     name:'阳光府邸',
                    //     type: 'line',
                    //     color: "#2aaeff",
                    //     smooth: true,
                    //     symbolSize: symbolSize,
                    //     data: data_ss
                    // },
                ]
            },
        }
    },
    watch:{
        'accord':function() {
            this.line.series = [];
            this.hourse_chart(this.accord);
        }
    },
    computed:{},
    methods:{
        hourse_chart(month) {
            let subtrahend = this.now_month-month;
            let x_list = [];
            if(subtrahend>=0){
                for(let i=0;i<month;i++) {
                    if(this.now_month-i<10) {
                        x_list.push(this.now_year +'0'+ (this.now_month-i));
                    }else {
                        x_list.push(this.now_year +''+ (this.now_month-i));
                    }    
                }   
            }else {
                for(let i=0;i<this.now_month;i++) {
                    if(this.now_month-i<=9) {
                        x_list.push(this.now_year +'0'+ (this.now_month-i));
                    }else{
                        x_list.push(this.now_year +''+ (this.now_month-i));
                    }    
                }
                for(let j=13+subtrahend;j<=12;j++) {
                    if(j<10) {
                        x_list.push((this.now_year-1) +'0'+ j);
                    }else {
                        x_list.push((this.now_year-1) +''+ j);
                    }  
                }   
            }
            function sortNumber(a,b)
            {
                return a - b
            }
            x_list.sort(sortNumber)

            this.gps_school_house.data_list = [];
            if(!this.gps_school_house.anjukeprice) {
                this.gps_school_house.arr = [];
            }else {
                this.gps_school_house.arr = JSON.parse(this.gps_school_house.anjukeprice);
            }
                          
            for(let item_ of this.gps_school_house.arr) {
                Object.values(item_).forEach(value =>
                {
                    this.num_price.push(Number(value));
                });
                

                for(let _item_ of x_list) {
                    if(_item_==Object.getOwnPropertyNames(item_)[0]){
                        this.gps_school_house.data_list.push(item_[_item_]/10000)
                    }
                }
            }

            this.line.series.push({
                id: this.gps_school_house.f_id,
                name: this.gps_school_house.name,
                type: 'line',
                color: '#34C3CB',
                smooth: true,
                symbolSize: 1,
                data: this.gps_school_house.data_list
            })           
            this.line.xAxis.data = x_list;
            // let total = 0;
            // for(let item of this.gps_school_house.data_list) {
            //     total = total + item
            // }
            let min = Math.min.apply(null, this.gps_school_house.data_list);
            let max = Math.max.apply(null, this.gps_school_house.data_list);
            let add = (max-min)/0.5;
            if(min>=0&&min<0.5) {
                this.line.yAxis.min = 0
            }else if(min>=0.5&&min<1) {
                this.line.yAxis.min = 0.5
            }else if(min>=1&&min<1.5) {
                this.line.yAxis.min = 1
            }else if(min>=1.5&&min<2) {
                this.line.yAxis.min = 1.5
            }else if(min>=2&&min<2.5) {
                this.line.yAxis.min = 2
            }else if(min>=2.5&&min<3) {
                this.line.yAxis.min = 2.5
            }else if(min>=3&&min<3.5) {
                this.line.yAxis.min = 3
            }else if(min>=3.5&&min<4) {
                this.line.yAxis.min = 3.5
            }
            if(add>0.5&&add<=1.5) {
                this.line.yAxis.minInterval = 0.2
                this.line.yAxis.maxInterval = 0.2
            }else {
                this.line.yAxis.minInterval = 0.5
                this.line.yAxis.maxInterval = 0.5
            } 

            // this.line.yAxis.max = Math.max.apply(null, this.gps_school_house.data_list)
            // this.line.yAxis.minInterval = (total/this.gps_school_house.data_list.length).toFixed(2);
            // this.line.yAxis.maxInterval = (total/this.gps_school_house.data_list.length).toFixed(2);

        let echart = this.$refs.mychart
        let myechart = window.echarts.init(echart);
            myechart.setOption(this.line)
        },
    },
    created(){},
    mounted(){   
        this.hourse_chart(this.accord)
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
    width: 100vw;
    padding: .3rem;
    border-bottom: 1px solid #E6E6E6;
    min-height: 4rem;
}
.school-home-title {
    justify-content: space-between;
    padding-left: 0.2rem;
    font-size: 0.34rem;
    color: #000;
    text-align: left;
    // margin-bottom: 0.4rem;
}
</style>