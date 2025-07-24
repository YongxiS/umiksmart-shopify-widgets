# 快速部署指南

## 🚀 部署到 GitHub Pages

### 步骤 1：初始化 Git 仓库
```bash
git init
git add .
git commit -m "Initial Umik Smart Shopify widget setup"
```

### 步骤 2：连接到 GitHub
1. 在 GitHub 上创建新仓库：`umiksmart-shopify-widgets`
2. 运行以下命令：
```bash
git branch -M main
git remote add origin https://github.com/[你的用户名]/umiksmart-shopify-widgets.git
git push -u origin main
```

### 步骤 3：启用 GitHub Pages
1. 进入仓库 Settings > Pages
2. 将 Source 设置为 "GitHub Actions"
3. 保存设置

### 步骤 4：等待自动部署
- GitHub Actions 会自动构建和部署
- 几分钟后，你的小部件将在以下地址可用：
  `https://[你的用户名].github.io/umiksmart-shopify-widgets/`

## 🛍️ Shopify 集成代码

部署完成后，使用以下代码将小部件添加到 Shopify：

### 方法 1：直接添加到页面
```html
<div id="umik-hero-widget">
  <iframe 
    src="https://[你的用户名].github.io/umiksmart-shopify-widgets/"
    width="100%" 
    height="600px" 
    frameborder="0"
    style="border: none; overflow: hidden;"
    loading="lazy">
  </iframe>
</div>

<style>
#umik-hero-widget {
  width: 100%;
  margin: 0;
  padding: 0;
}

#umik-hero-widget iframe {
  display: block;
  width: 100%;
  min-height: 100vh;
}

@media (max-width: 768px) {
  #umik-hero-widget iframe {
    height: 80vh;
  }
}
</style>
```

### 方法 2：创建自定义 Liquid 区块
创建文件 `sections/umik-hero.liquid`：
```liquid
<div class="umik-hero-section">
  <iframe 
    src="https://[你的用户名].github.io/umiksmart-shopify-widgets/"
    width="100%" 
    height="{{ section.settings.widget_height | default: 600 }}px"
    frameborder="0"
    loading="lazy">
  </iframe>
</div>

<style>
.umik-hero-section {
  width: 100%;
  margin: 0;
  overflow: hidden;
}
</style>

{% schema %}
{
  "name": "Umik Hero Widget",
  "settings": [
    {
      "type": "number",
      "id": "widget_height",
      "label": "Widget Height (px)",
      "default": 600
    }
  ],
  "presets": [
    {
      "name": "Umik Hero Widget"
    }
  ]
}
{% endschema %}
```

## ✅ 完成检查清单

- [ ] 验证本地开发服务器运行正常
- [ ] 创建 GitHub 仓库
- [ ] 推送代码到 GitHub
- [ ] 启用 GitHub Pages
- [ ] 等待自动部署完成
- [ ] 测试生产版本
- [ ] 添加到 Shopify 店铺
- [ ] 在不同设备上测试

## 🆘 常见问题

**Q: 小部件没有显示动画？**
A: 确保 GSAP 库正确加载，检查浏览器控制台是否有错误。

**Q: 在移动设备上显示不正常？**
A: 检查 iframe 的响应式样式，调整高度设置。

**Q: 字体没有正确显示？**
A: 确认 Modern Negra 字体从 Shopify CDN 正确加载。

需要帮助？检查控制台错误或联系技术支持。
