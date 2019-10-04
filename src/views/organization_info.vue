<template>
    <div class="wrapper">
        <schoolInfoTop v-on:data_school_teacher="data_school_body" v-on:updata_news="updata_news" v-on:updata_evaluate_course="updata_evaluate_course"/>
        <div style="position:relative;">
            <div class="map-cover" @click="native_map"></div>
            <gdMap v-if="school_info.baseinfo&&school_info.baseinfo.xy" :school="school_info.baseinfo"/>
        </div>
        <div class="base-wrapper">
            <div class="title flex-row">
                <span>基本信息</span>
            </div>
            <div class="base">
                <div>
                    <div class="font-weight margin-rt-026">地区:</div>
                    <div v-if="school_info.baseinfo">{{school_info.baseinfo.cityname}}</div>
                    <div v-else class="headstone" style="width:calc(100% - 1.5rem);height:.24rem;border-radius:.24rem"></div>
                </div>
                <div>
                    <div class="font-weight margin-rt-026">主管部门:</div>
                    <div v-if="school_info.baseinfo">{{school_info.baseinfo.chargedept}}</div>
                    <div v-else class="headstone" style="width:calc(100% - 1.5rem);height:.24rem;border-radius:.24rem"></div>
                </div>
                <div>
                    <div class="font-weight margin-rt-026">性质:</div>
                    <div v-if="school_info.baseinfo">{{school_info.baseinfo.propertyname}}</div>
                    <div v-else class="headstone" style="width:calc(100% - 1.5rem);height:.24rem;border-radius:.24rem"></div>
                </div>
                <div>
                    <div class="font-weight margin-rt-026">类别:</div>
                    <div v-if="school_info.baseinfo">{{school_info.baseinfo.typename}}</div>
                    <div v-else class="headstone" style="width:calc(100% - 1.5rem);height:.24rem;border-radius:.24rem"></div>
                </div>
                <div>
                    <div class="font-weight margin-rt-026">网址:</div>
                    <div v-if="school_info.baseinfo" class="theme-color" @click="$root.browser_url(school_info.baseinfo.url)">
                        <a style="text-decoration:underline">{{school_info.baseinfo.url}}</a>
                    </div>
                    <div v-else class="headstone" style="width:calc(100% - 1.5rem);height:.24rem;border-radius:.24rem"></div>
                </div>
                <div>
                    <div class="font-weight margin-rt-026">电话:</div>
                    <div v-if="school_info.baseinfo" class="theme-color" @click="$root.calling(school_info.baseinfo.telephone)">
                        <a style="text-decoration:underline">{{school_info.baseinfo.telephone}}</a>
                    </div>
                    <div v-else class="headstone" style="width:calc(100% - 1.5rem);height:.24rem;border-radius:.24rem"></div>
                </div>
                <div>
                    <div class="font-weight margin-rt-026">地址:</div>
                    <div v-if="school_info.baseinfo">{{school_info.baseinfo.address}}</div>
                    <div v-else class="headstone" style="width:calc(100% - 1.5rem);height:.24rem;border-radius:.24rem"></div>
                </div>
            </div>
        </div>
        <div class="merit">
            <div class="title flex-row">
                <p>特色优势</p>
            </div>
            <div v-if="school_info.baseinfo">
                <div v-if="school_info.baseinfo.advantage">{{school_info.baseinfo.advantage}}</div>
                <div v-else>信息采集中</div>
            </div>
            <div v-else>
                <p class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem"></p>
                <p class="headstone" style="width:100%;height:.24rem;border-radius:.24rem"></p>
            </div>
        </div>
        <div class="teachers">
            <div class="title flex-row">
                <span>相关名师</span>
            </div>
            <div style="position:relative;text-align:center" v-if="teachers.length>0">
                <ul class="teacher-list flex-row">
                    <li class="teacher-item flex-col" v-for="item in teachers" :key="item.f_id" @click="to_teacher_info(item.f_id,item.periodcode)">
                        <div class="teacher-icon" :style="school_info.baseinfo&&school_info.baseinfo.logo?'background:url('+$root.img_url+item.headpic+');background-size:cover;background-position:center;':''"></div>
                        <p style="font-size:.26rem;margin-bottom:.12rem;">{{item.truename}}</p>
                        <p>
                            <span v-for="(item_,k) in item.tags" :key="k">{{item_.F_ItemName}} </span>
                        </p>
                    </li>
                </ul>
                <div class="scroll-cover"></div>
            </div>
            <div v-else style="text-align:left">
                <span>数据采集中</span>
            </div>
        </div>
        <!-- <div class="course">
        <div class="course-title">
            <p>课程类型</p>
        </div>
        <ul class="course-list flex-row">
            <li class="course-item">
            <span>小学辅导</span>
            </li>
            <li class="course-item">
            <span>中学辅导</span>
            </li>
            <li class="course-item">
            <span>大学辅导</span>
            </li>
            <li class="course-item">
            <span>英语辅导</span>
            </li>
            <li class="course-item">
            <span>出国留学</span>
            </li>
            <li class="course-item">
            <span>小语种</span>
            </li>
        </ul>
        </div> -->
        <schoolBranch v-if="school_info.otherschool&&school_info.otherschool.length>0" :school_branch="school_info.otherschool"/>
        <aboutNews ref="about_news"/>
        <evaluate ref="evaluate"/>
        <courseRecommend ref="course"/>
        <!-- <div class="cover-component" v-show="$store.state.coverComponent"></div> -->
    </div>
