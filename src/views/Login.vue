<template>
    <div class="login">
        <h1>This is an login page</h1>
        <span>{{ computedPassword }}</span>
        <hr/>
        <div>
            <label>username:</label>
            <input name="username" v-model="loginForm.username"/>
        </div>
        <div>
            <label>password:</label>
            <input name="password" type="password" v-model="loginForm.password"/>
        </div>
        <button @click="submit">登录</button>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue'
import { useStore } from '@/store'

// Vue3 defineComponent写法
export default defineComponent({
    setup () {
        const store = useStore()
        const loginForm = reactive({
            username: '',
            password: ''
        })

        onMounted(() => {
            console.log('onMounted')
        })

        const submit = async () => {
            console.log('login submit')
            await store.dispatch('user/setJwt', {
                jwtToken: 'test',
                tokenType: 'test',
                refreshToken: 'test'
            })
            alert('登录成功')
            location.reload()
        }

        // computed
        const computedPassword = computed({
            get: () => {
                return 'computedPassword: ' + loginForm.password
            },
            set: val => {
                loginForm.password = val
            }
        })

        return {
            loginForm,
            submit,
            computedPassword
        }
    }
})
</script>
