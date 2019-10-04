<template>
    <div class="wrapper">
        <div class="school-home-title flex-row">
            <div class="school-home-title-left flex-row">
                <span v-if="$route.query.type_id=='10'">均价走势</span>
                <span v-else>学区经济</span>
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
        <div class="echarts">
            <!-- <chart v-if="init_echart" style="height:100%" :options="line"></chart> -->
            <div style="height:100%" ref="mychart"></div>
            <!-- <div v-else style="height:5rem;"></div> -->
        </div>
        <div class="echarts-foot flex-row">
            <div class="echart-foot-item-wrapper flex-row">
                <div class="echart-foot-item flex-row"
                @click="gps_school_house(item)" 
                v-for="item in line.series" :key="item.id"
                :style="'background:'+ item.color+';box-shadow:1px 1px 5px 1px '+item.color+';'">
                    <span>{{item.name}}</span>
                </div>
            </div>
            <div class="echart-foot-action flex-row" v-if="$route.query.type_id!='10'">
                <div v-show="key_num>0" @click="echart_foot_action('reduce')">
                    <i class="iconfont icon-sanjiaoleft" style="color:#34C3CB"></i>
                </div>
                <div v-show="key_num<=0">
                    <i class="iconfont icon-sanjiaoleft"></i>
                </div>
                <span>换下一批</span>
                <div v-show="key_num<hourse.length-3" @click="echart_foot_action('add')">
                    <i class="iconfont icon-sanjiaoright" style="color:#34C3CB"></i>
                </div>
                <div v-show="key_num>=hourse.length-3">
                    <i class="iconfont icon-sanjiaoright"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components:{

    },
    props:{
        hourse: {
            type: Array
        }
    },
    data(){
        return {

            // init_echart: true,
            key_num: 0,
            line_colors:['#FE7D75','#FBD333','#29AEFF','#7782fc','#34c3cb'],
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
                    splitNumber: 4,
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
                    min: null,
                    max: null
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
            accord: '6',
        }
    },
    watch:{
        'accord':function() {
            this.line.series = [];
            this.hourse_chart(this.accord);
        },
        hourse: {
            deep: true,
            handler: function() {
                this.updata_hourse();
            }
        }
    },
    computed:{

        // hourse_type: function() {          
        //     let obj = {};
        //     let hourse_type = []           
        //     for(let item of this.hourse) {
        //         if(!obj[item.f_id]) {
        //             hourse_type.push(item);
        //             obj[item.f_id] = true;
        //         }                                           
        //     }
        //     return hourse_type;
        // }
    },
    methods:{
        echart_foot_action(code) {
            if(code=='add') {               
                this.key_num+=3;
            }
            if(code=='reduce') {
                this.key_num = this.key_num-3;
            }
       
            this.line.series = [];
            // this.init_echart = false;
            setTimeout(()=>{
                this.hourse_chart(this.accord)
            },200)    
        },
        updata_hourse() {
            this.line.series = [];
            setTimeout(()=>{
                this.hourse_chart(6)
            },200)
            
        },
        gps_school_house(item) {
            if(this.$route.query.type_id!='10') {
                this.$router.push({
                    path: '/houses_info',
                    query: {
                        id: item.id,
                        type_id: '10'
                    }
                });
                return;
            }
            let str = item._xy;
            let x = Number(str.substr(0,str.length-1).substr(1,str.length-1).split(',')[0]);
            let y = Number(str.substr(0,str.length-1).substr(1,str.length-1).split(',')[1]);
            if(!_DEV_) {
                android.gps_school_house(x,y)
            }
        },
        hourse_chart(month) {
            // this.init_echart = true;

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
            
            let total_list = [];
            for(let i=0;i<this.hourse.length;i++) {
                this.hourse[i].data_list = [];
                this.hourse[i].arr = this.hourse[i].anjukeprice.length>0?JSON.parse(this.hourse[i].anjukeprice):[];              
                if(this.hourse[i].anjukeprice.length>0) {
                    for(let item_ of this.hourse[i].arr) {
                        let ok = false;
                        let k = null;
                        for(let _item_ of x_list) {
                            if(_item_==Object.getOwnPropertyNames(item_)[0]){
                                ok=true;
                                k=_item_
                                // this.hourse[i].data_list.push(item_[_item_]/10000)
                                break;
                            }
                        }
                        if(ok) {
                            this.hourse[i].data_list.push(item_[k]/10000)
                        }
                        
                    }
                }

                if(i>=0+this.key_num&&i<3+this.key_num) {
                    this.line.series.push({
                        id: this.hourse[i].f_id,
                        name: this.hourse[i].name,
                        type: 'line',
                        color: this.line_colors[i%this.line_colors.length],
                        smooth: true,
                        symbolSize: 1,
                        data: this.hourse[i].data_list,
                        _xy: this.hourse[i].xy,
                        
                    })
                }
                total_list = [...total_list,...this.hourse[i].data_list]
                
            }
            // console.log(total_list)
            this.line.xAxis.data = x_list;
            
            // let total = 0;
            // for(let item of total_list) {
            //     total = total + item
            // }
            let min = Math.min.apply(null, total_list);
            let max = Math.max.apply(null, total_list);
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

            // this.line.yAxis.min = Math.min.apply(null, total_list)
            // this.line.yAxis.max = Math.max.apply(null, total_list)
            // this.line.yAxis.minInterval = (total/total_list.length).toFixed(2);
            // this.line.yAxis.maxInterval = (total/total_list.length).toFixed(2);
            if(add>0.5&&add<=1.5) {
                this.line.yAxis.minInterval = 0.2
                this.line.yAxis.maxInterval = 0.2
            }else {
                this.line.yAxis.minInterval = 0.5
                this.line.yAxis.maxInterval = 0.5
            } 
            let echart = this.$refs.mychart
            let myechart = window.echarts.init(echart);
                myechart.clear();
                myechart.setOption(this.line);
        },

    },
    created(){},
    beforeMountes() {
        
    },
    mounted(){  
        this.$nextTick(()=>{

            this.hourse_chart(6);
        })
    },
    updated() {
        
    },
    deactivated() {
        
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    padding: 0 0.3rem 1rem 0.3rem;
    background: #fff;
    font-size: 0.26rem;
}
.school-home-title {
    justify-content: space-between;
    align-items: center;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
    // margin-bottom: 0.4rem;
}
.school-home-title-left {
    align-items: center;
    font-size: .38rem
}
.school-home-title-left::before {
    content: '';
    display: inline-block;
    height: .38rem;
    border-left: 4px solid #34c3cb;
    margin-right: .2rem; 
}

