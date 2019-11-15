### 1. 名稱

AJA Shop

### 2. 專案描述

AJA Shop 是一間線上家具商城，提供使用者一個舒適、值得信任的購物環境。同時也提供完整的後台系統，幫助管理者順利管理商品庫存、銷售狀況、優惠、會員狀態等等

### 3. 專案最終的核心 User Story
#### 1. 登入登出功能
* [Complete] 使用者可以用 Email 註冊成為會員
* [Complete] 使用者無法使用重複的 Email 註冊會員
* [Complete] 使用者需可以收到帳號驗證信，成功開通帳號
* [Complete] 使用者若逾期（5 min）點開帳號驗證信，將無法開通帳號
* [Complete] 使用者可以登出系統
* [Complete] 使用者可以用 facebook 登入系統

##### - 忘記密碼
* [Complete] 使用者可以用所註冊的 Email 來使用忘記密碼功能
* [Complete] Email 經過後端驗證成功後，使用者可以收到忘記密碼驗證信
* [Complete] 使用者若在 5 min 內點開忘記密碼驗證信，將能使用忘記密碼功能
* [Complete] 使用者若逾期 5 min 點開忘記密碼驗證信，將無法使用忘記密碼功能

#### 2. 商品瀏覽功能
* [Complete] 使用者（在未登入時）可以瀏覽商品清單
* [Complete] 使用者（在未登入時）可以查看商品細節
* [Complete] 使用者（在未登入時）可以透過搜尋關鍵字查詢商品（名稱）
* [Complete] 使用者（在未登入時）可以透過類別瀏覽商品
* [Complete] 使用者（在未登入時）可以看到使用者對於商品的評論
* [Complete] 使用者（在未登入時）可以分享商品至 facebook 頁面
* [Complete] 使用者（在登入時）可以看到自己收藏過的商品
* [Complete] 使用者（在登入時）可以收藏/取消收藏商品
* [Complete] 使用者（在登入時）可以評論「自己買過」的商品
* [Complete] 使用者（在登入時）可以編輯/刪除自己的評論

#### 會員功能
* [Complete] 使用者（在未登入時）點擊會員中心，會被導至登入畫面
* [Complete] 使用者（在登入時）可以查看/編輯個人資料
* [Complete] 使用者（在登入時）可以查看訂單清單
* [Complete] 使用者（在登入時）可以查看單一訂單細節，包含付款、出貨狀態等
* [Complete] 使用者（在登入時）可以取消訂單
* [Complete] 使用者（在登入時）可以瀏覽擁有的 coupon 清單與使用狀況
* [Complete] 使用者（在登入時）可以瀏覽商品收藏清單，並取消收藏
* [Complete] 使用者（在登入時）可以瀏覽自己的評論清單，編輯與刪除評論

#### 購物車功能
* [Complete] 使用者（在未登入時）可以將商品放入購物車
* [Complete] 使用者（在未登入時）可以增加/減少購物車中的商品數量（在有足夠庫存時）
* [Complete] 使用者（在未登入時）在庫存不足時，無法將商品加入購物車
* [Complete] 使用者（在未登入時）可以刪除購物車中的商品
* [Complete] 使用者（在未登入時）可以看到購物車總金額，且金額會隨著商品的數量即時變化
* [Complete] 使用者（在登入時）可以在購物車中加入/移除 coupon，並看到金額即時變化

#### 訂單功能
* [Complete] 使用者（在未登入時）若要將購物車建立成訂單，會被導至登入畫面
* [Complete] 使用者（在登入時）可以將購物車建立成訂單
* [Complete] 使用者（在登入時）在建立訂單時可以輸入姓名、地址、電話等收件者資訊
* [Complete] 使用者（在登入時）可以在個人頁面取消訂單

#### 金流功能
* [Complete] 使用者（在登入時）可以選擇付款方式（藍新金流 or Stripe）
* [Complete] 使用者（在登入時）可以在付款後，可以看到付款成功畫面

