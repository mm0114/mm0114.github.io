# Rest

## 前言

我们之前编写的服务器都是传统的服务器，服务器的结构是基于`MVC`模式
    **Model** -- 数据模型
    **View** -- 视图，用来呈现
    **Controller** -- 控制器，复杂加载数据并选择视图来呈现数据

- 传统的服务器是直接为客户端返回一个页面
  - 但是传统的服务器并不能适用于现在的应用场景

现在的应用场景，一个应用通常都会有多个客户端（client）存在
    web端    移动端（app）    pc端  

- 如果服务器直接返回html页面，那么服务器就只能为web端提供服务
    其他类型的客户端还需要单独开发服务器，这样就提高了开发和维护的成本

如何解决这个问题？
    - 传统的服务器需要做两件事情，第一个加载数据，第二个要将模型渲染进视图
        - 解决方案就将渲染视图的功能从服务器中剥离出来，
        服务器只负责向客户端返回数据，渲染视图的工作由客户端自行完成
        - 分离以后，服务器只提供数据，一个服务器可以同时为多种客户端提供服务器
        同时将视图渲染的工作交给客户端以后，简化了服务器代码的编写

## 简介

Rest
    - **REpresentational State Transfer**
        - **表示层状态的传输**
        - **Rest实际上就是一种服务器的设计风格**
        - 它的主要特点就是，**服务器只返回数据**
        - 服务器和客户端传输数据时通常会使用`JSON`作为数据格式
        - 请求的方法：
        `GET`    加载数据
        `POST`   新建或添加数据
        `PUT`    添加或修改数据
        `PATCH`  修改数据
        `DELETE` 删除数据
        `OPTION` 由浏览器自动发送，检查请求的一些权限
        - API（接口） Endpoint（端点）
        GET /user
        POST /user
        DELETE /user/:id
        ...

## api

服务器只负责返回数据，根据需求使用不同的请求路由

```js
const express = require("express")

const app = express()

const STU_ARR = [
    { id: "1", name: "孙悟空", age: 18, gender: "男", address: "花果山" },
    { id: "2", name: "猪八戒", age: 28, gender: "男", address: "高老庄" },
    { id: "3", name: "沙和尚", age: 38, gender: "男", address: "流沙河" }
]

app.use(express.urlencoded({extended:true}))
// 解析json格式请求体的中间件
app.use(express.json())

// 统一的api
// 定义学生信息的路由
app.get("/students", (req, res) => {
    console.log("收到students的get请求")
    // 返回学生信息
    res.send({
        status: "ok",
        data: STU_ARR
    })
})
// 查询某个学生的路由
app.get("/students/:id", (req, res) => {
    const id = req.params.id
    const stu = STU_ARR.find((item) => item.id === id)

    // 将数据返回
    res.send({
        status: "ok",
        data: stu
    })
})

// 定义一个添加学生的路由
app.post("/students", (req, res) => {
    console.log("收到students的post请求", req.body)
    // 获取学生的信息
    const { name, age, gender, address } = req.body
    // 创建学生信息
    const stu = {
        id: +STU_ARR.at(-1).id + 1 + "",
        name,
        age: +age,
        gender,
        address
    }

    // 将学生信息添加到数组
    STU_ARR.push(stu)

    // 添加成功
    res.send({
        status: "ok",
        data: stu
    })
})

// 定义一个删除学生的路由 根据id删除学生
// app.delete()
app.delete("/students/:id", (req, res) => {
    // 获取学生的id
    const id = req.params.id

    // 遍历数组
    for (let i = 0; i < STU_ARR.length; i++) {
        if (STU_ARR[i].id === id) {
            const delStu = STU_ARR[i]
            STU_ARR.splice(i, 1)
            // 数据删除成功
            res.send({
                status: "ok",
                data: delStu
            })
            return
        }
    }

    // 如果执行到这里，说明学生不存在
    res.status(403).send({
        status: "error",
        data: "学生id不存在"
    })
})

// 定义一个修改学生的路由
// app.put()
app.put("/students", (req, res) => {
    // 获取数据
    const { id, name, age, gender, address } = req.body

    // 根据id查询学生
    const updateStu = STU_ARR.find((item) => item.id === id)

    if (updateStu) {
        updateStu.name = name
        updateStu.age = age
        updateStu.gender = gender
        updateStu.address = address

        res.send({
            status: "ok",
            data: updateStu
        })
    } else {
        res.status(403).send({
            status: "error",
            data: "学生id不存在"
        })
    }
})
```

