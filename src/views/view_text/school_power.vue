<template>
    <div class="wrapper">
        <div class="top-back">
            <i class="iconfont icon-zuojiantou" @click="back"></i>
        </div>
        <ul class="list">
            <li class="item" v-for="(item,k) in list" :key="item.f_id">
                <div class="item-title flex-row" v-if="item.occurdate">
                    <div class="item-title-left-wrapper flex-row">
                        <div class="item-title-left"></div>
                        <div class="item-title-content">{{item.occurdate}}</div>
                    </div>
                    <div class="item-title-right">
                        <i class="iconfont icon-zuojiantou"></i>
                    </div>
                </div>
                <div class="item-info" :style="k==list.length-2?'border:none':''">
                    <!-- <p>{{item.name}}</p> -->
                    <!-- <p>{{item.des}}</p> -->
                    <p v-for="(item_,key) in item.paragraph" :key="key">{{item_}}</p>
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
        back() {
            this.$router.back()
        }
    },
    created(){},
    mounted(){
        // console.log(JSON.parse(this.$route.query.school_power))
        if(typeof this.$route.params.school_power == 'object') {
            this.list = this.$route.params.school_power;
        }
        if(typeof this.$route.params.school_power == 'string') {
            let arr = [];
            for(let item of this.$route.params.school_power.split('|')) {
                arr.push({
                    occurdate: item.split('/')[0],
                    name: item.split('/')[1],
                    // paragraph: item.split('/')[1]?item.split('/')[1].split('*'):[]
                });               
            }
            this.list = [...this.list,...arr];        
            for(let item of this.list) {
                if(item.name) {
                    item.paragraph = item.name.split('*')
                }               
            }
            // console.log(this.list)
        }
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
    padding: .4rem .3rem;
    background: #fff;
    min-height: 100vh;
}
.top-back {
    padding-bottom: .55rem;
    text-align: left;
}
.top-back i {
    font-size: .36rem;
    padding-right: .4rem;
}

.item-title {
    margin-bottom: .46rem;
    justify-content: space-between;
}
.item-title-left-wrapper {
    align-items: center;
}
.item-title-left {
    width: .16rem;
    height: .34rem;
    border-radius: .16rem;
    background: #7AE7BA;
    margin-right: .45rem;
}
.item-title-content {
    font-size: .4rem;
}
.item-title-right {
    transform: rotate(-90deg);
    padding: .2rem;
}
.item-title-right i {
    color: #fff;   
    font-size: .22rem;
}

.item-info {
    margin: 0 .45rem;
    padding-bottom: .38rem;
    margin-bottom: .6rem;
    font-size: .28rem;
    border-bottom: 1px solid #eee;
    color: #4c4c4c;
}

.item-info p {
    text-align: left;
    margin-bottom: .22rem;
}

</style>