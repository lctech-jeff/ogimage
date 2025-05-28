import { ref, computed, onMounted, watch } from 'vue'

export function useOgImage(defaultRatio = '16:9', defaultSize = 1080) {
  const ratio = ref(defaultRatio)
  const size = ref(defaultSize)
  const bgColor = ref('4285f4') // Google 藍色作為預設背景色
  const textColor = ref('ffffff') // 白色作為預設文字色
  const text = ref('') // 圖片上的文字
  const fontFamily = ref('arial') // 預設字體

  // 解析URL參數
  const parseUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const ratioParam = urlParams.get('ratio')
    const sizeParam = urlParams.get('size')
    const bgParam = urlParams.get('bg')
    const textColorParam = urlParams.get('color')
    const textParam = urlParams.get('text')
    const fontParam = urlParams.get('font')

    if (ratioParam) {
      ratio.value = ratioParam
    }
    if (sizeParam && !isNaN(parseInt(sizeParam))) {
      size.value = parseInt(sizeParam)
    }
    if (bgParam) {
      bgColor.value = bgParam.replace('#', '')
    }
    if (textColorParam) {
      textColor.value = textColorParam.replace('#', '')
    }
    if (textParam) {
      text.value = decodeURIComponent(textParam)
    }
    if (fontParam) {
      fontFamily.value = fontParam
    }
  }

  // 計算圖片URL
  const imageUrl = computed(() => {
    let url = `https://dummyimage.com/${ratio.value}x${size.value}/${bgColor.value}/${textColor.value}`
    
    if (text.value) {
      url += `&text=${encodeURIComponent(text.value)}`
    }
    
    return url
  })

  // 計算實際尺寸
  const dimensions = computed(() => {
    const [width, height] = ratio.value.split(':')
    const widthNum = parseInt(width)
    const heightNum = parseInt(height)
    
    if (widthNum > heightNum) {
      return {
        width: size.value,
        height: Math.round(size.value * (heightNum / widthNum))
      }
    } else {
      return {
        width: Math.round(size.value * (widthNum / heightNum)),
        height: size.value
      }
    }
  })

  // 更新 URL
  const updateUrl = () => {
    const url = new URL(window.location.href)
    url.searchParams.set('ratio', ratio.value)
    url.searchParams.set('size', size.value.toString())
    url.searchParams.set('bg', bgColor.value)
    url.searchParams.set('color', textColor.value)
    
    if (text.value) {
      url.searchParams.set('text', encodeURIComponent(text.value))
    } else {
      url.searchParams.delete('text')
    }
    
    url.searchParams.set('font', fontFamily.value)
    

    
    window.history.replaceState({}, '', url)
  }

  // 更新 Meta 標籤
  const updateMetaTags = () => {
    const ogImageTag = document.getElementById('og-image')
    const twitterImageTag = document.getElementById('twitter-image')
    
    if (ogImageTag) {
      ogImageTag.setAttribute('content', imageUrl.value)
    }
    
    if (twitterImageTag) {
      twitterImageTag.setAttribute('content', imageUrl.value)
    }
  }

  // 監聽比例和尺寸變化
  watch([ratio, size], () => {
    updateUrl()
    updateMetaTags()
  })

  // 在元件掛載時初始化
  onMounted(() => {
    parseUrlParams()
    updateMetaTags()
  })

  return {
    ratio,
    size,
    bgColor,
    textColor,
    text,
    fontFamily,
    imageUrl,
    dimensions,
    updateUrl,
    parseUrlParams
  }
}