.echarts {
    width: 100%;
    height: 5rem;
    text-align: left;
    box-shadow: 1px 1px 10px 1px rgba(77, 77, 77, 0.1);
    margin-top: .2rem;
}
.echarts-foot {
    position: relative;
    margin-top: 0.4rem;
    // margin-right: -.49rem;
    flex-wrap: wrap;
    padding-right: 2.05rem;
}
.echart-foot-item {
    align-items: center;
    margin-right: .49rem;
    margin-bottom: .2rem;
    height: .5rem;
    padding: 0 .16rem;
    border-radius: .5rem;
}
.echart-foot-item:active {
    opacity: .7;
}
.echart-foot-item-wrapper {
    flex-wrap: wrap;
    margin-right:-.49rem;
    width:100%;
    min-height: 1.5rem;
    font-size: .24rem;
    color: #fff;
}
// .echart-foot-item-icon {
//     width: .26rem;
//     height: .26rem;
//     border-radius: .26rem;
//     margin-right: .1rem;
// }
.echart-foot-action {
    position: absolute;
    right: 0;
    top: 0;
    align-items: center;
}
.echart-foot-action div:first-child,.echart-foot-action div:nth-child(2){
    padding-right: .25rem;
}
.echart-foot-action div{
    padding-left: .25rem;
}
</style>