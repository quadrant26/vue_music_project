<template>
    <!--<scroll class="listview" :data="data" :datalist="datalist" ref="listview" @scroll="scroll" :listenScroll="listenScroll" :probeType="probeType">-->
      <scroll class="listview" :data="data" :datalist="datalist" ref="listview">
      <ul>
        <li v-for="group in datasinger" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li v-for="item in group.items" class="list-group-item">
              <img class="avatar" :src="item.avater" alt="">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
        <ul>
          <li v-for="(item, index) in shortcutList" :data-index="item.title" class="item"
              :class="{'current':currentIndex==index}">{{item.name}}</li>
        </ul>
      </div>
      <div class="list-fixed" v-show="fixedTitle">
        <h1 class="fixed-title">{{fixedTitle}}</h1>
      </div>
      <div v-show="!datasinger.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import { getData } from 'common/js/dom.js'
  import { getSingerList } from "api/singer";
  import { ERR_OK } from "api/config";
  import Loading from 'base/loading/loading'

  const ANCHOR_HEIGHT = 18
  const HOT_SINGER_LEN = 20
  const HOT_NAME = '热门'

  export default {
    data (){
      return {
        datasinger: [],
        currentIndex: 0,
        scrollY: -1
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      },
      datalist: {
        type: Array,
        default: []
      }
    },
    created (){
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    mounted (){
      this.datasinger = [].concat(this.data)
    },
    computed: {
      shortcutList (){
        return this.datalist.map( (group, index) => {
          return group
        })
      },
      fixedTitle (){
        // return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        return this.datasinger[0] ? this.datasinger[0].title : ''
      }
    },
    methods: {
      onShortcutTouchStart (e){
        /*
        let firstTouch = e.touches[0]
        let anchorIndex = getData(e.target, 'index');
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
        this.$refs.listview.scrollTopElement( this.$refs.listGroup[index], 0)
        console.log(anchorIndex);
        */

        let anchorIndex = getData(e.target, 'index')
        this._getSingerList(parseInt(anchorIndex))
        if (anchorIndex == -100) {
          this.currentIndex = 0
        }else{
          this.currentIndex = anchorIndex;
        }
      },
      onShortcutTouchMove (e){
        /*
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta

        this._scrollTo(anchorIndex)
        */
      },
      scroll (pos){
        this.scrollY = pos.y

      },
      _scrollTo (index){
        if ( !index && index !== 0){
          return
        }

        if (index < 0){
          index = 0
        }else if (index > this.listHeight.length - 2){
          index = this.listHeight.length - 2
        }

        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollTopElement( this.$refs.listGroup[index], 0)
      },
      _calculateHeight (){
        this.listHeight = [];
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++){
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _getSingerList (index){
        getSingerList(index).then( (res) => {
          if (res.code === ERR_OK){
            this.datasinger = this._normalLizeSinger(res.singerList.data);
          }
        })
      },
      _normalLizeSinger (data) {

        const HOT_NAME = data.index;
        if (HOT_NAME == -100){
          var NAME = "热门"
        }else{
          var NAME = String.fromCharCode(parseInt(HOT_NAME+64))
        }

        let map = {
          hot: {
            title: NAME,
            items: []
          }
        }

        const list = data.singerlist

        list.forEach( (item, index) => {
          if ( HOT_SINGER_LEN < index ){
            map.hot.items.push({
              id: item.singer_id,
              name: item.singer_name,
              avater: item.singer_pic
            })
          }
        })

        const hot = [];
        hot.push(map.hot)
        return hot;
      }
    },
    watch: {
      data (){
        this.datasinger = this.data;
        setTimeout( ()=>{
          this._calculateHeight()
        }, 20)
      },
      scrollY (newY) {
        const listHeight = this.listHeight
        // 滚动到顶部 newY > 0
        for (let i = 0; i < listHeight.length - 1; i++){
          let height1 = listHeight[i]
          let height2 = listHeight[i+1]
          if (!height2 || (-newY >= height1 && -newY < height2)){
            this.currentIndex = i
            this.diff = height2 + newY
          }
        }
        // 当滚动到底部，且 -newY 大于最后一个元素的上限
        this.currentIndex = 0
      },
      currentIndex (index){
        console.log(index)
        this.currentIndex = index
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
