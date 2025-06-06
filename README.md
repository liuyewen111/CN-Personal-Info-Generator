# CN-Personal-Info-Generator  
基于Cloudflare Workers的中国个人信息生成器，提供符合国家标准的随机身份信息（身份证号、手机号、地址等），支持动态生成与复制功能。

## 功能特性
- **真实规范生成**  
  - 身份证号：严格遵循GB 11643-1999标准，前6位行政区划代码真实有效，日期与顺序码随机生成，校验码自动计算  
  - 手机号：基于工信部最新号段分配规则，自动识别运营商（移动/联通/电信）  
  - 地址：支持5个主要城市及下属4个行政区（如北京、上海、重庆等），生成格式为`城市+区名`  
  - 出生日期：与身份证号中的日期完全一致，确保逻辑真实性  

- **交互增强**  
  - 点击信息条目可一键复制内容（支持成功/失败状态提示）  
  - 手机号自动标注运营商归属  
  - 动态背景图片（支持自定义配置）  

- **部署便捷**  
  - 通过Cloudflare Workers一键部署  
  - 支持环境变量自定义：Logo、备案信息、背景图源等  

## 技术实现
- **核心逻辑**  
  - 行政区划代码库：内置省级/市级/区级真实代码映射  
  - 手机号段库：覆盖三大运营商主流号段（持续更新）  
  - 身份证校验码算法：基于国际标准ISO 7064 MOD 11-2  

- **UI设计**  
  - 全屏背景模糊（`backdrop-filter`）+ 动态渐变下划线标题  
  - 信息卡片点击动画（位移+背景变化）  
  - GitHub角标波浪动画  

## 快速开始
1. **部署步骤**  
   ```bash
   # 创建Cloudflare Workers项目
   # 复制_worker.js里的代码
   # 粘贴_worker.js里的代码
   # 部署

2. **环境变量配置**  
   | 变量名   | 说明                                  | 示例值                          |
   |----------|---------------------------------------|---------------------------------|
   | `IMG`    | 背景图片URL列表（用逗号分隔）        | `https://example.com/bg1.jpg,https://example.com/bg2.jpg` |
   | `ICO`    | 网站图标URL                          | `https://example.com/favicon.ico` |
   | `PNG`    | 头像图片URL                          | `https://example.com/logo.png`   |
   | `BEIAN`  | 网络备案信息（可选）                 | `备案号：沪ICP备12345678号`      |
   | `TITLE`  | 网页标题（默认："个人信息生成器"）    | `身份信息模拟器`                 |

3. **使用说明**  
   访问部署后的URL，每刷新页面生成新数据，点击信息条目可复制内容。

## 注意事项
- **数据用途声明**  
  本项目生成的个人信息**仅限技术测试、演示或合法模拟场景使用**，请勿用于任何非法用途。  
- **数据真实性说明**  
  虽然遵循国家标准格式，但所有信息均为程序随机生成，**不具备法律效力**。

## 贡献与反馈  
欢迎通过Issue提出建议或提交PR修复代码/扩展城市数据。  
如果发现行政区划代码或手机号段需要更新，请及时告知。
