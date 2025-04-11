<template>
    <SubMenu v-if="menu.children && menu.children.length" :key="menu.key" >
      <template #title="data">
          <span>{{ menu.title }}</span>
      </template>
      <MenuCustomItem
        v-for="(subMenu, index) in menu.children"
        :key="subMenu.key"
        :menu="subMenu"
        @select="handleSelect"
      />
    </SubMenu>
  
    <MenuItem v-else :key="menu.key" @click="handleSelect(menu.key)">
      {{ menu.title }}
    </MenuItem>
  </template>
  
  <script lang="ts">
  import { defineProps,defineComponent  } from 'vue'
  import { HomeOutlined, SettingOutlined } from '@ant-design/icons-vue'
  import MenuCustomItem from './MenuItem.vue' // 导入递归菜单项组件
  import {Menu,SubMenu} from 'ant-design-vue'
  const MenuItem=Menu.Item
  export default defineComponent({
    name:'MenuCustomItem',
    components:{
      Menu,
      SubMenu,
      MenuItem
    },
    props:{
        menu: Object
    },
    emits:['select'],
    setup(props,{emit}){
        
        const handleSelect = (key) => {
            emit('select', key)
        }
        
       
        return {
            handleSelect
        }
    }
  })

 
  
  </script>
  