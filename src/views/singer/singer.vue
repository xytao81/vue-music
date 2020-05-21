<template>
  <div>歌手</div>
</template>

<script>
import { getSingerList } from "@/api/singer";
import { ERR_OK } from "@/api/config";
export default {
  data() {
    return {
      singerList: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList()
        .then(result => {
          if (result.code === ERR_OK) {
            this.singerList = result.data.list;
            console.log(this.singerList);
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang='stylus' scoped></style>
