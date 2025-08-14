import { ref } from 'vue'

export function useCartAnimation() {
  const isAnimating = ref(false)

  const animateToCart = (sourceElement: HTMLElement) => {
    if (isAnimating.value) return
    
    isAnimating.value = true
    
    // Tìm icon giỏ hàng trên header
    const cartIcon = document.querySelector('[data-cart-icon]') as HTMLElement
    if (!cartIcon) {
      isAnimating.value = false
      return
    }

    // Lấy vị trí của element nguồn và icon giỏ hàng
    const sourceRect = sourceElement.getBoundingClientRect()
    const cartRect = cartIcon.getBoundingClientRect()

    // Tạo element animation
    const animationElement = document.createElement('div')
    animationElement.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"></path>
      </svg>
    `
    
    // Style cho animation element
    Object.assign(animationElement.style, {
      position: 'fixed',
      left: `${sourceRect.left + sourceRect.width / 2}px`,
      top: `${sourceRect.top + sourceRect.height / 2}px`,
      width: '24px',
      height: '24px',
      color: '#00C897',
      backgroundColor: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0, 200, 151, 0.3)',
      zIndex: '9999',
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%) scale(1)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    })

    document.body.appendChild(animationElement)

    // Trigger animation
    requestAnimationFrame(() => {
      Object.assign(animationElement.style, {
        left: `${cartRect.left + cartRect.width / 2}px`,
        top: `${cartRect.top + cartRect.height / 2}px`,
        transform: 'translate(-50%, -50%) scale(0.5)',
        opacity: '0.8'
      })
    })

    // Animation cho icon giỏ hàng
    cartIcon.style.transform = 'scale(1.2)'
    cartIcon.style.transition = 'transform 0.2s ease-out'
    
    setTimeout(() => {
      cartIcon.style.transform = 'scale(1)'
    }, 200)

    // Cleanup sau khi animation hoàn thành
    setTimeout(() => {
      if (animationElement.parentNode) {
        animationElement.parentNode.removeChild(animationElement)
      }
      isAnimating.value = false
    }, 800)
  }

  return {
    isAnimating,
    animateToCart
  }
}