<template>
    <div class="container-fluid containerSwitchMode">
        <div class="row">
            <div class="col">
                <div class="d-flex justify-content-end align-items-center">
                    <i class="fas fa-sun mr-3" @click.prevent="setModeAs(false)"></i>
                    <b-form-checkbox v-model="boolMode" name="check-button" switch></b-form-checkbox>
                    <i class="fas fa-moon ml-3" @click.prevent="setModeAs(true)"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
name: 'switchMode',
data() {
    return {
        boolMode: false
    }
},
methods: {
    setModeAs(newMode) {
        this.boolMode = newMode
    }
},
computed: {
    ...mapState(['mode'])
},
watch: {
    boolMode() {
        this.$store.commit('SET_MODE',this.boolMode)
    }
},
created() {
    this.boolMode = this.mode
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
.containerSwitchMode {
    padding: 20px 50px;
    @include d(sm) {
        padding: 30px 30px;
    }
    i {
        font-size: 1.25rem;
        cursor: pointer;
    }
}
    
</style>