<template>
  <div>
    <div class="setting-header">
      <div class="header-l">软件设置</div>
      <div :class="[{ transformOut: !outSatate }]" class="header-r">
        <img @click="closeTag" title="关闭设置" :src="closeImg" />
      </div>
    </div>
    <div class="setting-body">
      <div class="body-left">
        <div class="userAcount" title="区域">区域</div>
        <div class="userTheam" title="强提醒">强提醒</div>
      </div>
      <div class="body-right">
        <div @click="outUser" class="userAcount-setting" title="重新设置">
          重新设置
        </div>
        <div class="userStrongTips">
          <label class="switch">
            <input v-if="on == false" @click="handlerCancel" type="checkbox" />
            <input
              v-if="on == true"
              @click="handlerCancel"
              checked
              type="checkbox"
            />
            <span></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { closeSocket } from "../utils/websocket";
export default {
  props: {
    msg: Boolean,
  },
  setup(props, context) {
    let closeImg = ref(require("../assets/image/close.png"));
    let router = useRouter();
    let outSatate = ref(null);
    let strongTips = ref(false);
    let on = ref(false);
    const handlerCancel = (event) => {
      console.log(event.target.checked);
      localStorage.setItem("checkState", event.target.checked);
    };
    const closeTag = () => {
      outSatate.value = false;
      context.emit("getSetting", false);
    };
    const outUser = () => {
      ElMessageBox.confirm("此操作将返回区域选择页面, 是否继续?", "重新设置", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          closeSocket();
          router.push({ path: "/start" });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "用户取消",
          });
        });
    };
    onMounted(() => {
      outSatate.value = props.msg;
      if (localStorage.getItem("checkState")) {
        on.value = localStorage.getItem("checkState");
      }
    });
    return {
      closeImg, //关闭图片
      router, //路由
      outSatate, //关闭时的状态
      strongTips, //强提醒开关值
      closeTag, //关闭子组件..传送数据
      outUser, //退出账号.
      handlerCancel, //check
      on, //check默认状态
    };
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/setting.scss";
</style>