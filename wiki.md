# EUIS

## euis 文件

## 目錄

- [EUIS](#euis)
  - [euis 文件](#euis-文件)
  - [目錄](#目錄)
  - [環境](#環境)
  - [專案結構](#專案結構)
    - [資料夾結構](#資料夾結構)
    - [vue.config.js](#vueconfigjs)
    - [.browserslistrc](#browserslistrc)
    - [.eslintrc.js](#eslintrcjs)
    - [vue.config.js](#vueconfigjs-1)
    - [.env.development](#envdevelopment)
    - [.env.production](#envproduction)
  - [Assets 靜態檔案/樣式](#assets-靜態檔案樣式)
    - [svg](#svg)
    - [css·scss](#cssscss)
  - [Router 路由](#router-路由)
    - [路由結構](#路由結構)
    - [router meta 設定](#router-meta-設定)
  - [Components 元件](#components-元件)
    - [btn](#btn)
    - [charts](#charts)
    - [dialog](#dialog)
      - [Confirm](#confirm)
    - [Dialog](#dialog-1)
    - [charts](#charts-1)
    - [icons](#icons)
    - [inputs :](#inputs-)
    - [pageTool](#pagetool)
    - [table](#table)
      - [props](#props)
      - [events](#events)
      - [slots](#slots)
      - [note](#note)
      - [頁面檔說明](#頁面檔說明)
    - [tooltip](#tooltip)
    - [search](#search)
  - [Mixins 混用](#mixins-混用)
    - [autoRefresher.js](#autorefresherjs)
  - [Plugins 插件](#plugins-插件)
    - [icons.js](#iconsjs)
    - [notifier.js](#notifierjs)
    - [vuetify.js](#vuetifyjs)
  - [Store 狀態管理](#store-狀態管理)
    - [狀態管理資科夾結構](#狀態管理資科夾結構)
- [Utils 公用程式](#utils-公用程式)
    - [hansUse.js](#hansusejs)
  - [Views 頁面](#views-頁面)
    - [layouts](#layouts)
    - [application](#application)
    - [euis](#euis-1)
    - [managementToo1](#managementtoo1)
    - [selfWork](#selfwork)
    - [subprocess](#subprocess)
    - [system](#system)

---

## 環境

| 工具    | 版本     |
| ------- | -------- |
| Node.js | v12.14.0 |
| npm     | v6.13.4  |
| Vue     | v2.6.11  |

其餘設定請參考 package.json

---

## 專案結構

說明專案內主要結構,和設定檔

---

### 資料夾結構

```
src
|-- assets - 靜態資料,如圖檔、樣式檔位置
|-- components - 元件檔
|-- mixins - 混用外掛
|-- plugins - 搭配插件的全局外掛
|-- router - 路由設定
|-- services - api axios集
|-- store - vuex狀態管理檔
|-- utils - 高複用公用程式
|-- views - 主頁面組件
```

### vue.config.js

> vue-cli 主要設定檔

1. config.module.rule("svg")、config.module.rule("icons")是本專案使用 svg-sprite-loader 相依的規設定,設定內容有:

   - svg 設定:svg 檔來源 src/assets/svg 之下
   - icons 設定:專案內 icons-[filename] tag 會檢查附檔名是不是符合規定,定義
     icons-[filename]的格式

2. config.module.rule("pdf") :
   - pdf 設定:file-loader 的 pdf 檔案檢查

<br>

### .browserslistrc

> 瀏覽器限制設定:

1.  使用率>1%的瀏覽器
2.  支援該瀏覽器最新的兩個版本
3.  還存活的瀏覽器!
    <br>

### .eslintrc.js

> eslint 設定檔

1. 外掛項目:內建的基本 eslint 規則、prettier
2. 規則:

- 在 production 模式下不能有 console.log、debugger 關鍵字
- prettier 錯誤不提示

### vue.config.js

> vue-cli 主要設定檔 config.module.rule("svg")config.module.rule("icons")是本專案 svg-sprite-loader 相依設定,設定選項請參考
> svg-sprite-loader 文件

### .env.development

> 開發環境設定檔:設定 API 路連接阜等設定
> <br>

### .env.production

> 線上環境設定檔:設定 API 路、連接阜尊設定

---

## Assets 靜態檔案/樣式

assets 資料夾目前存放所有專案用圖檔和式檔

### svg

> 存放 svg icon 檔,檔請依照特定格式命名,例如:icon-name-1.svg。

### css·scss

> 存放目前頁面所有主要樣式

1. style.scss
   專案主體樣式
2. \_variables.scss
   定義樣式共用變數
   - 主要字體大小($font-size):14px
   - 標題字體大小($font-size-title):16px
   - 提示字體大小($font-size-small):12px
   - 主要字體字體顏色($font-color):#000000
   - 頁籤背景主色($tab-background-color):rgb(250,226,224)

## Router 路由

目前專案所有的路由表,路由樹會用在生成側欄導覽,
路由樹生成的方式會以 router 由 vuex 生元件,
所有外部連結均放置在 path 為"/external-link"的區塊,
router 有以下特殊設定,其他設定參數請參考 vue-router

### 路由結構

- path:"/",任意路徑下會轉址到 redirect 設定的位置
- path:"/ManagementTool",管理性工具頁面,包含儀錶板和報表類工具的群組 path : "/euis”,各種工作池的頁面,包含個人池、代理人池新契約公池,保單相關的主要工作都會以這頁面作為入口
- path : "/Subprocess",子流程頁面
- path:"/others",其它作業能面
- systemRouter 切分出來的路數,因單組資料太多,所以切出一個單檔,
  主要為各項網站及工作流程設定的頁面
- path:"/Query",查詢頁面
- path:"/external-link",外部連結的群組
  <br>

### router meta 設定

> 内部所有參數會用在生成元件、路由楼的設定,結構如下:

```
meta: {
    title: "",
    icon: "",
    env:"",
    hidden: false|true,
    breadcrumb: {
        title: "",
        disabled: false|true,
        parent: "",
    }
    isNotRoot: Boolean
}
```

> 所有自訂項目都會集中在 meta 之沒有 meta 基本上是不可以藕正常操作進入的面
> 同時不會出現在側櫚導覽內,例如 404 頁面,參數說明如下:

| 參數  | 值     | 說明                                                 |
| ----- | ------ | ---------------------------------------------------- |
| title | string | 作為文字顯示                                         |
| icon  | string | 目前是 vuetify mdi icon 為主，作爲側邊欄 icon 顯示｜ |

|env|string,null|沒有該參數,會在任意編譯環境都會生成,提供特定值會在特定環境生成,可以設定的值以 process.env.NODE_ENV 為主，如：production|
|hidden|boolean|預設是 false，true 的話不出現在側欄|
|breadcrumb|object|用於頁面快捷導覽|
|isNotRoot|boolean|children 有單一組但需做為子階層而非根目錄｜
<br>

breadcrumb 參數說明:

| 參數     | 值      | 說明                           |
| -------- | ------- | ------------------------------ |
| title    | string  | 作為文字顯示                   |
| disabled | boolean | 只會顯示但不會作為連結可被點擊 |
| parent   | string  | 指定非原父層路由作為父層節點   |

<br>

## Components 元件

放置專案元件

### btn

按鈕元件,依照不同功能且重複兩次以上的功能為基礎,如:茅點導航按鈕..等 樣式與功能可方便統一管理

### charts

圖表元件,構成方式會以一種圖表類型為一個元件,每個元件會掛載 resize mixin,
偵測使用者瀏覽器視窗縮放動作,並重新渲染圖表

### dialog

包含 Confirm 與 Dialog 兩元件，已掛載全域·
Confirm 方法傳入訊息參數,
Dialog 插槽客製内容

#### Confirm

用法

```javascript
export default {
    methods: {
        async yourMethod() {
            await this.$confirm.open({
                title:"標題",
                message:"訊息內容"
                options: {...跳窗外觀設定}
            });
        },
    },
};
```

\*open([title,message, options])
options 屬性設定:
|屬性|值|預設值|說明|
|---|--|-----|-----|
|titleIcon|string|"mdi-alert"|標題 icon|
|width|number,string|375|跳窗寛度|
|maxWidth|number,string|650|跳窗最大寛度|
|agreeText|string|"確定" | true 按鈕文字｜
|cancelText|string ｜"取消"｜ false 按鈕文字|
|showAgree|boolean|true|顯示 true 按鈕|
|showCancel|boolean|true|顯示 false 按鈕|

### Dialog

用法

```
<Dialog v-model="dialog"></Dialog>
```

```javascript
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
```

- props
  |屬性|值|預設值|說明|
  |--|----|----|
  |title|string|"TITLE"|標題|
  |width|number,string|undefined|寛度
  |maxWidth|number,string|"659|最大寛度|

- slot
  |名稱|說明|
  |----|----|
  |cardText|dialog 內容|
  |cardAction|dialog 下方，預設「確定」「取消」按鈕，分別 $emit('confirm,true/false')|

### charts

> 圖表元件,構成方式會以一種圖表類型為一個元件,每個元件會掛載 resize mixin
> 偵測使用者瀏覽器視窗縮放動作,並重新渲染圖表

### icons

> SvgIcon.vue 已掛載在全局,標名稱為`<svg-icon>`, 並提供三個 props,可供自訂,如下:
> |參數|值|說明
> |---|---|--|
> |class-list|array,string|自訂式的字串或是字串陣列 |
> |icon|string|圖形名稱|
> |append|string|文字標籤|

### inputs :

- 輸入區塊樣式

  - 微軟正黑體
  - 大標題(v-card-title)vuetify 預設大小 1.25em
  - 次標題(v-subheader)vuetify 預設大小 875em
  - 1abe1 靠左對齊(主要字體大小:14px)
  - 輸入框靠左對齊
  - 輸入內容(數字)靠右對齊,其他靠左

  - inputDate
    日期選擇器 可匹配 YYYY/MM/DD、YYYY-MM-DD、YYYY.MM.DD、YYYYMMDD

    - @param {ROC} [Boolean]民國日歷 預設 false
    - @param {(max} [string]限制選擇日期可輸入 today 或一般日期格式

  - InputDateRange.vue
    日期區間元件

    - @param {label} [string] 選擇框標題
    - @param {startDatePlaceholder} [String] 起日 placeholder 字様
    - @param {fendDatePlaceholder} [String] 迄日 placeholder 字様
    - @param {value} [Object] 日期區間值,startDate:“YYYY-MM-DD HH:mm:ss,endDate:"YYYY-MM-DD HH:mm:ss"},startDate:起日,endDate:迄日
    - @param {startDateRules}[Array] 起日規則集
    - @param {endDateRules} [Array]迄日規則集
    - @param {time} [Boolean] 是否有時間編輯
    - @param {ROC} [Boolean] 民國日曆預設 false
    - @param {required}[Boolean] 是否必填預設 false
    - @param {hasRules}[Boolean] 是否用預設規則預設 true
    - @param {hasEdge}[Boolean] 是否用預設最大最小預設 true

  - Autocomplete.vue
    輸入型態下拉選單(基底為 vuetify 元件）提供五項 props

    - @param {inputLabelSelectTypeArray}[String,Array]下拉選單資料入口
    - @param {returnDataKey} [String] 回傳對應欄位的 key 值讓資料回傳父層用
    - @param {size} [String] vuetify 元件大小設定
    - @param {isDisabled}[Boolean]設定是否為禁輸入
    - @param {dataVal} [String] 回傳對應欄位的 value 讓資料回傳父層應用

  - CheckBox.vue
    核取方塊(基底為 vuetify 元件)提供 3 項 props

    - @param {title} [String] checkbox label
    - @param {returnDataKey} [String] 回傳對應欄位的 e 直資回層用
    - @param {size} [String] vuetify 元件大小定
    - @param {isDisabled} [Boolean]設定是否禁输入
    - @param {dataVal} [String,Boolean,Array] 回傳對欄位 value 直讓資料回傳父層做應用

  - Input.vue
    輸入框(基底為 vuetify 元件)提供 6 項 props

    - @param {returnDataKey} [String] 回傳對應欄的 key 直讓資料回傳
    - @param {size} [String] vuetify 元件大小設定
    - @param {isDisabled}[Boolean] 設定是否為禁輸人
    - @param {dataVal} [String] 回傳對應 value ,讓資料回傳父層做應用
    - @param {inlineStyle} [String] inline css 樣式特別設定
    - @param {outerIcon} [String] 顯示 icon

  - Select.vue
    下拉選單(基底為 vuetify 元件)提供 6 項 props

    - @param {inputLabelSelectTypeArray}[String,Array]下拉選單資料入口
    - @param {returnDataKey} [String] 回傳對應欄 key 資料
    - @param {size} [String] vuetify 元件大小設定
    - @param {isDisabled}[Boolean]設定是否為禁止輸入
    - @param {dataVal} [String] 回傳對應欄 value 直資料層應
    - @param {isAutocomplete} [Boolean]切換為輸入型下拉選單

  - TextArea.vue
    可招行輸入框(基底為 vuetify 元件)提供 6 項 props

    - @param {returnDataKey} [String]回傳對應欄的 key 直讓資料回層應用
    - @param {size} [String] vuetify 元件大小設定
    - @param {isDisabled}[Boolean]設定是否為禁止輸入
    - @param {dataVal} [String] 回傳對應 value 直,讓資料回傳父層應用
    - @param {inlineStyle} [String] inline css 樣式特別設定
    - @param {label} [String]顯示欄位

  - InputCombobox.vue
    下拉清單複選
    - @param {value}[Array]值
    - @param {items} [Array]選項,[{text:"", value: ""}
    - @param {label} [String]顯示欄位
    - @param {required} [Boolean] 是否必填預設 false
    - @param {rules}[Array]規則集

### pageTool

- Breadcrumb.vue
  頁面快捷導覽列,提供 3 項 props
- @param {title}[String]導覽連結顯示名稱
- @param {disabled}[boolean] 該層路由可否跳轉
- @param {parent}[String] 指定上層的路由・children 内不必指定路由表內對應的層路由名稱

- IconLegend.vue
  圖例元件,做 icon 顯示及測試

- pageToolbar.vue
  頁面標題文字元件,以路由的 meta.title 為主

| 参數     | 值                          | 說明｜                                                   |
| -------- | --------------------------- | -------------------------------------------------------- |
| title    | array,string ｜導覽顯示名稱 |
| disabled | boolean                     | 該層路由可跳轉                                           |
| parent   | string                      | 指定上層的路由,children 内必指定路由表内對應的層路由名稱 |

 <br>

2. IconLegend.vue
   > 圖例元件,做 icon 顯示及測試

### table

vuetify data-table 封裝元件,已掛載在全局·
包合 select、expand、fixed 功能

- select & expand --> props
- fixed --> headers (...,fixed: boolean]為減少 td render 跳動,可固定寬度

#### props

| Name            | Type          | Default | desc                                                                                                                    |
| --------------- | ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| headers         | Array         | []      | {...vuetify headers,fixed?: boolean,textAreaEditable?: boolean,}[] (1) fixed 固定該欄（2）textAreaEditable 行內編輯跳窗 |
| dataList        | Array         | []      | {...items,inlineReadonly?:boolean} [] \*inlineReadonly 該列唯讀                                                         |
| height          | String,Number | "auto"  | height:'auto' 去除高度                                                                                                  |
| showSelect      | Boolean       | false   | 是否有 select                                                                                                           |
| hasHeaderSelect | Boolean       | false   | header 是否要有 selectAll                                                                                               |
| selectedList    | Array         | null    | select 的預設,item[]                                                                                                    |
| show            | Boolean       | false   | table 的擴展面板                                                                                                        |
| singleExpand    | Boolean       | false   | 是否僅能擴展單一面板                                                                                                    |
| itemKey         | String        | 'id'    | table item 的 key,不可重複                                                                                              |
| showPage        | Boolean       | false   | 分頁,true 會顯示 vuetify 預設分頁                                                                                       |
| border          | Boolean       | true    | 主 table 邊框,不含子 table(.c-table 邊框,不含 .c-sub-table)                                                             |
| hasRowClick     | Boolean       | true    | 開啟 @click:row 事件,預設 true(當有 inline 編輯時須期關閉)                                                              |
| hideInputDetail | Boolean       | true    | table 有输入框時,是否隱藏输入框提示訊息                                                                                 |

#### events

| Name     | desc                                       |
| -------- | ------------------------------------------ |
| selected | emit selected items                        |
| rowClick | hasRowClick-true(props 時 emit 該欄位資料) |

#### slots

| Name              | desc                                                      | e.g.            |
| ----------------- | --------------------------------------------------------- | --------------- |
| top               | table 上方 {slotProps:{...同 vuetify#top}                 | NoteList.vue    |
| footer            | table 下方{...同 vuetify#footer                           | NoteList.vue    |
| 擴展面板          | {parentItem ,parentIndex ,closeExpand:(item,key) => void} | UnionInform.vue |
| [\itemName\]      | 特定欄位的 slot {item} #actions="{item}"                  | NoteList.vue    |
| tableHeaderSelect | header selectA11 的欄位                                   | CheckList.vue   |

#### note

- pagination 在 showPage 會顯示 vuetify 預設分頁,功能待完善
- @click:row 事件 , showExpand 會優先於 Select

#### 頁面檔說明

@/components/table/

- index.vue
- table 元件
- TableToolbar (optional)
- \#top 元件
- TableFooter (optional)
- \#footer 元件
- directives/tableState.js
- directive 主要用於 table column sticky 的 addClass & 計算 left 距離

@/assets/scss/

- \_table.scss
- table style

### tooltip

- TooltipInputLabel.vue
  欄位提示(基底為 vuetify)提供 5 項 props

- @param {label} [String] 顯示欄位
- @param {showAll} [string] 是否顯示全部宇數
- @param {inlineStyle} [String] inline css 様式特別設定
- @param {limit} [Number]限制欄位字數
- @param {inlineClass} [string] inline css class 樣式特別設定

### search

- SearchForm,vue
  查詢表單,預設查詢與重設按鈕
  直詢點擊檢查(1)是否有效(2)請填入任一查詢條件,未通過以 notifier 提示

- props
  @param { configs } Object SearchForm 的基礎設定・層性如下表:

| Property     | Type             | Desc                                                                                                                   | Default    |
| ------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------- |
| invalid      | Object           | 表单檢查為 invalid 跳出 notifier 提示,可傳入息內客典 notifier 颜色                                                     | 預設件\*｜ |
| empty        | Object           | 表單查詢條件為空 跳出 notifier 提示,可傅入訊息内容與 notifier 顏色:屬性 allowed:true 允許空值(預設 false）｜預設見＊｜ |
| actions      | Object[]         | 表单下方 actions 區的按設置(除「查詢」與「重設」),傳入参數見＊＊。                                                     | [])        |
| actionsOrder | "first"\| "last" | 若有 prop actions 或景 s1ot actions,其區塊位置在「查詢」與「重設」按妞前方或後方的設定                                 | "first"    |

\* configs default setting:

```
{
    invalid: {
        message:"查詢條件格式不符,請重新输入",
        color:"warming-module"
    },
    empty:{
        message:"請填入任一查詢條件!"
        color:"warming-module"
        allowed: false
    },
    actions: [],
    actionsOrder: "first",
}

```

\*\*

```
actions: [
    {
        text:"按鈕名稱",
        event:"emit事件名稱",
        class: "class名稱"
    }
]
```

- events

| Name               | desc                               |
| ------------------ | ---------------------------------- |
| query              | 通過查詢的按鈕検查 emit query 事件 |
| \[actions.event]\] | action 按鈕自定義 emit 事件        |

- slots
  [Name|desc|
  |----|----|
  ||表預設 slot|
  |actions|表單下方 actions 區,可透 actionsOrder 設定和「查詢」重設」區的相對位置!

---

## Mixins 混用

存放專案內 mixins 資料夾

### autoRefresher.js

頁面一定時間後會刷新,並循環執行傳入的方法
插入本混用後在需要的時機呼叫 this.executeRefresher()
this.executeRefresher 有兩項參數
this.executeRefresher([...function],number)

- 參數說明:

1. [...function]: 要執行的方法名稱或方法名稱陣列
2. number:填入的數值為分鐘數

- 使用範例:

```
created() {
    this.executeRefresher([this.a,this.b],30); //執行一種以上方法
    this.executeRefresher(this.a,30); //只執行一種方法
}
```

## Plugins 插件

全局掛載的外掛插件

### icons.js

> 搭配 svg-sprite-loader 載入 svg 檔
> 一次性匯入所有 svg,
> 並掛戴全局的 SvgIcon 元件,元件會根據傳入的名稱對應到匯入的檔名

### notifier.js

全局註冊提示訊息元件,利用 vuetify snackbar 動作

- 使用方式

```
this.＄notifier.showMessage({
message: "This is notify",
color: "warming-module",
});

```

| 屬性    | 資料類型 | 說明                                               |
| ------- | -------- | -------------------------------------------------- |
| message | string   | 要示的文字                                         |
| color   | string   | 提示框背景色 ,参數請参考 vuetify.js 設定的全域變數 |

### vuetify.js

> 建立 vuetify 及相關套件 vuetify 集成,
> 目前有定義全局變數和主题色,
> 綁定預設 icon 的套件

## Store 狀態管理

index.js 為 vuex 集成,getters.js 檔 將 vuex 內所有變數曝露出来,
modules 資料夾內放置所有相依功能區分的狀態管理,
index.js 會自動抓取 modules 資料夾內所有檔案,
免去手動 import 並新增進 modules 變數

### 狀態管理資科夾結構

```
store
|  index.js
|  ...
|
|--modules
  |   a.js
  |
  |--features
  |     fn.mods.js
```

上面資料夾結構轉換的 modules 物件:

modules = {
a,
feature/fn.mods
}

# Utils 公用程式

共用工具程式

### hansUse.js

- 目前只在 prototype 生成假資料的工具
-

## Views 頁面

專案主要頁面

### layouts

- 網站框架元件,包含導覽列、側機等主體元件
-

### application

### euis

- PersonalPoo1:個人池頁面
- PublicPool:公池頁面
- Agentpool:代理人池頁面

### managementToo1

- dashboard:案件總管理頁面
- managementReport:報表資料頁面

### selfWork

### subprocess

- 照會碼作業頁面

### system

> 網站、人員、資料設定頁面

- ReviewSetting
