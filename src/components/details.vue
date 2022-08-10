<template>
  <div
    :class="{ animate__backInDown: Pages }"
    class="animate__animated body-basic"
  >
    <v_headerTitle />

    <div :style="{ height: screenStyle.height + 'px' }" class="flex-l">
      <div
        :style="[
          { height: screenStyle.height - 60 + 'px' },
          { 'margin-top': '40px' },
        ]"
        class="l-content"
      >
        <div class="content-header-up" title="易丰科技">
          <img :src="logo" />
          <span>www.yi-feng.cn</span>
        </div>
        <div class="content-header" title="当前区域">
          当前选择:
          <span v-if="AreaId == false" style="color: red; font-size: 30px"
            >区域{{ areaId }}</span
          >
          <span v-if="AreaId == true" style="color: red; font-size: 30px"
            >区域{{ areaId1 }}</span
          >
        </div>
        <div class="content-header-down" title="格口范围">
          <div style="text-align: center">格口范围:</div>
          <div style="text-align: center; width: 205px; margin-left: 10px">
            <span v-for="(item, index) in round" :key="index"
              >{{ item }} {{}}
            </span>
          </div>
        </div>
        <div
          v-if="AreaId == false"
          :style="{ height: screenStyle.height - 480 + 'px' }"
          class="content-body"
          title="消息提示"
        >
          <div class="message-box" v-for="(i, index) in tableData" :key="index">
            <div class="word">检测到错分异常</div>
            <div class="time">{{ i.gmtCreate }}</div>
            <div class="details-yd">
              格口号:<span>{{ i.latticeNo }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="AreaId == true"
          :style="{ height: screenStyle.height - 480 + 'px' }"
          class="content-body"
          title="消息提示"
        >
          <div
            class="message-box"
            v-for="(i, index) in tableData1"
            :key="index"
          >
            <div class="word">检测到错分异常</div>
            <div class="time">{{ i.gmtCreate }}</div>
            <div class="details-yd">
              格口号:<span>{{ i.latticeNo }}</span>
            </div>
          </div>
        </div>
        <div class="content-footer" title="版本信息">
          <div>当前时间:{{ nowTime }}</div>
          <div>版本号:{{ nowBuild }}</div>
        </div>
      </div>
    </div>
    <div class="flex-r">
      <div
        v-show="AreaId == false"
        v-for="(item, index) in vipSet"
        :key="index"
        style="margin-top: 50px; display: inline-block; height: 5px"
      >
        <el-badge
          :value="item.messageNums"
          class="item"
          type="red"
          :hidden="item.showCode"
        >
          <el-button
            :type="color[index] == true ? 'warning' : 'success'"
            style="margin-left: 20px"
            @click="handeClick(item, index)"
          >
            {{ item.camAreaNo }}
          </el-button>
        </el-badge>
      </div>

      <div class="r-header" style="margin-top: 40px" title="易丰科技">
        <el-page-header @click="go" title="返回"> </el-page-header>
        <!-- <img @click="go" title="返回" :src="settingImg1" /> -->
        <el-button
          v-if="sure == true"
          type="warning"
          @click="handleClickEditNow()"
        >
          查看已处理快件
        </el-button>
        <el-button type="warning" @click="SHOW()"> 显示弹窗 </el-button>
        <el-button type="warning" @click="handel()"> 一键处理 </el-button>
        <!-- <el-button type="warning" @click="closeweb()"> 关闭通道 </el-button>
        <el-button type="warning" @click="openweb()"> 开启通道 </el-button> -->
        <!-- <div class="header-l">易丰科技-视频预警系统</div> -->
        <div class="header-l">易丰科技-视频预警系统</div>

        <div
          :class="[{ transformIn: showTags }, { transformOut: !showTags }]"
          class="header-r"
        >
          <img @click="openTag" title="设置" :src="settingImg" />
        </div>
      </div>
      <div
        v-if="AreaId == false"
        :style="[{ height: screenStyle.height - 350 + 'px' }]"
        class="r-content"
      >
        <el-table
          :height="screenStyle.height - 350"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            type="index"
            show-overflow-tooltip
            width="50"
          >
          </el-table-column>
          <!-- <el-table-column align="center" prop="waybillNo" label="运单号">
          </el-table-column> -->
          <el-table-column align="center" prop="latticeNo" label="格口号">
          </el-table-column>
          <!-- <el-table-column
            align="center"
            prop="latticeAreaNo"
            label="格口区域号"
          >
          </el-table-column> -->
          <el-table-column align="center" prop="camAreaNo" label="相机区域号">
          </el-table-column>
          <el-table-column align="center" prop="camAreaIp" label="相机IP">
          </el-table-column>
          <!-- <el-table-column align="center" prop="alarmCodeName" label="报警类型">
          </el-table-column> -->
          <el-table-column
            align="center"
            prop="processCodeName"
            label="是否处理"
          >
          </el-table-column>
          <el-table-column align="center" prop="gmtCreate" label="生成时间">
          </el-table-column>
          <el-table-column align="center" prop="gmtModified" label="修改时间">
          </el-table-column>
          <el-table-column
            v-if="sure == true"
            fixed="right"
            align="center"
            label="操作"
            width="300"
          >
            <template v-slot="scope">
              <!-- <el-button
                v-if="sure == true"
                type="warning"
                @click="handleClickVideo(scope.row)"
                size="mini"
                >查看视频</el-button
              > -->
              <!-- <el-button
                type="warning"
                @click="handleClickLattice(scope.row)"
                size="mini"
                >掉落格口</el-button
              > -->
              <el-button type="warning" @click="look(scope.row)" size="mini"
                >点击图片</el-button
              >
              <el-dialog
                v-model="dialogVisible"
                :append-to-body="true"
                :show-close="false"
                width="0"
              >
                <div
                  style="
                    background-color:#e6a23c;
                    position: absolute;
                    left:-600px
                    width: 1100px;
                    height: 600px;
                  "
                >
                  <img
                    :src="url"
                    alt=""
                    width="850"
                    height="500"
                    style="
                      position: absolute;
                      margin-top: 50px;
                      margin-left: 50px;
                    "
                  />

                  <div
                    style="
                      width: 300px;
                      font-size: 50px;
                      color: white;
                      margin-top: 200px;
                      margin-left: 950px;
                    "
                  >
                    格口号:{{ gk }}
                  </div>
                  <button
                    @click="left()"
                    style="
                      width: 100px;
                      height: 50px;
                      margin-top: 50px;
                      margin-left: 950px;
                      position: absolute;
                    "
                  >
                    上一张
                  </button>
                  <button
                    @click="right()"
                    style="
                      width: 100px;
                      height: 50px;
                      margin-top: 50px;
                      margin-left: 1135px;
                      position: absolute;
                    "
                  >
                    下一张
                  </button>
                  <div
                    style="
                      margin-top: -250px;
                      margin-left: 1180px;
                      position: absolute;
                    "
                  >
                    <img
                      @click="dialogVisible = false"
                      :src="errorImg"
                      width="50"
                    />
                  </div>
                </div>
              </el-dialog>
              <el-button
                type="warning"
                @click="handleClickEdit(scope.row)"
                size="mini"
                >处理快件</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        v-if="AreaId == true"
        :style="[{ height: screenStyle.height - 200 + 'px' }]"
        class="r-content"
      >
        <el-table
          :height="screenStyle.height - 200"
          :data="tableData1"
          stripe
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            type="index"
            show-overflow-tooltip
            width="50"
          >
          </el-table-column>
          <el-table-column align="center" prop="latticeNo" label="格口号">
          </el-table-column>
          <!-- <el-table-column
            align="center"
            prop="latticeAreaNo"
            label="格口区域号"
          >
          </el-table-column> -->
          <el-table-column align="center" prop="camAreaNo" label="相机区域号">
          </el-table-column>
          <el-table-column align="center" prop="camAreaIp" label="相机IP">
          </el-table-column>
          <!-- <el-table-column align="center" prop="alarmCodeName" label="报警类型">
          </el-table-column> -->
          <el-table-column
            align="center"
            prop="processCodeName"
            label="是否处理"
          >
          </el-table-column>
          <el-table-column align="center" prop="gmtCreate" label="生成时间">
          </el-table-column>
          <el-table-column align="center" prop="gmtModified" label="修改时间">
          </el-table-column>
          <el-table-column
            v-if="sure == true"
            fixed="right"
            align="center"
            label="操作"
            width="300"
          >
            <template v-slot="scope">
              <el-button type="warning" @click="look(scope.row)" size="mini"
                >点击图片</el-button
              >
              <el-dialog
                v-model="dialogVisible"
                :append-to-body="true"
                :show-close="false"
                width="0"
              >
                <div
                  style="
                    background-color:#e6a23c;
                    position: absolute;
                    left:-600px
                    width: 1100px;
                    height: 600px;
                  "
                >
                  <img
                    :src="url"
                    alt=""
                    width="850"
                    height="500"
                    style="
                      position: absolute;
                      margin-top: 50px;
                      margin-left: 50px;
                    "
                  />

                  <div
                    style="
                      width: 300px;
                      font-size: 50px;
                      color: white;
                      margin-top: 200px;
                      margin-left: 950px;
                    "
                  >
                    格口号:{{ gk }}
                  </div>
                  <button
                    @click="left()"
                    style="
                      width: 100px;
                      height: 50px;
                      margin-top: 50px;
                      margin-left: 950px;
                      position: absolute;
                    "
                  >
                    上一张
                  </button>
                  <button
                    @click="right()"
                    style="
                      width: 100px;
                      height: 50px;
                      margin-top: 50px;
                      margin-left: 1135px;
                      position: absolute;
                    "
                  >
                    下一张
                  </button>
                  <div
                    style="
                      margin-top: -250px;
                      margin-left: 1180px;
                      position: absolute;
                    "
                  >
                    <img
                      @click="dialogVisible = false"
                      :src="errorImg"
                      width="50"
                    />
                  </div>
                </div>
              </el-dialog>
              <el-button
                type="warning"
                @click="handleClickEdit(scope.row)"
                size="mini"
                >处理快件</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pageCurrent">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </div>
      <v_lattice
        @getLatticedata="getLatticeData"
        v-if="showLattice"
        :msg="rowData"
        :class="[{ animate__slideInRight: isshowLattice }]"
        class="showThem animate__animated"
      />
    </div>
  </div>

  <v_setting
    @getSetting="getSettingData"
    :msg="showTags"
    v-if="showTagsNum == true"
    :class="[
      { animate__bounceInDown: showTags },
      { animate__bounceOutDown: !showTags },
    ]"
    class="showThem animate__animated"
  ></v_setting>

  <!-- <v_video
    class="animate__animated"
    :class="[
      { animate__zoomIn: showVideoStatus },
      { animate__zoomOut: !showVideoStatus },
    ]"
    @getVideo="getVideoData"
    v-if="showVideo == true"
  ></v_video> -->
  <div
    v-show="isHasTips"
    class="tips-bg"
    v-for="(items, index) in windows"
    :key="index"
  >
    <div class="tips-box">
      <div class="error-word" style="display: flex">
        <div style="width: 80%; height: 80%">
          <img
            :src="Url[index]"
            alt=""
            width="800"
            height="600"
            @click="dialogVisible1 = true"
          />
        </div>
        <el-dialog v-model="dialogVisible1" :append-to-body="true" width="50%">
          <img :src="Url" alt="" width="800" height="600" />
        </el-dialog>
        <div style="margin: auto; width: 80%; height: 80%; margin-left: 40px">
          <div class="error-details">{{ tips_time[index] }}</div>
          <div class="error-ydh">格口号:{{ tips_ydh }}</div>
          <div class="error-button">
            <span @click="edit()">处理快件</span>
            <span @click="close()">一键关闭</span>
            <span @click="none()">不显示弹窗</span>
          </div>
        </div>
      </div>
      <div class="close-tips-box">
        <img @click="closeTips" :src="errorImg" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch, toRaw } from "@vue/runtime-core";
