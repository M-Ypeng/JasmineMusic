<template>
  <div id="app">
    <div class="player">
      <div class="p_left" @click="showBig">
        <img style="border-radius: 5px;" width="40" height="40" :src="imgUrl" />
        <span class="p_txt"
          >{{ music.name }} -
          <span v-for="(v, index) in music.ar" :key="v.id"
            >{{ v.name }}
            <span v-if="index != music.ar.length - 1">-</span></span
          >
        </span>
      </div>
      <div class="p_right">
        <svg
          v-if="!playBool"
          @click="play"
          style="padding-right: 5px"
          t="1664975142966"
          class="icon playBtn"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3504"
          width="80"
          height="80"
        >
          <path
            d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z"
            fill="#000000"
            p-id="3505"
          ></path>
        </svg>
        <svg
          v-else
          @click="pause"
          style="padding-right: 5px"
          t="1665221268829"
          class="icon playBtn"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2569"
          width="90"
          height="90"
        >
          <path
            d="M512 68.191078c-245.204631 0-443.808922 198.60429-443.808922 443.808922s198.60429 443.808922 443.808922 443.808922 443.808922-198.60429 443.808922-443.808922S757.203608 68.191078 512 68.191078zM467.61921 689.523159l-88.76158 0L378.857631 334.476841l88.76158 0L467.61921 689.523159zM645.142369 689.523159l-88.76158 0L556.38079 334.476841l88.76158 0L645.142369 689.523159z"
            p-id="2570"
            fill="#000000"
          ></path>
        </svg>
        <svg
          t="1664975209338"
          class="icon playBtn"
          style="padding-left: 5px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4739"
          width="80"
          height="80"
        >
          <path
            d="M922.069625 477.9341L472.652621 151.089311a43.342807 43.342807 0 0 0-68.847075 35.055725V328.665491L159.636492 151.089311a43.364482 43.364482 0 0 0-68.847076 35.055725v653.682354a43.350032 43.350032 0 0 0 68.847076 35.062951L403.805546 697.328611v142.498779a43.364482 43.364482 0 0 0 68.847075 35.062951l449.417004-326.837565a43.342807 43.342807 0 0 0 0-70.118676z"
            fill="#7b7b7b"
            p-id="4740"
          ></path>
        </svg>
      </div>
    </div>
    <van-tabbar
      @change="onChange"
      active-color="#ce443f"
      inactive-color="#959595"
      v-model="active"
    >
      <van-tabbar-item icon="music-o">现在就听</van-tabbar-item>
      <van-tabbar-item icon="bullhorn-o">广播</van-tabbar-item>
      <van-tabbar-item icon="video-o">资料库</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
    </van-tabbar>

    <router-view @getSong="getSong" />
    <audio
      class="audio"
      :autoplay="autoplay"
      :src="url"
      ref="audio"
      @ended="endedFun"
    ></audio>

    <van-action-sheet v-model="playShow">
      <template #default>
        <div class="boxPlay">
          <div
            class="boxPlayBg"
            :style="{ backgroundImage: `url(${imgUrl})` }"
          ></div>
          <div class="boxPlayTitle">
            <div class="">
              <van-icon
                @click="cancleIcon"
                color="white"
                size="18"
                name="arrow-down"
              />
            </div>
            <div class="boxPlayTitleDesc">
              <div class="boxPlayTitleOne">{{ music.name }}</div>
              <div class="boxPlayTitleTwo" v-if="music.ar">
                {{ music.ar[0].name }}
              </div>
            </div>
            <div class="">&nbsp;</div>
          </div>

          <div class="lyricBox">
            <div ref="circleBox" class="circleBox">
              <img class="circleBoxImg" :src="imgUrl" alt="" />
            </div>
          </div>
          <div class="controlBox">
            <div class="progressBar">
              <div class="time">{{currentTime | dateFormat }}</div>
              <!-- <div class="progress">
                <div class="smallprogress"></div>
              </div> -->

              <van-progress color="#fff" track-color="#5c574d" :show-pivot="false" style=" width: calc(100% - 120px);" :percentage="cd" stroke-width="2" />

              <div class="time">{{ duration | dateFormat }}</div>
            </div>
            <div class="btnBoxs">
              <svg
                style="transform: rotate(180deg)"
                t="1665241299427"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6401"
                width="40"
                height="40"
              >
                <path
                  d="M192 899.072c-5.632 0-11.264-1.536-15.872-4.096-9.728-5.632-15.872-16.384-15.872-27.648V159.232c0-11.264 6.144-22.016 15.872-27.648 9.728-5.632 22.016-5.632 31.744 0l612.864 353.792c9.728 5.632 15.872 16.384 15.872 27.648s-6.144 22.016-15.872 27.648L207.872 894.464c-4.608 3.072-10.24 4.608-15.872 4.608z"
                  fill="#ffffff"
                  p-id="6402"
                ></path>
                <path
                  d="M837.12 898.56h-60.416c-15.36 0-27.648-12.288-27.648-27.648V155.136c0-15.36 12.288-27.648 27.648-27.648h60.416c15.36 0 27.648 12.288 27.648 27.648V870.4c0 15.872-12.288 28.16-27.648 28.16z"
                  fill="#ffffff"
                  p-id="6403"
                ></path>
              </svg>
              <svg
                style="margin: 0 10px"
                v-if="!playBool"
                @click="play"
                t="1665241497533"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8396"
                width="64"
                height="64"
              >
                <path
                  d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m0 896c-235.64 0-426.666667-191.026667-426.666667-426.666667s191.026667-426.666667 426.666667-426.666667 426.666667 191.026667 426.666667 426.666667-191.026667 426.666667-426.666667 426.666667z m-74.666667-213.38a53.373333 53.373333 0 0 1-53.333333-53.333334V352.066667A53.333333 53.333333 0 0 1 467.373333 308L702 467.933333a53.333333 53.333333 0 0 1 0 88.133334L467.373333 716a53.286667 53.286667 0 0 1-30.04 9.286667z m0.08-383.933334a11.093333 11.093333 0 0 0-5.08 1.28 10.446667 10.446667 0 0 0-5.666666 9.433334v319.866666a10.666667 10.666667 0 0 0 16.666666 8.82l234.666667-159.94a10.666667 10.666667 0 0 0 0-17.626666l-234.666667-159.933334a10.313333 10.313333 0 0 0-5.906666-1.92z"
                  fill="#ffffff"
                  p-id="8397"
                ></path>
              </svg>
              <svg
                style="margin: 0 10px"
                v-else
                @click="pause"
                t="1665241542355"
                class="icon"
                viewBox="0 0 1048 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9427"
                width="64"
                height="64"
              >
                <path
                  d="M524.272128 0.018022C241.513165 0.018022 12.288102 229.245952 12.288102 512.005018c0 112.734003 36.43904 216.957952 98.17897 301.537997l38.667981-40.258048C97.458176 699.230003 67.143168 609.158963 67.143168 512.005018 67.143168 259.540992 271.807078 54.872986 524.272128 54.872986c252.45696 0 457.120973 204.668006 457.120973 457.132032 0 252.460954-204.664013 457.118003-457.120973 457.118003-96.240026 0-185.530982-29.744026-259.189043-80.53504l-34.539008 42.797978c83.150029 58.344038 184.437965 92.596019 293.728973 92.596019 282.758963 0 511.984026-229.220966 511.984026-511.976038C1036.256154 229.245952 807.031091 0.018022 524.272128 0.018022zM615.693107 256.011981l0 511.987 54.855 0L670.548107 256.012 615.693128 256.012zM377.996083 256.011981l0 511.987 54.855 0L432.851083 256.012 377.996128 256.012z"
                  p-id="9428"
                  fill="#ffffff"
                ></path>
              </svg>
              <svg
                t="1665241299427"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6401"
                width="40"
                height="40"
              >
                <path
                  d="M192 899.072c-5.632 0-11.264-1.536-15.872-4.096-9.728-5.632-15.872-16.384-15.872-27.648V159.232c0-11.264 6.144-22.016 15.872-27.648 9.728-5.632 22.016-5.632 31.744 0l612.864 353.792c9.728 5.632 15.872 16.384 15.872 27.648s-6.144 22.016-15.872 27.648L207.872 894.464c-4.608 3.072-10.24 4.608-15.872 4.608z"
                  fill="#ffffff"
                  p-id="6402"
                ></path>
                <path
                  d="M837.12 898.56h-60.416c-15.36 0-27.648-12.288-27.648-27.648V155.136c0-15.36 12.288-27.648 27.648-27.648h60.416c15.36 0 27.648 12.288 27.648 27.648V870.4c0 15.872-12.288 28.16-27.648 28.16z"
                  fill="#ffffff"
                  p-id="6403"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </template>
    </van-action-sheet>
  </div>
