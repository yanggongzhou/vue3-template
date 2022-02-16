import { Ref, ref, watch } from 'vue'

export interface CountRange {
    min: number;
    max: number;
}

interface Result {
    current: Ref<number>;
    minus: (num: number) => void;
    plus: (num: number) => void;
    set: (num: number) => void;
    reset: () => void
}

/**
 * 自定义hooks例子
 * @param init 初始值
 * @param range 值的范围: min最小值, max最大值
 */
export function useCount (init: number, range: CountRange): Result {
    const current = ref(init)

    const minus = (num: number) => {
        current.value -= num
    }

    const plus = (num: number) => {
        current.value += num
    }

    const set = (num: number) => {
        current.value = num
    }

    const reset = () => {
        current.value = init
    }

    // 加减时，超过边缘的处理
    watch(current, (newVal: number, oldVal: number) => {
        if (newVal === oldVal) return

        if (newVal < +range.min) {
            current.value = +range.min
        } else if (newVal > +range.max) {
            current.value = +range.max
        }
    })

    return {
        current,
        minus,
        plus,
        set,
        reset
    }
}
