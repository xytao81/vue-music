<template>
  <transition name="slide">
    <MusicList v-if="show" :songs="songs" :title="title" :bg-image="bgImage"></MusicList>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "@/api/singer";
import { createSong, processSongsUrl } from "@/assets/js/song";
import { ERR_OK } from "@/api/config";
import MusicList from '@/components/music-list/music-list'
export default {
  components :{
    MusicList
  },
  data() {
    return {
      show: false,
      songs: [],
    };
  },
  created() {
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  computed: {
    ...mapGetters(["singer"]),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    }
  },
  mounted() {
    this._getSingerDetail(this.singer.id);
  },
  methods: {
    _getSingerDetail(id) {
      getSingerDetail(id).then(res => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.data.list))
            .then(songs => {
              this.songs = songs;
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        let { musicData } = item;
        ret.push(createSong(musicData));
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