## 一、原子设计理论

由布拉德·弗罗斯特（Brad Frost）提出的一种设计方法论，它通过将界面分解为最小的组成部分，再逐步组合成更复杂的界面。

**原子设计理论是一种分层思考的思维模式，能有效指导模块化、可维护的设计系统，同时确保最终产品的质量和一致性。**

### 5 个层级

1. **原子**：最小的 UI 元素，如颜色、字体、图标等，不可再分，类似化学原子。
2. **分子**：由多个原子组合的小组件，如带标签的输入框（功能性 UI 单元）。
3. **组织**：由多个分子组成的复杂组件，如导航栏、表单等。
4. **模版**：由组织和其他组件组成的页面布局，如主列表、详情页模版。
5. **页面**：由模板加上具体内容组成的最终页面，展示设计系统的实际应用。

![原子设计示例](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image1.webp)

---

## 二、基础样式

基础样式是设计系统的基本构成元素。使用共享样式可以在需要调整时只修改样式库，设计稿会自动更新。样式库还可通过 **Design Token** 映射到前端代码，提高开发还原度。

### 1. 样式创建

- 颜色样式（Color）
- 文本样式（Text）
- 效果样式（Effect）
- 布局栅格（Layout Grid）

![样式示例](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image2.webp)

学习视频：[Variables 变量](https://www.bilibili.com/video/BV16h4y117Q7/?vd_source=6805194d4a27343808476d052f88344f)

### 2. 样式命名

- Token 定制体验示例： [Arco Design Themes](https://arco.design/themes?currentPage=1&onlyPublished=false&pageSize=9&sortBy=starCount&tag=all)

![Token 示例](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image3.webp)

---

## 三、组件

### 1. 组件类型

#### 主组件

> 在左边图层列表内显示为紫色的，图标为四个菱形组成的图形。它作为主组件，它的变化会实时同步到它所有的实例组件中，称之为父/母组件。

![主组件](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image4.webp)

#### 实例组件（实际使用）

> 通过复制主组件的元素，在左侧图层列表中显示为紫色的空心菱形。实例是主组件的引用，它会自动同步主组件的属性变化。一个主组件可以有多个实例组件，也称为子组件。

![实例组件](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image5.webp)

**实例组件有以下特点：**：

- 可以修改很多属性，比如背景色、文字内容、内间距等，**但修改的属性不会再跟着主组件同步**；
- 图层结构不可以改动，也不可以删除图层，**按删除键不会删除而是隐藏图层**；
- **内部图层尺寸不可以改**，但是实例组件整体的尺寸可以更改。
  > 使用 autolayout 可通过 padding 值调整尺寸

---

### 2. 入门 🧒🏻

#### 2.1 Auto Layout 自动布局

**尽可能的使用！**
自动布局可以自动调整组件和元素的大小和位置，并且能够处理复杂的布局需求，减少手动调整时间，提高设计过程的效率和灵活性。

![Auto Layout](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image6.mp4)

学习视频：

- [自动布局 4.0 更新介绍（Auto Layout 4.0）](https://www.bilibili.com/video/BV1bY4y1t713/?vd_source=6805194d4a27343808476d052f88344f)
- [Auto Layout 自动换行、最大最小值、最大行数、属性继承](https://www.bilibili.com/video/BV13M4y1j7MU/)

#### 2.2 搭建顺序

关于组件的搭建顺序，可以对应到前面提到的原子设计理论，粒度由小到大的方式：

- 图标、字体、尺寸、按钮、标签、徽标
- 输入框、选择器、单选、多选
- ···
- 表格、表单

当然，搭建顺序并不是绝对的，每个人有着不同的认知和习惯。但个人建议最后再处理表格和表单，因为这两个组件内涉及的元素比较多，可以避免在制作过程中出现返工的情况。

#### 2.3 开关怎么加

Figma 会自动将 **true/false、yes/no 和 on/off** 属性值识别为开关。所以大家在做变体的时候，尽可能的将只有两个属性的选项制作为开关，减少实际使用的操作流程。

![开关示例](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image7.webp)

#### 2.4 属性值顺序调整

选中组件集，在右侧的面板中可以调整属性名和属性值的显示顺序。  
从资源库调中调用的实例组件，各项属性值都会默认第一个，所以一般会**把使用频率比较大的属性值排在第一位**。

![属性值顺序](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image8.webp)

#### 2.5 属性值冲突

组件集中的每个组件，都有自己唯一的属性值，当某个组件与已有组件名冲突时，会有下图的提示。  
根据个人经验，这种冲突最常出现在画板中新增的前几个组件中，当然有时候也可能是因为误操作导致个别组件属性值错误，修改为正确的值即可。

![属性冲突](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image9.webp)

---

### 3. 进阶 🧑‍💻

#### 3.1 变体创建技巧

在创建变体前，首先把需要使用到的变体属性和值梳理清楚，比如说按钮的尺寸、类型、状态等；然后将这些内容创建至对应的组件集中；

![变体示例](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image10.webp)

基于最初的一个组件，我们可以先将状态补全（根据个人习惯也可以优先补其他的属性，例如类型）

![状态补全](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image11.webp)

复制粘贴现有的内容，然后修改其对应的**属性、值和样式**，这样我们就得到了危险色填充按钮，且「状态」完整；后续的组件同样按照此操作进行

![状态完成](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image12.mp4)

#### 3.2 图层命名

![图层命名示例1](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image13.webp)

在组件侧我们切换变体的时候也相当于替换组件，为了保证在切换的时候已修改的属性被保留（例如文本），所以要确保一个组件集内的各个组件结构和命名一致；当然每个同学都有自己独特的图层命名方式，根据自己的一套逻辑他人能看懂就行。

![图层命名示例2](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image14.webp)

图层结构与命名是否一致的区别：

![图层结构与命名是否一致的区别](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image15.mp4)

#### 3.3 组件集添加背景色

在组件搭建的过程不可避免的会产生许多组成“零件”，当通过关键词检索资源库的某个组件，会出现许多相似的结果，影响第一选择。为了避免这种情况，我们可以做的是尽可能的减少零散组件，或者为重要组件添加额外描述…

![背景色示例](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image16.webp)

还有种方法是为重要组件集添加背景色（纯色的 1%），能够在众多搜索结果中凸显出来，提高选择权重；

> 通过压低背景色的透明度，能够在不影响组件集效果的前提下，在资源库中保持区分

![背景色透明度](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image17.webp)

---

### 4. 终极技巧 🥷🏻

#### 4.1 绝对定位

在前面提到了组件中尽量的使用 autolayout，但在一些特殊的场景中，某些元素很难去应用到其中，例如下图中的 tooltip ，我们期望它始终在“禁用选项”右侧跟随移动，问题点在于如何将它放置于下拉列表的外侧。

绝对定位允许某个元素无视自动布局的限制，随意摆放位置，甚至是画板外（需要注意画板未勾选“溢出裁剪”）。

![绝对定位](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image18.webp)

##### 其他搭配

**方向约束：** 绝大多数情况绝对定位都需要搭配方向约束，例如本案例中使用了“右”，跟着容器右侧位置移动

![方向约束](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image19.webp)

![方向约束](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image20.mp4)

**0 尺寸“外壳”：** 因为给 tooltip 设置了“右”约束，会发现修改文本的时候整体向左移动，这时候我们就需要一个中转的介质—— 0 尺寸的 Frame ，为其设置“右”约束，然后给 tooltip 设置“左”约束

![尺寸外壳](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image21.mp4)

#### 4.2 Backup

Figma 有一个限制，组件内部实例不能嵌套组件自身，例如：button 中的 icon，我们不能将其替换为 button

![Backup](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image22.webp)

但在一些特殊的场景下我们仍然需要这种组合方式，例如卡片中嵌套卡片。那我们可以给该卡片复制一个
backup 备份，在实际使用中就是 card 嵌套 card-backup。

![Backup 示例](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image23.webp)

#### 4.3 绝对颜色

Figma 会识别组件之间一致的图层结构和命名，以保证替换时样式能够被继承，然而很难确保所有组件都如此。例如之前遇到的 icon 替换后颜色变更问题，主要原因就是 icon 内部各图层的名称不同。

此时给组件外加一个“合并”图层，然后赋予该图层颜色，无论“合并”里的颜色如何变化，都不会起效果

![合并图层](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image24.mp4)

“合并”图层获得方法：将两个图形进行布尔，删掉布尔后的内容元素即可

![布尔示例](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image25.webp)

---

## 四、其他注意事项

### 1. 隐藏发布

对于整个设计系统庞大的组件体量，并不是所有组件我们都需要直接使用，可以在组件命名前加上“.” 或 “\_” ，也就是英文的点或下划线，这样在发布组件库的时候 Figma 会自动屏蔽这些组件，减少冗余的元素。

这类组件大都是嵌套在其他组件内部，在我们实际使用时是没什么影响的，区别在于：**资源库无法搜索到该组件，不能主动引用**。

![隐藏组件示例](https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/figma/image27.webp)

### 2. 发布频率

在稳定阶段，组件库的维护更新频率应尽量控制在以“周”为单位（紧急问题修复除外），发布并最好附上更新内容。

> 较长的发布周期可能会积累大量的变更，一次发布涉及很多内容可能会增加风险。每周发布能确保每次发布的变更量相对较少，更易于控制和管理。
