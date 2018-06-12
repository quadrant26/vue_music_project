<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage" class="singer-detail"></music-list>
  </transition>

</template>

<script>
  import {mapGetters} from 'vuex'
  import { getSingerDetail, getSongKey } from 'api/singer'
  import { ERR_OK} from "api/config";
  import { createSong } from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default {
    data (){
      return {
        songs: []
      }
    },
    computed: {
      title (){
        return this.singer.name
      },
      bgImage (){
        return this.singer.avater
      },
      ...mapGetters([
        'singer'
      ])
    },
    created (){
      this._getSingerDetail()
    },
    mounted (){
    },
    methods: {
      _getSingerDetail (){
        // 如果没有 singer id 回退到歌手列表
        if ( !this.singer.id ){
          this.$router.push('/singer')
          return
        }

        let _this = this;

        getSingerDetail(this.singer.id).then( (res) => {
          if (res.code == ERR_OK){
            this.songs = _this._normalLizeSongs(res.data.list)
          }
        })
      },
      _normalLizeSongs (list){
        let _this = this;
        let ret = []


        list.forEach( (item, index) => {

          let { musicData } = item
          let { songmid} = musicData
          /*getSongKey(songmid).then( (resp) => {

            if (resp.code === ERR_OK){
              let key = resp.data.items[0].vkey

              if ( musicData.songid && musicData.albummid ){
                ret.push(createSong(musicData, key))
              }
            }
          })*/
          if ( musicData.songid && musicData.albummid ){
            ret.push(createSong(musicData))
          }
        })
        return ret;
      }
    },
    components: {
      MusicList
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
