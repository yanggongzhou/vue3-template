import { AnyObject } from '@/utils/type-helper'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loadModules (): {context: any, modules: any} {
    const context = require.context('./', true, /\.ts$/)

    const modules: AnyObject = {}

    context.keys().forEach((key: string) => {
        if (key === './index.ts' || /^(?!.*\/index.ts$)/.test(key)) return
        modules[key.replace(/(\.\/|(\/index)?\.ts)/g, '')] = context(key).default
    })

    return { context, modules }
}

export const { context, modules } = loadModules()
