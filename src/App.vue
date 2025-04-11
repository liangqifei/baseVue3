<script setup lang="ts">
    import {RouterView} from 'vue-router'
    import {ref} from 'vue'
    import {updateLanguage} from './language'
    import {ConfigProvider,Button} from 'ant-design-vue'
    import {getUsers} from './api/user'
    const theme=ref({
        token: {
          colorPrimary: '#1890ff',
        },
    })
    const changeTheme=()=>{
      theme.value.token.colorPrimary='red'
      updateLanguage('en')
    }
    const getData=async()=>{
      const a=await getUsers()
      debugger
    }
    getData()
</script>

<template>
    <ConfigProvider
      :theme="theme"
    >
        <!-- <Button type="primary" @click="changeTheme">{{ $t('message.hello') }}</Button> -->
        <RouterView></RouterView>
    </ConfigProvider>
</template>

<style >
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
}
html,body {
 width:100vw;
 height:100vh;
}
#app {
 height: 100%;
 width: 100%;
}

</style>
