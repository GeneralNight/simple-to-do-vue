<template>
  <div id="app" :class="{'darkBack lightText':mode,'lightBack darkText':!mode}">
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
computed: {
  ...mapState(['mode'])
},
}
</script>

<style lang="scss">
.lightText {
  color: #f6f6f6;
}

.darkText {
  color: #272525;
}

.lightBack {
  background: #f6f6f6;
}

.darkBack {
  background: #272525;
}

.lightButton {
  border: none;
  border: 2px solid #f6f6f6;
  color: #f6f6f6;
  background: transparent;
  &:hover {
    background: #f6f6f6;
    color: #272525;
    border-color: #f6f6f6;
  }
}

.darkButton {
  border: none;
  border: 2px solid #272525;
  color: #272525;
  background: transparent;
  &:hover {
    background: #272525;
    color: #f6f6f6;
    border-color: #272525;
  }
}
</style>
