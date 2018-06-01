import jsonp from 'common/js/jsonp'
import { commonParams, options} from "./config";
import axios from 'axios'

export function getSingerList(index) {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  if (!index){
    var index = -100
  }
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  var random = Math.random() * 1e17
  const data = Object.assign({}, {
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    jsonpCallback: 'getUCGI' + random,
    data: JSON.stringify({"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":index,"sin":0,"cur_page":1}}})
  })

  return jsonp(url, data, '')
}


export function getSingerDetail (singermid){

  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';

  const data = Object.assign({}, {
    g_tk: 199116970,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singermid,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1,
  })

  return jsonp(url,  data,  options)
}

export function getSongKey (songmid, strMediaMid){

  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';

  const data = Object.assign({}, {
    loginUin:0,
    hostUin:0,
    platform:'yqq',
    needNewCode:0,
    cid:205361747,
    uin:0,
    songmid: songmid,
    filename: `C400${strMediaMid}.m4a`,
    guid:6044510397,
    format: 'json'
  })

  console.log(data);
  let s = ''
  for ( var k in data){
    s += `&${k}=${data[k]}`
  }
  console.log(s);

  // return jsonp(url,  data,  options)
}