#### 管理者 (admin) - 商品管理功能
* [Complete] 瀏覽所有上架商品
* [Complete] 可新增單一商品
* [Complete] 可修改單一商品資訊
* [Complete] 可刪除單一商品

#### 管理者 (admin) - Coupon 管理功能
* [Complete] 可新增 Coupon
* [Complete] 可刪除 Coupon
* [Complete] 可取得所有 Coupon
* [Complete] 可取得單一 Coupon
* [Complete] 可修改 Coupon 細節

#### 管理者 (admin) - 訂單管理功能
* 可取得所有 Order
  * [Complete] 看到所有成立/取消/付款/出貨的訂單
* 可修改 Order 狀態
  * [Complete] 後台管理員可以取消訂單/恢復訂單
* 可修改 Order 出貨狀態
  * [Complete] 後台管理員可以出貨/取消出貨
* 可取得所有 Discounts (購物車滿額優惠)
  * [Complete] 可瀏覽所有 Discount
  * [Complete] 可新增單一 Discount
  * [Complete] 可修改單一 Discount
  * [Complete] 可取消單一 Discount

#### 管理者 (admin) - 分類管理功能
* [Complete] 可新增分類
* [Complete] 可刪除分類
* [Complete] 可取得所有分類
* [Complete] 可取得單一分類
* [Complete] 可修改分類

#### 管理者 (admin) - 使用者管理功能
* [Complete] 擁有 admin 權限的帳號可以將其他使用者變更權限

#### 管理者 (admin) - Notification
* [Complete] 可以看到商品庫存過低的通知
* [Complete] 可以看到使用者驗證逾期已被刪除的通知
* [Complete] 可以看到過期購物車已被刪除的通知
* [Complete] 可以看到成功發送 coupon 給使用者的通知

### 系統設定
* [Complete] 在使用者生日前七天，發送生日 coupon 與 email 通知
* [Complete] 每 15 min 自動刪除尚未通過驗證的使用者
* [Complete] 自動刪除過期的 coupon
* [Complete] 自動刪除閒置兩天購物車，並還原庫存
* [Complete] 自動刪除被取消兩天的訂單，並還原庫存

### 5. GitHub 連結
* https://github.com/ArcherHuang/e-commerce

### 6. 產品網址連結（推上 Heroku 或 GCP 皆可）以及一組帳號密碼

* 網址：https://ajashop.co/
* 管理者
    * 帳號: mmosconii@gmail.com
    * 密碼: 12345678
* 一般使用者
    * 帳號: user1@example.com
    * 密碼: 12345678
* 藍新金流測試卡號
    * 卡號: 4000-2211-1111-1111
    * CVC: 隨機三位數
    * 到期日: 任意一個今天之後的日期
* Stripe 測試卡號
    * 卡號: 4242-4242-4242-4242
    * CVC: 隨機三位數
    * 到期日: 任意一個今天之後的日期

### 7. 開發畢業專案最喜歡哪個部分，為什麼?

#### Archer 阿全
* 帳號註冊與忘記密碼導入 Redis
* 寄送 coupon 使用 Node-Red 與 Message Queue 
* 導入 Swagger 以協助開發人員更方便測試

#### Alvis

#### Jacs
* 順利完成購物車功能與金流串接
* 利用 Cron job 自動執行程式
* 思考商家庫存管理的問題
* 遭遇到許多前所未見的技術問題

### 8. 組員名單以及每人畢業專案部落格

* Archer 阿全
    * [部落格](https://medium.com/@archerforwork/%E5%BF%83%E5%BE%97-%E5%B0%88%E6%A1%88%E9%96%8B%E7%99%BC%E7%9A%84%E5%8F%8D%E6%80%9D-79260cf2cf7d)
* Alvis
    * [部落格]()
* Jacs
    * [部落格]()