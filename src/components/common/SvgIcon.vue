<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>

export default ({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    symbolId: function() {
      return `#${this.prefix}-${this.name}`;
    },
  },
});
</script>

<style scoped>
</style>