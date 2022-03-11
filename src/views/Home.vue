<template>
  <div>
    <SwitchMode/>
    <ToDo/>
  </div>
</template>

<script>
import SwitchMode from '@/components/SwitchMode.vue'
import ToDo from '@/components/ToDo.vue'
export default {
  name: 'Home',
  components: {
    ToDo,
    SwitchMode
  }
}
</script>
