<template>
  <div class="singer" ref="singer">
    <listview :data="singers" @select="selectSinger" ref="list"></listview>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERROR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import Listview from 'base/listview/listview'
  import {mapMutations} from 'vuex'
  import {playListMixin} from 'common/js/mixin'
  const HOT_NAME = '热门'
  const HOT_NAME_LEN = 10

  export default {
    mixins: [playListMixin],
    data() {
      return {
        singers: []
      }
    },
    mounted() {
      this._getSingerList()
    },
    methods: {
      handlePlayList(playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer) // 提交mutation
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERROR_OK) {
            this.singers = this._normalSingerList(res.data.list)
          }
        })
      },
      _normalSingerList(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((val, index) => {
          if (index < HOT_NAME_LEN) {
            map.hot.items.push(new Singer({
              id: val.Fsinger_mid,
              name: val.Fsinger_name
            }))
          }
          let key = val.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: val.Fsinger_mid,
            name: val.Fsinger_name
          }))
        })
        // 处理map
        let hot = []
        let other = []
        for (let key in map) {
          let val = map[key]
          if (val.title === HOT_NAME) {
            hot.push(val)
          } else if (key.match(/[a-zA-Z]/)) {
            other.push(val)
          }
        }
        other.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(other)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      Listview
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
