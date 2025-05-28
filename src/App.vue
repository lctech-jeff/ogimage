<script setup lang="ts">
import OgImageGenerator from './components/OgImageGenerator.vue'
</script>

<template>
  <header>
    <h1>OG Image URL 產生器</h1>
    <p>基於 URL 參數產生不同比例和樣式的 Open Graph 圖片</p>
  </header>
  <main>
    <OgImageGenerator defaultRatio="16:9" :defaultSize="1080" />
  </main>
  <footer>
    <div class="footer-content">
      <h3>使用說明</h3>
      <p>這個工具可以產生適用於社交媒體分享的 Open Graph 圖片連結。選擇參數後，直接使用產生的連結或分享連結。</p>
      
      <h4>支援的 URL 參數</h4>
      <ul>
        <li><code>ratio</code> - 圖片比例，例如 <code>16:9</code>, <code>4:3</code>, <code>1:1</code>, <code>3:4</code>, <code>9:16</code></li>
        <li><code>size</code> - 圖片尺寸，單位為像素</li>
        <li><code>bg</code> - 背景顏色，六位十六進位色碼</li>
        <li><code>color</code> - 文字顏色，六位十六進位色碼</li>
      </ul>
      
      <h4>範例 URL</h4>
      <code>?ratio=16:9&size=1080&bg=4285f4&color=ffffff</code>
    </div>
  </footer>
</template>

<style scoped>
header {
  padding: 2rem 0;
  text-align: center;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 2rem;
}

header h1 {
  margin-bottom: 0.5rem;
  color: #333;
}

header p {
  color: #666;
}

main {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}

footer {
  margin-top: 3rem;
  padding: 2rem 0;
  color: #666;
  background-color: #f9f9f9;
  border-top: 1px solid #eaeaea;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

footer h3 {
  margin-top: 0;
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

footer h4 {
  color: #333;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

footer ul {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

footer li {
  margin-bottom: 0.5rem;
}

footer code {
  background-color: #f1f1f1;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
}
</style>
