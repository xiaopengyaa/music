<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper">
        <div class="progress-btn" ref="progressBtn"
             @touchstart.prevent="progressTouchStart"
             @touchmove.prevent="progressTouchMove"
             @touchend="progressTouchEnd">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - this.$refs.progressBtn.clientWidth
          const progressWidth = this.percent * barWidth
          this._progressMove(progressWidth)
        }
      }
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const barWidth = this.$refs.progressBar.clientWidth - this.$refs.progressBtn.clientWidth
        const delta = e.touches[0].pageX - this.touch.startX
        const clientWidth = Math.min(barWidth, Math.max(0, delta + this.touch.left))
        this._progressMove(clientWidth)
      },
      progressTouchEnd() {
        this.touch.initiated = false
        this._emitPercent()
      },
      progressClick(e) {
        // this._progressMove(e.offsetX) 获取不到offsetX的值
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetX = e.pageX - rect.left
        this._progressMove(offsetX)
        this._emitPercent()
      },
      _emitPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - this.$refs.progressBtn.clientWidth
        const clientWidth = this.$refs.progress.clientWidth
        const percent = clientWidth / barWidth
        this.$emit('percentChange', percent)
      },
      _progressMove(progressWidth) {
        this.$refs.progress.style.width = `${progressWidth}px`
        this.$refs.progressBtn.style.transform = `translate3d(${progressWidth}px,0,0)`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