# Ajax

## 简介

​                    **在js中向服务器发送的请求加载数的技术叫AJAX**

​     网页应用能够快速地将增量更新呈现在用户界面上，而不需要重载（刷新）整个页面。这使得程序能够更快地回应用户的操作。

​                    **[AJAX](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX)**

​                        \- A 异步  J JavaScript A 和 X xml

​                        \- **异步的js和xm**l

​                        \- 它的作用就是通过js向服务器发送请求来加载数据

​                        \- `xml`是早期AJAX使用的数据格式

```xml
            <student>
             <name>孙悟空</name>    
            </student>
```

​                        \- 目前数据格式都使用`json`

```json
   {"name" :"孙悟空"}
```

## 方案

​                        \- 可以选择的方案：

​                            ① **XMLHTTPRequest（xhr）**

​                            ② **Fetch**

​                            ③ **Axios**

```html
        <script>
            // 点击按钮以后，就去自动去加载服务器的数据
            const btn = document.getElementById("btn")
            btn.onclick = () => {
                // 向服务器发送请求了
                // https://restfulapi.net/http-status-codes/
                /* 
                    - CORS (跨域资源共享)
                        - 跨域请求
                            - 如果两个网站的完整的域名不相同
                                a网站：http://haha.com 
                                b网站：http://heihei.com
                            - 跨域需要检查三个东西：
                                协议 域名 端口号
                                http://localhost:5000
                                http://127.0.0.1:5000
                                - 三个只要有一个不同，就算跨域
                            - 当我们通过AJAX去发送跨域请求时，
                                浏览器为了服务器的安全，会阻止JS读取到服务器的数据

                        - 解决方案
                            - 在服务器中设置一个允许跨域的头
                                Access-Control-Allow-Origin
                                    - 允许那些客户端访问我们的服务器
                                https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
                        
                */

                // xhr
                // 创建一个新的xhr对象，xhr表示请求信息
                const xhr = new XMLHttpRequest()
                
                // 设置请求的信息
                xhr.open("GET", "http://localhost:3000/students")

                // 发送请求
                xhr.send()

                // 读取响应要怎么操作？
                
            }
        </script>
```

## CORS跨域

### \- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (跨域资源共享)

​                        \- 跨域请求

​                            \- 如果两个网站的完整的域名不相同

​                                a网站：<http://haha.com>

​                                b网站：<http://heihei.com>

​                            \- 跨域需要检查三个东西：

​                                协议 域名 端口号

​                                <http://localhost:5000>

​                                <http://127.0.0.1:5000>

​                                \- 三个只要有一个不同，就算跨域

​                            \- 当我们通过AJAX去发送跨域请求时，

​                                **浏览器为了服务器的安全，会阻止JS读取到服务器的数据**

### \- 解决方案

​                            \- 在服务器中设置一个**允许跨域的头**

​                                `Access-Control-Allow-Origin`

​                                    \- 允许那些客户端访问我们的服务器

​                                <https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS>

### [设置响应头](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

```js
app.use((req, res, next) => {
 res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST")
    res.setHeader("Access-Control-Allow-Headers", "Content-type")
    // Access-Control-Allow-Origin 设置指定值时只能设置一个
    // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    // Access-Control-Allow-Methods 允许的请求的方式
    // Access-Control-Allow-Headers 允许传递的请求头
    
    // 复杂请求，浏览器预检测
    // 浏览器预检测的OPTIONS请求，后台要做出响应，不然会进入后续的中间件
    if (req.method === 'OPTIONS') res.end()
    next()
})
```

### [浏览器预检请求（preflight request）](https://zh.javascript.info/fetch-crossorigin#step-1-yu-jian-qing-qiu-preflightrequest)

