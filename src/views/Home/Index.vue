<template>
    <div class="home">
        <img alt="Vue logo" src="../../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
        <button @click="logout">退出登录</button>
        <hr/>
        <p>{{ computedCount }}</p>
        <div>
            <label>MIN COUNT:</label>
            <input v-model.number="myContext.range.min">
        </div>
        <div>
            <label>MAX COUNT:</label>
            <input v-model.number="myContext.range.max">
        </div>
        <div>
            <button @click="myContext.plus(10)">+5</button>
            <button @click="myContext.minus(5)">-5</button>
            <button @click="myContext.set(10)">set 10</button>
            <button @click="myContext.reset()">reset</button>
        </div>
    </div>
</template>

<script lang="ts" src="./Index.ts"></script>
<!--没有加scoped，会编译成全局样式。避免全局污染-->
<style scoped lang="less" src="./Index.less"></style>
