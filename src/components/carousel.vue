<template>
  <div class="carouselBox">
    <div class="main">
      <div class="carouselItem">1111</div>
      <div class="carouselItem">2222</div>
      <div class="carouselItem">333</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.carouselBox {
  position: relative;
  height: 200px;
  overflow-x: scroll;
  width: 100%;
}
.main {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 300%;
  height: 100%;
  background: red;
}
.carouselItem {
  float: left;
  width: 15%;
  height: 100%;
  margin-right: 10px;
}
</style>