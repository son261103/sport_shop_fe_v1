<template>
  <div class="logo-slider-container bg-gradient-to-b from-transparent via-light-bg-primary/30 to-light-bg-secondary/80 dark:from-transparent dark:via-dark-bg-primary/30 dark:to-dark-bg-secondary/80">
    <div class="logo-slider-track" :style="{ transform: `translateX(${position}px)` }">
      <div 
        v-for="(logo, index) in logos" 
        :key="index" 
        class="logo-item"
        style="width: 250px; height: 150px; background: transparent;"
      >
        <img :src="logo.src" :alt="logo.alt" style="width: 100%; height: 100%; object-fit: contain;">
      </div>
      <!-- Lặp lại các logo để tạo hiệu ứng vô hạn -->
      <div 
        v-for="(logo, index) in logos" 
          :key="`dup-${index}`" 
        class="logo-item"
        style="width: 250px; height: 150px; background: transparent;"
svg      >
        <img :src="logo.src" :alt="logo.alt" style="width: 100%; height: 100%; object-fit: contain;">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoRun',
  data() {
    return {
      position: 0,
      speed:3 , 
      logos: [
        { src: '/src/assets/Nike.svg', alt: 'Nike' },
        { src: '/src/assets/adidas.svg', alt: 'Adidas' },
        { src: '/src/assets/Vans.svg', alt: 'Vans' },
        { src: '/src/assets/Chanel.svg', alt: 'Chanel' },
        { src: '/src/assets/Gucci.svg', alt: 'Gucci' },
        { src: '/src/assets/Jordan.svg', alt: 'Jordan' }
      ]
    }
  },
  mounted() {
    this.animateSlider()
  },
  methods: {
    animateSlider() {
      const calculateItemWidth = () => {
        const item = this.$el.querySelector('.logo-item');
        return item.offsetWidth + parseInt(window.getComputedStyle(item).marginRight);
      };

      const animate = () => {
        this.position -= this.speed;
        
        // Reset vị trí khi chạy hết một chu kỳ
        const totalWidth = calculateItemWidth() * this.logos.length;
        if (Math.abs(this.position) >= totalWidth) {
          this.position += totalWidth;
        }
        
        window.requestAnimationFrame(animate);
      };
      
      animate();
    }
  }
}
</script>

<style scoped>
.logo-slider-container {
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.logo-slider-track {
  display: flex;
  will-change: transform;
  gap: 90px; /* Thêm khoảng cách giữa các logo */
}
.logo-item {
  flex-shrink: 0;
  padding: 0 60px; /* Tăng padding để tạo khoảng cách */
  display: flex;
  justify-content: center;  /* Canh giữa theo chiều ngang */
  align-items: center;
}
.logo-item img {
  height: 60px;
  width: auto;
  filter: grayscale(100%);
  transition: all 0.3s ease;
  object-fit: contain;
}

.logo-item img:hover {
  filter: grayscale(0%);
  transform: scale(1.1); /* Hiệu ứng phóng to khi hover */
}

</style>