<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tag></tag>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Tag from 'components/tag/tag'
  import Player from 'components/player/player.vue'

  export default {
    components: {
      MHeader,
      Tag,
      Player
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
