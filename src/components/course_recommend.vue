<template>
    <div class="wrapper">
        <div class="course">
            <div class="course-title flex-row">
                <p>课程介绍</p>
            </div>
            <ul class="nav-course-list flex-row">
                <li :class="nav_course_index==k?'nav-course-item-active nav-course-item':' nav-course-item'" 
                @click="select_course(k)"
                v-for="(item, k) in nav_courses" :key="k">
                    <span>{{item}}</span>
                </li>
            </ul>
            <ul class="course-list">
                <yd-infinitescroll :callback="get_course_list" ref="infinitescroll">
                <yd-list theme="1" slot="list">
                <li class="course-item flex-row" v-for="item in course_list" :key="item.F_Id" @click="to_course_info(item)">
                    <div class="course-item-img" :style="'background:url('+$root.img_url+item.coverpic+');background-size:cover;background-position:center;'">
                        <!-- <img :src="$root.img_url+item.coverpic" alt="" style="width:100px;height:100px"> -->
                    </div>
                    <!-- <div class="course-item-img" :style="'background:url('+'http://223.84.156.187:808/Upload/Train/20190428170940367__下载.jpg'+');background-size:cover'"></div> -->
                    <div class="course-item-content">
                        <div class="flex-row">
                        <div class="course-item-type">
                            <span>{{item.coursename}}</span>
                        </div>
                        </div>
                        <div class="course-name">
                            <p>{{item.courseclassname}}</p>
                        </div>
                        <div class="course-text">
                            <p>
                                {{item.des}}
                            </p>
                        </div>
                        <div class="course-item-action-wrapper flex-row">
                            <div class="course-item-action flex-row">
                                <i v-show="item.ispraise=='0'" class="iconfont icon-xiaolian" @click.stop="praise(item)"></i>
                                <i v-show="item.ispraise=='1'" class="iconfont icon-xiaolian1" @click.stop="praise(item)" style="color:#FFE400"></i>
                                <i class="iconfont icon-pinglun"></i>
                                <i class="iconfont icon-fenxiang-1"></i>
                            </div>
                            <p>￥{{item.price}}</p>
                        </div>
                    </div>
                </li>   
                <span slot="doneTip">没有更多数据了~~</span>
                <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
                </yd-list>
                </yd-infinitescroll>
            </ul>
        </div>
    </div>
</template>

<script>
import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
import {ListTheme} from 'vue-ydui/dist/lib.rem/list';
export default {
    components:{
        "yd-infinitescroll": InfiniteScroll,
        "yd-list": ListTheme,
    },
    props:{},
    data(){
        return {
            organization_id: '',
            page: 1,
            nav_course_index: 1,
            nav_courses: [],
            course_list: []
        }
    },
    watch:{},
    computed:{},
    methods:{
        select_course(k) {
            this.nav_course_index = k;
        },
        to_course_info(item) {
            //  this.$store.commit('updataOrganizationId',item.parentid);
            if(this.$store.state.wechat) {
                return;
            }
            this.$router.push({
                name: 'course_info',
                params: {
                    course_info: item
                }
            })
        },
        praise(item) {
            let state = '';
            if(item.ispraise=='0') {
                state = '1'
            }
            if(item.ispraise=='1') {
                state = '0'
            }
            this.$root.praise('/api/Family/SavePraise',state,item.F_Id,'','',()=>{  
                item.ispraise = state;
            })
        },
        init_list() {
            this.page = 1;
            this.course_list = [];
            this.get_course_list();
        },
        get_course_list() {
            this.$http.ajax_post_('/api/School/GetCourseList',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                Id: this.$store.state.organization_id?this.$store.state.organization_id:this.$route.query.id,
                CurrentPage: this.page++,
                PageSize: 6,
                OrderBy: ''
            },(res)=>{
                if(res.data.status=='-1') {
                    this.$dialog.alert({
                        title: '温馨提示',
                        mes: '课程列表加载失败',
                    });
                    return false;
                }
                this.course_list = [...this.course_list, ...res.data.data.datalist];
                if (res.data.data.datalist.length == 0||this.course_list.length<5) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');               
            },()=>{
                this.$dialog.alert({
                    title: '温馨提示',
                    mes: '课程列表请求失败',
                });
            })
        },
        return_organization_id(id) {
            this.organization_id = id;
        }
    },
    created(){},
    mounted(){
        // this.get_course_list()
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    font-size: 0.26rem;
}

.course {
    position: relative;
    padding: 0 0.3rem 0.85rem 0.3rem;
    background-color: #fff;
    color: #878787;
    text-align: left; 
}
.course-title {
    align-items: center;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
    margin-bottom: 0.4rem;
}
.course-title::before {
    content: '';
    display: inline-block;
    height: .38rem;
    border-left: 4px solid #34c3cb;
    margin-right: .2rem; 
}
.nav-course-list {
    flex-wrap: wrap;
    margin-right: -.2rem;
    margin-top: -.2rem;
    margin-bottom: .29rem;
}
.nav-course-item {
    width: 1.56rem;
    height: .7rem;
    border-radius: .7rem;
    background:#fff;
    border: 1px solid #34c3cb;
    text-align: center;
    line-height: .7rem;
    margin-right: .2rem;
    color: #34c3cb;
    margin-top: .2rem;
}
.nav-course-item-active {
    background: #34c3cb;
    color: #fff;
}

.course-item {
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 1px 1px 1px 1px rgba(166, 166, 166, 0.2);
    margin-bottom: .2rem;
}
.course-item-img {
    font-size: 0;
}
.course-item-img{
    width: 2.52rem;
    height: 2.7rem;
}
.course-item-content {
    padding: .25rem .28rem .2rem .2rem;
    width: calc(100% - 2.52rem);
    font-size: .2rem;
}
.course-item-type {
    height: .36rem;
    border-radius: .36rem;
    text-align: center;
    background-color: #ea74c0;
    color: #fff;
    font-size: .24rem;
    margin-bottom: .1rem;
    padding: 0 .2rem;
}
.course-name {
    margin-bottom: .1rem;
    color: #000;
    font-size: .24rem;
}
.course-text {
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    margin-bottom: .2rem;
    min-height: .8rem; 
}
.course-item-action-wrapper {
    justify-content: space-between;
}
.course-item-action {
    width: 2.2rem;
    justify-content: space-between;
}
.course-item-action {
    color: #5f5f5f;
    font-size: .4rem;
}
.course-item-action-wrapper p {
    color: #ff8603;
    font-size: .24rem;
}
</style>