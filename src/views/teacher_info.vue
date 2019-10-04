<template>
    <div class="wrapper">
        <teacherInfoTop v-on:data_school_teacher="data_school_body"/>
        <div class="merit" style="padding-bottom:0" v-if="$route.query.type_id=='06'">
            <div class="title flex-row">
                <p>就职于</p>
            </div>
            <div v-if="teacher_info.baseinfo">{{teacher_info.baseinfo.inaugurate}}</div>
            <div v-else style="padding: 0 .3rem">
                <div class="headstone margin-bt-02" style="width:100%;height:.24rem;border-radius:.24rem"></div>
                <div class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></div>
            </div>
        </div>
        <div class="merit" v-if="$route.query.type_id=='06'">
            <div class="title flex-row">
                <p>教学理念</p>
            </div>
            <div>信息采集中...</div>
        </div>

        <div class="family-teacher-content" v-if="$route.query.type_id=='07'">
            <div class="basic-information">
                <div class="title flex-row">
                    <span>基本信息</span>
                </div>
                <ul class="basic-information-list">
                    <li class="basic-information-item flex-row">
                        <div class="basic-information-item-left"><span>所在院校</span></div>
                        <div class="basic-information-item-right">
                            <p v-if="teacher_info.baseinfo">{{teacher_info.baseinfo.schoolname}}</p>
                            <p v-else class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                        </div>
                    </li>
                    <li class="basic-information-item flex-row">
                        <div class="basic-information-item-left"><span>所学专业</span></div>
                        <div class="basic-information-item-right">
                            <p v-if="teacher_info.baseinfo">{{teacher_info.baseinfo.profession}}</p>
                            <p v-else class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                        </div>
                    </li>
                    <li class="basic-information-item flex-row">
                        <div class="basic-information-item-left"><span>目前身份</span></div>
                        <div class="basic-information-item-right">
                            <p v-if="teacher_info.baseinfo">{{teacher_info.baseinfo.currentidentity}}</p>
                            <p v-else class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                        </div>
                    </li>
                    <li class="basic-information-item flex-row">
                        <div class="basic-information-item-left"><span>教学经验</span></div>
                        <div class="basic-information-item-right">
                            <p v-if="teacher_info.baseinfo">{{teacher_info.baseinfo.schoolage}}</p>
                            <p v-else class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                        </div>
                    </li>
                    <li class="basic-information-item flex-row">
                        <div class="basic-information-item-left"><span>授课方式</span></div>
                        <div class="basic-information-item-right">
                            <p v-if="teacher_info.baseinfo">{{teacher_info.baseinfo.teachingmethod}}</p>
                            <p v-else class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                        </div>
                    </li>
                    <li class="basic-information-item flex-row">
                        <div class="basic-information-item-left"><span>擅长科目</span></div>
                        <div class="basic-information-item-right">
                            <p v-if="teacher_info.baseinfo">{{teacher_info.baseinfo.goodsubjectname}}</p>
                            <p v-else class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                        </div>
                    </li>
                    <li class="basic-information-item flex-row">
                        <div class="basic-information-item-left"><span>目前住址</span></div>
                        <div class="basic-information-item-right">
                            <p v-if="teacher_info.baseinfo">{{teacher_info.baseinfo.address}}</p>
                            <p v-else class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="teaching-area">
                <div class="title flex-row">
                    <p>授课区域</p>
                </div>
                <div v-if="teacher_info.baseinfo" class="teaching-area-info">
                    <span v-if="teacher_info.baseinfo.subjectarea">{{teacher_info.baseinfo.subjectarea}}</span>
                    <span v-else>暂无相关信息...</span>
                </div>
                <div v-else>
                    <p class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                    <p class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                </div>
            </div>
            <div class="teaching-cost">
                <div class="title flex-row">
                    <p>课时费用</p>
                </div>
                <div  v-if="teacher_info.baseinfo" class="teaching-cost-info">
                    <span v-if="teacher_info.baseinfo.classfee">{{teacher_info.baseinfo.classfee}}</span>
                    <span v-else>暂无相关信息...</span>
                </div>
                <div v-else>
                    <p class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                    <p class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                </div>
            </div>
            <div class="teaching-time">
                <div class="title flex-row">
                    <p>授课时间</p>
                </div>
                <div  v-if="teacher_info.baseinfo" class="teaching-time-info">
                    <span v-if="teacher_info.baseinfo.graduateschool">{{teacher_info.baseinfo.graduateschool}}</span>
                    <span v-else>暂无相关信息...</span>
                </div>
                <div v-else>
                    <p class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                    <p class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                </div>
            </div>
            <div class="evaluate" v-if="false">
                <div class="title flex-row">
                    <p>家长评价 (2)</p>
                    <span class="title-more">
                        <span>查看全部</span>
                        <i class="iconfont icon-sanjiaoright"></i>
                    </span>
                </div>
                <ul class="evaluate-list">
                    <li class="evaluate-item">
                        <div class="evaluate-item-top flex-row">
                            <div class="evaluate-item-left flex-row">
                                <div class="evaluate-item-left-icon">
                                    <img src="../assets/evaluate_icon.jpg" alt="">
                                </div>
                                <div class="evaluate-item-left-content flex-col">
                                    <p>家长b</p>
                                    <p style="color:#9D9D9D">2018-8-22</p>
                                </div>
                            </div>
                            <div class="evaluate-item-right">
                                <span>满意度：</span>
                                <i class="iconfont icon-star"></i>
                                <i class="iconfont icon-star"></i>
                                <i class="iconfont icon-star"></i>
                                <i class="iconfont icon-star"></i>
                                <i class="iconfont icon-star"></i>
                                <i class="iconfont icon-star"></i>
                            </div>
                        </div>
                        <div class="evaluate-item-text">
                            <span>老师态度诚恳认真，文化素养高！</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <courseRecommend/>     
        <!-- <div class="cover-component" v-show="$store.state.coverComponent"></div> -->
    </div>
