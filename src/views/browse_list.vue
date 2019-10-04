<template>
    <div class="wrapper">
        <div class="top"></div>
        <div class="nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
            <span>浏览记录</span>
            <i></i>
        </div>
        <div class="top-pedestal"></div>

        <ul class="list" v-show="!headstone_show">
            <yd-infinitescroll :callback="get_list" ref="infinitescroll">
            <yd-list theme="1" slot="list">
            <li v-for="item in list" :key="item.f_id" @click="to_info(item)">
                <div class="date">
                    <span>{{item.commentdate}}</span>
                </div>
                <div class="item">
                    <div class="item-info flex-row">
                        <div class="icon" :style="`position:relative;background:url(${item.headpic}) center center / cover`">
                            <!-- <img :src="item.headpic" alt=""> -->
                        </div>
                        <div class="content">
                            <p class="title">{{item.name}}</p>
                            <p class="info">{{item.address}}</p>
                        </div>
                    </div>
                </div>
            </li>
            <span slot="doneTip">没有更多数据了~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-list>
            </yd-infinitescroll>
        </ul>

        <div class="list" v-show="headstone_show">
            <div v-for="(item,k) in new Array(6)" :key="k">
                <div class="date"><span>&nbsp;</span></div>
                <div class="item">
                    <div class="item-info flex-row">
                        <div class="icon headstone"></div>
                        <div class="content">
                            <div class="title headstone" style="height:.4rem;"></div>
                            <div class="info headstone" style="height:.4rem;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    components:{},
    props:{},
    data(){
        return {
            page: 1,
            list: [],
            headstone_show: true
        }
    },
    watch:{},
    computed:{},
    methods:{
        to_info(item) {
            let url = '';
            if(item.objectcode=='01'||item.objectcode=='02'||item.objectcode=='03'||item.objectcode=='04'){
                url = '/school_info'
            }else if(item.objectcode=='05') {
                url = '/organization_info'
            }else if(item.objectcode=='06'||item.objectcode=='07') {
                url = '/teacher_info'
            }else if(item.objectcode=='08') {
                this.$root.native_comment_info(item.parentid)
                return;
            }else if (item.objectcode=='09') {
                url = '/information_info'
            }else if (item.objectcode=='10') {
                url = '/houses_info'
            }
            this.$router.push({
                path: url,
                query: {
                    id: item.parentid,
                    type_id: item.objectcode
                }
            })
            
        },
        get_list() {
            this.$http.ajax_post('/api/My/MyBrowseList',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                CurrentPage: this.page++,
                PageSize: 10,
                OrderBy: ''
            },(res)=>{
                this.list = [...this.list, ...res.data.data.datalist];
                this.headstone_show = false;
                if (res.data.data.datalist.length == 0||this.list.length<10) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
            })
        }
    },
    created(){
        
    },
    mounted(){
        console.log('sss')
        this.get_list();
    },
    activated() {
        // this.get_list();
        this.$root.init_nav();
    },
    deactivated() {}
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
}


.nav i {
    font-size: .4rem;
    padding-right: .4rem;
}
.nav span {
    font-size: .3rem;
}

.list {
    padding: .4rem .3rem;
}
.item {
    margin-bottom: .5rem;
    background: #fff;
    border-radius: 6px;
    padding: .3rem .2rem;
}

.date {
    margin-bottom: .2rem;
    color: #808080;
}
.icon {
    width: 1.2rem;
    height: 1.2rem;
    overflow: hidden;
    margin-right: .2rem;
    border-radius: 1.2rem;
}
.icon img {
    width: 100%;
}
.content {
    text-align: left;
    width: calc(100% - 1.4rem);
}
.title {
    font-size: .34rem;
    font-weight: 600;
    margin-bottom: .2rem;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.info {
    color: #999;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
</style>