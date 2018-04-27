<template>
  <div class="tag">
    <router-link tag="div" class="tag-item" to="/recommend">
      <span class="tag-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tag-item" to="/singer">
      <span class="tag-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tag-item" to="/rank">
      <span class="tag-link">排行</span>
    </router-link>
    <router-link tag="div" class="tag-item" to="/search">
      <span class="tag-link">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .tag
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tag-item
      flex: 1
      text-align: center
      .tag-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tag-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
