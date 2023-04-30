import React from 'react';
import Layout from '@theme/Layout';
import './hh.css';
import './hh2.css';
import './hh3.css';
import './resume.css';

export default function resume() {
    return (
        <Layout title="简历" description="Hello mm0114的个人简历页面">
            <main class="page">
                <section>
                    <h1 class="f-s-18 f-w-900 m-b-20">个人信息</h1>
                    <div class="boxes default m-b-20">
                        <div class="box bg-gray-lightest p-t-0 p-b-0">
                            <div style={{ display: 'flex' }}>
                                <div
                                    style={{ flex: 1.1, paddingLeft: 0 }}
                                    class="col-3 p-t-10 p-b-10"
                                >
                                    ● 姓名：刘鑫鸿
                                </div>
                                <div style={{ flex: 1.6 }} class="col-3 p-t-10 p-b-10 border">
                                    ● 学历：本科
                                </div>
                                <div style={{ flex: 1.48 }} class="col-6 p-t-10 p-b-10 border">
                                    ● 前端开发 | 1年工作经验
                                </div>
                            </div>
                        </div>
                        <div class="box bg-gray-lightest">
                            ● Github：
                            <a href="https://github.co" target="_blank">
                                https://github.com/mm0114/
                            </a>
                        </div>
                        {/* <div class="box bg-gray-lightest">
                            ● 技术博客：
                            <a href="h" target="_blank">
                            </a>
                        </div> */}
                    </div>
                </section>
                <section style={{ position: 'relative' }}>
                    <h1 class="f-s-18 f-w-900 m-b-20">联系方式</h1>
                    <div class="boxes default m-b-20">
                        <div class="box bg-gray-lightest p-t-0 p-b-0">
                            <div style={{ display: 'flex' }}>
                                <div
                                    style={{ flex: 1.1, paddingLeft: 0 }}
                                    class="col-3 p-t-10 p-b-10"
                                >
                                    ● 手机：15883764944
                                </div>
                                <div style={{ flex: 1.6 }} class="col-5 p-t-10 p-b-10 border">
                                    ● Email：mmvainglory@foxmail.com
                                </div>
                                <div style={{ flex: 1.48 }} class="col-4 p-t-10 p-b-10 border">
                                    ● 微信：15883764944
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h1 class="f-s-18 f-w-900 m-b-20">专业技术</h1>
                    <div class="boxes default m-b-20">
                        <div class="box bg-gray-lightest">
                            ● 能使用<span style={{ color: 'orange' }}> HTML5 + CSS3 </span>，并结合
                            <span style={{ color: 'orange' }}> Sass/Less </span>
                            等预处理器进行设计稿还原
                        </div>
                        <div class="box bg-gray-lightest">
                            ● 熟练掌握
                            <span style={{ color: 'orange' }}> JavaScript </span>
                            ，并能运用<span style={{ color: 'orange' }}> ES6，ES7 </span>
                            等高级语法进行高效开发
                        </div>
                        <div class="box bg-gray-lightest">
                            ● 多次使用<span style={{ color: 'orange' }}> Vue全家桶 </span>
                            进行项目开发，能运用
                            <span style={{ color: 'orange' }}> React全家桶 </span>
                            全家桶开发项目
                        </div>
                        <div class="box bg-gray-lightest">
                            ● 做一些<span style={{ color: 'orange' }}> 提高代码效率 </span>
                            的措施，例如封装
                            <span style={{ color: 'orange' }}> 公用组件，公用方法，公用Hook </span>
                            等
                        </div>
                        <div class="box bg-gray-lightest">
                            ● 能独立搭建符合规范的<span style={{ color: 'orange' }}> 脚手架 </span>
                            ，对<span style={{ color: 'orange' }}> 前端工程化 </span>
                            有一定程度的理解和实践
                        </div>
                        <div class="box bg-gray-lightest">
                            ● 在项目中，对于
                            <span style={{ color: 'orange' }}> 代码优化，打包优化，请求优化 </span>
                            等优化措施有大量实践
                        </div>
                        <div class="box bg-gray-lightest">
                            ● 在项目开发中熟练使用
                            <span style={{ color: 'orange' }}> 第三方组件库 </span>
                            进行开发{/* ，并私下阅读其源码 */}，了解其实现的思想
                        </div>
                        <div class="box bg-gray-lightest">
                            ● 多次参与<span style={{ color: 'orange' }}> 微信小程序 </span>
                            的项目，并对踩坑经历进行<span style={{ color: 'orange' }}> 记录</span>
                        </div>
                        <div class="box bg-gray-lightest">
                            ● 喜欢思考问题，并进行
                            <span style={{ color: 'orange' }}> 知识输出 </span>
                            {/* ，多次参加
                            <span style={{ color: 'orange' }}> 知识分享会议 </span> */}
                        </div>
                    </div>
                </section>
                <section>
                    <h1 class="f-s-18 f-w-900 m-b-20">工作经历 </h1>
                    <div class="boxes default m-b-20 ">
                        <div style={{ display: 'flex' }} class="box bg-gray-lightest p-t-0 p-b-0">
                            <div class="col-6 p-t-10 p-b-10">
                                ●
                                <span style={{ fontWeight: 700 /* , fontSize: '17px' */ }}>
                                    成都数联信信息技术有限公司
                                </span>
                            </div>
                            <div class="col-3 p-t-10 p-b-10 border">● 2022.4 - 2022.9</div>
                        </div>
                    </div>
                </section>
                <section>
                    <h1 class="f-s-18 f-w-900 m-b-20">项目经历</h1>
                    <div class="boxes default m-b-20">
                        <div class="box bg-gray-lightest">
                            ●{' '}
                            <span style={{ fontWeight: 700, fontSize: '18px' }}>
                                眉山电网数字化大屏 + 后台
                            </span>
                            <br />
                            <br />
                            <span style={{ fontWeight: 550 }}>项目简介：</span>
                            <br />
                            结合图片、地图、统计图等展现方式对电网综合建设功臣涉及的人员管理、市场荣誉、供电产能等多
                            个子项的重点成果指标进行可视化大屏展示，实现对企业宣传、产能管理的对外展示，彰显了品牌形象和企业实力。
                            通过大屏可以整体了解客户投诉，同业对标、故障跳闸、营销稽查、客户投诉等信息，进行详细展示。
                            <br /><br />
                            <span style={{ fontWeight: 550 }}>项目环境：</span>
                            <br />
                            ● Vue3 + JavaScript + Vite + element-ui + HighCharts
                            <br />
                            <br />
                            <span style={{ fontWeight: 550 }}>项目功能：</span>
                            不同大小的模块图形化修改方案绑定大屏布局，
                            用户登录，用户注册，上传头像，权限管理，账号管理，
                            <br /><br />
                            <span style={{ fontWeight: 550 }}>项目职责：</span>
                            <br /> 1、参加技术选型讨论，最终确定Vue3+JS+Vite
                            {/* <br />2、独立搭建符合规范的项目脚手架，包括eslint、pritter、stylelint、husky等规范搭建 */}
                            <br /> 2、使用Vue全家桶进行开发，并使用pinia作为状态管理工具
                            <br /> 3、负责http请求的axios封装
                            <br /> 4、将element-ui组件二次封装，使之更符合业务需求
                            <br /> 5、动态路由进行路由鉴权，自定义指令进行鉴权显隐某些组件
                            <br /> 6、根据需求完成项目的i18n、换肤功能
                            <br /> 7、加载骨架屏的动态生成
                            <br /> 8、使用iframe展示业务管控、服务管控、营销管控三个大版块。键盘无缝切换选中大版块与子级和页面
                            <br /><br />
                            <span style={{ fontWeight: 550 }}>项目亮点：</span>
                            <br /> 1、文章列表的长列表优化，使用虚拟滚动
                            {/* <br /> 2、配置一套符合团队习惯且规范的husky */}
                            <br /> 2、localStorage的时效性、私密性、命名规范
                            {/* <br /> 4、优化打包与项目启动时间，从xx分钟到xx秒 */}
                            <br /> 3、axios二次封装，支持取消请求，请求超时、拦截等功能
                            {/* <br /> 6、根据需求自己封装了树组件，支持添加、搜索、编辑等功能 */}
                            <br /> 4、为了减少请求，使用防抖优化
                            {/* <br /> 8、大文件上传，使用切片上传形式，支持上传、暂停、续传 */}
                            {/* <br />9、文章关键字搜索，封装类似于微信搜索的组件，支持繁体字、首字母等搜索 */}
                            {/* <br /> 10、主导整个项目的强引导教程 */}
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
