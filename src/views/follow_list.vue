<template>
    <div class="wrapper">
        <div class="top"></div>      
        <div class="nav flex-row">
            <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
            <div style="width:calc(100% - .7rem)">
                <ul class="nav-list flex-row">
                    <li :class="active==k?'nav-item active':'nav-item'" 
                    v-for="(item,k) in list" :key="k"
                    @click="active=k">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="top-pedestal"></div>
        <div style="height:.28rem"></div>
        <followList v-if="list[0].show" v-show="active==0" url="/api/My/MyFollowList" :active="0"/>
        <followList v-if="list[1].show" v-show="active==1" url="/api/My/ReceiveFollowList" :active="1"/>
        <followList v-if="list[2].show" v-show="active==2" url="/api/My/MyStoreList" :active="2"/>
    </div>
</template>

<script>
import followList from '../components/follow_list_';
export default {
    components:{
        followList
    },
    props:{},
    data(){
        return {
            active: 0,
            list: [{name:"我的关注",show:true},{name:"我的粉丝",show:false},{name:"我的收藏",show:false}],
        }
    },
    watch:{
        active(n) {
            if(!this.list[n].show) {
                this.list[n].show = true;
            }     
        }
    },
    computed:{},
    methods:{

    },
    created(){

    },
    mounted(){  
          
    },
    activated() {
        this.init_nav();
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
    padding-right: .3rem;
}
.nav-list {
    justify-content: space-between;
    height: 1rem;
    line-height: 1rem;
    font-size: .28rem;
}
.nav-item {
    border-bottom: 2px solid transparent;
}
.active {
    color: #34C3CB;
    border-bottom: 2px solid #34C3CB;
}

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