</template>

<script>
// @ is an alias to /src
import teacherInfoTop from '@/components/teacher_info_top.vue';
import courseRecommend from '@/components/course_recommend.vue';
export default {
    components:{
        teacherInfoTop,
        courseRecommend
    },
    props:{},
    data(){
        return {
            teacher_info: {}
        }
    },
    watch:{},
    computed:{},
    methods:{
        data_school_body(data) {
            this.teacher_info = data;
        },
    },
    created(){
        // this.$store.commit('updataCoverComponentStatus',true);
    },
    mounted(){
        //   alert(window.location.href)
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #000;
}
.merit {
    position: relative;
    padding: 0.58rem 0.3rem 0.85rem 0.3rem;
    background-color: #fff;
    color: #878787;
    text-align: left; 
}
.title {
    position: relative;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
    margin-bottom: 0.4rem;
    align-items: center;
}
.title::before {
    content: '';
    display: inline-block;
    height: .38rem;
    border-left: 4px solid #34c3cb;
    margin-right: .2rem; 
}
.title-more {
    color: #34c3cb;
    position: absolute;
    right: 0;
    top: 0;
    font-size: .26rem;
}

.family-teacher-content {
    padding: 0 .3rem .4rem .3rem;
    background: #fff;
    text-align: left;
    font-size: .26rem;
}
.basic-information-list {
    padding: 0 0 .1rem 0;
    font-size: .26rem;
}
.basic-information-item {
    margin-bottom: .3rem;
}
.basic-information-item-left {
    margin-right: .45rem;
}
.basic-information-item-right {
    width: calc(100% - 2rem);
}
.teaching-area, .teaching-cost, .teaching-time {
    margin-bottom: .6rem;
}
.teaching-cost-info, .teaching-time-info {
    color: #999;
}

.evaluate-item {
    border-bottom: 1px solid #eee;
    padding-bottom: .46rem;
}
.evaluate-item-top {
    justify-content: space-between;
    margin-bottom: .4rem;
}
.evaluate-item-left-icon {
    width: .8rem;
    height: .8rem;
    border-radius: .8rem;
    overflow: hidden;
}
.evaluate-item-left-icon img {
    width: 100%;
}
.evaluate-item-left-content {
    justify-content: space-around;
    padding-left: .2rem;
}
.evaluate-item-right i{
    font-size: .32rem;
    color: #FF8600;
}
.evaluate-item-text {
    font-size: .28rem;
}
</style>