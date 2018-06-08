import {commonParams, options} from "./config"
import axios from 'axios'
import jsonp from "common/js/jsonp";

export function getLyric(mid, singer_id) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json',
    singer_id: singer_id
  })

  return axios.get(url, {
    params: data
  }).then( (res) => {
    return Promise.resolve(res.data)
  })
}

export function getLyricJsonp(mid) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  const a = "MusicJsonCallback_lrc"

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    callback: a,
    inCharset: 'utf8',
    loginUin: 0
  })

  const option = {
    param: 'jsonpCallback',
    name: a
  }

  return jsonp(url,  data, option)
}
