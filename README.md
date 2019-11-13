# aja E-Commerce

## Contents
- [簡介](#簡介)
- [環境建置與需求](#環境建置與需求)
- [軟體](#軟體)
- [clone 與安裝相依套件](#clone-與安裝相依套件)
- [修改資料庫 config 檔](#修改資料庫-config-檔)
- [資料庫設定與測試資料準備](#資料庫設定與測試資料準備)
- [執行方式](#執行方式)
- [系統網址](#系統網址)
- [API 功能](#api-功能)
- [API 功能](#api-功能)
- [專案管理軟體與第三方套件](#專案管理軟體與第三方套件)
- [Frontend Wireframe](#frontend-wireframe)
- [Background Wireframe](#background-wireframe)
- [User Flow](#user-flow)
- [專案管理軟體與第三方套件](#專案管理軟體與第三方套件)
- [ERD](#erd)
- [Change Logs](#change-logs)
- [Contributor](#contributor)

## 簡介

## 環境建置與需求
* 前端
  * Handlebars 
* 後端
  * DB: MySQL (Local) / PostgreSQL (Cloud)
  * Programming Language: Node.js
* Cloud Platform
  * Heroku
  * AWS EC2
* Node.js 套件
  * bcrypt-nodejs: 0.0.3
  * body-parser: ^1.18.3
  * connect-flash: ^0.1.1
  * cors: ^2.8.5
  * cron: ^1.7.2
  * crypto: ^1.0.1
  * dotenv: ^8.1.0
  * express: ^4.16.4
  * express-handlebars: ^3.1.0
  * express-session: ^1.15.6
  * faker: ^4.1.0
  * imgur-node-api: ^0.1.0
  * jsonwebtoken: ^8.5.1
  * mailgun-js: ^0.22.0
  * method-override: ^3.0.0
  * moment: ^2.24.0
  * multer: ^1.4.2
  * mysql2: ^1.6.4
  * node-cron: ^2.0.3
  * nodemon: ^1.19.3
  * passport: ^0.4.0
  * passport-facebook: ^3.0.0
  * passport-jwt: ^4.0.0
  * passport-local: ^1.0.0
  * pg: ^7.12.1
  * redis: ^2.8.0
  * request: ^2.88.0
  * request-promise: ^4.2.5
  * sequelize: ^4.42.0
  * sequelize-cli: ^5.5.0
  * stripe: ^7.10.0
  * swagger-jsdoc: ^3.4.0
  * swagger-ui-express: ^4.1.1
  * uuid: ^3.3.3
  * validator: ^11.1.0

## 軟體
* Visual Studio Code
* Git
* MySQL
* [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

## clone 與安裝相依套件
* 請在 `Console` 輸入下方指令
  * 從 GitHub Clone 專案
  ```
  https://github.com/ArcherHuang/e-commerce.git
  ```
  * 切換路徑到專案資料夾
  ```
  cd ./e-commerce/
  ``` 
  * 安裝相關套件
  ``` 
  npm install
  ``` 
  * 透過 Visual Studio Code 開啟專案
  ``` 
  code .
  ``` 
  
## 設定檔
* 請在專案的根目錄新增 `.env` 檔，其內容如下

```
// .env

JWT_SECRET=
REDIS_URL=
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
DEPLOY_SERVER=
DEPLOY_VIEW_SERVER=
EMAIL_FROM=
IMGUR_CLIENT_ID=
API_SERVER_FOR_SWAGGER=
FB_CALLBACK_URL=
FB_CLIENT_ID=
FB_CLIENT_SECRET=
HASH_IV=
HASH_KEY=
IMGUR_CLIENT_ID=
MERCHANT_ID=
NODE_RED_IP=

```

## 修改資料庫 config 檔
* 路徑
  * ./config/config.json
* 修改內容
  * development 中的 password

  ```
  "development": {
    "username": "root",
    "password": "password",
    "database": "ec_workspace",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
  ```

## 資料庫設定與測試資料準備
* 請在 MySQL Workbench 輸入下方指令
  * 確認是否已存在資料庫，如已存在則刪除
    * `ec_workspace` 資料庫
    ```
    DROP DATABASE IF EXISTS ec_workspace;
    ```
  * 建立資料庫
    * 建立 `ec_workspace` 資料庫
    ```
    CREATE DATABASE ec_workspace;
    ```
  * 使用資料庫
    * 使用 `ec_workspace` 資料庫
    ```
    USE ec_workspace;
    ```

* 請在 `Console` 輸入下方指令
  * 建立開發環境的 Table 與種子
    * 建立 Table
    ```
    npx sequelize-cli db:migrate
    ```
    * 在建立測試資料
      * 新增
      ```
      npx sequelize-cli db:seed:all
      ```
      * 刪除
      ```
      npx sequelize-cli db:seed:undo:all
      ```

## 執行方式
* 請在 `Console` 輸入下方指令
  * 啟動專案
  ```
  npm run dev
  ```

## 系統網址
* 本地端啟動程式
  * IP Address
    * http://localhost:3000/
  * Admin Account / Password
    * mmosconii@gmail.com / 12345678

* Cloud Server
  * IP Address
    * https://ajashop.co/
  * Admin Account / Password
    * mmosconii@gmail.com / 12345678

## API 功能
* Swagger
  * https://ajashop.co/api-docs
    ![](https://oranwind.s3.amazonaws.com/2019/Nov/_____2019_11_13___2_08_44-1573625335159.png)

## 專案管理軟體與第三方套件
* 專案管理與通訊軟體
  * [GitHub Projects](https://github.com/ArcherHuang/e-commerce/projects/1)
  * Google 試算表
  * basecamp
* 第三方套件
  * Redis
  * Mailgun
  * Swagger
  * Node-Red
  * Stripe
  * 藍新
  * Cloudflare
  * AddThis

## Frontend Wireframe
* Ref https://github.com/ArcherHuang/e-commerce/issues/44

## Background Wireframe
* Ref https://github.com/ArcherHuang/e-commerce/issues/247

## User Flow
* Ref https://github.com/ArcherHuang/e-commerce/issues/246

## ERD
* Ref https://github.com/ArcherHuang/e-commerce/issues/34

## 開發流程
* Ref https://github.com/ArcherHuang/e-commerce/issues/30

## 功能開發狀態
### 登入登出功能
* [Complete] 使用者可以用 Email 註冊成為會員
* [Complete] 使用者無法使用重複的 Email 註冊會員
* [Complete] 使用者需可以收到帳號驗證信，成功開通帳號
* [Complete] 使用者若逾期（5min）點開帳號驗證信，將無法開通帳號
* [Complete] 使用者可以登出系統

### 忘記密碼
* [Complete] 使用者可以用所註冊的 Email 來使用忘記密碼功能
* [Complete] Email 經過後端驗證成功後，使用者可以收到忘記密碼驗證信
* [Complete] 使用者若在 5min 內點開忘記密碼驗證信，將能使用忘記密碼功能
* [Complete] 使用者若逾期 5min 點開忘記密碼驗證信，將無法使用忘記密碼功能

### 商品瀏覽功能
* [Complete] 使用者（在未登入時）可以瀏覽商品頁面
* [Complete] 使用者（在未登入時）可以透過搜尋關鍵字查詢商品
* [Complete] 使用者（在未登入時）可以透過類別瀏覽商品
* [Complete] 使用者（在未登入時）可以看到別人對於商品的評論
* [Complete] 使用者（在未登入時）可以看到 carousel 商品輪播畫面
* [Complete] 使用者（在登入時）可以看到自己喜歡過的商品
* [Complete] 使用者（在登入時）可以看到自己喜歡/取消喜歡商品
* [Complete] 使用者（在登入時）可以將商品加入/移出 wish list
* [Complete] 使用者（在登入時）可以看到自己瀏覽過的商品

### 會員功能

TDB

### 購物車功能
* [Complete] 使用者（在未登入時）可以將商品放入購物車
* [Complete] 使用者（在未登入時）可以增加/減少購物車中的商品數量（在有足夠庫存時）
* [Complete] 使用者（在未登入時）在庫存不足時，無法將商品加入購物車
* [Complete] 使用者（在未登入時）可以刪除購物車中的商品
* [Complete] 使用者（在未登入時）可以看到購物車總金額，且金額會隨著商品的數量即時變化
* [Complete] 使用者（在登入時）可以在購物車中加入/移除 coupon

### 訂單功能
* [Complete] 使用者（在未登入時）若要將購物車建立成訂單，會被導至登入畫面
* [Complete] 使用者（在登入時）可以將購物車建立成訂單
* [Complete] 使用者（在登入時）在建立訂單時可以輸入姓名、地址、電話
* [Complete] 使用者（在登入時）可以在訂單頁面取消訂單
* [Complete] 使用者（在登入時）可以在個人頁面取消訂單

### 金流功能
* [Complete] 使用者（在登入時）可以在付款前，看到訂單細節
* [Complete] 使用者（在登入時）可以在付款前，可以看到付款成功畫面
* [Complete] 使用者（在登入時）若付款失敗，將導回訂單付款前頁面

### 管理者 (admin) - 商品管理功能
* [Complete] 瀏覽所有上架商品
* [Complete] 可新增單一商品
* [To Do] 可新增多商品
* [Complete] 可修改單一商品資訊
* [Complete] 可刪除單一商品

### 管理者 (admin) - Coupon 管理功能
* [Complete] 可新增 Coupon
* [Complete] 可刪除 Coupon
* [Complete] 可取得所有 Coupon
* [Complete] 可取得單一 Coupon
* [Complete] 可修改 Coupon

### 管理者 (admin) - 訂單管理功能
* 可取得所有 Order
  * [Complete] 看到所有成立 / 取消 / 付款 / 出貨的訂單
* 可修改 Order 狀態
  * [Complete] 後台管理員可以取消訂單 / 恢復訂單
* 可修改 Order 出貨狀態
  * [Complete] 後台管理員可以出貨 / 取消出貨
* 可取得所有 Discounts
  * [Complete] 可取得單一 Discount
  * [Complete] 可新增單一 Discount
  * [Complete] 可修改單一 Discount
  * [Complete] 可刪除單一 Discount

### 管理者 (admin) - 分類管理功能
* [Complete] 可新增分類
* [Complete] 可刪除分類
* [Complete] 可取得所有分類
* [Complete] 可取得單一分類
* [Complete] 可修改分類

### 管理者 (admin) - 使用者管理功能
* [Complete] 擁有 admin 權限的帳號可以將其他使用者變更權限

### 管理者 (admin) - Dashboard 功能
* [To Do] 顯示銷售狀態
* [To Do] 顯示評論狀態

## Change Logs
* https://github.com/ArcherHuang/e-commerce/commits/master

## Contributor
* [Archer Huang](https://github.com/archerhuang)
* [Jacs](https://github.com/jacs0110)
* [Alvis Hsu](https://github.com/junchoon14)