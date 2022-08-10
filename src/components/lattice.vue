<template>
  <div class="content-BG">
    <div class="content">
      <div>格口列表</div>
      <div class="content-number">
        <div v-for="(item, index) in arr" :key="index" class="number">
          <div class="number-flex">{{ item }}</div>
        </div>
      </div>
      <div @click="closeLattice" class="content-footer">关闭</div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, toRaw } from "@vue/runtime-core";
export default {
  props: {
    msg: Array,
  },
  setup(props, context) {
    let arr = ref([]);
    const closeLattice = () => {
      context.emit("getLatticedata", false);
    };
    onMounted(() => {
      arr.value = toRaw(props.msg);
    });
    return {
      arr,
      closeLattice,
    };
  },
};
</script>

<style lang="scss" scoped>
.content-BG{
    background: rgba(255, 255, 255, 0.8);
    top: 50px;
    left: 10px;
    right: 10px;
    bottom: 10px;
}
.content {
  position: absolute;
  width: 300px;
  height: 300px;
  background: #2c3e50;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  .content-number {
    height: 190px;
    margin: 10px 5px;
    overflow-y: auto;
    .number {
      display: flex;
      .number-flex {
        flex: 1;
        text-align: center;
        border: 1px solid #fff;
        margin: 10px 5px;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        font-style: italic;
      }
    }
  }
  .content-footer {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: chocolate;
    cursor: pointer;
  }
}
</style>