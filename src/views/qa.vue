<template>
    <div class="wrapper">
        <!-- <div class="top"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
            <span>详情</span>
            <i>&nbsp;</i>
        </div>
        <div class="top-pedestal"></div> -->
        <div class="question">
            <div class="question-title">
                <span>{{askinfo.title}}</span>
            </div>
            <div class="question-man flex-row">
                <div class="icon" :style="'background:url(' + askinfo.headpic + ') center center /cover'"></div>
                
                <div class="name">
                    <span>{{askinfo.nickname}}</span>
                </div>
            </div>
            <div class="question-content">
                <span>{{askinfo.content}}</span>
            </div>

            <viewer v-if="pic.length==1" class="imgs flex-row">
                <div
                v-for="item in pic" :key="item.F_Id"
                :style="item.style"
                class="img-row">
                    <img :src="item.filename" ref="img">
                </div>
            </viewer>

            <viewer v-if="pic.length>1" class="imgs flex-row">
                <div :style="item.background"
                v-for="item in pic" :key="item.F_Id"
                class="img">
                    <img :src="item.filename" ref="img">
                </div>
            </viewer>


            <div class="question-action flex-row">
                <div class="question-state">
                    <span>{{askinfo.followcount}}关注</span>
                    <span>{{askinfo.replycount}}回答</span>
                    <span>{{$root.transform_time(askinfo.F_CreatorTime)}}</span>
                </div>
                <div class="question-btn">
                    <yd-button type="primary" bgcolor="#34C3CB" color="#fff" @click.native="$root.to_open_app">关注问题</yd-button>
                </div>
            </div>
            <div class="question-label flex-row">
                <yd-button type="hollow" color="#808080" shape="circle" style="margin-right:.2rem" v-for="(item,k) of askinfo.label" :key="k">{{item}}</yd-button>
            </div>
        </div>
        <yd-infinitescroll :callback="get_list" ref="infinitescroll">
        <yd-list theme="1" slot="list">
        <div class="answer" v-for="(item) of list" :key="item.F_Id" @click="to_qa_info(item.F_Id)">
            <div class="answer-man flex-row">
                <div class="icon" :style="'background:url('+item.headpic+') center center /cover'"></div>
                
                <div class="name">
                    <span>{{item.nickname}}</span>
                </div>
            </div>
            <div class="answer-content">
                <span>{{item.content}}</span>
            </div>
            <div class="answer-state">
                <span>{{item.prizesnum}}赞同</span>
                <span>{{item.commentsnum}}评论</span>
                <span>{{$root.transform_time(item.F_CreatorTime)}}</span>
            </div>
        </div>

        <div class="other-question">
            <div class="other-question-title">
                <span>相关问答</span>
            </div>
            <div class="other-question-item" v-for="(item) of list_" :key="item.F_Id" @click="to_qa(item.F_Id)">
                <span>{{item.title}}</span>
            </div>
        </div>
        <span slot="doneTip">没有更多数据了~~</span>
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-list>
        </yd-infinitescroll>

    </div> 
</template>

