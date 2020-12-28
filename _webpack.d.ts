import {CompilationHooks} from 'webpack'

declare module 'webpack' {
    namespace compilation {
        export interface CompilationHooks {
            htmlWebpackPluginBeforeHtmlProcessing?: any,
            test__test?: string 
        }
    }
}