而跨域请求有时候会自动发起两次请求，第一次为预检请求，即OPTIONS请求
一般来说使用 application/json 的 post 请求是必然会带入OPTIONS请求
OPTIONS请求也被称为预检请求，主要用于获知服务端支持的HTTP请求方法。跨域资源共享(CORS)标准新增了一组 HTTP 首部字段，配合预检请求可获知服务器允许哪些源站通过浏览器有权限访问哪些资源。

但是在有些get请求中也会OPTIONS请求，这里补充下回发生options的情况
当发生以下情况时，客户端就会自动发起OPTIONS预检请求

1. 使用以下任一HTTP 方法：**PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH**
2. 设置了以下头部字段以外的自定义字段：**Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width**
3. Content-Type 的值不属于下列之一: **application/x-www-form-urlencoded、multipart/form-data、text/plain**
4. 请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问
5. 请求中没有使用 ReadableStream 对象
   解决方法：调整请求方法、去除自定义header、修改Content-Type，基本可以避免该请求发出OPTIONS预检请求。

## xhr介绍

```js
                // xhr
                // 创建一个新的xhr对象，xhr表示请求信息
                const xhr = new XMLHttpRequest()
                
                // 设置请求的信息
                xhr.open("GET", "http://localhost:3000/students")

                // 发送请求
                xhr.send()
```

### 读取响应的操作

```html
    <body>
        <h1>AJAX测试</h1>
        <hr />
        <button id="btn">点我加载数据</button>

        <div id="root"></div>

        <script>
            const btn = document.getElementById("btn")
            const root = document.getElementById("root")
            btn.onclick = () => {
                // 创建一个xhr对象
                const xhr = new XMLHttpRequest()

                // 设置响应体的类型，设置后会自动对数据进行类型转换
                xhr.responseType = "json"

                // 可以为xhr对象绑定一个load事件
                xhr.onload = function () {
                    // xhr.status 表示响应状态码
                    // console.log(xhr.status)
                    if (xhr.status === 200) {
                        // xhr.response 表示响应信息
                        // const result = JSON.parse(xhr.response)
                        // console.log(result.status, result.data)
                        // 读取响应信息
                        // console.log(xhr.response)
                        const result = xhr.response
                        // 判断数据是否正确
                        if (result.status === "ok") {
                            // 创建一个ul
                            const ul = document.createElement("ul")
                            // 将ul插入到root中
                            root.appendChild(ul)
                            // 遍历数据
                            for (let stu of result.data) {
                                ul.insertAdjacentHTML(
                                    "beforeend",
                                    `<li>${stu.id} - ${stu.name} - ${stu.age} - ${stu.gender} - ${stu.address}</li>`
                                )
                            }
                        }
                    }
                }

                // 设置请求的信息
                xhr.open("get", "http://localhost:3000/students")
                // 发送请求
                xhr.send()
            }
        </script>
    </body>
```

## fetch

### 简介

​                    [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch)

​                        \- fetch是xhr的升级版，采用的是**Promise API**

​                        \- 作用和AJAX是一样的，但是使用起来更加友好

​                        \- fetch原生js就支持的一种ajax请求的方式

### 基本用法

```
 fetch(resource)
 fetch(resource, options)
```

### get

```js
                fetch("http://localhost:3000/students")
                    .then((res) => {
                        if(res.status === 200){
                            // res.json() 可以用来读取json格式的数据
                            return res.json()
                        }else{
                            throw new Error("加载失败！")
                        }
                    })
                    .then(res => {
                        // 获取到数据后，将数据渲染到页面中
                        if(res.status === "ok"){
                            console.log(res.data)
                        }
                    })
                    .catch((err) => {
                        console.log("出错了！", err)
                    })
```

### post-带options的方式

```js
                fetch("http://localhost:3000/students", {
                    method: "post",
                    
                    headers:{
                        // application/x-www-form-urlencoded // 表单项
                        "Content-type":"application/json" // json类型
                    },

                    // 通过body去发送数据时，必须通过请求头来指定数据的类型
                    body: JSON.stringify({
                        name: "白骨精",
                        age: 16,
                        gender: "女",
                        address: "白骨洞"
                    })
                })
```

### 注意

​ fecth是原生js自带的，所以没有那么智能，需要手动配置一些参数

