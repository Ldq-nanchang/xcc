<template>
    <div class="wrapper">
        <div class="title flex-row">
            <span>相关新闻</span>
            <span v-if="list.length>3" class="all" @click="to_information">查看全部</span>
        </div>
        <ul class="list">
            <li class="item" v-show="k<3" v-for="(item,k) in list" :key="item.f_id" @click="to_information_info(item)">
                <div class="flex-row" v-if="item.coverpic">
                    <div class="content">
                        <div class="item-title">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="content-foot">
                            <span style="margin-right:.3rem">{{item.source}}</span>
                            <span>{{$root.transform_time(item.f_creatortime)}}</span>
                        </div>
                    </div>
                    <div class="icon" :style="'background:url('+$root.img_url+item.coverpic+');background-size:cover;background-position:center;'"></div>
                </div>
                <div class="flex-row" v-else>
                    <div class="content-">
                        <div class="item-title">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="content-foot">
                            <span style="margin-right:.3rem">{{item.source}}</span>
                            <span>{{item.f_creatortime}}</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    components:{},
    props:{},
    data(){
        return {
            list: []
        }
    },
    watch:{},
    computed:{},
    methods:{
        get_news() {
            this.$http.ajax_post_('/api/School/GetNewsListBySchoolId',{
                Id: this.$route.query.id,
                CurrentPage: 1,
                PageSize: 6,
                OrderBy: ''
            },(res)=>{
                if(res.data.status=='-1') {
                    this.$dialog.alert({
                        title: '温馨提示',
                        mes: '新闻列表加载失败',
                    });
                    return false;
                }
                this.list = res.data.data.datalist;
            },()=>{
                this.$dialog.alert({
                    title: '温馨提示',
                    mes: '新闻列请求失败',
                });
            })
        },
        to_information() {
            if(this.$store.state.wechat) {
                return;
            }
            this.$router.push({
                path: '/information?id='+this.$route.query.id
            })
        },
        to_information_info(item) {
            this.$router.push({
                path: '/information_info?id='+item.f_id
            })
        }
    },
    created(){},
    mounted(){
        this.get_news();
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
    padding: .3rem;
    background: #fff;
    text-align: left;
}
.title {
    position: relative;
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
.all {
    position: absolute;
    right: 0;
    top: 0;
    color: #34c3cb;
    font-size: .3rem;
}
.item {
    padding: .3rem 0;
    border-bottom: 1px solid #E6E6E6;
}
.item:active {
    opacity: .7;
}
.item:last-child {
    border-bottom: 1px solid #fff;
}
.item:first-child {
    padding-top: 0;
}
.content {
    width: calc(100% - 2.1rem);
    padding-right: .36rem;
}
.content-foot {
    color: #999;
}
.item-title {
    margin-bottom: .4rem;
    width: 100%;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    font-size: .32rem; 
}
.icon {
    width:2.1rem;
    height: 1.5rem;
    border-radius: 8px;
}
</style>