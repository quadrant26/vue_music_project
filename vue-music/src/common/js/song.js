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
    var key = 'C535D647E993B67492E60B7ED97862C0339DE1E134D742C05E7609B06A3EC93563CC8E6EFBBD7F5477E37743F43ECF1306C78B367B34258A'
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
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=6044510397&vkey=${key}&uin=0&fromtag=38`

  })

  // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
}

export function filterSinger (singer){
  let ret = []
  if (!singer){
    return
  }

  singer.forEach( (s) => {
    ret.push(s.name)
  })

  return ret.join('/')
}
