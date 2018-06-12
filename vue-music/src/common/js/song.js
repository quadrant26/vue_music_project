import jsonp from './jsonp'
import { commonParams, options, ERR_OK} from "api/config";
import { getSongKey } from 'api/singer'
import { getLyric, getLyricJsonp } from 'api/song'
import { Base64 } from 'js-base64'

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
    if ( this.lyric){
      return Promise.resolve(this.lyric)
    }
    return new Promise( (resolve, reject) => {
      getLyric(this.mid, this.singer_id).then( (res) => {
        if ( res.retcode === ERR_OK ){
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        }else{
          reject('no lyric')
        }
      })
    })

  }
}

export function createSong (musicData, key){

  if (!key){
    var key = 'D44E410E0D5D601919A29B6B480E66ADBF58810277309FDE9ADAD6FFFCEF5D74886F16E8EF246EB3868F107D9F64001B45545EDCB60E686B'
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
