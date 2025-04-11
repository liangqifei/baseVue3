<template>
  <Layout >
    <!-- 左侧菜单 -->
    <LayoutSider collapsible v-model:collapsed="collapsed" class="yk-sider" :width="260">
      <div class="logo" />
      sss
      <MenuTree></MenuTree>
    </LayoutSider>
    <!-- 主区域 -->
    <Layout >
      <LayoutHeader class="yk-layout-header">
        <div style="display: flex; justify-content: space-between; align-items: center; height: 100%;">
          <div class="title">多级菜单系统</div>
          <a-avatar icon="user" />
        </div>
      </LayoutHeader>
      <LayoutContent class="yk-layout-content">
        <RouterView></RouterView>
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons-vue'
import MenuTree from './MenuTree.vue'
import {Layout,LayoutSider,LayoutContent,LayoutHeader} from 'ant-design-vue'
import {RouterView} from 'vue-router'
const collapsed = ref(false)
const selectedKey = ref('')
const openKeys = ref(['sub1']) // 默认展开一级菜单

const handleOpenChange = (keys) => {
  openKeys.value = keys
}
</script>

<style  lang="less">


.yk-layout-header{
  background: #fff; 
  padding: 0 16px;
  height:64px;
}

.yk-layout-content{
  padding:16px;
  height:calc(100vh - 64px);
}
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.yk-layout-content__main{
  background-color: #fff;
  height:100%;
  overflow: auto;
}
</style>
