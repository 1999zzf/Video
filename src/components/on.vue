<template>
  <div>
    
    <!-- <div class="color-bg"></div> -->
    <div class="video-bg animate__animated">
      <video muted autoplay="autoplay" loop class="fillWidth">
        <source :src="bodyleft.url" type="video/mp4" />
      </video>
    </div>
    <router-link :to="{name:'start'}"></router-link>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
if (window.require) {
  // var fs = window.require("fs");
}
export default {
  setup() {
    let bodyleft = ref({
      url: require("../../static/start.mp4"),
      // url: sessionStorage.getItem("bgvideo"),
    });
    // let buf = fs.readFileSync(localSrc.value);
    // let bolb = new Blob([buf]);
    let router = useRouter();
    onMounted(() => {
      setTimeout(() => {
        router.push({
          path: "/start",
        });
      }, 9500);
      // bodyleft.value.url = window.URL.createObjectURL(bolb);
    });
    return {
      bodyleft, //开屏动画
      router, //路由
    };
  },
};
</script>

<style lang="scss">
@import "../assets/css/start.scss";
@import "../assets/css/on.scss";
</style>