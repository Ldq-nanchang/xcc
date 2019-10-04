<template>
    <div class="wrapper flex-row">
        <div class="school-team-charts">
            <!-- <chart style="height:100%;width:100%" :options="item.pie" @click="upDataSchoolIndex"></chart> -->
            <div style="height:100%;width:100%" ref="mychart"></div>
        </div>
        <div class="school-texm-txt flex-col">
            <div class="school-texm-txt-title flex-row">
                <div class="school-team-txt-icon" :style="'background-color:'+schoolTeamText.color"></div>
                <span>{{schoolTeamText.title}}</span>
            </div>
            <div :style="'color:'+schoolTeamText.color" v-if="schoolTeamText.proportion||schoolTeamText.proportion==0">
                <!-- <span v-if="schoolTeamText.proportion==0">{{schoolTeamText.proportion}}</span> -->
                <yd-countup
                duration="1"
                :endnum="schoolTeamText.proportion" suffix="%"></yd-countup>
            </div>
            <p>{{schoolTeamText.title}}{{schoolTeamText.count}}人</p>
        </div>
    </div>
</template>

<script>
// import {CountUp} from 'vue-ydui/dist/lib.rem/countup';
// import ECharts from 'vue-echarts';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/tooltip';
export default {
    components:{
        // "yd-countup": CountUp,
        // 'chart': ECharts,
    },
    props:{
        item: {
            type: Object
        }
    },
    data(){
        return {
            schoolTeamText: {
                title:"初一招生总数",
                proportion_xy: 0,
                count: 335,
                color: '#fbd333'
            },
        }
    },
    watch:{
        // "item": {
        //     function(n) {
        //         console.log(n)
        //     },
        //     deep: true
        // }
    },
    computed:{},
    methods:{
        upDataSchoolIndex(event) {
            this.schoolTeamText.title = event.name;
            this.schoolTeamText.proportion = event.percent;
            this.schoolTeamText.count = event.value;
            this.schoolTeamText.color = event.color;
        },
        // upDataSchoolExam(event) {
        //     this.schoolExamText.title = event.name;
        //     this.schoolExamText.proportion = event.percent;
        //     this.schoolExamText.count = event.value;
        //     this.schoolExamText.color = event.color;
        // }
        initSchoolIndex() {
            this.schoolTeamText.title = this.item.list[0].f_itemname;
            this.schoolTeamText.proportion = this.item.totle==0?this.item.totle:this.item.list[0].propertyvalue/this.item.totle*100;
            this.schoolTeamText.count = this.item.list[0].propertyvalue;
            this.schoolTeamText.color = this.item.pie.series[0].color[0];
            var echart = this.$refs.mychart
            var myechart = window.echarts.init(echart);
                myechart.clear();
                myechart.setOption(this.item.pie);
                myechart.on("click",this.upDataSchoolIndex)
        },

    },
    created(){},
    mounted(){
        setTimeout(()=>{
            this.initSchoolIndex();
            
        })  
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
}
.school-team-charts {
    width: 3.2rem;
    height: 3.6rem;
}
.school-texm-txt {
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 3.2rem);
    padding: 0.6rem 0;
    padding-left: 0.6rem;
}
.school-texm-txt-title {
    align-items: center;
}
.school-team-txt-icon {
    width: 0.26rem;
    height: 0.26rem;
    border-radius: 0.26rem;
    margin-right: 0.1rem;
}
.school-texm-txt div:nth-child(2) {
    font-size: 0.46rem;
}
</style>