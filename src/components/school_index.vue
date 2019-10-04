<template>
    <div class="wrapper">
        <div class="school-index-title flex-row">
            <div class="school-index-title-left flex-row">
                <span>指标数据</span>
            </div>
            <ul class="school-index-years flex-row">
                <li :class="year_active==item.year?'school-index-year year-active':'school-index-year'"
                 v-for="item in schooltg" :key="item.year"
                 @click="year_action(item.year)">
                    <span>{{item.year}}</span>
                </li>
            </ul>
        </div>
        <schoolIndexPlan v-if="year_data.list&&year_data.list.length>0&&echartState" :list="year_data.list"/>
    </div>
</template>

<script>
import schoolIndexPlan from '@/components/school_index_plan.vue'
export default {
    components:{
        schoolIndexPlan
    },
    props:{
        schooltg: {
            type: Array
        }
    },
    data(){
        return {
            echartState: true,
            year_data: {},
            student: {},
            teacher: {},
            year_active: null,
        }
    },
    watch:{
        "year_active": function() {
            this.echartState = false;
            setTimeout(()=>{
                for(let item of this.schooltg) {
                    if(this.year_active == item.year) {
                        this.year_data = item;
                        this.echartState = true;
                    }
                }
            })
        },
        
    },
    computed:{},
    methods:{
        year_action(year){
            this.year_active = year;
        },

    },
    created(){},
    mounted(){
        setTimeout(()=>{
            this.year_active = this.schooltg[0].year
            this.year_data = this.schooltg[0];
        })
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    padding: 0 0.3rem .5rem 0.3rem;
    background: #fff;
    font-size: 0.26rem;
    color: #000;
}
.school-index-title {
    justify-content: space-between;
    margin-bottom: 0.4rem;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
}
.school-index-title-left {
    align-items: center;
}
.school-index-title-left::before {
    content: '';
    display: inline-block;
    height: .38rem;
    border-left: 4px solid #34c3cb;
    margin-right: .2rem; 
}
.school-index-years {
    align-items: center;
}
.school-index-year {
    width: .78rem;
    height: .4rem;
    border-radius: .4rem;
    font-size: .26rem;
    margin-right: .18rem;
    line-height: .4rem;
    text-align: center;
}
.year-active {
    background: #34C3CB;
    color: #fff;
}

</style>