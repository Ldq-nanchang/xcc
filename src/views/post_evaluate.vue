<template>
    <div class="wrapper">
        <div class="top"></div>
        <div class="nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
            <span>发表评价</span>
            <span class="theme-color" style="padding: .3rem" @click="post_evaluate">发布</span>
        </div>
        <div class="top-pedestal"></div>
        <div style="height: .2rem"></div>
        <div class="body">
            <div class="head flex-row">
                <div class="icon" :style="'background:url('+$store.state.organization.logo+');background-size:cover;background-position:center;'"></div>
                <p>{{$store.state.organization.name}}</p>
            </div>
            <div class="content">
                <textarea name="" id="" placeholder="说点什么吧..." v-model="content"></textarea>
            </div>
            <div class="star-wrapper">
                <p class="star-title">机构评分</p>
                <ul class="star-table">
                    <li class="flex-row">
                        <span class="star-type">效果</span>
                        <div class="stars">
                            <i class="iconfont icon-star star" v-for="(item,k) in new Array(5)" :key=k @click="effect=k+1"></i>
                        </div>
                        <div class="stars-">
                            <i class="iconfont icon-star star-" v-for="(item,k) in new Array(effect)" :key=k @click="effect=k+1"></i>
                        </div>
                        <span class="score">
                            {{effect}}分
                            <!-- <yd-countup :endnum="effect" ref="demoCountup1" duration="2"></yd-countup> -->
                        </span>
                    </li>
                    <li class="flex-row">
                        <span class="star-type">师资</span>
                        <div class="stars">
                            <i class="iconfont icon-star star" v-for="(item,k) in new Array(5)" :key=k @click="teaching=k+1"></i>
                        </div>
                        <div class="stars-">
                            <i class="iconfont icon-star star-" v-for="(item,k) in new Array(teaching)" :key=k @click="teaching=k+1"></i>
                        </div>
                        <span class="score">{{teaching}}分</span>
                    </li>
                    <li class="flex-row">
                        <span class="star-type">环境</span>
                        <div class="stars">
                            <i class="iconfont icon-star star" v-for="(item,k) in new Array(5)" :key=k @click="environment=k+1"></i>
                        </div>
                        <div class="stars-">
                            <i class="iconfont icon-star star-" v-for="(item,k) in new Array(environment)" :key=k @click="environment=k+1"></i>
                        </div>
                        <span class="score">{{environment}}分</span>
                    </li>
                    <li class="flex-row">
                        <span class="star-type">综合</span>
                        <div class="stars">
                            <i class="iconfont icon-star star" v-for="(item,k) in new Array(5)" :key=k></i>
                        </div>
                        <div class="stars-">
                            <i class="iconfont icon-star star-" v-for="(item,k) in new Array(star_total)" :key=k></i>
                        </div>
                        <span class="score">{{star_total_}}分</span>
                    </li>
                </ul>
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
            content: '',
            effect: 0,
            teaching: 0,
            environment: 0
        }
    },
    watch:{

    },
    computed:{
        star_total() {
            return Math.round((this.effect + this.teaching + this.environment)/3);
        },
        star_total_() {
            let num = (this.effect + this.teaching + this.environment)/3*10;
            return parseInt(num)/10
        }
    },
    methods:{
        post_evaluate() {
            if(!this.content) {
                this.$dialog.toast({
                    mes:'请输入评论内容',
                    timeout: 1000,
                    icon: 'error'
                })
                return false;
            }
            if(!this.teaching) {
                this.$dialog.toast({
                    mes:'请对效果评星',
                    timeout: 1000,
                    icon: 'error'
                })
                return false;
            }
            if(!this.effect) {
                this.$dialog.toast({
                    mes:'请对师资评星',
                    timeout: 1000,
                    icon: 'error'
                })
                return false;
            }
            if(!this.environment) {
                this.$dialog.toast({
                    mes:'请对环境评星',
                    timeout: 1000,
                    icon: 'error'
                })
                return false;
            }
            this.$http.ajax_post_('/api/Family/SaveComment',{
                Id: this.$store.state.organization.id,
                TypeCode: '04',
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                Content: this.content,
                Star: this.star_total_,
                ScoreXg: this.effect,
                ScoreSz: this.teaching,
                ScoreHj: this.environment
            },(res)=>{
                if(res.data.status=='-1') {
                    this.$dialog.toast({
                        mes: '该机构不存在',
                        timeout: 1000,
                        icon: 'error',
                    });
                    return false;
                }
                this.$dialog.toast({
                    mes: '发布成功',
                    timeout: 1000,
                    icon: 'scuess',
                    callback: ()=>{
                        this.$store.commit('updataPostEvaluate',true);
                        this.$router.back();
                    }
                });
            },()=>{
                this.$dialog.toast({
                    mes: '发布失败,请从新发布',
                    timeout: 1000,
                    icon: 'error',
                });
            })
        }

    },
    created(){
        this.$root.init_nav();
    },
    mounted(){
  
    },
    activated() {
        this.content = '';
        this.effect = 0;
        this.teaching = 0;
        this.environment = 0
    },
    deactivated() {}
}
</script>
<style lang="scss" scoped>
.wrapper {
    text-align: left;
}
.body {
    background: #fff;
    min-height: calc(100vh - 1.6rem);
}
.head {
    padding: .3rem;
    align-items: center;
    border-bottom: 1px solid #eee;
    font-size: .3rem;
}
.icon {
    width: .8rem;
    height: .8rem;
    border-radius: .8rem;
    margin-right: .3rem;
}
.content {
    padding: .3rem;
    border-bottom: .2rem solid rgb(246, 246, 246);
}
textarea {
    height: 1.6rem;
    width: 100%;
    border: none;
    background: rgb(246, 246, 246);
    padding: .3rem;
}

.star-wrapper {
    padding: .3rem;
}
.star-title {
    font-size: .3rem;
    font-weight: bold;
    margin-bottom: .48rem;
}
.star-table {
    border-bottom: 1px solid #eee;
}
.star-table li{
    position: relative;
    margin-bottom: .4rem;
    align-items: center;
    height: .5rem;
}
.star-type {
    margin-right: .4rem;
    color: #4D4D4D;
    font-size: .3rem;
}
.stars, .stars- {
    position: absolute;
    top: 0;
    left: 1rem;
    
}
.stars i, .stars- i{
    
    padding-right: .26rem;
    font-size: .4rem;
    color: #B3B3B3;
}
.stars- i {
    color: #FF8600;
}
.score {
    position: absolute;
    left: 4.3rem;
    color: #B3B3B3;
}
.theme-color:active {
    opacity: .7;
}
</style>