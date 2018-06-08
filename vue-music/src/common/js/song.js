import jsonp from './jsonp'
import { commonParams, options, ERR_OK} from "api/config";
import { getSongKey } from 'api/singer'
import { getLyric, getLyricJsonp } from 'api/song'

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url, singer_id}) {

    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
    this.singer_id = singer_id
  }

  getLyric() {
    getLyric(this.mid, this.singer_id).then( (res) => {
      console.log(res)
      if ( res.retcode === ERR_OK ){
        this.getLyric = res.lyric
        console.log( this.getLyric )
      }
    })
  }
}

export function createSong (musicData, key){

  if (!key){
    var key = '075A73928AA89A876F827261362F1E1D0BF39B307A2495BEDD17F4827F4D9A21A98FBCCB21F3532B9F74C46A1A378E5E290971E3693DC63A'
  }
  return new Song({
    singer_id: musicData.singer[0].id,
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=2568118860&vkey=${key}&uin=0&fromtag=38`

  })

  // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
}

function filterSinger (singer){
  let ret = []
  if (!singer){
    return
  }

  singer.forEach( (s) => {
    ret.push(s.name)
  })

  return ret.join('/')
}
