const fetch = require('node-fetch');

import type {Compiler} from 'webpack';

import {IHtmlPluginData, IRes, IResErr } from './interface';

interface IConfig {
    open: boolean, // 是否开启数据插入,
    url: string, // 请求的URL 如: http://127.0.0.1:8900/detail,
    method?: string, // 请求的方法类型 GET POST UPDATE default: GET,
    headers?: object, // 请求头,
    params?: unknown, // 请求的参数,
    key?: string, // 插入数据的字段 默认 'DETAIL'
}

class InsertData2htmlPlugin {

    public open: boolean;
    public url: string;
    public method: string;
    public headers: object;
    public params: unknown;
    public key: string;

    constructor({open, url, method, headers, params, key}: IConfig) {
        this.open = open;
        this.url = url;
        this.method = method || 'POST';
        this.params = params;
        this.headers = headers || {};
        this.key = key || 'DETAIL';
    }

    apply(compiler: Compiler) {
        if(!this.open) {
            return;
        }

        compiler.hooks.make.tapAsync('InsertData2htmlPlugin',
            async (compilation, getDataCallback) => {
                const homeData = await this.fetchDetailData();
                compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
                'htmlWebpackPluginBeforeHtmlProcessing',
                    (htmlPluginData: IHtmlPluginData) => {
                        let result = `
                        <head>
                            <script>
                                ;(function(){
                                    ${this.key} = ${JSON.stringify(homeData)};
                                })(window);
                            </script>
                        `;
                        htmlPluginData.html = htmlPluginData.html.replace(
                            '<head>', result
                        );
                    }
                );
                getDataCallback();
            }
        ) 
    }


    fetchDetailData() {
        if(!this.url) {
            return Promise.resolve({error: '请配置请求的url'})
        }
        return fetch(this.url, { 
                method: this.method, 
                body: JSON.stringify(this.params),
                headers: { 'Content-Type': 'application/json', ...this.headers}
            })
            .then((res:IRes) => res.json())
            .catch((err: IResErr) => {
                return Promise.resolve({error: err})
            })
    }
}

module.exports = InsertData2htmlPlugin;
