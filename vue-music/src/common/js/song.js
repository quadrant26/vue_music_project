import jsonp from './jsonp'
import { commonParams, options, ERR_OK} from "api/config";
import { getSongKey } from 'api/singer'

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {

    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong (musicData, key){

  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=2568118860&vkey=${key}&uin=0&fromtag=38`
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=2568118860&vkey=A0E4CF62007B3F18B84D473B4981834FBE9DFC954D21020898CF00055A44A36DBBD82865B93CBC0EFA77B9B6D784A8F50F3D15B44D7FEEC6&uin=0&fromtag=38`

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
