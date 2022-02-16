import { Options, Vue, setup } from 'vue-class-component'
import HelloWorld from '@/views/Home/components/HelloWorld.vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { CountRange, useCount } from './hooks/useCount'

@Options({
    components: {
        HelloWorld
    },
    beforeCreate () {
        console.log('beforeCreate')
    },
    created () {
        console.log('created')
    },
    beforeMount () {
        console.log('beforeMount')
    },
    mounted () {
        console.log('mounted')
    },
    beforeUnmount () {
        console.log('beforeUnmount')
    },
    unmounted () {
        console.log('unmounted')
    }
})
export default class Home extends Vue {
    // initState
    store = useStore()
    router = useRouter()
    /**
     * vue-class-component8.0.0-rc.1 中导出的setup() API暂接受任何参数
     * https://github.com/vuejs/vue-class-component/blob/v8.0.0-rc.1/src/helpers.ts#L85
     */
    myContext = setup(() => {
        console.log('setup')

        const range: CountRange = {
            min: 10,
            max: 20
        }

        // 自定义hooks例子
        const { current, minus, plus, set, reset } = useCount(10, range)

        return {
            range,
            current,
            minus,
            plus,
            set,
            reset
        }
    })

    // computed
    get computedCount () {
        return 'computed   ' + this.myContext.current
    }

    // method
    logout = async () => {
        console.log(this.$refs)
        await this.store.dispatch('user/logout')
        await this.router.push('/login')
    }
}
