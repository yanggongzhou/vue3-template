<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h1>{{ userInfo.name }}</h1>
        <div>
            <svg-icon icon-class="copy" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { mapGetters } from 'vuex'
import { IAuthState, IUserInfoState } from '@/store/modules/user/state'

@Options({
    props: {
        msg: String
    },
    computed: mapGetters({
        auth: 'user/auth',
        userInfo: 'user/userInfo'
    })
})

export default class HelloWorld extends Vue {
    msg!: string
    auth!: IAuthState
    userInfo!: IUserInfoState

    mounted (): void {
        console.log(this.msg)
        console.log('auth', this.auth)
        console.log('userInfo', this.userInfo)
    }
}
</script>
<style scoped lang="less"></style>
