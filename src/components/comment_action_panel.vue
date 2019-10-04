<template>
    <div class="wrapper">
        <div class="comment-list">
            <yd-infinitescroll :callback="before_get_list" ref="infinitescroll">
            <yd-list theme="1" slot="list">
            <div v-if="type=='1'">
            <div class="comment-item flex-row"
            v-for="item in list" :key="item.main.F_Id">
                <div class="icon" :style="item.background" @click="$root.person_page(item.main.commentbymobile,item.main.commentby)">
                    <!-- <img :src="item.main.commentbyheadpic" alt=""> -->
                </div>
                <div class="comment-item-content">
                    <p style="margin-bottom: .08rem;" @click="$root.person_page(item.main.commentbymobile,item.main.commentby)">{{item.main.commentbynickname}}</p>
                    <p style="color:#999;font-seize:.2rem">{{$root.transform_time(item.main.commentdate)}}</p>
                    <p class="margin-bt-03" style="margin-top:.18rem;" @click="reply(item.main)">{{item.main.content}}</p>
                    <ul class="comment-item-return" v-if="item.list.length>0">
                        <li class="comment-item-return-item flex-row"
                        v-for="(item_,k) in item.list" :key="k">
                            <div class="icon-second" @click="$root.person_page(item_.commentbymobile,item_.commentby)">
                                <img :src="item_.commentbyheadpic" alt="">
                            </div>
                            <div class="icon-second-right">
                                <p class="theme-color" style="margin-bottom: .08rem;" @click="$root.person_page(item_.commentbymobile,item_.commentby)">{{item_.commentbynickname}}</p>
                                <p style="color:#999;font-seize:.2rem">{{$root.transform_time(item_.commentdate)}}</p>
                                <p style="margin-top:.18rem;" @click.stop="reply(item_)">
                                    <span>回复</span>
                                    <span class="theme-color">{{item_.receivebyname}}</span>
                                    <span>:{{item_.content}}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
            <div v-if="type==0">
                <div class="item flex-row" v-for="item in list" :key="item.F_Id" @click="$root.person_page(item.sharebymobile,item.shareby)">
                    <div class="icon" :style="item.background">
                        <!-- <img :src="item.commentbyheadpic" alt=""> -->
                    </div>
                    <div class="item-name">
                        <p v-if="item.commentbynickname">{{item.commentbynickname}}</p>
                        <p v-if="item.sharebynickname">{{item.sharebynickname}}</p>

                        <p class="item-name-date" v-if="item.sharedate">{{$root.transform_time(item.sharedate)}}</p>
                        <p class="item-name-date" v-if="item.commentdate">{{$root.transform_time(item.commentdate)}}</p>
                    </div>
                </div>
            </div>
            <div v-if="type==2">
                <div class="item flex-row" v-for="item in list" :key="item.F_Id" @click="$root.person_page(item.commentbymobile,item.commentby)">
                    <div class="icon" :style="item.background">
                        <!-- <img :src="item.commentbyheadpic" alt=""> -->
                    </div>
                    <div class="item-name">
                        <p v-if="item.commentbynickname">{{item.commentbynickname}}</p>
                        <p v-if="item.sharebynickname">{{item.sharebynickname}}</p>
                        <p class="item-name-date" v-if="item.sharedate">{{$root.transform_time(item.sharedate)}}</p>
                        <p class="item-name-date" v-if="item.commentdate">{{$root.transform_time(item.commentdate)}}</p>
                    </div>
                </div>
            </div>

            </yd-list>
            <span slot="doneTip">没有更多数据了~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-infinitescroll>
            <div style="height:.8rem"></div>
        </div>
    </div>
</template>

<script>

export default {
    components:{},
    props:{
        type: {
            object: String
        },
        courseId: {
            object: String
        }
    },
    data(){
        return {
            page_size: 15,
            page: 1,
            list: [],
        }
    },
    watch:{

    },
    computed:{},
    methods:{
        init_list(url) {
            this.page = 1;
            this.list = [];
            this.get_list('',url)
        },
        reply(item) {
            document.getElementById('textarea-s').focus()
            if(!this.$store.state.user_status.mobile) {
                this.$dialog.toast({
                    mes: '请先登录',
                    timeout: 1000,
                    icon: 'error',
                });
                return false;
            }
            this.$emit('reply',item)
        },
        before_get_list() {
            console.log('eee')
            switch(this.type) {
                case '0':
                    this.get_list('','/api/Family/GetShareList')
                    break;
                case '1':
                    this.get_list('','/api/Family/GetCommentList')
                    break;
                case '2':
                    this.get_list('','/api/Family/GetPraiseList')
                    break;
            }
        },
        get_list(action,url) {
            if(action == 'save_list') {
                this.list = [];
            }
            this.$http.ajax_post_(url,{
                Id: this.courseId?this.courseId:this.$route.query.id,
                CurrentPage: action == 'save_list'?this.page-1:this.page++,
                PageSize: this.page_size,
                OrderBy: '',
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',             
            },(res)=>{
                if(res.data.status=='-1') {
                    this.$dialog.alert({
                        title: '温馨提示',
                        mes: '该信息不存在',
                    });
                    return false;
                }
                if(this.type=='1') {
                    for(let item of res.data.data.datalist) {
                        item.background = `background:url('${item.main.commentbyheadpic}');background-size:cover;background-position:center;`
                    }
                }else {
                    
                    for(let item of res.data.data.datalist) {
                        if(item.sharebyheadpic) {
                            item.background =  `background:url('${item.sharebyheadpic}');background-size:cover;background-position:center;`
                        }
                        if(item.commentbyheadpic) {
                            item.background =  `background:url('${item.commentbyheadpic}');background-size:cover;background-position:center;`
                        }
                        
                    }
                }

                this.list = [...this.list, ...res.data.data.datalist];
                if (res.data.data.datalist.length<this.page_size) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');               
            })
        }
    },
    created(){},
    mounted(){
        // this.before_get_list()
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
    font-size: .26rem;
    text-align: left;
    width: 100%;
    
}
.comment-list {
    padding: .4rem 0 .4rem .3rem;
    min-height: 40vh;
}
.comment-item {
    padding-bottom: .2rem;
}
.icon {
    width: .8rem;
    height: .8rem;
    margin-right: .2rem;
    overflow: hidden;
    border-radius: .8rem;
}
.icon img {
    width: 100%;
}
.comment-item-content {
    padding: .16rem .3rem .3rem 0;
    border-bottom: 1px solid #E6E6E6;
    width: calc(100% - 1rem)
}
.comment-item:last-child .comment-item-content {
    border-bottom: 1px solid transparent;
}
.comment-item-return {
    padding: .2rem;
    background: #EBF0F2;
}
.icon-second {
    width: .6rem;
    height: .6rem;
    margin-right: .22rem;
    overflow: hidden;
    border-radius: .6rem;
}
.comment-item-return-item {
    margin-bottom: .18rem;
}
.icon-second img {
    width: 100%;
}
.icon-second-right {
    padding: .04rem .3rem .3rem 0;
    border-bottom: 1px solid #E6E6E6;
    width: calc(100% - .82rem)
}
.comment-item-return-item:last-child .icon-second-right {
    border-bottom: 1px solid transparent;
}

.item {
    margin-bottom: .2rem;
}
.item-name {
    width: calc(100% - 1rem);
    padding-bottom: .2rem;
    border-bottom: 1px solid #eee
}
.item-name-date {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
}
</style>