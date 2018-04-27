import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import { SET_PLAY_HISTORY, SET_FAVORITE_LIST } from './store/mutation-types'
import { loadPlay, loadFavorite } from 'common/js/cache'
import { processSongsUrl } from 'common/js/song'

import 'common/stylus/index.styl'

fastClick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

const historySongs = loadPlay()
processSongsUrl(historySongs).then((songs) => {
  store.commit(SET_PLAY_HISTORY, songs)
})

const favoriteSongs = loadFavorite()
processSongsUrl(favoriteSongs).then((songs) => {
  store.commit(SET_FAVORITE_LIST, songs)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  data() {
    return {
      once: 0
    }
  },
  mounted() {
    document.onclick = () => {
      this.once++
      if (this.once <= 1) {
        let audioPlay = document.getElementsByClassName('audio')[0]
        audioPlay.play()
      } else {
        document.onclick = null
      }
    }
  }
})