```js
    // Access-Control-Allow-Methods 允许的请求的方式
    // Access-Control-Allow-Headers 允许传递的请求头    
 res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH")
    res.setHeader("Access-Control-Allow-Headers", "Content-type") // 内容类型
```

## 本地存储

会话存储：**sessionStorage**

​    页面关闭而失效

本地存储：**localStorage**

​    长久存储，需要手动删除

| 方法         | 作用         |
| ------------ | ------------ |
| setItem()    | 用来存储数据 |
| getItem()    | 获取数据     |
| removeItem() | 删除数据     |
| clear()      | 清空数据     |

```js
            // sessionStorage.setItem("name", "孙悟空")
            // sessionStorage.setItem("age", "18")
            // sessionStorage.setItem("gender", "男")
            // sessionStorage.setItem("address", "花果山")

            localStorage.setItem("name", "孙悟空")
            localStorage.setItem("age", "18")
            localStorage.setItem("gender", "男")
            localStorage.setItem("address", "花果山")

            // const name = sessionStorage.getItem("name")

            // console.log(name)

            // sessionStorage.removeItem("name")

            sessionStorage.clear()
```

### 登录

```js
// 定义一个登录的路由
app.post("/login", (req, res) => {
    // 获取用户输入的用户名和密码
    const { username, password } = req.body
    // 验证用户名和密码
    if (username === "admin" && password === "123123") {
        // 登录成功
        res.send({
            status: "ok",
            data: { id: "12345", username: "admin", nickname: "超级管理员" }
        })
    } else {
        // 登录失败
        res.status(403).send({
            status: "error",
            data: "用户名或密码错误"
        })
    }
})
```

```html
        <style>
            table {
                border-collapse: collapse;
                width: 50%;
            }

            td,
            th {
                font-size: 20px;
                text-align: center;
                border: 1px solid #000;
            }

            caption {
                font-size: 30px;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div id="root">
            <h1>请登录以后再做操作</h1>
            <h2 id="info"></h2>
            <form>
                <div>
                    <input id="username" type="text" />
                </div>
                <div>
                    <input id="password" type="password" />
                </div>
                <div>
                    <button id="login-btn" type="button">登录</button>
                </div>
            </form>
        </div>

        <script>
            
            /* 
                问题：
                    - 现在是登录以后直接将用户信息存储到了localStorage
                    - 主要存在两个问题：
                        1.数据安全问题
                        2.服务器不知道你有没有登录
            */

            // 点击login-btn后实现登录功能
            const loginBtn = document.getElementById("login-btn")
            const root = document.getElementById("root")

            function loadData() {
                fetch("http://localhost:3000/students")
                    .then((res) => {
                        if (res.status === 200) {
                            // res.json() 可以用来读取json格式的数据
                            return res.json()
                        } else {
                            throw new Error("加载失败！")
                        }
                    })
                    .then((res) => {
                        // 获取到数据后，将数据渲染到页面中
                        if (res.status === "ok") {
                            // 创建一个table
                            const dataDiv = document.getElementById("data")
                            const table = document.createElement("table")
                            dataDiv.appendChild(table)
                            table.insertAdjacentHTML(
                                "beforeend",
                                "<caption>学生列表</caption>"
                            )
                            table.insertAdjacentHTML(
                                "beforeend",
                                `
                                <thead>
                                    <tr>
                                        <th>学号</th>    
                                        <th>姓名</th>    
                                        <th>年龄</th>    
                                        <th>性别</th>    
                                        <th>地址</th>    
                                    </tr> 
                                </thead>
                            `
                            )

                            const tbody = document.createElement("tbody")
                            table.appendChild(tbody)

                            // 遍历数据
                            for (let stu of res.data) {
                                tbody.insertAdjacentHTML(
                                    "beforeend",
                                    `
                                    <tr>
                                        <td>${stu.id}</td>    
                                        <td>${stu.name}</td>    
                                        <td>${stu.age}</td>    
                                        <td>${stu.gender}</td>    
                                        <td>${stu.address}</td>    
                                    </tr>
                                `
                                )
                            }
                        }
                    })
                    .catch((err) => {
                        console.log("出错了！", err)
                    })
            }

            // 判断用户是否登录
            if (localStorage.getItem("nickname")) {
                // 用户已经登录
                // 登录成功
                root.innerHTML = `
                            <h1>欢迎 ${localStorage.getItem(
                                "nickname"
                            )} 回来！</h1>
                            <hr>
                            <button id="load-btn" onclick="loadData()">加载数据</button>
                            <hr>
                            <div id="data"></div>
                        `
            } else {
                loginBtn.onclick = () => {
                    // 获取用户输入的用户名和密码
                    const username = document
                        .getElementById("username")
                        .value.trim()
                    const password = document
                        .getElementById("password")
                        .value.trim()

                    // 调用fetch发送请求来完成登录
                    fetch("http://localhost:3000/login", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ username, password })
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res.status !== "ok") {
                                throw new Error("用户名或密码错误")
                            }

                            // 登录成功以后，需要保持用户的登录的状态，需要将用户的信息存储到某个地方
                            // 需要将用户信息存储到本地存储
                            /* 
                            所谓的本地存储就是指浏览器自身的存储空间，
                                可以将用户的数据存储到浏览器内部
                                sessionStorage 中存储的数据 页面一关闭就会丢失
                                localStorage 存储的时间比较长
                        */

                            // sessionStorage
                            // localStorage
                            // console.log(res)
                            // 登录成功，向本地存储中插入用户的信息
                            localStorage.setItem("username", res.data.username)
                            localStorage.setItem("userId", res.data.id)
                            localStorage.setItem("nickname", res.data.nickname)

                            // 登录成功
                            root.innerHTML = `
                            <h1>欢迎 ${res.data.nickname} 回来！</h1>
                            <hr>
                            <button id="load-btn" onclick="loadData()">加载数据</button>
                            <hr>
                            <div id="data"></div>
                        `
                        })
                        .catch((err) => {
                            console.log("出错了！", err)
                            // 这里是登录失败
                            document.getElementById("info").innerText =
                                "用户名或密码错误"
                        })
                }
            }
        </script>
    </body>
```

