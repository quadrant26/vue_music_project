import { commonParams, options} from "./config";
import jsonp from 'common/js/jsonp'

export function getHotKey(){
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0,
    g_tk: 311064431
  })

  return jsonp(url, data, options)
}