</template>

<script>
import gdMap from '@/components/public/map.vue';
// @ is an alias to /src
import schoolInfoTop from '@/components/school_info_top.vue';
import schoolBranch from '@/components/school_branch.vue';
import aboutNews from '@/components/about_news.vue';
import evaluate from '@/components/evaluate.vue';
import courseRecommend from '@/components/course_recommend.vue';
export default {
    components:{
        schoolInfoTop,
        schoolBranch,
        courseRecommend,
        aboutNews,
        evaluate,
        gdMap
    },
    props:{},
    data(){
        return {
        school_info: {},
        teachers: [],
        deactivated: false
        }
    },
    watch:{

    },
    
    computed:{},
    methods:{
        native_map() {
            let xy = this.school_info.baseinfo.xy.slice(1,this.school_info.baseinfo.xy.length-1).split(','); 
            if(!_DEV_&&this.$root._IsAndroid()) { 
                android.startSchoolMapNative(this.school_info.baseinfo.name,this.$route.query.id,this.$route.query.type_id,Number(xy[0]),Number(xy[1]))
            }else if(!_DEV_&&this.$root._IsIOS()) {
                this.$IOS.startSchoolMapNative(this.school_info.baseinfo.name,this.$route.query.id,this.$route.query.type_id,Number(xy[0]),Number(xy[1]))
            }
        },
        data_school_body(data) {
            this.school_info = data;
            this.$store.commit('updataOrganization',{
                id: data.baseinfo.F_Id,
                name: data.baseinfo.name,
                logo: data.baseinfo.logo
            }) 
        },
        updata_news() {
            this.$refs.about_news.get_news();
        },
        updata_evaluate_course() {
            this.$refs.evaluate.get_evaluate();
            this.$refs.course.init_list();

        },
        to_teacher_info(id,type_id) {
            this.$router.push({
                path: '/teacher_info?id='+id+'&type_id='+type_id
            })
        },
        get_teachers() {
            this.$http.ajax_post_('/api/School/GetTeacherListBySchoolId',{
                Id: this.$route.query.id,
                CurrentPage: 1,
                PageSize: 10
            },(res)=>{
                if(res.data.status=='-1') {
                    this.$dialog.alert({
                        title: '温馨提示',
                        mes: '名师列表加载失败',
                    });
                    return false;
                }
                this.teachers = res.data.data.datalist;
            },(err)=>{
                this.$dialog.alert({
                    title: '温馨提示',
                    mes: '名师列表请求失败',
                });
            })
        },
    },
    created(){
        // this.$store.commit('updataCoverComponentStatus',true);
    },
    activated() {
        if(this.deactivated&&this.$store.state.post_evaluate) {
            this.$store.commit('updataPostEvaluate',false);
            this.$refs.evaluate.get_evaluate();
        }
    },
    deactivated() {
        this.deactivated = true;
    },
    mounted(){
        // this.get_teachers();   
    },
    activated() {
        this.get_teachers(); 
    },
    deactivated() {}
}
</script>
<style lang="scss" scoped>
.wrapper {
  font-size: 0.26rem;
}
.merit {
    position: relative;
    padding: 0.58rem 0.3rem 0.85rem 0.3rem;
    background-color: #fff;
    color: #878787;
    text-align: left; 
}
// .merit-title {
//   padding-left: 0.2rem;
//   border-left: 4px solid #34c3cb;
//   font-size: 0.38rem;
//   color: #000;
//   text-align: left;
//   margin-bottom: 0.4rem;
// }
.title {
    align-items: center;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
    margin-bottom: 0.4rem;
}
.title::before {
    content: '';
    display: inline-block;
    height: .38rem;
    border-left: 4px solid #34c3cb;
    margin-right: .2rem; 
}


