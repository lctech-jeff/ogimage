<script setup lang="ts">
import { useOgImage } from '../composables/useOgImage'
import { ref, onMounted } from 'vue'

// 定義 props
const props = defineProps<{
  defaultRatio?: string
  defaultSize?: number
}>()

// 使用 OG Image Composable
const {
  ratio,
  size,
  bgColor,
  textColor,
  text,
  fontFamily,
  imageUrl,
  dimensions
} = useOgImage(props.defaultRatio || '16:9', props.defaultSize || 1080)

// 當前頁面 URL
const currentUrl = ref('')

// 選擇輸入框內容
const selectText = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input) {
    input.select()
  }
}

// 在組件掛載後獲取當前URL
onMounted(() => {
  currentUrl.value = window.location.href
})

// 預設比例選項
const ratioOptions = [
  { label: '16:9 (橫向)', value: '16:9' },
  { label: '4:3 (橫向)', value: '4:3' },
  { label: '1:1 (正方形)', value: '1:1' },
  { label: '3:4 (直向)', value: '3:4' },
  { label: '9:16 (直向)', value: '9:16' }
]

// 尺寸選項
const sizeOptions = [
  { label: '小 (480px)', value: 480 },
  { label: '中 (720px)', value: 720 },
  { label: '大 (1080px)', value: 1080 },
  { label: '超大 (1440px)', value: 1440 }
]

// 字體選項
const fontOptions = [
  { label: 'Arial', value: 'arial' },
  { label: 'Helvetica', value: 'helvetica' },
  { label: 'Times New Roman', value: 'times' },
  { label: 'Courier', value: 'courier' },
  { label: '微軟正黑體', value: 'microsoft-jhenghei' }
]

// 監聽參數變化
const handleRatioChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (target) {
    ratio.value = target.value
  }
}

const handleSizeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (target) {
    size.value = parseInt(target.value)
  }
}

// 處理背景顏色變化
const handleBgColorChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    bgColor.value = target.value.replace('#', '')
  }
}

const handleBgColorInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    let color = target.value
    if (!color.startsWith('#')) {
      color = '#' + color
    }
    bgColor.value = color.replace('#', '')
  }
}

// 處理文字顏色變化
const handleTextColorChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    textColor.value = target.value.replace('#', '')
  }
}

const handleTextColorInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    let color = target.value
    if (!color.startsWith('#')) {
      color = '#' + color
    }
    textColor.value = color.replace('#', '')
  }
}

// 處理文字變化
const handleTextChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    text.value = target.value
  }
}

// 處理字體變化
const handleFontChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (target) {
    fontFamily.value = target.value
  }
}


</script>

<template>
  <div class="og-image-generator">
    <h2>Open Graph 圖片產生器</h2>
    
    <div class="controls">
      <div class="control-section">
        <h3>尺寸設定</h3>
        <div class="control-row">
          <div class="control-group">
            <label for="ratio">圖片比例:</label>
            <select id="ratio" :value="ratio" @change="handleRatioChange">
              <option v-for="option in ratioOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          
          <div class="control-group">
            <label for="size">最大尺寸:</label>
            <select id="size" :value="size" @change="handleSizeChange">
              <option v-for="option in sizeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="control-section">
        <h3>顏色設定</h3>
        <div class="control-row">
          <div class="control-group">
            <label for="bgColor">背景顏色:</label>
            <div class="color-input-group">
              <input type="color" id="bgColor" :value="'#' + bgColor" @input="handleBgColorChange" />
              <input type="text" :value="'#' + bgColor" @input="handleBgColorInputChange" maxlength="7" />
            </div>
          </div>
          
          <div class="control-group">
            <label for="textColor">文字顏色:</label>
            <div class="color-input-group">
              <input type="color" id="textColor" :value="'#' + textColor" @input="handleTextColorChange" />
              <input type="text" :value="'#' + textColor" @input="handleTextColorInputChange" maxlength="7" />
            </div>
          </div>
        </div>
      </div>

      <div class="control-section">
        <h3>文字設定</h3>
        <div class="control-group full-width">
          <label for="text">圖片文字:</label>
          <input type="text" id="text" :value="text" @input="handleTextChange" placeholder="輸入顯示在圖片上的文字..." />
        </div>

        <div class="control-row">
          <div class="control-group">
            <label for="font">字體:</label>
            <select id="font" :value="fontFamily" @change="handleFontChange">
              <option v-for="option in fontOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="preview">
      <h3>圖片預覽:</h3>
      <div class="image-container">
        <img :src="imageUrl" :width="dimensions.width" :height="dimensions.height" alt="OG Image Preview" />
      </div>
    </div>

    <div class="link-info">
      <h3>連結資訊:</h3>
      <div class="info-group">
        <label>圖片網址:</label>
        <input type="text" :value="imageUrl" readonly @click="selectText" />
      </div>
      <div class="info-group">
        <label>尺寸:</label>
        <span>{{ dimensions.width }}px × {{ dimensions.height }}px</span>
      </div>
      <div class="info-group">
        <label>分享連結:</label>
        <input type="text" :value="currentUrl" readonly @click="selectText" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.og-image-generator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 25px;
}

.control-section {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #eaeaea;
}

.control-section h3 {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: #333;
}

.control-row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  min-width: 200px;
}

.control-group.full-width {
  flex-basis: 100%;
}

.color-input-group {
  display: flex;
  gap: 10px;
}

.color-input-group input[type="color"] {
  min-width: 40px;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.color-input-group input[type="text"] {
  flex: 1;
}

.control-group.checkbox {
  flex-direction: row;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

label {
  font-weight: bold;
}

select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 150px;
}

.preview {
  margin-bottom: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.image-container img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.link-info {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.info-group {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

input[readonly] {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  font-family: monospace;
  color: black;
  outline: none;
}

h2, h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
  }
}
</style>
