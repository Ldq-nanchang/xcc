<template>
    <div class="wrapper">
        <div class="top"></div>
        <div class="nav- nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
            <span>消息</span>
            <i></i>
        </div>
        <div class="top-pedestal"></div>
        <div class="empty-div"></div>
        <ul class="labels flex-row">
            <li :class="active==k?'label-active label':'label'" v-for="(item, k) in labels" :key="k" @click="active=k">
                <span>{{item}}</span>
            </li>
        </ul>
        <div style="height:1rem"></div>
        <div>
            <messageComment v-show="active==0"/>
            <messagePraise v-show="active==1"/>
            <messageFollow v-show="active==2"/>
        </div>
    </div>
</template>

<script>
import messageComment from '@/components/message_comment.vue';
import messageFollow from '@/components/message_follow.vue';
import messagePraise from '@/components/message_praise.vue' 
export default {
    components:{
        messageComment,
        messageFollow,
        messagePraise
    },
    props:{},
    data(){
        return {
            active: 0,
            labels: ['评论/回复', '收到的赞', '新的关注']
        }
    },
    watch:{},
    computed:{},
    methods:{},
    created(){},
    mounted(){}
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
.nav- i {
    padding-right: .4rem;
    font-size: .4rem;
}
.empty-div {
    position: fixed;
    top: 1.4rem;
    left: 0;
    width: 100vw;
    height: .2rem;
    background:#eee;
    z-index: 1000;
}

.labels {
    position: fixed;
    top: 1.6rem;
    left: 0;
    width: 100vw;
    justify-content: space-around;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    font-size: .3rem;
    z-index: 1000;
    
}
.label {
    height: 1rem;
    line-height: 1rem;
    border-bottom: 2px solid transparent;
}
.label-active {
    color: #34C3CB;
    border-bottom: 2px solid #34C3CB;
}

</style>