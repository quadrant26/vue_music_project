import jsonp from 'common/js/jsonp'
import { commonParams, options} from "./config";

export function getSingerList() {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  var random = Math.random() * 1e17
  const data = Object.assign({}, {
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    jsonpCallback: 'getUCGI' + random,
    data: JSON.stringify({"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}})
  })

  return jsonp(url, data, '')
}
