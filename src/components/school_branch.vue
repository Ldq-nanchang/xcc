<template>
    <div class="wrapper">
        <div class="school-branch-title flex-row">
            <p>
                <span style="margin-right:0.1rem">{{title}}</span>
                <span style="color:rgb(102,102,102);font-size:0.3rem">{{title_label}}</span>
            </p>
        </div>
        <ul class="school-branch-list">
            <li class="school-branch-item" @click="select_school(item)" v-for="(item) in school_branch" :key="item.F_Id">
                <div class="school-branch-item-name flex-row">
                    <div class="school-branch-item-icon">
                        <i class="iconfont icon-quotation"></i>
                        <img src="../assets/school_branch_icon.jpg" alt="">
                    </div>
                    <p>{{item.name}}</p>
                </div>
                <div class="school-branch-address flex-row">
                    <i class="iconfont icon-dingwei"></i>
                    <p>{{item.cityname}}{{item.areaname}}{{item.address}}</p>
                </div>
                <div class="school-branch-phone flex-row" @click.stop="$root.calling(item.telephone)">
                    <i class="iconfont icon-dianhua"></i>
                    <p class="theme-color">{{item.telephone}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    components:{},
    props:{
        school_branch: {
            type: Array
        }
    },
    data(){
        return {
            title: '学校分区',
            title_label: '(排名不分先后)',
            list: [
                {title:'江西师范大学附属中学老校区',address:'南昌市青三湖区锦江路169号',phone:'0791-88507160'},
                {title:'江西师范大学附属中学老校区',address:'南昌市青三湖区锦江路169号',phone:'0791-88507160'}
            ],
            history_len: 1
        }
    },
    watch:{},
    computed:{},
    methods:{
        select_school(item) {   
            let route = {
                    path:'/school_info',
                    query:{
                        id: item.F_Id,
                        type_id: item.periodcode,
                    }
                }
            if(this.history_len>3) {
                this.$router.replace(route)
            }else {
                this.history_len++;
                this.$router.push(route)
            }

        }
    },
    created(){},
    mounted(){
        if(this.$route.name == 'organization_info'){
            this.title = '现有校区';
            this.title_label = '(按所在地显示)';
        }
        

    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    padding: 0 0.3rem 1rem 0.3rem;
    background: #fff;
    font-size: 0.26rem;
    color: #000;
}
.school-branch-title {
    // justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
    font-size: 0.38rem;
    color: #000;
    text-align: left;
}
.school-branch-title::before {
    content: '';
    display: inline-block;
    height: .38rem;
    border-left: 4px solid #34c3cb;
    margin-right: .2rem; 
}
.school-branch-item {
    padding: 0.2rem;
    background: #f9f9f9;
    border-radius: 4px;
    margin-bottom: 0.2rem;
}
.school-branch-item:last-child {
    margin-bottom: 0;
}
.school-branch-item-icon i {
    color:#e1e2e6;
    font-size: 0.12rem;
    
}
.school-branch-item-icon img {
    width: 0.35rem;
    vertical-align: top;
    margin-left: 0.07rem;
}
.school-branch-item-name {
    margin-bottom: 0.2rem;
}
.school-branch-item-name p {
    font-size: 0.3rem;
    padding-left: 0.07rem;
}
.school-branch-address, .school-branch-phone {
    color: #727272;
    text-align: left;
    font-size: 0.25rem;
}
.school-branch-phone {
    padding-top: .15rem;
    margin-bottom: 0;
}
.school-branch-address i, .school-branch-phone i{
    font-size: 0.3rem;
    color: #101d37;
    margin-right: 0.14rem;
    color: #101d37;
}
</style>