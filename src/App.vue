<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import MHeader from "@/components/m-header/m-header";
import Tab from "@/components/tab/tab";
export default {
  components: {
    MHeader,
    Tab
  }
};
</script>

<style lang="stylus"></style>
