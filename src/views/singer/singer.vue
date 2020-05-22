<template>
  <div class="singer" ref="singer">
    <ListView @click="clickItem" :data="singers" ref="list"></ListView>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { getSingerList } from "@/api/singer";
import { ERR_OK } from "@/api/config";
import Singer from "@/assets/js/singer";
import ListView from "@/base/listView/listView";
import { mapMutations } from 'vuex'

const HOT_NAME = "热门";
const HOT_INDEX_LEN = 10;

export default {
  components: {
    ListView
  },
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    clickItem(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList()
        .then(result => {
          if (result.code === ERR_OK) {
            this.singers = this._normalizeSinger(result.data.list);
          }
        })
        .catch(err => {});
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_INDEX_LEN && index > 0) {
          map.hot.items.push(
            new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          })
        );
      });

      // 排序
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-z]/)) {
          ret.push(val);
        } else if (val.title == HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    }
  }
};
</script>

<style lang="stylus" scoped>
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>