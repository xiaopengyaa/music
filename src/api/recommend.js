import jsonp from 'common/js/jsonp'
import axiox from 'axios'
import {commonParams, options} from './config'

const debug = process.env.NODE_ENV !== 'production'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = debug ? '/api/getDiscList' : 'http://www.jiajiapig.com/music/api/getDiscList'
  // const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 1,
    platform: 'yqq',
    sin: 0,
    ein: 29,
    sortId: 5,
    categoryId: 10000000,
    rnd: Math.random()
  })
  return axiox.get(url, {
    params: data
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}

export function getSongList(disstid) {
  const url = debug ? '/api/getSongList' : 'http://www.jiajiapig.com/music/api/getSongList'
  // const url = '/api/getSongList'
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: disstid,
    format: 'jsonp',
    g_tk: 378707830,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axiox(url, {
    params: data
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}
