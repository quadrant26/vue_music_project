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
        getSingerDetail(this.singer.id).then( (res) => {
          if (res.code == ERR_OK){

            this.songs = this._normalLizeSongs(res.data.list)
            // console.log(this.songs)
            // this._normalLizeSongs(res.data.list).then( (res) => {
            //   this.songs = res
            // })
          }
        })
      },
      _normalLizeSongs (list){
        let _this = this;
        let ret = []
        list.forEach( (item, index) => {

          let { musicData } = item
          if ( musicData.songid && musicData.albummid ){

            /*_this._normalLizeKey (musicData).then( vkey => {
              ret.push(createSong(musicData, vkey))
              return resolve(ret);
            })*/
            ret.push(createSong(musicData))
          }
        })
        return ret;
        /*return new Promise(function (resolve, reject) {
          list.forEach( (item, index) => {

          let { musicData } = item
            if ( musicData.songid && musicData.albummid ){

              _this._normalLizeKey (musicData).then( vkey => {
                ret.push(createSong(musicData, vkey))
                return resolve(ret);
              })
              // ret.push(createSong(musicData))
            }
          })
        })*/
      },
      _normalLizeKey (musicData){
        var vkey = ''
        const {songmid, strMediaMid} = musicData

        return new Promise(function (resolve, reject ){
          getSongKey(songmid, strMediaMid).then( res => {
            if ( res.code == ERR_OK ){
              vkey = res.data.items[0].vkey;
              resolve(vkey)
            }
          })
        })
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
