<template>
  <div class="listSongsPage">
    <van-nav-bar
      title="歌曲列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="background">
      <div
        :style="{ backgroundImage: `url(${playlist.coverImgUrl})` }"
        class="box"
      ></div>
      <img width="90" height="90" :src="playlist.coverImgUrl" alt="" />
      <div class="b_right">
        <div class="txtOne">{{ playlist.name }}</div>
        <div class="txtTwo">{{ playlist.description }}</div>
      </div>
    </div>
    <div class="listBox">
      <div class="lTitle">
        <van-icon color="red" name="play-circle" size="30" />
        <div style="margin-left: 5px; font-size: 15px; font-weight: bold">
          播放全部
          <span
            v-if="playlist.tracks"
            style="font-weight: 100; font-size: 10px; color: #80868b"
          >
            ({{ playlist.tracks.length }})</span
          >
        </div>
      </div>
      <div
        class="l_item"
        v-for="(item, index) in playlist.tracks"
        :key="item.id"
        @click="playSong(item.id)"
      >
        <div class="l-left">
          <span style="margin-right: 10px; font-size: 16px; color: #80868b">{{
            index + 1
          }}</span>
          <div class="txtBox">
            <div class="txt" style="font-size: 16px">
              {{ item.name }}
            </div>
            <div class="txt" style="color: #80868b; margin-top: 4px">
              <span v-for="(v, index) in item.ar" :key="v.id"
                >{{ v.name }}
                <span v-if="index != item.ar.length - 1">-</span></span
              >
            </div>
          </div>
        </div>
        <div class="l-right">
          <van-icon name="play-circle-o" size="20" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { detailList } from "../api/index";

export default {
  data() {
    return {
      playlist: {},
    };
  },
  created() {
    if (this.$route.query.id) {
      this.detailList(this.$route.query.id);
    }
  },
  methods: {
    playSong(id) {
      this.$emit("getSong", id);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    async detailList(id) {
      let res = await detailList(id);
      if (res) {
        this.playlist = res.playlist;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  position: relative;
  .box {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    filter: blur(6px);
    background-size: cover;
    z-index: -1;
  }
  height: 200px;
  img {
    position: absolute;
    left: 30px;
    top: 50px;
    border-radius: 10px;
  }
  .b_right {
    color: white;
    position: absolute;
    left: 130px;
    top: 50px;
    .txtOne {
      font-size: 16px;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .txtTwo {
      color: rgb(216, 214, 214);
      font-size: 12px;
      margin-top: 10px;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.lTitle {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 10px;
}

.l_item {
  display: flex;
  padding: 0 10px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  .l-left {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .txt {
    width: 290px;
    overflow: hidden;
    /*文本不会换行*/
    white-space: nowrap;
    /*当文本溢出包含元素时，以省略号表示超出的文本*/
    text-overflow: ellipsis;
  }
}
.listSongsPage {
  margin-bottom: 100px;
}
</style>