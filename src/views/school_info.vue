<template>
  <div class="wrapper">

        <schoolInfoTop v-on:data_school_teacher="data_school_body" v-on:updata_comment="updata_comment" v-on:updata_news="updata_news" v-on:updata_technical="updata_technical"/>
        <div style="height:.6rem"></div>
        <div style="position:relative">
            <div class="map-cover" @click="native_map"></div>
            <gdMap v-if="school_info.baseinfo&&school_info.baseinfo.xy" :school="school_info.baseinfo"/>
            
        </div>

        <schoolHome v-if="school_info.hourse&&school_info.hourse.length>0" :hourse="school_info.hourse" ref="hourse"/>
        <div v-else style="height:.8rem;background:#fff"></div>
        <technical :school_info="school_info" ref="technical"/>
        <schoolBranch v-if="school_info.otherschool&&school_info.otherschool.length>0" :school_branch="school_info.otherschool"/>
        
            <!-- <schoolIndex v-if="school_info.schooltg&&school_info.schooltg.length>0&&$route.query.type_id!='04'" :schooltg="school_info.schooltg"/> -->
        <aboutNews ref="about_news"/>
        
        <comment v-if="school_info.baseinfo" :school_name="school_info.baseinfo.name" ref="comment"/>
        <!-- <div class="cover-component" v-show="$store.state.coverComponent"></div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import gdMap from '@/components/public/map.vue';

import schoolInfoTop from '@/components/school_info_top.vue';
import schoolHome from '@/components/school_home.vue';
import technical from '@/components/technical.vue';
import schoolIndex from '@/components/school_index.vue';
import schoolBranch from '@/components/school_branch.vue';
import aboutNews from '@/components/about_news.vue';
import comment from '@/components/comment.vue';

export default {
    components:{
        schoolInfoTop,
        schoolHome,
        technical,
        schoolIndex,
        schoolBranch,
        aboutNews,
        comment,
        gdMap,
    },
    props:{},
    data(){
        return {
            school_info: {},
        }
    },
    watch:{

    },
    computed:{

    },
    methods:{
        
        native_map() {
            let xy = this.school_info.baseinfo.xy.slice(1,this.school_info.baseinfo.xy.length-1).split(',');
            if(this.$store.state.wechat) {
                wx.miniProgram.navigateTo({
                    url: '/pages/map/map?xy='+xy[0]+','+xy[1]
                })
                return;
            }
            if(!_DEV_&&this.$root._IsAndroid()) { 
                android.startSchoolMapNative(this.school_info.baseinfo.name,this.$route.query.id,this.$route.query.type_id,Number(xy[0]),Number(xy[1]))
            }else if(!_DEV_&&this.$root._IsIOS()) {
                this.$IOS.startSchoolMapNative(this.school_info.baseinfo.name,this.$route.query.id,this.$route.query.type_id,Number(xy[0]),Number(xy[1]))
            }
        },
        data_school_body(data) {
            this.school_info = data;
        },
        updata_news() {
            this.$refs.about_news.get_news();
        },
        updata_comment() {
            this.$refs.comment.init_list()
        },
        updata_technical() {
            this.$refs.technical.get_teachers(5)
        },
        
        to_information() {
            this.$router.push({
                name: 'information',
                params: {
                    id: this.$route.query.id
                }
            })
        },
        to_school_power(power_info) {
            if (typeof power_info=='object'&&power_info.length<1) {
                this.$dialog.toast({
                    mes: '信息不存在',
                    timeout: 1500,
                });
                return false;
            }
            if(typeof power_info=='string'&&!power_info) {
                this.$dialog.toast({
                    mes: '信息不存在',
                    timeout: 1500,
                });
                return false;
            }
            this.$router.push({
                name: 'school_power',
                params: {
                    school_power: power_info
                }
            })
        },

        handleScroll() {
            // if(document.documentElement.scrollTop>=580) {
            //     this.fixed = true;
            // }else {
            //     this.fixed = false;
            // }
            if(document.documentElement.scrollTop>document.body.scrollTop) {
                this.add_height = document.documentElement.scrollTop;
            }else {
                this.add_height = document.body.scrollTop;
            }

        }
    },
    created(){
        // this.$store.commit('updataCoverComponentStatus',true);
    },
    mounted(){
       
    },
    destroyed () {
        
    },
}
</script>
<style scoped>
.wrapper {
    font-size: 0.26rem;
}

/* .school-message {
    position: relative;
    padding: 0.58rem 0.3rem 0.85rem 0.3rem;
    background-color: #fff;
}

.school-message-title {
    align-items: center;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
    margin-bottom: 0.4rem;
}
.school-message-title::before {
    content: '';
    display: inline-block;
    height: .38rem;
    border-left: 4px solid #34c3cb;
    margin-right: .2rem; 
}


.school-message-btns {
    justify-content: space-around;
}
.school-message-btn:active {
    opacity: 0.6;
}
.school-message-btn img {
    width: 1rem;
    margin-bottom: 0.2rem;
    
} */



</style>