## token

### 简介

​                问题：

​                    \- 现在是登录以后直接将用户信息存储到了localStorage

​                    \- 主要存在两个问题：

​                        1.数据安全问题

​                        2.服务器不知道你有没有登录

​                    \- 解决问题：

​                        如何告诉服务器客户端的登录状态

​                            \- **rest风格的服务器是无状态的服务器**，所以注意不要在服务器中存储用户的数据

​                            \- 服务器中不能存储用户信息，可以将用户信息发送给客户端保存

​                                比如：{id:"xxx", username:"xxx", email:"xxx"}

​                                客户端每次访问服务器时，直接将用户信息发回，服务器就可以根据用户信息来识别用户的身份

​                            \- 但是如果将数据直接发送给客户端同样会有数据安全的问题，

​                                所以我们必须对数据进行加密，加密以后在发送给客户端保存，这样即可避免数据的泄露

​                            \- 在node中可以直接使用`jsonwebtoken`这个包来对数据进行加密

​                                **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)（jwt）** --> 通过对json加密后，生成一个web中使用的令牌

​                            \- 使用步骤：

​                                1.安装

                                    ```
      yarn add jsonwebtoken
                                    ```

​                                2.引入

​                                3....

```js
// 引入jwt
const jwt = require("jsonwebtoken")

// 创建一个对象
const obj = {
    name: "swk",
    age: 18,
    gender: "男"
}

// 使用jwt来对json数据进行加密
const token = jwt.sign(obj, "hellohellohowyou", {
    expiresIn: "1"
})
try {
    //服务器收到客户端的token后
    const decodeData = jwt.verify(token, "hellohellohowyou")

    console.log(decodeData)
} catch (e) {
    // 说明token解码失败，说明token
    console.log("无效的token")
}
```

### 使用

```js
app.use((req, res, next) => {
    // 设置响应头
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH")
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization")
    // Access-Control-Allow-Origin 设置指定值时只能设置一个
    // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    // Access-Control-Allow-Methods 允许的请求的方式
    // Access-Control-Allow-Headers 允许传递的请求头
    next()
})
```

需要验证权限的路由

