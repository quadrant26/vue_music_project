import jsonp from './jsonp'
import { getSongKey } from 'api/singer'

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong (musicData){

  let {songmid, strMediaMid} = musicData
  return getSongKey(songmid, strMediaMid).then( (res) => {
    console.log(res)
    return res
  })

  /*return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.strMediaMid}.m4a?vkey=4567878787584545787454574878&guid=2568118860&uin=0&fromtag=66`
  })*/
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
