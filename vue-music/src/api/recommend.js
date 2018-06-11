import jsonp from 'common/js/jsonp'
import {commonParams, options} from "./config"

import axios from 'axios'

export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    needNewCode: 1,
    platform: 'h5',
    uin: 0
  })

  return jsonp(url,  data,  options)
}

export function getDiscList() {

  /*
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
  })

  return jsonp(url,  data, options)
  */

  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq', // 加引号
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then( (res) => {
    return Promise.resolve(res.data)
  })

}

export function getSongList (disstid){
  // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const url = '/api/dissList'
  const a = 'playlistinfoCallback'

  const data = Object.assign({}, commonParams, {
    disstid: disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  })

  const option = {
    param: 'jsonpCallback',
    name: a
  }

  // return jsonp(url,  data,  option)

  return axios.get(url, {
    params: data
  }).then( (res) => {
    return Promise.resolve(res.data)
  })
}
