<template>
  <div>
      <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':showmodel}">
        <div class="md-modal-inner">
          <div class="md-top">
            <button class="md-close" @click="closem"></button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
              <slot name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="showmodel"></div>
    </div>
</template>

<script>
export default {
  name: 'v-mode',
  props : {
      showmodel : Boolean
  },
  methods : {
    closem(){
      this.$emit('closemodel')
    }
  }
}
</script>
