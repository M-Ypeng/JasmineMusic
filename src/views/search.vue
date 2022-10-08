<template>
  <div>
    <div class="searchBoxTitle">
      <div class="title">搜索</div>
    </div>

    <div class="ipt">
      <van-field
        @focus="focus"
        left-icon="search"
        class="vanIpt"
        v-model="value"
        placeholder="艺人、歌曲、歌词以及更多内容"
      />
    </div>

    <div class="searchBox">
      <div class="type">热烈推荐</div>
      <div class="typeBox">
        <div
          @click="detailsBtn(item)"
          class="typeItem"
          v-for="item in playlist"
          :key="item.id"
        >
          <div class="typeName">{{ item.name }}</div>
          <img class="typeImg" :src="item.coverImgUrl" alt="" />
        </div>
      </div>
    </div>

    <van-action-sheet v-model="show">
      <template #default>
        <div class="actionBox">
          <div class="ipt">
            <van-field
              @click-right-icon="rightBtn"
              @input="debounce"
              @focus="focus"
              left-icon="search"
              :right-icon="value.length > 0 ? 'close' : ''"
              class="vanIpt"
              v-model="value"
              placeholder="艺人、歌曲、歌词以及更多内容"
            />
          </div>
          <div class="zhuijing">
            <span style="font-weight: bold">个人热爱</span>
            <span style="color: red" @click="calcncle">取消</span>
          </div>
          <div class="tagBox">
            <van-tag @click="tagbtn('许嵩')" class="tag">许嵩</van-tag>
            <van-tag @click="tagbtn('陈奕迅')" class="tag">陈奕迅</van-tag>
            <van-tag @click="tagbtn('周杰伦')" class="tag">周杰伦</van-tag>
            <van-tag @click="tagbtn('李荣浩')" class="tag">李荣浩</van-tag>
            <van-tag @click="tagbtn('华晨宇')" class="tag">华晨宇</van-tag>
          </div>

          <div class="songList">
            <div
              class="songItem"
              @click="playSong(item.id)"
              v-for="item in songList"
              :key="item.id"
            >
              <div class="left">
                <img :src="item.al.picUrl+'?param=40y40'" alt="" />
                <div>
                  <div>{{ item.name }}</div>
                  <div style="color: #b0b0b1; margin-top: 3px">
                    <span v-for="(v, index) in item.ar" :key="v.id"
                      >{{ v.name }}
                      <span v-if="index != item.ar.length - 1">-</span></span
                    >
                  </div>
                </div>
              </div>
              <div class="right">
                <van-icon size="15" name="arrow" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </van-action-sheet>
  </div>
</template>

<script>
import { cloudSearch, topPlaylist } from "../api/index";
export default {
  data() {
    return {
      value: "",
      playlist: [],
      show: false,
      songList: [],
      time: null,
    };
  },
  created() {
    this.topPlaylist();
  },
  methods: {
    debounce() {
      if (this.time != null) {
        clearTimeout(this.time);
      }
      this.time = setTimeout(() => {
        this.search();
        //要执行的方法
      }, 700);
    },

    playSong(id) {
      this.$emit("getSong", id);
      setTimeout(() => {
        this.show = false;
      }, 500);
    },

    detailsBtn(item) {
      this.$router.push({
        name: "listSongs",
        query: {
          id: item.id,
        },
      });
    },
    rightBtn() {
      this.value = "";
    },
    calcncle() {
      this.show = false;
      this.value = "";
    },
    focus() {
      this.show = true;
      this.songList = [];
    },

    async search() {
      let res = await cloudSearch(this.value);
      if (res.code == "200") {
        this.songList = res.result.songs;
      }
    },

    async topPlaylist() {
      let res = await topPlaylist();
      if (res.code == "200") {
        this.playlist = res.playlists;
      }
    },

    tagbtn(e) {
      this.value = e;
      this.search();
    },
  },
};
</script>

<style lang="scss" scoped>
.songList {
  height: 81vh;
  overflow-y: scroll;
}
.songItem {
  margin-bottom: 5px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  .left {
    display: flex;
    img {
      margin-right: 10px;
      border-radius: 5px;
      width: 40px;
    }
  }
}
.zhuijing {
  font-size: 14px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
/deep/ .van-overlay {
  background-color: white !important;
}
.actionBox {
  position: fixed;
  width: 100%;
  left: 0px;
  top: 0px;
}

.searchBox {
  padding: 0 10px 10px 10px;
  margin-bottom: 100px;
}
.searchBoxTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 10px 10px 0 10px;
}
.title {
  font-size: 28px;
  font-weight: bold;
}
.vanIpt {
  border-radius: 5px;
  background: #eeeeef;
}
.van-field {
  padding: 3px 10px;
}
.type {
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: 900;
}

.typeBox {
  display: flex;
  flex-wrap: wrap;
}
.typeItem {
  border-radius: 10px;
  overflow: hidden;
  width: 48%;
  height: 160px;
  border-radius: 5px;
  margin-bottom: 4%;
  box-sizing: border-box;
  position: relative;
  &:nth-child(2n-1) {
    margin-right: 2%;
  }
  &:nth-child(2n) {
    margin-left: 2%;
  }
}
.typeName {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 14px;
}

.typeImg {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.ipt {
  padding: 10px;
  box-sizing: border-box;
  background-color: white;
  z-index: 999;
  position: sticky;
  top: 0px;
  width: 100%;
}
.tagBox {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  overflow-x: scroll;
}
.tag {
  margin-right: 10px;
  text-align: center;
  max-height: 60px;
  padding: 5px 10px;
  border-radius: 4px;
  background: #a6cfe7;
}
</style>