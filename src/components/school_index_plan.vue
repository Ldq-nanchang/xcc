<template>
    <div class="wrapper" style="padding-left:0;padding-right:0">
        <div class="echart-item flex-row" v-for="(item,k) in list" :key="k">           
            <schoolIndexPlanS :item="item"/>
        </div>
    </div>
</template>

<script>
import schoolIndexPlanS from '@/components/school_index_plan_.vue'
export default {
    components:{
        schoolIndexPlanS
    },
    props:{
        list: {
            type: Array
        }
    },
    data(){
        return {
            pie: {

            },

            schoolExamText: {
                title:"一类重点高中录取率",
                proportion: 0,
                count: 335,
                color: '#fe7e75'
            },
        }
    },
    watch:{
        // "list": {
        //     function(n) {
        //         console.log(n)
        //     },
        //     deep: true
        // }
    },
    computed:{},
    methods:{
        init_data() {
            for(let item of this.list) {
                item.list_ = [];
                item.totle = 0;
                for(let item_ of item.list) {
                    item.list_.push({
                        value: Number(item_.propertyvalue),
                        name: item_.f_itemname
                    })
                    item.totle = Number(item_.propertyvalue) + item.totle;
                }
                item.pie = {
                    title: {
                        text: item.title + item.totle + '人',
                        textStyle: {
                            fontSize: 13,
                            align: 'center'
                        }
                    },
                    tooltip: {
                        show: false,
                        // trigger: 'item',
                        // formatter: "{a}{b}<br> {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['初一招生总数','初二人数','初三人数']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        // bottom: '3%',
                        top: '10%',
                        containLabel: true
                    },
                    series: [
                        {
                            name:'',
                            type:'pie',
                            hoverOffset: 6,
                            radius: ['30%', '80%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:item.list_,
                            color: ["#fbd333","#2aaeff","#fe7e75","#0fd26a","#CC33FF","#FFCCFF"]
                        }
                    ]
                }
                
            }
        }
    },
    created(){},
    beforeMount() {
        window.test = this.init_data;
        this.init_data();
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    text-align: left;
}
.echart-item {
    margin-bottom: .2rem;
    box-shadow: 1px 1px 10px 1px rgba(77, 77, 77, 0.2);
    padding: .3rem;
    border-radius: 2px;
}

</style>