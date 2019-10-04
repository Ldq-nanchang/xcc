<template>
    <div class="wrapper" style="width:100vw;height:3rem">
        <!-- <el-amap v-if="show" vid="amap" :center="center" :amap-manager="amapManager" :zoom="zoom" class="map"> -->
        <el-amap v-if="show" vid="amap" :center="center" :zoom="zoom" class="map">
            <el-amap-marker v-for="marker in markers" :key="marker.contry" :position="marker.position" :content="marker.content" :visible="true" :draggable="false"></el-amap-marker>
        </el-amap>

    </div>
</template>

<script>

import AMap from "vue-amap"
import VueAMap from 'vue-amap';
import { lazyAMapApiLoaderInstance } from 'vue-amap';
// import { AMapManager } from 'vue-amap';
// let amapManager = new VueAMap.AMapManager();
export default {
    components:{

    },
    props:{
        school: {
            type: Object
        }
    },
    data(){
        return {
            show: false,
            zoom: 15,
            center: [115.849491,28.660745],
            // amapManager,
            markers: [
                {
                    position: [115.849491,28.660745],
                    content: this.getContentHtml('郑州'),
                    schoolName: '中国'
                },
            ],
        }
    },
    watch:{
        school: {
            deep: true,
            handler: function() {
                this.init_map()
            }
        }
    },
    computed:{},
    methods:{
        getContentHtml(txt) {
            let  html = `<p><p>`
        },
        init_map() {
            let that = this;
            let sta = that.school.xy.substring(1,that.school.xy.length-1)
            let arr = sta.split(',')
            this.center = arr;
            this.markers[0].position = arr;
            VueAMap.initAMapApiLoader({
                key: '16ae564d6e55fbae3ce442ede976d548',
                plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
                center: arr
                });
                this.show = true;
        },       
    },
    created(){},
    beforeMounte() {

    },
    mounted(){
        //    setTimeout(()=>{
               this.init_map()
        //    },1000)
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    color: #1a1a1a;
    height: 6rem;
    width: 100vw;
    padding-bottom: .6rem;
    background: #fff;
}
</style>