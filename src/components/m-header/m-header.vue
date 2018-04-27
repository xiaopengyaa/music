<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="text">JiaJiaMusic</div>
    <router-link to="/user" tag="div" class="mine">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    font-size: 0 //解决元素间的空白间隙
    color: $color-theme
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 7px
      width: 30px
      height: 30px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 30px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme


</style>
