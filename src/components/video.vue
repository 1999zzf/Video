<template>
  <div class="video-bg">
    <video
      controls="controls"
      autoplay="autoplay"
      style="
        clear: both;
        display: block;
        margin: auto auto;
        height: 100%;
        width: 100%;
      "
      :src="baseurl + 'test/videoFind'"
      type="video/mp4"
    ></video>
    <div class="close-img">
      <img @click="closeVideo" title="关闭" :src="closeImg" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
// import {getVideoData} from "../apis/video"
export default {
  setup(props, context) {
    let videoBase = ref("");
    let closeImg = ref(require("../assets/image/close.png"));
    let baseurl = ref(sessionStorage.getItem("baseurl"));
    const closeVideo = () => {
      context.emit("getVideo", false);
    };
    onMounted(() => {
      // getVideoData().then((res)=>{
      //     // console.log(res)
      //     // videoBase.value = res
      // })
    });
    return {
      videoBase, //视频base64
      closeImg, //关闭icon
      baseurl,
      closeVideo, //关闭video
    };
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/video.scss";
</style>