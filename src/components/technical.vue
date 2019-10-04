<template>
    <div class="wrapper" v-if="school_info.baseinfo">
        <div style="padding: .3rem;">
        <div class="base">
            <div>
                <div class="font-weight margin-rt-026">地区:</div>
                <div v-if="school_info.baseinfo">{{school_info.baseinfo.cityname}}</div>
                <div v-else class="headstone" style="width:calc(100%-1rem);height:.24rem;border-radius:.24rem"></div>
            </div>
            <div>
                <div class="font-weight margin-rt-026">主管部门:</div>
                <div v-if="school_info.baseinfo">{{school_info.baseinfo.chargedeptname}}</div>
                <div v-else class="headstone" style="width:calc(100%-1.6rem);height:.24rem;border-radius:.24rem"></div>
            </div>

            <div v-if="$route.query.type_id=='04'">
                <div class="font-weight margin-rt-026">类别:</div>
                <div v-if="school_info.baseinfo">{{school_info.baseinfo.typename}}</div>
                <div v-else class="headstone" style="width:calc(100%-1rem);height:.24rem;border-radius:.24rem"></div>
            </div>
            <ul v-else>
                <li class="school-type">
                    <div class="font-weight margin-rt-026">所属集团:</div>
                    <div v-if="school_info.baseinfo">{{school_info.baseinfo.groupname}}</div>
                    <div v-else class="headstone" style="width:calc(100%-1.6rem);height:.24rem;border-radius:.24rem"></div>
                </li>
                <li class="school-type">
                    <div class="font-weight margin-rt-026">建校时间:</div>
                    <div v-if="school_info.baseinfo">{{school_info.baseinfo.builddate}}</div>
                    <div v-else class="headstone" style="width:calc(100%-1.6rem);height:.24rem;border-radius:.24rem"></div>
                </li>
                <li class="school-type">
                    <div class="font-weight margin-rt-026">是否住宿:</div>
                    <div v-if="school_info.baseinfo">{{school_info.baseinfo.islodging}}</div>
                    <div v-else class="headstone" style="width:calc(100%-1.6rem);height:.24rem;border-radius:.24rem"></div>
                </li>
                <li class="school-type">
                    <div class="font-weight margin-rt-026">学段:</div>
                    <div v-if="school_info.baseinfo">{{school_info.baseinfo.periodname}}</div>
                    <div v-else class="headstone" style="width:calc(100%-1rem);height:.24rem;border-radius:.24rem"></div>
                </li>
            </ul>
            <div>
                <div class="font-weight margin-rt-026">性质:</div>
                <div v-if="school_info.baseinfo">{{school_info.baseinfo.propertyname}}</div>
                <div v-else class="headstone" style="width:calc(100%-1rem);height:.24rem;border-radius:.24rem"></div>
            </div>
            <div>
                <div class="font-weight margin-rt-026">网址:</div>
                <div v-if="school_info.baseinfo" @click="$root.browser_url(school_info.baseinfo.url)">
                    <a>{{school_info.baseinfo.url}}</a>
                </div>
                <div v-else class="headstone" style="width:calc(100%-1rem);height:.24rem;border-radius:.24rem"></div>
            </div>
            <div>
                <div class="font-weight margin-rt-026">电话:</div>
                <div v-if="school_info.baseinfo" @click="$root.calling(school_info.baseinfo.telephone)">
                    <a>{{school_info.baseinfo.telephone}}</a>
                </div>
                <div v-else class="headstone" style="width:calc(100%-1rem);height:.24rem;border-radius:.24rem"></div>
            </div>
            <div>
                <div class="font-weight margin-rt-026">地址:</div>
                <div v-if="school_info.baseinfo">{{school_info.baseinfo.address}}</div>
                <div v-else class="headstone" style="width:calc(100%-1rem);height:.24rem;border-radius:.24rem"></div>
            </div>

            <div v-if="$route.query.type_id=='04'">
                <span class="font-weight margin-rt-026">法人代表:</span>
                <span v-if="school_info.baseinfo">{{school_info.baseinfo.legalperson}}</span>
            </div>
            <div v-if="$route.query.type_id=='04'">
                <span class="font-weight margin-rt-026">法人电话:</span>
                <span v-if="school_info.baseinfo">{{school_info.baseinfo.legalpersontelephone}}</span>
            </div>
            <div v-if="$route.query.type_id=='04'">
                <span class="font-weight margin-rt-026">招生人:</span>
                <span v-if="school_info.baseinfo">{{school_info.baseinfo.enrollperson}}</span>
            </div>
            <div v-if="$route.query.type_id=='04'">
                <span class="font-weight margin-rt-026">招生人电话:</span>
                <span v-if="school_info.baseinfo">{{school_info.baseinfo.enrollpersontelephone}}</span>
            </div>
        </div>
        <div class="title flex-row">
            <span>历史沿革</span>
        </div>
        <div class="history">
            <!-- <div class="margin-bt-03" v-for="(item) in school_info.history" :key="item.F_Id">
                <p class="font-weight margin-bt-02">{{item.name}}</p>
                <p>{{item.des}}</p>    
            </div> -->

            <div v-if="school_info.baseinfo">
                <yd-timeline>
                    <yd-timeline-item v-for="(item, k) in school_info.history" :key="item.F_Id" v-show="k<history_height">
                        <p style="margin-bottom: 10px;">{{item.occurdate}}</p>
                        <!-- <p style="margin-bottom: 10px;">{{item.name}}</p> -->
                        <p>{{item.des}}</p>          
                    </yd-timeline-item>
                </yd-timeline>
                <div v-if="school_info.history.length<=0" class="margin-bt-03">
                    <p style="padding-left:.3rem">暂无数据</p>
                </div>
                <div v-if="school_info.history.length>3" class="theme-color" @click="change_history_height"
                    :style="history_height>3?'text-align:center;transform: rotateZ(180deg)':'text-align:center;'">
                    <i  class="iconfont icon-z044"></i>
                </div>
            </div>
            <div v-else style="padding:0 .3rem;">
                <div class="headstone margin-bt-01" style="width:calc(100% - .48rem);height:.24rem;border-radius:.24rem;margin-left:.48rem"></div>
                <div class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem;"></div>
                <div class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem;"></div>
            </div>

        </div>
        <div class="teachers" v-if="teachers.length>0">
            <div class="title flex-row">
                <span>相关名师</span>
            </div>
            <div style="position:relative;text-align:center" v-if="teachers.length>0">
                <ul class="teacher-list flex-row">
                    <li class="teacher-item flex-col" v-for="item in teachers" :key="item.f_id" @click="to_teacher_info(item.f_id,item.periodcode)">
                        <div class="teacher-icon" :style="school_info.baseinfo&&school_info.baseinfo.logo?'background:url('+$root.img_url+item.headpic+');background-size:cover;background-position:center;':''"></div>
                        <p style="font-size:.26rem;margin-bottom:.12rem;">{{item.truename}}</p>
                        <p>
                            <span v-for="(item_,k) in item.tags" :key="k">{{item_.F_ItemName}} </span>
                        </p>
                    </li>
                </ul>
                <div class="scroll-cover"></div>
            </div>

        </div>

        <div class="year-index" style="margin-top:0;margin-bottom:.5rem" v-if="school_info.allschooltg&&school_info.allschooltg.length>0">
            <div class="year-index-table-wrapper">
                <div class="year-index-table">
                    <ul class="year-index-table-head">
                        <li><span>年份</span></li>
                        <li v-for="(item,k) in school_info.allschooltg[0].list" :key="k" v-show="item.modulename=='SZLL'">
                            <span>{{item.f_itemname}}</span>
                        </li>
                    </ul>
                    <div class="year-index-table-body flex-row">
                        <ul class="year-index-table-item"
                        v-for="item in school_info.allschooltg" :key="item.year">
                            <li>
                                <span>{{item.year}}</span>
                            </li>
                            <li v-for="(item_, k) in item.list" :key="k+item_.f_itemname" v-show="item_.modulename=='SZLL'">
                                <span v-if="item_.propertyvalue==0">-</span>
                                <span v-else>{{item_.propertyvalue}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="title flex-row" v-if="school_info.baseinfo.schoolcondition||school_info.allschooltg&&school_info.allschooltg.length>0">
            <span>办学条件</span>
        </div>
        <div class="condition" :style="!school_info.baseinfo.schoolcondition?'padding:0;margin:0;box-shadow:none':''">
            <!-- <div v-if="school_info.baseinfo.schoolcondition">
                <div class="margin-bt-03"
                v-for="item in paragraph(school_info.baseinfo.schoolcondition)" :key="item.F_Id">
                    <p class="margin-bt-02"
                    v-for="(item_,k) in item.paragraph" :key="k">{{item_}}</p>
                </div>
            </div>
            <div v-else class="margin-bt-03">
                <p>暂无数据</p>
            </div> -->
            <div v-if="school_info.baseinfo">
                <div v-if="school_info.baseinfo.schoolcondition" v-html="line_feed(school_info.baseinfo.schoolcondition.substr(0,condition))"></div>
                <div v-if="school_info.baseinfo.schoolcondition&&school_info.baseinfo.schoolcondition.length>100" class="theme-color" @click="change_condition_height"
                    :style="condition>100?'text-align:center;transform: rotateZ(180deg)':'text-align:center;'">
                    <i class="iconfont icon-z044"></i>
                </div>
                <!-- <div v-else class="margin-bt-03" style="padding:.3rem;margin-bottom:.6rem">
                    <p>暂无数据</p>
                </div> -->
            </div>
            <div v-else>
                <div class="headstone margin-bt-01" style="width:calc(100% - .48rem);height:.24rem;border-radius:.24rem;margin-left:.48rem"></div>
                <div class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem;"></div>
                <div class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem;"></div>
            </div>
        </div>
        <div class="year-index" style="margin-top:0;margin-bottom:.5rem" v-if="school_info.allschooltg&&school_info.allschooltg.length>0">
            <div class="year-index-table-wrapper">
                <div class="year-index-table">
                    <ul class="year-index-table-head">
                        <li><span>年份</span></li>
                        <li v-for="(item,k) in school_info.allschooltg[0].list" :key="k" v-show="item.modulename=='BXTJ'">
                            <span>{{item.f_itemname}}</span>
                        </li>
                    </ul>
                    <div class="year-index-table-body flex-row">
                        <ul class="year-index-table-item"
                        v-for="item in school_info.allschooltg" :key="item.year">
                            <li>
                                <span>{{item.year}}</span>
                            </li>
                            <li v-for="(item_, k) in item.list" :key="k+item_.f_itemname" v-show="item_.modulename=='BXTJ'">
                                <span v-if="item_.propertyvalue==0">-</span>
                                <span v-else>{{item_.propertyvalue}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="title flex-row" v-if="school_info.baseinfo.schoolachieve||school_info.allschooltg&&school_info.allschooltg.length>0">
            <span>办学成就</span>
        </div>
        <div class="condition" :style="!school_info.baseinfo.schoolachieve?'margin:0;padding:0;box-shadow:none':''">
            <!-- <div v-if="school_info.baseinfo.schoolachieve">
                <div class="margin-bt-03"
                v-for="item in paragraph(school_info.baseinfo.schoolachieve)" :key="item.F_Id">
                    <p :class="k=='0'?'font-weight margin-bt-02':'margin-bt-02'"
                    v-for="(item_,k) in item.paragraph" :key="k">{{item_}}</p>
                </div>
            </div>
            <div v-else class="margin-bt-03">
                <p>暂无数据</p>
            </div> -->
            <div v-if="school_info.baseinfo">
                <div v-if="school_info.baseinfo.schoolachieve" v-html="line_feed(school_info.baseinfo.schoolachieve.substr(0,achieve))">
                    
                </div>
                <div v-if="school_info.baseinfo.schoolachieve&&school_info.baseinfo.schoolachieve.length>100" class="theme-color" @click="change_achieve_height"
                    :style="achieve>100?'text-align:center;transform: rotateZ(180deg)':'text-align:center;'">
                    <i class="iconfont icon-z044"></i>
                </div>
                <!-- <div v-else class="margin-bt-03">
                    <p>暂无数据</p>
                </div> -->
            </div>
            <div v-else>
                <div class="headstone margin-bt-01" style="width:calc(100% - .48rem);height:.24rem;border-radius:.24rem;margin-left:.48rem"></div>
                <div class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem;"></div>
                <div class="headstone margin-bt-01" style="width:100%;height:.24rem;border-radius:.24rem;"></div>
            </div>
        </div>
        <div class="year-index" style="margin-top:0;margin-bottom:.5rem" v-if="school_info.allschooltg&&school_info.allschooltg.length>0">
            <div class="year-index-table-wrapper">
                <div class="year-index-table">
                    <ul class="year-index-table-head">
                        <li><span>年份</span></li>
                        <li v-for="(item,k) in school_info.allschooltg[0].list" :key="k" v-show="item.modulename=='BXCJ'">
                            <span>{{item.f_itemname}}</span>
                        </li>
                    </ul>
                    <div class="year-index-table-body flex-row">
                        <ul class="year-index-table-item"
                        v-for="item in school_info.allschooltg" :key="item.year">
                            <li>
                                <span>{{item.year}}</span>
                            </li>
                            <li v-for="(item_, k) in item.list" :key="k+item_.f_itemname" v-show="item_.modulename=='BXCJ'">
                                <span v-if="item_.propertyvalue==0">-</span>
                                <span v-else>{{item_.propertyvalue}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="title flex-row" v-if="school_info.major&&school_info.major.length>0">
            <span>专业介绍</span>
        </div>
        <div class="major flex-row"  v-if="school_info.major&&school_info.major.length>0">
            <div class="major-table flex-row">
                <ul class="major-name">
                    <li><span>专业</span></li>
                    <li v-for="item in school_info.major" :key="'majorName'+item.F_Id"
                    :style="item.backcolor?'background:'+item.backcolor+';color:#fff':''">
                        <span>{{item.majorname}}</span>
                    </li>
                </ul>
                <div class="major-des flex-row">
                    <ul class="major-year">
                        <li><span>学制/学费</span></li>
                        <li v-for="item in school_info.major" :key="'majorYear'+item.F_Id"
                        :style="item.backcolor?'background:'+item.backcolor+';color:#fff':''">
                            <span>{{item.schoollength}}/{{!item.fee?'-':item.fee}}</span>
                        </li>
                    </ul>

                    <ul class="major-year">
                        <li><span>住宿费</span></li>
                        <li v-for="item in school_info.major" :key="'majorYear'+item.F_Id"
                        :style="item.backcolor?'background:'+item.backcolor+';color:#fff':''">
                            <span>{{!item.roomfee?'-':item.roomfee}}</span>
                        </li>
                    </ul>
                    <ul class="major-year">
                        <li><span>招生人数</span></li>
                        <li v-for="item in school_info.major" :key="'majorYear'+item.F_Id"
                        :style="item.backcolor?'background:'+item.backcolor+';color:#fff':''">
                            <span>{{!item.totalenrollment?'-':item.totalenrollment}}</span>
                        </li>
                    </ul>
                    <ul class="major-direction" v-if="school_info.major">
                        <li><span>就业方向</span></li>
                        <li style="text-align:left" v-for="item in school_info.major" :key="'majorDirection'+item.F_Id"
                        :style="item.backcolor?'background:'+item.backcolor+';color:#fff':''">
                            <div v-if="item.trainingdirection">
                                <span v-if="item.trainingdirection.length<35">{{item.trainingdirection}}</span>
                                <span v-else @click="all_txt(item.trainingdirection)">{{item.trainingdirection.slice(0,35)}}...</span>  
                            </div>
                            <div v-else>
                                <span>-</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>  
        </div>

        </div>
        <schoolIndex v-if="school_info.schooltg&&school_info.schooltg.length>0" :schooltg="school_info.schooltg"/>
        <div style="padding:.3rem">
        <!-- <div class="year-index" v-if="school_info.allschooltg&&school_info.allschooltg.length>0">
            <p class="font-weight margin-bt-03">历年指标数据表</p>
            <div class="year-index-table-wrapper">
                <div class="year-index-table">
                    <ul class="year-index-table-head">
                        <li><span>年份</span></li>
                        <li v-for="(item,k) in school_info.allschooltg[0].list" :key="k">
                            <span>{{item.f_itemname}}</span>
                        </li>
                    </ul>
                    <div class="year-index-table-body flex-row">
                        <ul class="year-index-table-item"
                        v-for="item in school_info.allschooltg" :key="item.year">
                            <li>
                                <span>{{item.year}}</span>
                            </li>
                            <li v-for="(item_, k) in item.list" :key="k+item_.f_itemname">
                                <span v-if="item_.propertyvalue==0">-</span>
                                <span v-else>{{item_.propertyvalue}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> -->
        <yd-popup v-model="show_window" position="center" width="90%">
            <div class="window">
                <span>{{major_txt}}</span>
            </div>
        </yd-popup>
        </div>
    </div>
</template>

<script>

import schoolIndex from '@/components/school_index.vue';
export default {
    components:{
        schoolIndex,
    },
    props:{
        school_info: {
            type: Object
        }
    },
    data(){
        return {
            condition: 100,
            achieve: 100,
            show_window: false,
            major_txt: '',
            show_history: true,
            teachers: [],
            history_height: 3
        }
    },
    watch:{
        $route: {
            deep: true,
            handler: function(n) {
                if(!this.$store.state.second_show&&!this.$store.state.third_show) {
                    this.get_teachers(5);
                }
            }
        }
    },
    computed:{},
    methods:{
        change_history_height() {
            if(this.history_height>3) {
                this.history_height=3;
            }else {
                this.history_height=this.school_info.history.length;
            }
        },
        change_condition_height() {
            if(this.condition>100) {
                this.condition=100;
            }else {
                this.condition=this.school_info.baseinfo.schoolcondition.length;
            }
        },
        change_achieve_height() {
            if(this.achieve>100) {
                this.achieve=100;
            }else {
                this.achieve=this.school_info.baseinfo.schoolachieve.length;
            }
        },
        all_txt(txt) {
            this.major_txt = txt;
            this.show_window = true;
           
        },
        line_feed(str) {
            let str_ = '';
            if(str.split('/').length>1) {
                str_=str.split('/')[1]
            }else {
                str_=str.split('/')[0]
            }
            return str_.replace(/\n/g,"<br/><br/>")||str_.replace(/\r/g,"<br/><br/>")
        },
        paragraph(essay) {
            let arr = [];
            if(essay) {
                for(let item of essay.split('|')) {
                    arr.push({
                        occurdate: item.split('/')[0],
                        name: item.split('/')[1],
                    });               
                }
                // this.list = [...this.list,...arr];        
                for(let item of arr) {
                    if(item.name) {
                        item.paragraph = item.name.split('*')
                    }               
                }
            }
            return arr;
        },
        to_teacher_info(id,type_id) {
            this.$router.push({
                path: '/teacher_info?id='+id+'&type_id='+type_id
            })
        },
        get_teachers(page_size) {
            this.$http.ajax_post_('/api/School/GetTeacherListBySchoolId',{
                Id: this.$route.query.id,
                CurrentPage: 1,
                PageSize: page_size
            },(res)=>{
                if(res.data.status=='-1') {
                    this.$dialog.alert({
                        title: '温馨提示',
                        mes: '名师列表加载失败',
                    });
                    return false;
                }
                if(res.data.totalCount > page_size) {
                    this.get_teachers(res.data.totalCount);
                    return false;
                }

                this.teachers = res.data.data.datalist;
            },(err)=>{
                this.$dialog.alert({
                    title: '温馨提示',
                    mes: '名师列表请求失败',
                });
            })
        }
    },
    created(){},
    mounted(){
        // this.get_teachers(5);

        setTimeout(()=>{
            if(this.school_info.baseinfo) {
                this.paragraph(this.school_info.baseinfo.schoolachieve)
            }
            
            // console.log(this.line_feed(this.school_info.baseinfo.schoolachieve))
        })
    }
}
</script>
<style lang="scss" scoped>

.wrapper{
    color: #1a1a1a;
    background: #fff;
    text-align: left;
}
.base {
    margin-top: -.85rem;

}
.base, .history, .condition {
    padding: .3rem;
    box-shadow: 1px 1px 10px 1px rgba(77, 77, 77, 0.2);
    border-radius: 4px;
    margin-bottom: .6rem;
}
.base > div, .school-type {
	display: flex;
    display: -webkit-flex;

    // align-items: center;
    margin-bottom: .2rem;
    font-size: .26px;
    line-height: .3rem;
}
.base > div:last-child {
    margin-bottom: 0;
}
.base span {
    white-space:nowrap;
    font-size: .28rem;
}
.base a {
    text-decoration:underline;
    color: #34C3CB;
    margin-top: .02rem;
}
.base > div > div:not(:first-child) {
    font-size: 13px;
    word-wrap:break-word;
    // width: calc(100% - 1.6rem); 
    width: auto;
}
.title {
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

.history {
    padding: .3rem 0;
    overflow: hidden;
    
}
.history > div:last-child {
    margin-bottom: 0;
}

.condition > div:last-child, .condition p:last-child {
    margin-bottom: 0;
}

.major {
    position: relative;
    border-right: 1px solid #34C3CB;   
}
.major-table {
    overflow: scroll;
}
.major-name {
    position: absolute;
    left: 0;
    top: 0;
    flex-shrink:0;
    width: 1.8rem;
    border-top: 1px solid #34C3CB;
    border-bottom: 1px solid #34C3CB;
    box-shadow: 1px 1px 10px 1px rgba(77, 77, 77, 0.2);
    
}

.major-name li {
    height: 1rem;
    // line-height: 1rem;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .24rem;
    background: #fff;
    text-align: center;
    border-left: 1px solid #34C3CB;
    border-bottom: 1px solid #CDF3F5;
}
.major-name li:first-child,.major-year li:first-child,.major-direction li:first-child {
    background: #CDF3F5;
}
.major-des {
    flex-shrink:0;
    padding-left: 1.8rem;
}
.major-year {
    width: 1.4rem;
}
.major-year, .major-direction {
    flex-shrink:0;
    border-top: 1px solid #34C3CB;
    border-bottom: 1px solid #34C3CB;
}
.major-year li {
    
    height: 1rem;
    line-height: 1rem;
    font-size: .24rem;
    background: #fff;
    text-align: center;
    border-bottom: 1px solid #CDF3F5;
    color: #999;
}
.major-direction {
    width: calc(100vw - 2.4rem);
}
.major-direction li {

    overflow: hidden;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    height: 1rem;
    // line-height: 1rem;
    font-size: .24rem;
    background: #fff;
    text-align: center;
    border-bottom: 1px solid #CDF3F5;
    color: #999;
}

.year-index {
    margin-top: -1rem;
    padding: .3rem;
    box-shadow: 1px 1px 10px 1px rgba(77, 77, 77, 0.2);
    border-radius: 4px; 
}
.year-index-table-wrapper {
    position: relative;
}
.year-index-table {
    border-top: 1px solid #34C3CB;
    border-right: 1px solid #34C3CB;
    border-left: 1px solid #34C3CB;
    border: 1px solid #34C3CB;
    overflow: scroll;
    // width: 100%;
}
.year-index-table-head {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 50%;
    box-shadow: 1px 1px 10px 1px rgba(77, 77, 77, 0.2);
    background: #fff;
}
// .year-index-table-head li {
//     background: #fff;
// }
.year-index-table-body {
    
    padding-left: 50%;
}
.year-index-table-item {
    width: 3.2rem;
    flex-shrink: 0;
}
// .year-index-table ul {
//     width: 25%;
// }
.year-index-table-wrapper {
    position: relative;
}
.year-index-table li {
    height: .59rem;
    line-height: .59rem;
    text-align: center;
    border-bottom: 1px solid #34C3CB;
}
.year-index-table-wrapper::after{
    content: '';
    display: block;
    position: absolute;
    bottom: 1px;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #fff;
}
.year-index-table li:last-child {
    border-bottom: 1px solid transparent;
}
.year-index-table li:first-child {
    background: #CDF3F5;
}

.window {
    background: #fff;
    padding: .2rem;
    color:#1a1a1a;
    border-radius: 2px;
}

.teachers {
    padding-bottom: .3rem;
    background: #fff;
}

.teacher-list {
    overflow:scroll;
    -webkit-overflow-scrolling: touch;
    padding: .2rem;
}
.scroll-cover {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: #fff;
}
.teacher-list::-webkit-scrollbar {
    width: 2px;
    height: 10px
}
.teacher-item {
    flex-shrink: 0;
    align-items: center;
    margin-right: .3rem;
    padding: 0.2rem 0;
    width: 1.8rem;
    border-radius: 4px;
    box-shadow: 2px 2px 10px 2px rgba(77, 77, 77, 0.2); 
}
.teacher-item:active {
    opacity: .7;
}
.teacher-item p {
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding: 0 .2rem;
}
.teacher-icon {
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    margin-bottom: .22rem;
}
</style>