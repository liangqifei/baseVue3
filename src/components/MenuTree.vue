<template>
  <Menu
    theme="dark"
    mode="inline"
    triggerSubMenuAction="hover"
    :selectedKeys="[selectedKey]"
    :openKeys="openKeys"
    @openChange="handleOpenChange"
  >
    <MenuItems v-for="(menu, index) in menuData" :key="menu.key" :menu="menu" @select="handleSelect" />
  </Menu>
</template>

<script setup>
import { ref } from 'vue'
import MenuItems from './MenuItem.vue' // 导入递归菜单项组件
import {Menu} from 'ant-design-vue'
const selectedKey = ref('')
const openKeys = ref(['sub1']) // 默认展开的菜单项

const menuData = ref([
  {
    key: 'sub1',
    title: '一级菜单一',
    icon: 'home-outlined',
    children: [
      {
        key: 'sub1-1',
        title: '二级菜单一',
        children: [
          { key: '1-1-1', title: '三级菜单一' },
          { key: '1-1-2', title: '三级菜单二' }
        ]
      },
      {
        key: 'sub1-2',
        title: '二级菜单二',
        children: [
          { key: '1-2-1', title: '三级菜单三' }
        ]
      }
    ]
  },
  {
    key: 'sub2',
    title: '一级菜单二',
    icon: 'setting-outlined',
    children: [
      { key: '2-1', title: '二级菜单（无三级）' }
    ]
  }
])

const handleOpenChange = (keys) => {
  openKeys.value = keys
}

const handleSelect = (key) => {
  selectedKey.value = key
}
</script>