```js
// 引入jwt
const jwt = require("jsonwebtoken")

// 定义一个登录的路由
app.post("/login", (req, res) => {
    // 获取用户输入的用户名和密码
    const { username, password } = req.body
    // 验证用户名和密码
    if (username === "admin" && password === "123123") {
        // 登录成功，生成token
        const token = jwt.sign(
            {
                id: "12345",
                username: "admin",
                nickname: "超级管理员"
            },
            "chaojianquanmima",
            {
                expiresIn: "1d"
            }
        )

        // 登录成功
        res.send({
            status: "ok",
            data: {
                token,
                nickname: "超级管理员"
            }
        })
    } else {
        // 登录失败
        res.status(403).send({
            status: "error",
            data: "用户名或密码错误"
        })
    }
})

// 统一的api
// 定义学生信息的路由
app.get("/students", (req, res) => {
    try {
        // 这个路由必须在用户登录后才能访问
        // 需要检查用户是否登录
        // 读取请求头
        const token = req.get("Authorization").split(" ")[1]

        // 对token进行解码
        const decodeToken = jwt.verify(token, "chaojianquanmima")
        console.log(decodeToken)
        // 解码成功，token有效
        // 返回学生信息
        res.send({
            status: "ok",
            data: STU_ARR
        })
    } catch (e) {
        // 解码错误，用户token无效
        res.status(403).send({
            status: "error",
            data: "token无效"
        })
    }
})
```

```js
            // 点击login-btn后实现登录功能
            const loginBtn = document.getElementById("login-btn")
            const root = document.getElementById("root")

            function loadData() {

                // 当我们访问的是需要权限的api时，必须在请求中附加权限的信息
                // token一般都是通过请求头来发送
                const token = localStorage.getItem("token")
                fetch("http://localhost:3000/students", {
                    headers:{
                        // "Bearer xxxxxx"
                        "Authorization":`Bearer ${token}`
                    }
                })
                    .then((res) => {
                        if (res.status === 200) {
                            // res.json() 可以用来读取json格式的数据
                            return res.json()
                        } else {
                            throw new Error("加载失败！")
                        }
                    })
                    .then((res) => {
                        // 获取到数据后，将数据渲染到页面中
                        if (res.status === "ok") {
                            // 创建一个table
                            const dataDiv = document.getElementById("data")
                            const table = document.createElement("table")
                            dataDiv.appendChild(table)
                            table.insertAdjacentHTML(
                                "beforeend",
                                "<caption>学生列表</caption>"
                            )
                            table.insertAdjacentHTML(
                                "beforeend",
                                `
                                <thead>
                                    <tr>
                                        <th>学号</th>    
                                        <th>姓名</th>    
                                        <th>年龄</th>    
                                        <th>性别</th>    
                                        <th>地址</th>    
                                    </tr> 
                                </thead>
                            `
                            )

                            const tbody = document.createElement("tbody")
                            table.appendChild(tbody)

                            // 遍历数据
                            for (let stu of res.data) {
                                tbody.insertAdjacentHTML(
                                    "beforeend",
                                    `
                                    <tr>
                                        <td>${stu.id}</td>    
                                        <td>${stu.name}</td>    
                                        <td>${stu.age}</td>    
                                        <td>${stu.gender}</td>    
                                        <td>${stu.address}</td>    
                                    </tr>
                                `
                                )
                            }
                        }
                    })
                    .catch((err) => {
                        console.log("出错了！", err)
                    })
            }

            // 判断用户是否登录
            if (localStorage.getItem("token")) {
                // 用户已经登录
                // 登录成功
                root.innerHTML = `
                            <h1>欢迎 ${localStorage.getItem(
                                "nickname"
                            )} 回来！</h1>
                            <hr>
                            <button id="load-btn" onclick="loadData()">加载数据</button>
                            <button onclick="localStorage.clear()">注销</button>
                            <hr>
                            <div id="data"></div>
                        `
            } else {
                loginBtn.onclick = () => {
                    // 获取用户输入的用户名和密码
                    const username = document
                        .getElementById("username")
                        .value.trim()
                    const password = document
                        .getElementById("password")
                        .value.trim()

                    // 调用fetch发送请求来完成登录
                    fetch("http://localhost:3000/login", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ username, password })
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res.status !== "ok") {
                                throw new Error("用户名或密码错误")
                            }

                            // 登录成功以后，需要保持用户的登录的状态，需要将用户的信息存储到某个地方
                            // 登录成功，向本地存储中插入用户的信息
                            localStorage.setItem("token", res.data.token)
                            localStorage.setItem("nickname", res.data.nickname)

                            // 登录成功
                            root.innerHTML = `
                            <h1>欢迎 ${res.data.nickname} 回来！</h1>
                            <hr>
                            <button id="load-btn" onclick="loadData()">加载数据</button>
                            <button onclick="localStorage.clear()">注销</button>
                            <hr>
                            <div id="data"></div>
                        `
                        })
                        .catch((err) => {
                            console.log("出错了！", err)
                            // 这里是登录失败
                            document.getElementById("info").innerText =
                                "用户名或密码错误"
                        })
                }
            }
```

