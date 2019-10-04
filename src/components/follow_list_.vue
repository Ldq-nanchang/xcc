<template>
    <div class="wrapper">
        <ul class="list" v-show="!headstone_show">
            <yd-infinitescroll :callback="get_follow_list" ref="infinitescroll">
            <yd-list theme="1" slot="list">
            <li class="item flex-row" v-for="(item,k) in list_" :key="k" @click="go_info(item)">
                <div class="icon" v-if="active==0&&item.receivebyheadpic" :style="item.receivebyheadpic_bg"></div>
                <div class="icon" v-if="active==1&&item.followbyheadpic" :style="item.followbyheadpic_bg"></div>
                <div class="icon" v-if="active==2&&item.receivebyheadpic" :style="item.receivebyheadpic_bg"></div>
                <div class="content flex-row">
                    <div class="info">
                        <div class="font-03">
                            <span v-if="active==0&&item.receivebyname">{{item.receivebyname}}</span>
                            <span v-if="active==1&&item.followbynickname">{{item.followbynickname}}</span>
                            <div v-if="active==2&&item.receivebyname" class="store-txt">
                                <span>{{item.receivebyname}}</span>
                            </div>
                            
                            <span v-else>&nbsp;</span>
                        </div>
                        <p class="font-024" style="color: #999">{{item.followdate}}</p>
                    </div>
                    <div class="btn flex-row" v-if="active==0||active==1">
                        <yd-button @click.native.stop="follow(item)" v-show="!item.action" bgcolor="#34C3CB" color="#fff">+ 关注</yd-button>
                        <yd-button @click.native.stop="cancel_follow(item)" v-show="item.action" type="hollow">已关注</yd-button>
                    </div>
                    <div class="btn flex-row" v-if="active==2">
                        <yd-button @click.native.stop="store(item)" v-show="!item.action" bgcolor="#FE5491" color="#fff">+ 收藏</yd-button>
                        <yd-button @click.native.stop="store(item)" v-show="item.action" type="hollow">已收藏</yd-button>
                    </div>
                </div>
            </li>
            <span slot="doneTip">没有更多数据了~~</span>
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-list>
            </yd-infinitescroll>
        </ul>
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


        <yd-popup v-model="show_window" position="bottom" height="3rem">
            <div class="window-title">确定不再关注此人？</div>
            <div class="window-btn" @click="cancel_follow_">
                <span>确定</span>
            </div>
            <div style="background: #eee;height:.1rem"></div>
            <div class="window-btn" @click="show_window=false">
                <span>取消</span>
            </div>
        </yd-popup>
    </div>
</template>

