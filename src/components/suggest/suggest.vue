<template>
  <scroll class="suggest"
          :data="result"
          :pullUp="pullUp"
          :beforeScroll="beforeScroll"
          @beforeScroll="listScroll"
          @scrollToEnd="searchMore"
          ref="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item,index) in result" :key="index" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading :title="null" v-show="hasMore"></loading>
    </ul>
    <div class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果" v-show="!hasMore && !result.length"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import {search} from 'api/search'
  import {ERROR_OK} from 'api/config'
  import {createSong, isValidMusic, processSongsUrl} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import {mapMutations, mapActions} from 'vuex'
  import NoResult from 'base/no-result/no-result'

  const TYPE_SINGER = 'singer'
  const PERPAGE = 20

  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        result: [],
        page: 1,
        pullUp: true,
        hasMore: true,
        beforeScroll: true
      }
    },
    watch: {
      query() {
        this._search()
      }
    },
    methods: {
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        this.$emit('select')
      },
      getIconClass(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${(item.singer)}`
        }
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
          if (res.code === ERROR_OK) {
            this._genResult(res.data).then((result) => {
              this.result = this.result.concat(result)
            })
            this._hasMore(res.data)
          }
        })
      },
      listScroll() {
        this.$emit('listScroll')
      },
      refresh() {
        this.$refs.suggest.refresh()
      },
      _search() {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
          if (res.code === ERROR_OK) {
            this._genResult(res.data).then((result) => {
              this.result = result
            })
            this._hasMore(res.data)
          }
        })
      },
      _hasMore(data) {
        let song = data.song
        if (!song.list.length || ((song.curnum + (song.curpage - 1) * PERPAGE) >= song.totalnum)) {
          this.hasMore = false
        }
      },
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid && this.page === 1) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        return processSongsUrl(this._normalSongs(data.song.list)).then((songs) => {
          ret = ret.concat(songs)
          return ret
        })
      },
      _normalSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (isValidMusic(musicData)) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