import { getTime, changeToDateTime } from "../utils/time";
import { useRoute } from "vue-router";
import { sendMsg } from "../utils/websocket";
import v_setting from "../components/setting.vue";
// import v_video from "../components/video.vue";
import {
  getPagesData,
  // getLattice,
  monitorRecord,
  button,
  Round,
  Handel,
} from "../apis/details";
import { ElMessageBox, ElMessage } from "element-plus";
import v_headerTitle from "../components/headTitle.vue";
import v_lattice from "../components/lattice.vue";
// import { useRouter } from 'vue-router'3+

export default {
  components: { v_setting, v_headerTitle, v_lattice },
  setup() {
    let Pages = ref(true);
    // let logo = ref(require("../assets/image/xhklogo.png"));
    let logo = ref(require("../assets/image/yflogo.png"));
    let errorImg = ref(require("../assets/image/close_wh.png"));
    let route = useRoute(); //路由
    let screenStyle = ref({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
    let nowTime = ref("");
    let nowBuild = ref("1.8.5");
    let sure = ref(true);
    let num = ref(1);
    let currentPage = ref(1);
    let pageSize = ref(20);
    let AreaId = ref(false);
    let url = ref("");
    let picture = ref([]);
    let Url = ref([]);
    let areaId = ref("");
    let areaId1 = ref("");
    let vipSet = ref([]);
    let windows = ref([]);
    let color = ref([]);
    let dialogVisible = ref(false);
    let dialogVisible1 = ref(false);
    let settingImg = ref(require("../assets/image/setting.png"));
    // let settingImg1 = ref(require("../assets/image/left_black.png"));
    let showTags = ref(false);
    let bubble = ref(false);
    let showTagsNum = ref(false);
    let tableData = ref([]);
    let tableData1 = ref([]);
    let showVideo = ref(false);
    let showVideoStatus = ref(false);
    let isHasTips = ref(false);
    let tips_ydh = ref("");
    let round = ref([]);
    let count = ref(0);
    let tips_time = ref([]);
    let obj = ref([]);
    let isChangeState = ref(false);
    let rowData = ref([]);
    let showLattice = ref(false);
    let isshowLattice = ref(false);
    let quickEdit = ref("");
    let None = ref(true);
    let Id = ref("");
    let GK = ref([]);
    let gk = ref("");
    //关闭查看格口
    const getLatticeData = (data) => {
      showLattice.value = data;
    };
    // const router = useRouter()
    //查看格口
    // const handleClickLattice = (row) => {
    //   console.log(row);
    //   if (showLattice.value == true) {
    //     return false;
    //   } else {
    //     getLattice({ mapKey: toRaw(row).mapKey }).then((res) => {
    //       if (res.code == "0000") {
    //         rowData.value = res.data;
    //         // isshowLattice.value = true;
    //         // showLattice.value = true;
    //         setTimeout(() => {
    //           rowData.value = res.data;
    //           isshowLattice.value = true;
    //           showLattice.value = true;
    //         }, 300);
    //       } else {
    //         ElMessage({
    //           type: "error",
    //           message: res.msg,
    //         });
    //       }
    //     });
    //   }
    // };
    const handel = () => {
      ElMessageBox.confirm("是否要一键处理?", "快捷操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Handel({}).then((res) => {
            console.log(res);
            getPagesData({
              pageSize: pageSize.value,
              currentPage: currentPage.value,
              camAreaNo: areaId.value,
            }).then((res) => {
              tableData.value = res.page.list;
              count.value = res.page.count;
            });
            button({}).then((res) => {
              console.log(res.data);
              vipSet.value = res.data;
            });
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消",
          });
          isChangeState.value = false;
        });
    };
    const left = () => {
      console.log(picture.value);
      console.log(GK.value);
      if (Id.value === 0) {
        ElMessage({
          type: "warning",
          message: "当前是第一张",
        });
      } else {
        Id.value = Id.value - 1;
        url.value = picture.value[Id.value];
        gk.value = GK.value[Id.value];
      }
    };
    const right = () => {
      console.log(Id.value);
      if (Id.value === picture.value.length - 1) {
        ElMessage({
          type: "warning",
          message: "当前是最后一张",
        });
      } else {
        Id.value = Id.value + 1;
        url.value = picture.value[Id.value];
        gk.value = GK.value[Id.value];
      }
    };
    const look = (row) => {
      dialogVisible.value = true;
      for (let i = 0; i < tableData.value.length; i++) {
        if (row.id === tableData.value[i].id) {
          Id.value = i;
        }
      }
      console.log(toRaw(row));
      // console.log(toRaw(row).imagePath);
      url.value = toRaw(row).imagePath;
      gk.value = toRaw(row).latticeNo;
    };
    const handeClick = (item, index) => {
      console.log(sure.value);
      for (let j = 0; j < color.value.length; j++) {
        color.value[j] = true;
        color.value[index] = false;
      }
      if (sure.value === false) {
        getPagesData({
          pageSize: pageSize.value,
          currentPage: currentPage.value,
          camAreaNo: item.camAreaNo,
          processCode: 0,
        }).then((res) => {
          tableData.value = res.page.list;
          count.value = res.page.count;
        });
      } else {
        getPagesData({
          pageSize: pageSize.value,
          currentPage: currentPage.value,
          camAreaNo: item.camAreaNo,
        }).then((res) => {
          tableData.value = res.page.list;
          count.value = res.page.count;
          // console.log(tableData.value);
          // console.log(picture.value);
          if (tableData.value !== null) {
            picture.value = [];
            GK.value = [];
            for (let z = 0; z < tableData.value.length; z++) {
              picture.value.push(tableData.value[z].imagePath); //图片总数组
              GK.value.push(tableData.value[z].latticeNo); //格口号总数组
            }
            // console.log(tableData.value);
            // console.log(picture.value);
            // console.log(GK.value);
          }
        });
      }
      round.value = [];
      Round({ cameraNo: item.camAreaNo }).then((res) => {
        console.log(res);
        round.value = res.data;
        // for (let i = 0; i < res.data.length; i++) {
        //   round.value.push(res.data[i]);
        // }
      });
      areaId.value = item.camAreaNo;
    };
    // const watchVideo = () => {
    //   console.log(tips_ydh.value);
    //   getLattice({ mapKey: tips_ydh.value }).then((res) => {
    //     if (res.code == "0000") {
    //       rowData.value = res.data;
    //       // isshowLattice.value = true;
    //       // showLattice.value = true;
    //       setTimeout(() => {
    //         rowData.value = res.data;
    //         isshowLattice.value = true;
    //         showLattice.value = true;
    //       }, 300);
    //     } else {
    //       ElMessage({
    //         type: "error",
    //         message: res.msg,
    //       });
    //     }
    //   });
    // };
    // const closeweb = () => {
    //   closeSocket();
    // };
    // const openweb = () => {};
    //错误信息更改快件
    const none = () => {
      None.value = false;
      windows.value.splice(0, windows.value.length);
    };
    const SHOW = () => {
      None.value = true;
      windows.value.splice(0, windows.value.length);
    };
    const close = () => {
      windows.value.splice(0, windows.value.length);
    };
    const edit = () => {
      console.log(quickEdit.value);
      isChangeState.value = true;
      ElMessageBox.confirm(
        "此操作将更改错误快件为正常件, 是否继续?",
        "快捷操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          monitorRecord({ id: quickEdit.value }).then((res) => {
            if (res.code == "0000") {
              ElMessage({
                type: "success",
                message: "更改成功!",
              });
              isChangeState.value = false;
              isHasTips.value = false;
              if (AreaId.value === false) {
                getPagesData({
                  pageSize: pageSize.value,
                  currentPage: currentPage.value,
                  camAreaNo: areaId.value,
                }).then((res) => {
                  tableData.value = res.page.list;
                  count.value = res.page.count;
                });
              } else {
                getPagesData({
                  pageSize: pageSize.value,
                  currentPage: currentPage.value,
                  camAreaNo: areaId1.value,
                }).then((res) => {
                  tableData1.value = res.page.list;
                  count.value = res.page.count;
                });
              }
            } else {
              ElMessage({
                type: "error",
                message: res.msg,
              });
              isChangeState.value = false;
              isHasTips.value = false;
            }
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消更改",
          });
          isChangeState.value = false;
        });
    };
    //已处理快件
    const handleClickEditNow = () => {
      button({}).then((res) => {
        console.log(res.data);
        vipSet.value = res.data;
      });
      sure.value = false;
      if (AreaId.value === false) {
        getPagesData({
          pageSize: pageSize.value,
          currentPage: currentPage.value,
          camAreaNo: areaId.value,
          processCode: 0,
        }).then((res) => {
          tableData.value = res.page.list;
          count.value = res.page.count;
        });
      } else {
        getPagesData({
          pageSize: pageSize.value,
          currentPage: currentPage.value,
          camAreaNo: areaId1.value,
          processCode: 0,
        }).then((res) => {
          tableData1.value = res.page.list;
          count.value = res.page.count;
        });
      }
    };
    //更改快件
    const handleClickEdit = (row) => {
      console.log(toRaw(row));
      isChangeState.value = true;
      ElMessageBox.confirm("此操作将更改错误快件为正常件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          monitorRecord({ id: row.id }).then((res) => {
            console.log(res);
            if (res.code == "0000") {
              ElMessage({
                type: "success",
                message: "更改成功!",
              });
              isChangeState.value = false;
              if (AreaId.value === false) {
                getPagesData({
                  pageSize: pageSize.value,
                  currentPage: currentPage.value,
                  camAreaNo: areaId.value,
                }).then((res) => {
                  tableData.value = res.page.list;
                  count.value = res.page.count;
                });
              } else {
                getPagesData({
                  pageSize: pageSize.value,
                  currentPage: currentPage.value,
                  camAreaNo: areaId1.value,
                }).then((res) => {
                  tableData1.value = res.page.list;
                  count.value = res.page.count;
                });
              }
              button({}).then((res) => {
                console.log(res.data);
                vipSet.value = res.data;
              });
            } else {
              ElMessage({
                type: "error",
                message: res.msg,
              });
              isChangeState.value = false;
            }
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消更改",
          });
          isChangeState.value = false;
        });
    };
    //查看视频
    // const handleClickVideo = () => {
    //   showVideo.value = true;
    //   showVideoStatus.value = true;
    // };
    //分页相关
    const handleSizeChange = (val) => {
      pageSize.value = val;
      if (AreaId.value === false) {
        getPagesData({
          pageSize: pageSize.value,
          currentPage: currentPage.value,
          camAreaNo: areaId.value,
        }).then((res) => {
          tableData.value = res.page.list;
          count.value = res.page.count;
          if (tableData.value !== null) {
            picture.value = [];
            GK.value = [];
            for (let z = 0; z < tableData.value.length; z++) {
              picture.value.push(tableData.value[z].imagePath); //图片总数组
              GK.value.push(tableData.value[z].latticeNo); //格口号总数组
            }
          }
        });
      } else {
        getPagesData({
          pageSize: pageSize.value,
          currentPage: currentPage.value,
          camAreaNo: areaId1.value,
        }).then((res) => {
          tableData1.value = res.page.list;
          count.value = res.page.count;
          if (tableData1.value !== null) {
            picture.value = [];
            GK.value = [];
            for (let z = 0; z < tableData1.value.length; z++) {
              picture.value.push(tableData1.value[z].imagePath); //图片总数组
              GK.value.push(tableData1.value[z].latticeNo); //格口号总数组
            }
          }
        });
      }
    };
    const handleCurrentChange = (val) => {
      currentPage.value = val;
      if (AreaId.value === false) {
        getPagesData({
          pageSize: pageSize.value,
          currentPage: currentPage.value,
          camAreaNo: areaId.value,
        }).then((res) => {
          tableData.value = res.page.list;
          count.value = res.page.count;
          if (tableData.value !== null) {
            picture.value = [];
            GK.value = [];
            for (let z = 0; z < tableData.value.length; z++) {
              picture.value.push(tableData.value[z].imagePath); //图片总数组
              GK.value.push(tableData.value[z].latticeNo); //格口号总数组
            }
          }
        });
      } else {
        getPagesData({
          pageSize: pageSize.value,
          currentPage: currentPage.value,
          camAreaNo: areaId1.value,
        }).then((res) => {
          tableData1.value = res.page.list;
          count.value = res.page.count;
          if (tableData1.value !== null) {
            picture.value = [];
            GK.value = [];
            for (let z = 0; z < tableData1.value.length; z++) {
              picture.value.push(tableData1.value[z].imagePath); //图片总数组
              GK.value.push(tableData1.value[z].latticeNo); //格口号总数组
            }
          }
        });
      }
    };
    //打开设置
    const openTag = () => {
      showTags.value = !showTags.value;
      showTagsNum.value = true;
    };
    //返回上一步
    const go = () => {
      sure.value = true;
      if (AreaId.value === false) {
        getPagesData({
          pageSize: pageSize.value,
          currentPage: currentPage.value,
          camAreaNo: areaId.value,
        }).then((res) => {
          tableData.value = res.page.list;
          count.value = res.page.count;
        });
      } else {
        getPagesData({
          pageSize: pageSize.value,
          currentPage: currentPage.value,
          camAreaNo: areaId1.value,
        }).then((res) => {
          tableData1.value = res.page.list;
          count.value = res.page.count;
        });
      }
    };
    //获取视频子组件数据
    const getVideoData = (data) => {
      setTimeout(() => {
        showVideo.value = data;
      }, 300);
      showVideoStatus.value = false;
    };
    //获取子组件数据
    const getSettingData = (data) => {
      setTimeout(() => {
        showTagsNum.value = data;
      }, 1000);
      showTags.value = !showTags.value;
    };
    const closeTips = () => {
      console.log(tips_time.value);
      console.log(windows.value);
      windows.value.pop();
    };
    //监控屏幕分辨率
    watch(screenStyle, {
      deep: true,
    });
    onMounted(() => {
      if (route.query.AreaId === undefined) {
        AreaId.value = false;
      } else {
        AreaId.value = true;
      }
      if (AreaId.value === false) {
        button({}).then((res) => {
          vipSet.value = res.data;
          getPagesData({
            pageSize: pageSize.value,
            currentPage: currentPage.value,
            camAreaNo: toRaw(vipSet.value)[0].camAreaNo,
          }).then((res) => {
            tableData.value = res.page.list;
            count.value = res.page.count;
            if (tableData.value !== null) {
              picture.value = [];
              for (let z = 0; z < tableData.value.length; z++) {
                picture.value.push(tableData.value[z].imagePath);
                GK.value.push(tableData.value[z].latticeNo);
              }
              console.log(tableData.value);
              console.log(picture.value);
            }
          });
          Round({ cameraNo: toRaw(vipSet.value)[0].camAreaNo }).then((res) => {
            console.log(res);
            round.value = res.data;
            // for (let i = 0; i < res.data.length; i++) {
            //   round.value.push(res.data[i]);
            // }
          });
          for (let i = 0; i < toRaw(vipSet.value).length; i++) {
            sendMsg(
              {
                cmd: "SET_AREA",
                monitorAreaNo: toRaw(vipSet.value)[i].camAreaNo,
              },
              (ev) => {
                if (JSON.parse(ev.data)) {
                  console.log(JSON.parse(ev.data));
                  isHasTips.value = None.value;
                  button({}).then((res) => {
                    vipSet.value = res.data;
                  });
                  // quickEdit.value = JSON.parse(ev.data).id;
                  tips_ydh.value = JSON.parse(ev.data).latticeNo;
                  windows.value.push(num.value);
                  num.value = num.value + 1;
                  obj.value.push(JSON.parse(ev.data));
                  console.log(obj.value);
                  for (let i = 0; i < windows.value.length; i++) {
                    Url.value[i] = obj.value[i].imagePath;
                    tips_time.value[i] = changeToDateTime(
                      obj.value[i].gmtCreate
                    );
                  }
                  console.log(tips_time.value);
                  //调用分页接口
                  getPagesData({
                    pageSize: pageSize.value,
                    currentPage: currentPage.value,
                    camAreaNo: areaId.value,
                  }).then((res) => {
                    tableData.value = res.page.list;
                    count.value = res.page.count;
                    if (tableData.value !== null) {
                      picture.value = [];
                      for (let z = 0; z < tableData.value.length; z++) {
                        picture.value.push(tableData.value[z].imagePath);
                        GK.value.push(tableData.value[z].latticeNo);
                      }
                      console.log(tableData.value);
                      console.log(picture.value);
                    }
                  });
                } else {
                  isHasTips.value = false;
                }
              }
            );
          }
          areaId.value = res.data[0].camAreaNo;
          for (let i = 0; i < res.data.length; i++) {
            color.value[0] = false;
            color.value.push(true);
          }
        });
      } else {
        areaId1.value = route.query.AreaId;
        getPagesData({
          pageSize: pageSize.value,
          currentPage: currentPage.value,
          camAreaNo: areaId1.value,
        }).then((res) => {
          tableData1.value = res.page.list;
          count.value = res.page.count;
          if (tableData.value !== null) {
            picture.value = [];
            for (let z = 0; z < tableData.value.length; z++) {
              picture.value.push(tableData.value[z].imagePath);
              GK.value.push(tableData.value[z].latticeNo);
            }
            console.log(tableData.value);
            console.log(picture.value);
          }
        });
        Round({ cameraNo: areaId1.value }).then((res) => {
          console.log(res);
          round.value = res.data;
          // for (let i = 0; i < res.data.length; i++) {
          //   round.value.push(res.data[i]);
          // }
        });
        sendMsg(
          {
            cmd: "SET_AREA",
            monitorAreaNo: areaId1.value,
          },
          (ev) => {
            //有推送显示提示
            if (JSON.parse(ev.data)) {
              isHasTips.value = None.value;
              button({}).then((res) => {
                console.log(res.data);
                vipSet.value = res.data;
              });
              // quickEdit.value = JSON.parse(ev.data).id;
              tips_ydh.value = JSON.parse(ev.data).latticeNo;
              windows.value.push(num.value);
              num.value = num.value + 1;
              obj.value.push(JSON.parse(ev.data));
              for (let i = 0; i < windows.value.length; i++) {
                Url.value[i] = obj.value[i].imagePath;
                tips_time.value[i] = changeToDateTime(obj.value[i].gmtCreate);
              }
              //调用分页接口
              getPagesData({
                pageSize: pageSize.value,
                currentPage: currentPage.value,
                camAreaNo: areaId1.value,
              }).then((res) => {
                tableData1.value = res.page.list;
                count.value = res.page.count;
                if (tableData.value !== null) {
                  picture.value = [];
                  for (let z = 0; z < tableData.value.length; z++) {
                    picture.value.push(tableData.value[z].imagePath);
                    GK.value.push(tableData.value[z].latticeNo);
                  }
                  console.log(tableData.value);
                  console.log(picture.value);
                }
              });
            } else {
              isHasTips.value = false;
            }
          }
        );
      }

      setInterval(() => {
        nowTime.value = getTime();
      }, 1000);
      setTimeout(() => {
        Pages.value = false;
      }, 1000);
      //动态尺寸
      window.onresize = () => {
        return (() => {
          screenStyle.value.width = document.documentElement.clientWidth;
          screenStyle.value.height = document.documentElement.clientHeight;
        })();
      };
    });
    return {
      Pages, //动画
      logo, //logo
      screenStyle, //屏幕尺寸
      nowTime, //时间
      num,
      nowBuild, //版本号
      currentPage, //页码
      pageSize, //条数
      count, //总条数
      route, //当前路由信息
      areaId, //区域id
      areaId1, //区域id
      settingImg, //设置图片
      // settingImg1, //返回图片
      showTags, //设置判断值
      showTagsNum, //设置时间判断值
      tableData, //列表
      tableData1, //列表
      showVideo, //视频判断
      sure, //判断是否已处理
      showVideoStatus, //视频展示动画判断
      errorImg, //错误图片
      isHasTips, //错误提示判断值
      tips_ydh, //展示错误的单号
      tips_time, //展示错误的时间点
      obj,
      isChangeState, //当前在修改状态,取消错误弹框
      rowData, //传给格口的数据
      showLattice, //判断展示格口
      isshowLattice, //格口动画判断
      quickEdit, //快捷操作id
      handleClickEdit, //处理错误快件
      handleClickEditNow, //已处理快件
      handleSizeChange,
      handleCurrentChange,
      look,
      round,
      windows,
      vipSet, //循环按钮
      bubble,
      color,
      openTag, //打开设置
      go, //返回上一级
      getSettingData, //获取子组件信息
      // handleClickVideo, //播放视频
      getVideoData, //获取视频组件数据
      closeTips, //关闭错误提示
      edit, //错误弹出框更改快件
      close, //一键关闭
      none, //不显示弹窗
      SHOW, //显示弹窗
      handel, //一键处理
      // watchVideo, //掉落格口
      handeClick,
      // handleClickLattice, //查看格口
      getLatticeData, //关闭查看格口
      AreaId,
      dialogVisible,
      dialogVisible1,
      url,
      Url,
      picture, //图片
      left, //上一张图片
      right, //下一张图片
      Id,
      GK,
      gk,
    };
  },
};
</script>

<style scope lang="scss">
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #dbd8d8;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: rgb(151, 147, 147);
}

@import "../assets/css/details.scss";
</style>