<template>
  <div class="mytitle">
    <div class="left">
      <div><img :src="logo" /></div>
      <div>易丰智能科技有限公司</div>
    </div>
    <div class="middle">视频监控</div>
    <div class="right">
      <span title="收起" @click="getMinSize">
        <el-icon class="sq" color="#ffffff" :size="20">
          <Minus />
        </el-icon>
      </span>
      <span title="缩放" @click="getMaxSize">
        <el-icon class="sf" color="#ffffff" :size="20">
          <FullScreen />
        </el-icon>
      </span>
      <span title="关闭" @click="getClose">
        <el-icon class="gb" color="#ffffff" :size="20">
          <Close />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { Minus, FullScreen, Close } from "@element-plus/icons";
import { Shut } from "../apis/headTitle";
// import { ipcRenderer} from 'electron';
if (window.require) {
  var ipc = window.require("electron").ipcRenderer;
}
export default {
  components: {
    // 全名
    [Minus.name]: Minus,
    [FullScreen.name]: FullScreen,
    [Close.name]: Close,
    // 或者以缩写的方式,
  },
  setup() {
    // let logo = ref(require("../assets/image/xhklogo.png"));
    let logo = ref(require("../assets/image/yflogo.png"));

    const getMinSize = () => {
      if (window.require) {
        ipc.send("min");
      }
    };
    const getMaxSize = () => {
      if (window.require) {
        ipc.send("max");
      }
    };
    const getClose = () => {
      Shut({}).then((res) => {
        console.log(res.data);
      });
      if (window.require) {
        ipc.send("close");
      }
    };
    return {
      logo,
      getMinSize, //收起底栏
      getMaxSize, //最小/大话
      getClose, //关闭
    };
  },
};
</script>
<style lang='scss' scoped>
.mytitle {
  width: 100%;
  height: 40px;
  -webkit-app-region: drag;
  z-index: 999;
  position: fixed;
  background: transparent;
  margin: auto auto;
  background: #2c3e50;
  display: flex;
  box-sizing: border-box;
  .left {
    flex: 1;
    padding-left: 10px;
    display: flex;
    img {
      width: 35px;
      height: 35px;
      margin-top: 3px;
    }
    div {
      line-height: 39px;
      color: #fff;
      font-size: 14px;
      font-style: initial;
    }
  }
  .middle {
    flex: 1;
    text-align: center;
    line-height: 40px;
    color: #fff;
  }
  .right {
    flex: 1;
    text-align: right;
    padding-right: 10px;
    line-height: 45px;
  }
  span {
    margin: 0px 10px;
    cursor: pointer;
    -webkit-app-region: no-drag;
  }
  .sq:hover {
    background: rgba(204, 201, 201, 0.199);
    width: 20px;
  }
  .sf:hover {
    background: rgba(204, 201, 201, 0.199);
    width: 20px;
  }
  .gb:hover {
    background: rgba(214, 23, 23, 0.719);
    width: 20px;
  }
  img {
    width: 20px;
    -webkit-app-region: no-drag;
  }
}
</style>