.course {
    position: relative;
    padding: 0 0.3rem 0.85rem 0.3rem;
    background-color: #fff;
    color: #878787;
    text-align: left; 
}
.course-title {
    padding-left: 0.2rem;
    border-left: 4px solid #34c3cb;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
    margin-bottom: 0.4rem;
}
.course-list {
    flex-wrap: wrap;
    margin-right: -.2rem;
    margin-top: -.2rem;
}
.course-item {
    width: 1.56rem;
    height: .7rem;
    border-radius: .7rem;
    background:linear-gradient(to right,#ff5b7b,#ff8576);
    text-align: center;
    line-height: .7rem;
    margin-right: .2rem;
    color: #fff;
    margin-top: .2rem;
}
.course-item:nth-child(2) {
    background:linear-gradient(to right,#0198ff,#07c0ff);
}
.course-item:nth-child(3) {
    background:linear-gradient(to right,#1dd0e6,#00f4ec);
}
.course-item:nth-child(4) {
    background:linear-gradient(to right,#a77ff9,#cf97fc);
}
.course-item:nth-child(5) {
    background:linear-gradient(to right,#1dd0e4,#00f4ec);
}
.course-item:nth-child(6) {
    background:linear-gradient(to right,#fe5a7c,#fd8876);
}


.base-wrapper {
    background: #fff;
    padding: .3rem;
}
.base {
    padding: .3rem;
    box-shadow: 1px 1px 10px 1px rgba(77, 77, 77, 0.2);
    border-radius: 4px;
}
.base > div {
	display: flex;
    display: -webkit-flex;
    // align-items: center;
    margin-bottom: .2rem;
    font-size: .26rem;
    text-align: left;
}
.base span {
    white-space:nowrap;
}
.base a {
    text-decoration:underline;
    color: #34C3CB;
}
.base > div > div:not(:first-child) {
    word-wrap:break-word;
    width: calc(100% - 1.5rem);
    
}
// .base .font-weight {
//     width: 1.5rem;
// }

.teachers {
    padding: 0 .3rem .3rem .3rem;
    background: #fff;
}

.teacher-list {
    overflow:scroll;
    -webkit-overflow-scrolling: touch;
    padding: .2rem;
}
.scroll-cover {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: #fff;
}

.teacher-item {
    flex-shrink: 0;
    align-items: center;
    margin-right: .3rem;
    padding: 0.2rem 0;
    width: 1.8rem;
    border-radius: 4px;
    box-shadow: 2px 2px 10px 2px rgba(77, 77, 77, 0.2); 
}
.teacher-item:active {
    opacity: .7;
}
.teacher-item p {
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding: 0 .2rem;
}
.teacher-icon {
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    margin-bottom: .22rem;
}
</style>