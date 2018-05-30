<template>
  <div class="singer">
    <list-view :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import { getSingerList } from "api/singer";
  import { ERR_OK } from "api/config";
  import ListView from 'base/listview/listview'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 20

  export default {
  data (){
    return {
      singers: [],
    }
  },
  created (){
    this._getSingerList()
  },
  methods: {
    _getSingerList (){
      getSingerList().then( (res) => {
        if (res.code === ERR_OK){
          this.singers = this._normalLizeSinger(res.singerList.data);
        }
      })
    },
    _normalLizeSinger (data) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }

      const list = data.singerlist
      const keylist = data.tags.index;

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
      const ret = [];

      keylist.forEach( (item, index) => {
        if (index < keylist.length-1 ){
          ret.push({
            title: item.id,
            name: item.name
          })
        }
      })

      return hot.concat(ret);
    }

  },
  components: {
    ListView
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top 88px
    bottom:0
    width: 100%
</style>
