<template>
  <transition name="slide">
    <MusicList v-if="show" :title="title" :bgImage="bgImage" :songs="songs"></MusicList>
  </transition>
</template>

<script>
import MusicList from "@/components/music-list/music-list";
import { mapGetters } from "vuex";
import { getSongList } from "@/api/recommend";
import { ERR_OK } from "@/api/config";
import { createSong, isValidMusic, processSongsUrl } from "@/assets/js/song";
export default {
  name: "Disc",
  data() {
    return {
      show: false,
      songs: []
    };
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters(["disc"]),
    title() {
      return this.disc.dissname;
    },
    bgImage() {
      return this.disc.imgurl;
    }
  },
  created() {
    console.log(this.disc);
    setTimeout(() => {
      this.show = true;
    }, 20);
    this._getSongList();
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push("/recommend");
        return;
      }
      getSongList(this.disc.dissid).then(res => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then(
            songs => {
              this.songs = songs;
            }
          );
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