</template>
<script>
import { songUrldetail, songdetail } from "./api/index";

export default {
  data() {
    return {
      playShow: false,
      playBool: false,
      active: 0,
      url: "",
      autoplay: false,
      music: {},
      imgUrl: require("./assets/音乐.png"),
      duration: 0, //歌曲时长
      timer: null,
      currentTime: 0,
      cd:0,
    };
  },
  // watch: {
  //   playBool: {
  //     handler: function (val) {
  //       if (val) {
  //         this.$refs.circleBox.style.animationPlayState = "running";
  //       } else {
  //         this.$refs.circleBox.style.animationPlayState = "paused";
  //       }
  //     },
  //   },
  // },
  methods: {
    changeplayBool() {
      this.$nextTick(() => {
        if (this.playBool  ) {
          this.$refs.circleBox.style.animationPlayState = "running";
        } else {
          this.$refs.circleBox.style.animationPlayState = "paused";
        }
      });
    },

    cancleIcon() {
      this.playShow = false;
    },
    showBig() {
      this.playShow = true;
      this.changeplayBool();
      this.$nextTick(() => {
        if(this.playBool){
          this.getCurrentTime(); // 获取当前时间
        }
      });
    },
    onChange(e) {
      if (e == 0) {
        this.$router.push({
          name: "listenNow",
        });
      } else if (e == 1) {
        this.$router.push({
          name: "radioBroadcast",
        });
      } else if (e == 2) {
        this.$router.push({
          name: "database",
        });
      } else {
        this.$router.push({
          name: "search",
        });
      }
    },
    pause() {
      if (!this.url) return;
      this.$refs.audio.pause();
      this.playBool = false;
      this.changeplayBool();
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    play() {
      if (!this.url) return;
      this.$refs.audio.play();
      this.playBool = true;
      this.changeplayBool();
      this.getCurrentTime(); // 获取当前时间
    },
    async getSong(e) {
      let p1 = await songdetail(e);
      let p2 = await songUrldetail(e);
      Promise.all([p1, p2]).then((res) => {
        this.music = res[0].songs[0];
        this.imgUrl = this.music.al.picUrl;
        this.$refs.audio.oncanplay = () => {
          this.duration = this.$refs.audio.duration;
        };
        this.url = res[1].data[0].url;
        this.autoplay = true;
        this.playBool = true;
      });
    },
    endedFun() {
      this.playBool = false;
    },

    // 监听歌曲播发时长
    getCurrentTime() {
      this.timer = window.setInterval(() => {
        this.currentTime = this.$refs.audio.currentTime;
        this.cd = (this.currentTime / this.duration).toFixed(2)*100
      }, 999);
    },
  },
};
</script>
<style >
.player {
  z-index: 10;
  padding: 10px;
  box-sizing: border-box;
  position: fixed;
  bottom: 50px;
  background-color: #f7f7f7;
  height: 50px;
  width: 100%;
  left: 0px;
  display: flex;
  justify-content: space-between;
}
.p_left {
  display: flex;
  align-items: center;
}

.p_txt {
  padding-left: 10px;
  color: #262626;
}

.p_right {
  display: flex;
  align-items: center;
}
.playBtn {
  width: 20px;
  height: 20px;
}
.van-image img {
  border-radius: 3px;
}
.boxPlay {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0px;
  top: 0px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #262626;
}
.boxPlayBg {
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0px;
  top: 0px;
  filter: blur(30px);
  background-size: cover;
  z-index: -1;
}
.boxPlayTitle {
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
}
.boxPlayTitleDesc {
  width: 100px;
  text-align: center;
}
.boxPlayTitleOne {
  width: 100px;

  font-size: 15px;
  color: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
.boxPlayTitleTwo {
  font-size: 14px;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  color: rgb(221, 218, 218);
}
.lyricBox {
  width: 100%;
  height: 450px;
  position: relative;
}

.circleBox {
  position: absolute;
  left: calc(50% - 120px);
  top: 100px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background-image: url("./assets/bg.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: mymove 5s linear infinite;
}

@keyframes mymove {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.circleBoxImg {
  width: 152px;
  height: 152px;
  border-radius: 50%;
}

.progressBar {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.progress {
  width: calc(100% - 120px);
  background: rgb(133, 131, 131);
  height: 1px;
  position: relative;
}
.smallprogress {
  position: absolute;
  left: -5px;
  top: calc(50% - 5px);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
}
.time {
  width: 60px;
  text-align: center;
  color: white;
}
.btnBoxs {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}
</style>
