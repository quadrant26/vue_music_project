<template>
    <transition name="slide">
      <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import { mapGetters } from 'vuex'
  import { ERR_OK } from 'api/config'
  import {getMusicList} from 'api/rank'
  import { createSong} from "common/js/song";

  export default {
    computed: {
      title (){
        return this.topList.topTitle
      },
      bgImage (){
        if (this.songs.length){
          return this.songs[0].image
        }
        return this.topList.picUrl
      },
      ...mapGetters([
        'topList'
      ])
    },
    data (){
      return {
        songs: []
      }
    },
    created (){
      this._getTopList()
    },
    methods: {
      _getTopList (){

        if (!this.topList.id){
          this.$router.push({
            path: '/rank'
          })
          return
        }

        getMusicList(this.topList.id).then( (res) => {
          if ( res.code === ERR_OK ){
            // console.log(res.songlist)
            this.songs = this._normalLizeSongs(res.songlist)
          }
        })
      },
      _normalLizeSongs (list){
        let ret = [];

        list.forEach( (item) => {
          const musicData = item.data
          if ( musicData.songid && musicData.albumid ){
            ret.push( createSong(musicData))
          }
        })

        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
