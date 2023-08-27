<template>
  <div>
    <p>{{ count }}</p>
  </div>
</template>

<script>
export default {
  name: "countdown",
  data() {
    return {
      count: 10,
      intervalId: null,
    };
  },
  mounted() {
    this.intervalId = setInterval(() => {
      if (this.count > 0) {
        this.count--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
}
</script>

<style scoped>

</style>