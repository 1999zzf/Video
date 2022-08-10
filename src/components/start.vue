<template>
  <div
    class="body-basic animate__animated"
    :class="{ animate__backOutDown: nextPage }"
  >
    <div
      :class="[{ animate__bounceOutLeft: startTimeThree }]"
      class="body-bg animate__animated"
    >
      <div
        :class="[
          { animate__bounceInUp: startTimeOne },
          { animate__bounceOutUp: startTimetwo },
        ]"
        class="dec-word animate__animated"
      >
        易丰智能监控
        <!-- 欣浩凯智能监控 -->
      </div>
    </div>
    <div class="color-bg"></div>

    <v_headerTitle />
    <div class="content-bg animate__animated">
      <div class="content-header">
        <div class="header-dec"></div>
        <div
          :class="{ animate__shakeX: showNoAreaTips }"
          class="header-setting animate__animated"
        >
          <span @click="isOpenP">选择区域</span>
        </div>
      </div>
      <div class="content-body">
        <div class="start-button">
          <div @click="startWatch" class="button-bg">开始监控</div>
        </div>
      </div>
    </div>
    <!-- 配置信息 -->
    <el-dialog
      title="选择区域"
      v-model="showP"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="ruleForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="选择类型" prop="xzlx">
              <el-select
                style="width: 100%"
                v-model="ruleForm.xzlx"
                placeholder="请选择类型"
                @change="changeProduct()"
              >
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="nums == true">
          <el-col :span="24">
            <el-form-item label="选择区域" prop="xzqy">
              <el-select
                style="width: 100%"
                v-model="ruleForm.xzqy"
                placeholder="请选择区域"
                @change="changeProduct1()"
              >
                <el-option
                  v-for="item in sbtxhList"
                  :key="item.camAreaNo"
                  :label="item.camAreaNo"
                  :value="item.camAreaNo"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showP = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { createSocket, getSocketState } from "../utils/websocket";
import { ElMessageBox } from "element-plus";
import v_headerTitle from "../components/headTitle.vue";
import { button1, Login } from "../apis/start";
// import { ElMessage } from "element-plus";
export default {
  components: {
    v_headerTitle,
  },
  setup() {
    let bodyleft = ref({
      // url: require("../assets/image/new_bg.mp4"),
    });
    let startTimeOne = ref(false);
    let startTimetwo = ref(false);
    let startTimeThree = ref(false);
    let showP = ref(false); //配置是否展示
    let num = ref("");
    // const ruleFormText = ref(null); //refs改变写法
    let ruleForm = ref({
      xzqy: "",
      xzlx: "",
    });
    let sbtxhList = ref([]);
    let nums = ref(false);
    let options = ref(["单区域", "多区域"]);
    let showNoAreaTips = ref(false); //未选择区域提示
    let router = useRouter(); //路由
    let nextPage = ref(false); //动画离开
    let SocketState = ref("");
    onMounted(() => {
      button1({}).then((res) => {
        console.log(res.data);
        sbtxhList.value = res.data;
      });
      startTimeOne.value = true;
      setTimeout(() => {
        startTimeOne.value = false;
        startTimetwo.value = true;
      }, 2500);
      setTimeout(() => {
        startTimeThree.value = true;
      }, 3000);
    });
    const changeProduct = () => {
      console.log(toRaw(ruleForm.value.xzlx));
      if (toRaw(ruleForm.value.xzlx) === "单区域") {
        nums.value = true;
      } else {
        nums.value = false;
        ruleForm.value.xzqy = "";
      }
    };
    const changeProduct1 = () => {
      num.value = ruleForm.value.xzqy;
    };
    const isOpenP = () => {
      //打开模态框
      showP.value = true;
    };
    const submitForm = () => {
      //表单验证
      // ruleFormText.value.validate((valid) => {
      //   if (valid) {
      showP.value = false;
      //   } else {
      //     return false;
      //   }
      // });
    };
    const handleClose = () => {
      //关闭模态框
      showP.value = false;
    };
    const compare = () => {
      SocketState.value = getSocketState();
      console.log(SocketState.value);
    };
    const startWatch = () => {
      //点击开始监控
      if (toRaw(ruleForm.value.xzlx)) {
        createSocket(sessionStorage.getItem("websocketurl"));
        nextPage.value = true;
        let timer = setInterval(() => {
          if (SocketState.value == 1) {
            clearInterval(timer);
            if (toRaw(ruleForm.value.xzlx) === "多区域") {
              Login({ cameraNo: "ALL" }).then((res) => {
                console.log(res.data);
                setTimeout(() => {
                  nextPage.value = false;
                  router.push({
                    path: "/details",
                  });
                }, 1000);
              });
            } else {
              Login({ cameraNo: ruleForm.value.xzqy }).then((res) => {
                console.log(res.data);
                setTimeout(() => {
                  nextPage.value = false;
                  router.push({
                    path: "/details",
                    query: {
                      AreaId: ruleForm.value.xzqy,
                    },
                  });
                }, 1000);
              });
            }
          } else if (SocketState.value == 3) {
            clearInterval(timer);
            ElMessageBox.alert("请稍后再试", "websocket连接出错", {
              confirmButtonText: "确定",
              callback: () => {
                router.go(0);
              },
            });
          } else {
            compare();
          }
        });
      } else {
        if (showNoAreaTips.value == true) {
          return false;
        } else {
          showNoAreaTips.value = true;
          setTimeout(() => {
            showNoAreaTips.value = false;
          }, 1500);
        }
      }
    };
    return {
      bodyleft, //左侧图片
      startTimeOne, //动画时间
      startTimetwo, //动画时间
      startTimeThree, //动画时间
      showP, //配置
      ruleForm, //表单验证
      sbtxhList, //上包台序号
      nums,
      num,
      options, //选择区域类型
      rules: {
        xzqy: [{ required: true, message: "请选择区域", trigger: "change" }],
        xzlx: [{ required: true, message: "请选择类型", trigger: "change" }],
      }, //表单验证
      // ruleFormText, //ref替换
      showNoAreaTips, //未选择区域提示
      SocketState, //通讯连接状态
      router, //路由
      changeProduct, //选择器
      changeProduct1, //选择器
      nextPage, //页面离开事件
      isOpenP, //配置事件
      submitForm, //表单事件
      handleClose, //表单事件
      startWatch, //开始监控事件
      compare, //获取websocketstate..
    };
  },
};
</script>

<style lang='scss'>
@import "../assets/css/start.scss";
</style>