<script>
export default {
    components:{},
    props:{},
    data(){
        return {
            page: 1,
            page_size: 10,
            pic: [],
            askinfo: {},
            list: [],
            list_: []
        }
    },
    watch:{
        $route: {
            deep: true,
            handler: function() {
                this.init_list();   
            },
        }
    },
    computed:{
        share_page() {
            let page = {
                logo: this.$store.state.logo,
                name: this.askinfo.title,
                des: this.askinfo.content
            }
            return page
        }
    },
    methods:{
        init_question(res) {
            this.get_list_();
            res.data.data.askinfo.label = [];
            for(let item of res.data.data.askinfo.name.split(',')) {
                if(item){
                    res.data.data.askinfo.label.push(item)
                }
            }
            this.askinfo = res.data.data.askinfo;
            if(this.$root.isWeiXin()) {
                this.$root.get_wechat_sign(this.share_page);
            }
            this.pic = this.askinfo.pic;

            this.$root.pic_sort(this.pic,(pics)=>{
                this.pic = pics;
            })
            if(this.pic.length>1) {
                for(let item of this.pic) {
                    item.background=`background:url('${item.filename}');background-size:cover;background-position:center;`
                }
            }else if(this.pic.length==1) {
                this.$nextTick(()=>{
                this.$refs.img[0].onload= ()=>{  this.$root.getImgNaturalDimensions(this.$refs.img[0],(dimension)=>{
                            if(dimension.w/dimension.h<0.6) {
                                for(let item of this.pic) {
                                    item.style=`width:2.2rem`;
                                }
                            }else {
                                for(let item of this.pic) {
                                    item.style=`width:4rem`;
                                }
                            }
                        })
                    }  
                })
            }
        },
        to_qa(id) {
            
            this.$router.push({
                path:'/qa?id='+id+'&open=browser'
            })
        },
        to_qa_info(id) {
            this.$router.push({
                path:'/qa_info?id='+id+'&open=browser'
            })
        },
        init_list() {
            this.page = 1;
            this.list = [];
            this.list_ = [];
            document.documentElement.scrollTop = 0;
            this.get_list();

        },
        get_list() {
            this.$http.ajax_post('/api/familyask/GetFamilyAskDetail',{
                CurrentPage: this.page++,
                PageSize: this.page_size,
                Id: this.$route.query.id,
                Mobile: this.$store.state.user_status.mobile
            },(res)=>{
                if(this.page==2){
                    this.init_question(res)
                }
                this.list = [...this.list,...res.data.data.datalist];

                if (res.data.data.datalist.length<this.page_size) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');  
            })
        },
        get_list_() {
            this.$http.ajax_post_('/api/familyask/GetRelatedAskList',{
                CurrentPage: 1,
                PageSize: 5,
                Id: this.$route.query.id,
            },(res)=>{
                this.list_ = res.data.data.datalist;
            })
        },
    },
    created(){},
    mounted(){
        this.init_list();
    },
    activated() {
        // this.init_list();
    },
    deactivated() {}
}
</script>
<style lang="scss" scoped>
.wrapper {
    text-align: left;
}
.nav- {
    font-size: .34rem;
    line-height: 1rem;
}
.nav i {
    padding-right:1rem;
    font-size: .4rem;
}
// 问题描述
.question {
    margin-bottom: .2rem;
    padding: .3rem;
    background: #fff;
}
.question-title {
    margin-bottom: .3rem;
    font-size: .38rem;
    color: #1A1A1A;
    text-align: justify;
}
.question-man {
    margin-bottom: .2rem;
}
.icon {
    margin-right: .16rem;
    width: .44rem;
    height: .44rem;
    border-radius: .44rem;
}
.name {
    font-size: .28rem;
    color: #808080;
}
.question-content {
    margin-bottom: .2rem;
    text-align: justify;
}
.question-state {
    line-height: .6rem;
}
.question-state span {
    margin-right: .3rem;
    font-size: .24rem;
    color: #999999;
}
.question-action {
    justify-content: space-between;
    margin-bottom: .2rem;
}
.question-label {
    justify-content: flex-start;
    flex-wrap: wrap;
}

// 回答列表
.answer {
    padding: .3rem;
    margin-bottom: .2rem;
    background: #fff;
}
.answer-man {
    margin-bottom: .2rem;
}
.answer-content {
    margin-bottom: .2rem;
    font-size: .28rem;
    color: #1a1a1a;
    text-align: justify;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-align: left;
}
.answer-state span {
    margin-right: .3rem;
    font-size: .24rem;
    color: #999999;
}
.other-question {
    background: #fff;
    padding-bottom: 1rem;
}
.other-question-title {
    font-size: .38rem;
    font-weight: 700;
    color: #1a1a1a;
    padding: .3rem;
    border-bottom: 1px solid #E6E6E6;
}
.other-question-item {
    font-size: .3rem;
    color: #1a1a1a;
    padding: .3rem;
    border-bottom: 1px solid #E6E6E6;
}

.imgs {
    padding-top: .18rem;
    flex-wrap: wrap;
    margin-right: -.1rem;
}
.img-row {
    position: relative;
    width: 2.22rem;

}
.min {
    width: 2.22rem;
}
.max {
    width: 4rem;
}
.img-row img {
    width: 100%;

}
.img {
    width: 2.22rem;
    height: 2.22rem;
    overflow: hidden;
    margin-right: .1rem;
    margin-bottom: .1rem;
}
.img img {
    opacity: 0;
}
    
</style>