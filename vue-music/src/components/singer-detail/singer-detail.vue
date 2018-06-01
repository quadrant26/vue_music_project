<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>

</template>

<script>
  import {mapGetters} from 'vuex'
  import { getSingerDetail } from 'api/singer'
  import { ERR_OK} from "api/config";
  import { createSong } from 'common/js/song'

  export default {
    data (){
      return {
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created (){
      this._getSingerDetail();
    },
    methods: {
      _getSingerDetail (){
        // 如果没有 singer id 回退到歌手列表
        if ( !this.singer.id ){
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then( (res) => {
          if (res.code == ERR_OK){
            this.songs = this._normalLizeSongs(res.data.list)
            // console.log(this.songs)
          }
        })
      },
      _normalLizeSongs (list){
        let ret = []
        list.forEach( (item, index) => {
          if (index > 0)return;
          let { musicData } = item
          if ( musicData.songid && musicData.albummid ){

            console.log( createSong(musicData) )
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background

  .slide-enter-active, .slide-leave-active
    transition: all .3s
  .slide-enter, .slide-leave
    transform: translate3d(100%, 0, 0)

</style>
