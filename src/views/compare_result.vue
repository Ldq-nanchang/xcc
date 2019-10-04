<template>
    <div class="wrapper" :style="$store.state.wechat?'height:102vh;overflow:hidden;':''">
        <div v-if="compare_result.school">
            <div style="height:.4rem;background:#fff"></div>
            <div class="compare-result-top">
                <div class="compare-result-nav flex-row" v-if="$store.state.old_version">
                    <i class="iconfont icon-zuojiantou" @click="$root.back"></i>
                    <span>对比结果</span>
                    <yd-icon name="more" @click.native="$root.share_url(share_page,'')"></yd-icon>
                </div>
                <div class="compare-schools flex-row">
                    <div class="compare-school">
                        <div style="text-align: left">学校1</div>
                        <div class="compare-school-name">
                            <span>{{compare_result.school.name}}</span>
                        </div>
                    </div>
                    <div class="compare-school">
                        <div style="text-align: left">学校2</div>
                        <div class="compare-school-name">
                            <span>{{compare_result.school.name2}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="compare-result-list-title">
                <span>学校概况对比表</span>
            </div>
            <div class="compare-result-list flex-row">
                <ul class="compare-result-list-left">
                    <li>学校概况</li>
                    <li v-for="(item,k) in compare_result.baseinfo" :key="k">
                        {{item.itemname}}
                    </li>
                </ul>
                <ul class="compare-result-list-right">
                    <li class="compare-result-list-right-title flex-row">
                        <div><span>{{compare_result.school.name}}</span></div>
                        <div><span>{{compare_result.school.name2}}</span></div>
                    </li>
                    <li class="compare-result-item-right flex-row" v-for="(item,key) in compare_result.baseinfo" :key="key">
                        <div @click="all_txt(item.itemvalue)">
                            <span v-if="item.itemvalue">{{item.itemvalue}}</span>
                            <span v-else>-</span>
                        </div>
                        <div @click="all_txt(item.itemvalue2)">
                            <span v-if="item.itemvalue2">{{item.itemvalue2}}</span>
                            <span v-else>-</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="compare-result-list-title">
                <span>教育信息对比柱状图</span>
            </div>
            <div class="compare-teaching">
                <div class="compare-teaching-title flex-row">
                    <div><span>{{compare_result.school.name}}</span></div>
                    <div><span>教育信息</span></div>
                    <div><span>{{compare_result.school.name2}}</span></div>
                </div>
                
                <ul class="compare-teaching-list">
                    <li class="compare-teaching-item flex-row" v-for="(item,index) in compare_result.schooltg" :key="index"
                    v-show="item.itemvalue2||item.itemvalue">
                        <div :class="item.itemvalue>item.itemvalue2?'compare-teaching-item-data-a flex-row':'compare-teaching-item-data-a bg-blue flex-row'">
                            <div v-if='item.itemvalue>100' :style="'width:'+(Number(item.itemvalue/30)+10)+'px'">{{item.itemvalue}}</div>
                            <div v-else :style="'width:'+(Number(item.itemvalue)+10)+'px;'+item.itemvalue?'':'opcity:0'">
                                <span v-if="item.itemvalue">{{item.itemvalue}}</span>
                            </div>
                        </div>
                        <div class="compare-teaching-item-center">{{item.itemname}}</div>
                        <div :class="item.itemvalue2>item.itemvalue?'compare-teaching-item-data-b flex-row':'compare-teaching-item-data-b bg-blue flex-row'">
                            <div v-if='item.itemvalue2>100' :style="'width:'+(Number(item.itemvalue2)/30+10)+'px'">{{item.itemvalue2}}</div>
                            <div v-else :style="'width:'+(Number(item.itemvalue2)+10)+'px;'+item.itemvalue2?'':'opcity:0'">
                                <span v-if="item.itemvalue2">{{item.itemvalue2}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                
            </div>
        </div>
        <div v-else>
            <div style="height:.4rem;background:#fff"></div>
            <div class="compare-result-top">
                <!-- <div class="compare-result-nav flex-row">
                    <i class="iconfont icon-zuojiantou"></i>
                    <span>对比结果</span>
                    <yd-icon name="more"></yd-icon>
                </div> -->
                <div class="compare-schools flex-row">
                    <div class="compare-school">
                        <div style="text-align: left">学校1</div>
                        <div class="compare-school-name">
                            <span></span>
                        </div>
                    </div>
                    <div class="compare-school">
                        <div style="text-align: left">学校2</div>
                        <div class="compare-school-name">
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="compare-result-list-title">
                <span>学校概况对比表</span>
            </div>

            <div class="compare-result-list flex-row">
                <ul class="compare-result-list-left">
                    <li>学校概况</li>
                    <li v-for="(item,k) in list" :key="k">
                        {{item}}
                    </li>
                </ul>
                <ul class="compare-result-list-right">
                    <li class="compare-result-list-right-title flex-row">
                        <div><span></span></div>
                        <div><span></span></div>
                    </li>
                    <li class="compare-result-item-right flex-row" v-for="(item,key) in list" :key="key">
                        <div class="flex-row" style="justify-content:center;align-items:center">
                            <div class="headstone headstone-"></div>
                        </div>
                        <div class="flex-row" style="justify-content:center;align-items:center">
                            <div class="headstone headstone-"></div>
                        </div>
                    </li>
                </ul>
            </div>


        </div>


        <yd-popup v-model="show_window" position="center" width="90%">
            <div class="window">
                <span>{{txt}}</span>
            </div>
        </yd-popup>        
    </div>
</template>

<script>
import {Icons} from 'vue-ydui/dist/lib.rem/icons';
export default {
  components:{
      "yd-icon": Icons
  },
  props:{},
  data(){
    return {
        show_window: false,
        txt: '',
        compare_result: {},
        list: [
            '学校学段','学校性质','所属集团','学校标签','建校时间','主管部门','是否寄宿','学费','学区'
        ],
        list_: [
            {a: '九年制',b: '九年制'},{a: '公办',b: '公办'},{a: '三中教育集团',b: '师大教育集团'}
            ,{a: '省重点',b: '省重点'},{a: '2002年',b: '2006年'},{a: '市级教育部门',b: '市级教育部门'}
            ,{a: '否',b: '是'},{a: '免费',b: '免费'},{a: '16000',b: '17000'}
        ],
        list_s: [
            {n:'在校生数',a:'3200',b:'3000'},{n:'招生人数',a:'600',b:'500'},{n:'班级数',a:'12',b:'10'}
            ,{n:'平均班额',a:'50',b:'50'},{n:'专任教师数',a:'56',b:'48'},{n:'生师比(%)',a:'6',b:'8'}
            ,{n:'正高职称教师数',a:'12',b:'16'},{n:'副高职称教师数',a:'36',b:'39'}
            ,{n:'中级以上职称教师生比',a:'36',b:'30'},{n:'正高职称教师数量',a:'52',b:'50'}
            ,{n:'市级以上骨干教师数量',a:'52',b:'50'},{n:'市级以上学科带头数量',a:'12',b:'15'}
        ]
        
    }
  },
  watch:{},
  computed:{
      share_page() {
            let page = {
                logo: this.$store.state.logo,
                name: this.compare_result.school.name+'PK'+this.compare_result.school.name2,
                des: this.compare_result.school.name+'PK'+this.compare_result.school.name2
            }
            return page
      }
  },
  methods:{
        init_share() {
            this.$store.commit('updataShare',{page:this.share_page,id:'',type_id:'13'});
        },
        init_nav() {
            let host = window.location.href.split('#')[0];
            if(this.$root._IsIOS()) {
                this.$IOS.getNavInfo(true,'比一比结果',1,'','#000000',host+'icon/icon_share.png','shareUrl')
            }else if(this.$root._IsAndroid()) {
                try{
                    android.getNavInfo(true,'比一比结果',1,'','#000000',host+'icon/icon_share.png','shareUrl')
                }catch(err){
                    console.log(err)
                }
            }
        },
        all_txt(txt) {
            if(txt.length<10) {
                return false;
            }
            this.show_window = true;
            this.txt = txt;
        },
        get_compare_result() {
            this.$http.ajax_post('/api/School/CompareResult',{
                Mobile: this.$store.state.user_status.mobile?this.$store.state.user_status.mobile:'',
                HToken: this.$store.state.user_status.htoken?this.$store.state.user_status.htoken:'',
                Id: this.$route.query.schoola_id,
                Id2: this.$route.query.schoolb_id,
                PeriodCode: this.$route.query.type_id
            },(res)=>{
                for(let item of res.data.data.baseinfo) {
                    if(item.itemname=='学区房'&&item.itemvalue) {
                        item.itemvalue = item.itemvalue + '元/㎡'
                    }
                    if(item.itemname=='学区房'&&item.itemvalue2) {
                        item.itemvalue2 = item.itemvalue2 + '元/㎡'
                    }    
                }
                this.compare_result = res.data.data;
                this.init_share();
                if(this.$root.isWeiXin()) {
                    this.$root.get_wechat_sign(this.share_page);
                }
            })
        },
        window_down_app() {
            if(!this.$store.state.wechat) {
                return false;
            }

            this.$dialog.confirm({
                title: '温馨提示',
                mes: '下载APP查询更多信息!',
                opts: [
                    {
                        txt: '取消',
                        color: false,
                        callback: () => {
                            wx.miniProgram.switchTab({
                                url: '/pages/index/index'
                            })
                        }
                    },
                    {
                        txt: '确定',
                        color: true,
                        callback: () => {
                            wx.miniProgram.switchTab({
                                url: '/pages/center/center'
                            })
                        }
                    }
                ]
            })
        }
  },
    created(){
        this.init_nav();
    },
    mounted(){
        // this.get_compare_result()
        let that = this;
        let onscroll_state = true;
 
            window.onscroll=function(){
                var t =document.documentElement.scrollTop||document.body.scrollTop;
                if(t>0&&onscroll_state) {
                    onscroll_state = false;
                    that.window_down_app()
                }
            }

    },
    activated() {
        this.get_compare_result()
    },
    deactivated() {}
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
    background: #f0f0f0;
}
.compare-result-top {
    background: #fff;
    padding: 0 .3rem .3rem .3rem;
}
.compare-result-nav {
    justify-content: space-between;
    align-items: center;
    // padding: .3rem 0;
    height: .88rem;
    margin-bottom: .38rem;
}
.compare-result-nav i {
    font-size: .4rem;
}
.compare-result-nav span {
    font-size: .34rem;
}
.compare-schools {
    justify-content: space-between;
}
.compare-school {
    width: 3.2rem;
    height: 1.62rem;
    border-radius: .1rem;
}
.compare-school-name {
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    margin-bottom: .2rem; 
}
.compare-school:first-child {
    background: linear-gradient(to right,#FF5A7B,#FF8777)
}
.compare-school:nth-child(2) {
    background: linear-gradient(to right,#0198FF,#07C1FF)
}
.compare-school {
    padding: .14rem .2rem;
    color: #fff;
    font-size: .24rem;
}

.compare-result-list-title {
    padding: .25rem .3rem;
    text-align: left;
    color: #808080;
    font-size: .26rem;    
}
.compare-result-list {
    background: #fff;
    box-shadow: 2px 2px 10px 2px rgba(52, 195, 203, 0.42);
}
.compare-result-list-left {
    width:1.8rem;
    box-shadow: 2px 2px 10px 2px rgba(52, 195, 203, 0.42);
}
.compare-result-list-left li {
    height: .9rem;
    line-height: .9rem;
    font-size: .26rem;
}

.compare-result-list-right {
    width: calc(100% - 1.8rem);
    
}
.compare-result-list-right-title {
    height: .9rem;
    background: #f0f0f0;
    color: #fff;
    font-size: .26rem;
    line-height: .9rem;
}
.compare-result-list-right-title div:first-child {
    width: calc(50% - .05rem);
    margin-right: .1rem;
    background: linear-gradient(to right,#FF5A7B,#FF8777);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;    
}
.compare-result-list-right-title div:nth-child(2) {
    width: calc(50% - .05rem);
    background: linear-gradient(to right,#0198FF,#07C1FF); 
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.compare-result-item-right {

    font-size: .26rem;
    color: #4D4D4D; 
}
.compare-result-item-right > div {
    height: .9rem;
    line-height: .9rem;
    width: 50%;
    // text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.compare-teaching {
    background: #fff;
    padding-bottom: 1.4rem;
}
.compare-teaching-title {
    justify-content: space-between;
    height: .9rem;
    background: linear-gradient(to right,#0198FF,#07C1FF);
    line-height: .9rem;
    color: #fff;
    font-size: .26rem;
}
.compare-teaching-title div {
    width: 33%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.compare-teaching-item {
    padding: .16rem 0;
}
.compare-teaching-item-center {
    width: 2.5rem;
    font-size: .2rem;
}
.compare-teaching-item-data-a,.compare-teaching-item-data-b {
    width: calc(50% - 1.25rem);
    color: #fff;
    font-size: .2rem;
    text-align: left;
}
.compare-teaching-item-data-a {
    justify-content: flex-end;
    text-align: right;
}
.compare-teaching-item-data-a div{  
    border-top-left-radius: .26rem;
    border-bottom-left-radius: .26rem;
    background:#FF5A7B;    
}
.compare-teaching-item-data-b div {
    border-top-right-radius: .26rem;
    border-bottom-right-radius: .26rem;
    background:#FF5A7B;
}
.bg-blue div {
    background: #36C6C9;
}

.headstone- {
    width: 1rem;
    height: .5rem;
}
.window {
    background: #fff;
    padding: .2rem;
    color:#1a1a1a;
    border-radius: 2px;
}

</style>