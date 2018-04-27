<template>
  <scroll class="listview"
          ref="listview"
          @scroll="scroll"
          :data="data"
          :listenScroll="listenScroll"
          :probeType="probeType">
    <ul>
      <li v-for="group in data" class="list-group" :key="group.title" ref="listGroup">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item" :key="item.id" @click="selectItem(item)">
            <img v-lazy="item.imgUrl" alt="" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="shortcut-list" @touchstart="shortcutTouchStart" @touchmove.stop.prevent="shortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList"
            class="item"
            :key="item"
            :data-index="index"
            :class="{'current':currentIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getData} from 'common/js/dom'
  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 28 // 设置了top为-1px

  export default {
    props: {
      data: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        listenScroll: true,
        probeType: 3,
        diff: -1
      }
    },
    mounted() {
      this.position = {}
      this.listHeight = []
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当滚动顶部的时候，newY > 0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 当滚动到中间部分的时候
        for (let i = 0; i < listHeight.length; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY < height2 && -newY > height1) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部的时候，-newY > listHeight的区间
        // this.currentIndex = this.listHeight.length - 2
      },
      diff(newVal) {
        let top = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === top) {
          return
        }
        this.fixedTop = top
        this.$refs.fixed.style.transform = `translate3d(0,${top}px,0)`
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      shortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.position.p1 = firstTouch.pageY
        this.position.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      shortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.position.p2 = firstTouch.pageY
        let delta = Math.floor((this.position.p2 - this.position.p1) / ANCHOR_HEIGHT)
        let anchorIndex = parseInt(this.position.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      selectItem(item) {
        this.$emit('select', item)
      },
      refresh() {
          this.$refs.listview.refresh()
      },
      _calculateHeight() {
        this.listHeight = []
        let list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.currentIndex = index
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .title
        height: 30px
        line-height: 30px
        font-size: $font-size-small
        color: $color-text-l
        padding-left: 20px
        background: $color-hightlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .shortcut-list
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: -1px
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-hightlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