<script>
export default {
    components:{},
    props:{
        url: {
            type: String
        },
        active: {
            type: Number
        }
    },
    data(){
        return {
            list_: [],
            item_: {},
            page: 1,
            show_window: false,
            headstone_show: true
        }
    },
    watch:{},
    computed:{},
    methods:{
        select_info(url,id,type_id) {
            this.$router.push({
                path:url,
                query: {
                    id: id,
                    type_id: type_id
                }
            })
        },
        go_info(item) {
            switch(item.objectcode){
                case '08':
                    if(this.active==1) {                  
                        this.$root.person_page(item.followbymobile,item.followby)
                    }else if(this.active==0) {
                        this.$root.person_page(item.receivebymobile,item.parentid)
                    }
                    break;
                case '01':
                    this.select_info('/school_info',item.parentid,item.objectcode)
                    break;
                case '02':
                    this.select_info('/school_info',item.parentid,item.objectcode)
                    break;
                case '03':
                    this.select_info('/school_info',item.parentid,item.objectcode)
                    break;
                case '04':
                    this.select_info('/school_info',item.parentid,item.objectcode)
                    break;
                case '05':
                    this.select_info('/organization_info',item.parentid,item.objectcode)
                    break;
                case '06':
                    this.select_info('/teacher_info',item.parentid,item.objectcode)
                    break;
                case '07':
                    this.select_info('/teacher_info',item.parentid,item.objectcode)
                    break;
                case '09':
                    this.select_info('/information_info',item.parentid,item.objectcode)
                    break;
            }
        },
        store(item) {
            this.$http.ajax_post_('/api/Family/SaveStore',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                Id: item.parentid,
                ObjectCode: item.objectcode
            },()=>{
                this.$dialog.toast({
                    mes: item.action==1?'取消成功':'收藏成功',
                    timeout: 1500,
                    icon: 'success',
                    callback: () => {
                        for(let item_ of this.list_) {
                            if(item_.F_Id == item.F_Id) {
                                item_.action = item.action==1?0:1;
                            }
                        }
                    }
                },()=>{
                    this.$dialog.alert({mes: '系统开了个小差~'});
                });
            })
        },
        cancel_follow(item) {
            this.show_window = true;
            this.item_ = item;
        },
        cancel_follow_() {
            this.$http.ajax_post_('/api/Family/SaveFollow',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                Id: this.active==1?this.item_.followby:this.item_.parentid,
                ObjectCode: this.item_.objectcode,
                SetValue: 0
            },(res)=>{    
                if(res.data.status !='0000') {
                    return false;
                }
                for(let item of this.list_) {
                    if(this.item_.F_Id == item.F_Id) {
                        item.action = 0;
                    }
                }
                this.$dialog.toast({
                    mes: '取消成功',
                    timeout: 1500,
                    icon: 'success',
                    callback: () => {
                        this.show_window = false;
                    }
                });
            },()=>{
                this.show_window = false;
                this.item_ = {};
                this.$dialog.alert({mes: '系统开了个小差~'});
            })
        },
        follow(item) {
            this.$root.follow('/api/Family/SaveFollow',1,this.active==1?item.followby:item.parentid,item.objectcode,item.name,()=>{
                this.$dialog.toast({
                    mes: '关注成功',
                    timeout: 1500,
                    icon: 'success',
                    callback: () => {
                        for(let item_ of this.list_) {
                            if(item.F_Id == item_.F_Id) {
                                item_.action = 1;
                            }
                        }
                    }
                });
            })    
        },
        get_follow_list() {
            this.$http.ajax_post(this.url,{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                CurrentPage: this.page++,
                PageSize: 9,
                OrderBy: ''
            },(res)=>{
                this.headstone_show = false;
                switch(this.active) {
                    case 0:
                        for(let item of res.data.data.datalist) {
                            item.action = 1;
                        }
                        break;
                    case 1:
                        for(let item of res.data.data.datalist) {
                            item.action = Number(item.isfollow);
                        }
                        break;
                    case 2:
                        for(let item of res.data.data.datalist) {
                            item.action = 1;
                        }
                        break;
                }
                this.list_ = [...this.list_, ...res.data.data.datalist];
                for(let item of this.list_) {
                    item.followbyheadpic_bg = `background:url('${item.followbyheadpic}');background-size:cover;background-position:center;`;
                    item.receivebyheadpic_bg = `background:url('${item.receivebyheadpic}');background-size:cover;background-position:center;`
                }
                if (res.data.data.datalist.length<9) {
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                    return;
                }
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');  
            })
        } 
    },
    created(){},
    mounted(){
        this.get_follow_list()
    }
}
</script>
<style lang="scss" scoped>
.list {
    background: #fff;
    min-height: calc(100vh - 1.2rem)
}
.item {
    padding: .3rem;
    border-bottom: 1px solid #eee;
}
.icon {
    margin-right: .2rem;
    width: 1rem;
    height: 1rem;
    overflow: hidden;
    border-radius: 1rem;
}
.icon img {
    width: 100%;
}
.content {
    justify-content: space-between;
    padding: .16rem 0 .18rem 0;
    width: calc(100% - 1.2rem)
}
.info {
    width: calc(100% - 1.5rem);
    text-align: left;
}
.btn {
    justify-content: flex-end;
    width: 1.5rem;
}
.store-txt {
    height: .7rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-align: left;
}
</style>