<template>
    <div class="wrapper">
        <!-- <div class="top"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$router.back()"></i>
            <span>评论/回复</span>
            <i></i>
        </div> -->
        <!-- <div class="top-pedestal"></div>
        <div style="height: .2rem"></div> -->
        <div class="list" v-show="!headstone_show">
            <yd-infinitescroll :callback="get_list" ref="infinitescroll">
            <yd-list theme="1" slot="list">
            <div class="item flex-row" v-for="item in list" :key="item.F_Id">
                <div class="icon" @click="$root.person_page(item.commentbymobile,item.commentby)" :style="item.background"></div>
                <div class="right" @click="to_comment_info(item)">
                    <div class="flex-row">
                        <span class="name">{{item.commentbynickname}}</span>
                        <span class="theme-color reply" @click.stop="reply(item)">回复</span>
                    </div>
                    <div>
                        <span class="date">{{$root.transform_time(item.commentdate)}}</span>
                    </div>
                    <div class="return-info">
                       <span>
                           <span v-if="item.level!=1">回复<span class="theme-color">我：</span>
                           </span>
                           <span>{{item.content}}</span>
                        </span> 
                    </div>
                    <div class="topic" v-if="item.name">
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
            <span slot="doneTip">没有更多数据了~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-list>
            </yd-infinitescroll>
        </div>

        <div class="list" v-show="headstone_show">
            <div class="item flex-row" v-for="(item,k) in new Array(6)" :key="k">
                <div class="icon headstone"></div>
                <div class="right">
                    <div class="headstone" style="height:.34rem;width:2rem;"></div>
                    <div class="headstone" style="height:.28rem;width:1rem;margin: .1rem 0;"></div>
                    <div class="headstone" style="height:.28rem;margin: .1rem 0;"></div>
                </div>
            </div>
        </div>
 
        <yd-popup v-model="show_textarea" position="bottom">
           <div class="comment-border flex-row">
               <textarea ref="textarea"
                name="" id="textarea" class="comment-textarea" v-model="comment_content"></textarea>
               <div class="comment-post" @click="post_comment(item)">
                   <span class="theme-color">发送</span>
               </div>
           </div>
        </yd-popup>
    </div>
</template>

<script>
import {ListTheme} from 'vue-ydui/dist/lib.rem/list';
import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
import {Popup} from 'vue-ydui/dist/lib.rem/popup';
export default {
    components:{
        "yd-list": ListTheme,
        "yd-infinitescroll": InfiniteScroll,
        "yd-popup": Popup
    },
    props:{},
    data(){
        return {
            page: 1,
            list: [],
            show_textarea: false,
            comment_content: '',
            // textarea_pad: false,
            headstone_show: true,
            
        }
    },
    watch:{},
    computed:{},
    methods:{
        reply(item) {
            this.comment_content = '';
            this.show_textarea = true;
            this.item = item;
            this.$refs.textarea.focus();
            // this.textarea_pad = false;
        },
        post_comment() {
            if(!this.comment_content) {
                this.$dialog.toast({
                    mes: '请输入信息',
                    timeout: 1000,
                    icon: 'error',
                });
                return false;
            }
            this.$root.post_comment('03',this.item.F_Id,this.comment_content,()=>{
                this.show_textarea = false;
            });
        },
        to_comment_info(item) {
            if(item.objectcode=='08') {
                // this.$router.push({
                //     path: '/comment_info?id='+item.parentid,
                // })
                this.$root.native_comment_info(item.parentid);
            }
        },
        get_list() {
            this.$http.ajax_post('/api/My/ReceiveCommentList',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                CurrentPage: this.page++,
                PageSize: 8,
                OrderBy: ''
            },(res)=>{
                this.headstone_show = false;
                this.list = [...this.list,...res.data.data.datalist];
                for(let item of this.list) {
                    item.background = `background:url('${item.commentbyheadpic}');background-size:cover;background-position:center;`
                }
                if (res.data.data.datalist.length == 0||this.list.length<8) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad'); 
            })
        }
    },
    created(){},
    mounted(){
        this.get_list();
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
    min-height: calc(100vh - .4rem);
    // background: #fff;
}
.nav- {
    font-size: .34rem;
}
.nav i {
    padding-right: .4rem;
    font-size: .4rem;
}

.list {
    padding: .58rem .3rem;
    min-height: calc(100vh - 1.6rem);
    background: #fff;
}
.item {
    margin-bottom: .6rem;
    text-align: left;
}
.icon {
    width: 1rem;
    height: 1rem;
    margin-right: .2rem;
    border-radius: 1rem;
    overflow: hidden;
}
.icon img {
    width: 100%;
}
.right {
    width: calc(100% - 1.2rem)
}
.right > div:first-child {
    justify-content: space-between;
    align-items: center;
}
.name {
    font-size: .34rem;
    color: #010101;
}
.reply {
    font-size: .34rem;
    padding-left: .34rem;
}
.date {
    color: #999;
}
.return-info {
    font-size: .26rem;
    color: #4D4D4D;
    margin-top: .2rem;
    margin-bottom: .06rem;
}
.topic {
    padding: .06rem .3rem;
    padding-bottom: 0;
    background: #EBF0F2;
    color: #808080;
    font-size: .26rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>