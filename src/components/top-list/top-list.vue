<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage" :rank="rank"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/rank'
  import {ERROR_OK} from 'api/config'
  import {createSong, isValidMusic, processSongsUrl} from 'common/js/song'

  export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      if (!this.topList.id) {
        this.$router.push({
          path: '/rank'
        })
        return
      }
      this._getSongList()
    },
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        } else {
          return ''
        }
      },
      ...mapGetters([
        'topList'
      ])
    },
    methods: {
      _getSongList() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getSongList(this.topList.id).then((res) => {
          if (res.code === ERROR_OK) {
            processSongsUrl(this._normalSongs(res.songlist)).then((songs) => {
              this.songs = songs
            })
          }
        })
      },
      _normalSongs(list) {
        let ret = []
        list.forEach((songData) => {
          songData = songData.data
          if (isValidMusic(songData)) {
            ret.push(createSong(songData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition: all 500ms

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
