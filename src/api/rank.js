import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getRankList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 1928093487,
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    format: 'jsonp'
  })
  return jsonp(url, data, options)
}

export function getSongList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 1928093487,
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    format: 'jsonp',
    topid,
    tpl: 3,
    page: 'detail',
    type: 'top'
  })
  return jsonp(url, data, options)
}