## fetch补充

### [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController)—终止请求

### fetch的async、await用法

```html
    <body>
        <button id="btn01">点我一下</button>

        <button id="btn02">取消</button>
        <button id="btn03">按钮3号</button>
        <script>
            // 获取按钮
            const btn01 = document.getElementById("btn01")
            const btn02 = document.getElementById("btn02")
            const btn03 = document.getElementById("btn03")

            let controller;

            btn01.onclick = () => {
                // 创建一个AbortController
                controller = new AbortController()
                // setTimeout(()=>{
                //     controller.abort()
                // }, 3000)

                // 终止请求
                // 点击按钮向test发送请求
                fetch("http://localhost:3000/test", {
                    signal: controller.signal
                })
                    .then((res) => console.log(res))
                    .catch((err) => console.log("出错了", err))
            }

            btn02.onclick = () => {
                controller && controller.abort()
            }

            btn03.onclick = async () => {
                // fetch("http://localhost:3000/test").then()...
                // 注意：将promise改写为await时，一定要写try-catch

                try {
                    const res = await fetch("http://localhost:3000/students")
                    const data = await res.json()
                    console.log(data)
                } catch (e) {
                    console.log("出错了", e)
                }
            }
        </script>
    </body>
```

## axios

### 简介

​  基于promise可以用于浏览器和node.js的网络请求库

