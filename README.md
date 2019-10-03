# E-Commerce

## Contents
- [簡介](#簡介)
- [環境建置與需求](#環境建置與需求)
- [軟體](#軟體)
- [clone 與安裝相依套件](#clone-與安裝相依套件)
- [修改資料庫 config 檔](#修改資料庫-config-檔)
- [資料庫設定與測試資料準備](#資料庫設定與測試資料準備)
- [執行方式](#執行方式)
- [系統網址](#系統網址)
- [功能](#功能)
- [Change Logs](#change-logs)
- [Contributor](#contributor)

## 簡介

## 環境建置與需求

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
* 請在專案的根目錄新增 `.env` 檔，以存放圖片到 `IMGUR`，其格式如下

```
// .env

REDIS_URL=
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
DEPLOY_SERVER=
EMAIL_FROM=

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

* Heroku
  * IP Address
    * https://pro-ec.herokuapp.com

## 功能

* 前台

| 編號 | URI | 說明  |
|:---:|:---:|---|


* 後台

| 編號 | URI | 說明  |
|:---:|:---:|---|


## Change Logs
* https://github.com/ArcherHuang/e-commerce/commits/master

## Contributor
* [Archer Huang](https://github.com/archerhuang)
* [Jacs](https://github.com/jacs0110)
* [Alvis Hsu](https://github.com/junchoon14)