​  [Axios](https://www.axios-http.cn/docs/intro) 是一个基于 ***promise*** 网络请求库，作用于[`node.js`](https://nodejs.org/) 和浏览器中。 它是 ***isomorphic*** 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 **XMLHttpRequests**。

### 基本使用

**注意**

​ **axios**很智能，相比较与**fetch**，能自动帮忙处理请求头，**json**转换数据啊。

​ **默认状态码200—300**，可以更改。状态码不符合都走***catch***

```html
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    </head>
    <body>
        <button id="btn1">按钮1</button>
        <button id="btn2">按钮2</button>

        <script>
            document.getElementById("btn1").onclick = () => {
                // 直接调用axios发送请求
                // axios(config)
                axios({
                    method: "post",
                    url: "http://localhost:3000/students",
                    data: {
                        name: "唐僧",
                        age: 18,
                        gender: "男",
                        address: "女儿国"
                    } // 请求参数

                    // data:"name=swk&age=18"
                })
                    .then((result) => {
                        // result是axios封装过
                        console.log(result.data)
                    })
                    .catch((err) => {
                        console.log("出错了！", err)
                    })
            }


            document.getElementById("btn2").onclick = () => {
                // 直接调用axios发送请求
                // axios(config)
                axios({
                    method: "get",
                    url: "http://localhost:3000/students",
                   
                })
                    .then((result) => {
                        // axios默认只会在响应状态为2xx时才会调用then
                        // result是axios封装过
                        console.log(result.data)
                    })
                    .catch((err) => {
                        console.log("出错了！", err)
                    })
            }
        </script>
    </body>
```

### [配置对象](https://www.axios-http.cn/docs/req_config)

```html
        <script>
            document.getElementById("btn1").onclick = () => {
                // 直接调用axios发送请求
                // axios(config)
                axios({
                    // baseURL 指定服务器的根目录（路径的前缀）
                    baseURL:"http://localhost:3000",
                    // 请求地址
                    url:"test",

                    // 请求方法，默认是get
                    method:"get",

                    // 指定请求头
                    // headers:{"Content-type":"application/json"}

                    // 请求体
                    // data:"name=唐僧&age=16"
                    data: {
                        name: "唐僧",
                        age: 18,
                        gender: "男",
                        address: "女儿国"
                    },

                    // params 用来指定路径中的查询字符串
                    params:{
                        id:1,
                        name:"swk"
                    },

                    //timeout 过期时间
                    timeout:1000,

                    // 用来终止请求
                    // signal

                    // transformRequest 可以用来处理请求数据（data）
                    // 它需要一个数组作为参数，数组可以接收多个函数，请求发送时多个函数会按照顺序执行
                    // 函数在执行时，会接收到两个参数data和headers
                    // transformRequest:[function(data, headers){
                    //     // 可以在函数中对data和headers进行修改
                    //     data.name = "猪八戒"
                    //     headers["Content-Type"] = "application/json"
                    //     return data
                    // }, function(data, headers){
                    //     // 最后一个函数必须返回一个字符串，才能使得数据有效
                    //     return JSON.stringify(data)
                    // }]
                    
                })
                    .then((result) => {
                        // result是axios封装过
                        console.log(result.data)
                    })
                    .catch((err) => {
                        console.log("出错了！", err)
                    })
            }
        </script>
    </body>
```

### [取消请求](https://www.axios-http.cn/docs/cancellation)

Axios 支持以 fetch API 方式—— [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) 取消请求：

```js
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()
```

### [响应结构](https://www.axios-http.cn/docs/res_schema)

一个请求的响应包含以下信息。

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `axios` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```

### [默认配置](https://www.axios-http.cn/docs/config_defaults)

可以指定默认配置，它将作用于每个请求。

```html
    <script>
            axios.defaults.baseURL = "http://localhost:3000"
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`

            document.getElementById("btn1").onclick = () => {
                axios({
                    url: "students",
                    method: "post",
                    data: {
                        name: "唐僧",
                        age: 18,
                        gender: "男",
                        address: "女儿国"
                    },
                    timeout: 1000
                })
                    .then((result) => {
                        // result是axios封装过
                        console.log(result.data)
                    })
                    .catch((err) => {
                        console.log("出错了！", err)
                    })
            }
        </script>
    </body>
```

### [自定义实例默认值](https://www.axios-http.cn/docs/config_defaults)

```js
            axios.defaults.baseURL = "http://localhost:3000"
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`

            // axios实例相当于是axios的一个副本，它的功能和axios一样
            // axios的默认配置在实例也同样会生效
            //  但是我可以单独修改axios实例的默认配置
            // const instance = axios.create({
            //     baseURL:"http://localhost:4000"
            // })

            // const instance = axios.create()
            // instance.defaults.baseURL = "xxx"


            document.getElementById("btn1").onclick = () => {
                instance
                    .get("students")
                    .then((res) => console.log(res.data))
                    .catch((err) => {
                        console.log("出错了", err)
                    })
            }
```

### [拦截器](https://www.axios-http.cn/docs/interceptors)

在请求或响应被 then 或 catch 处理前拦截它们。

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

```js
   axios.defaults.baseURL = "http://localhost:3000"

            const myAxios = axios.create()

            // axios的拦截器可以对请求或响应进行拦截，在请求发送前和响应读取前处理数据
            // 拦截器只对当前的实例有效
            // 添加请求拦截器
            axios.interceptors.request.use(
                function (config) {
                    // console.log("拦截器执行了")
                    // config 表示axios中的配置对象
                    // config.data.name = "猪哈哈"
                    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`

                    // 在发送请求之前做些什么
                    return config
                },
                function (error) {
                    // 对请求错误做些什么
                    return Promise.reject(error)
                }
            )

            document.getElementById("btn1").onclick = () => {
                myAxios({
                    url: "students",
                    method: "post",
                    data: { name: "猪八戒" }
                })
                    .then((res) => console.log(res.data))
                    .catch((err) => {
                        console.log("出错了", err)
                    })
            }
```

### 移除拦截器

```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```
