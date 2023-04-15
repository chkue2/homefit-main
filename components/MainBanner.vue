<template>
  <div>
    <div v-show="banners.length === 0" class="main-banner">
      <v-skeleton-loader
        class="mx-auto"
        min-width="100%"
        max-width="600"
        min-height="70"
        type="paragraph"
      ></v-skeleton-loader>
    </div>
    <div v-show="banners.length > 0" class="main-banner main-banner__list">
      <div class="swiper-wrapper">
        <div
          v-for="(banner, index) in banners"
          :key="index"
          class="swiper-slide"
          :class="[banner.theme]"
          :style="[{ backgroundColor: banner.backgroundColor }]"
        >
          <p
            class="main-banner__title"
            :class="{ 'main-banner__title--bold': banner.isBoldForTitle1 }"
          >
            {{ banner.title_1 }}
          </p>
          <p
            class="main-banner__title"
            :class="{ 'main-banner__title--bold': banner.isBoldForTitle2 }"
          >
            {{ banner.title_2 }}
          </p>
          <img :src="banner.imageUrlMo" />
          <span>{{ index + 1 }}/{{ banners.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { isEmpty } from 'lodash'
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.min.css'

export default {
  name: 'MainBanner',
  props: {
    banners: { type: Array, default: () => [] },
  },
  data: () => ({
    swiper: null,
  }),
  watch: {
    banners() {
      if (this.banners.length === 0) {
        return
      }
      this.$nextTick(function () {
        this.initSwiper()
      })
    },
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper('.main-banner__list', {
        spaceBetween: 8,
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        on: {
          click: (e) => {
            const index = e.realIndex
            if (
              !isEmpty(Array.from(e.clickedSlide.classList)) &&
              Array.from(e.clickedSlide.classList).includes(
                'swiper-slide-active'
              )
            ) {
              const url = this.banners[index].linkUrl
              if (!isEmpty(url)) {
                location.href = url
              }
            } else {
              this.swiper.slideToClickedSlide()
            }
          },
        },
      })
    },
  },
}
</script>
<style scoped lang="scss">
@import '~/assets/scss/_index.scss';
.main-banner {
  overflow: hidden;
  padding: 12px 24px 0;
}
.swiper-slide {
  display: block;
  width: 100%;
  max-width: 400px;
  height: 70px;
  background-color: #64a0ff;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  padding: 14px 12px;
  .main-banner__title {
    color: #000000;
    font-weight: $light;
    line-height: 21px;
    position: relative;
    z-index: 3;
    &.main-banner__title--bold {
      font-weight: $medium;
    }
  }
  &.white {
    .main-banner__title {
      color: #ffffff;
    }
  }
  img {
    width: auto;
    height: 70px;
    position: absolute;
    top: 0;
    right: 24px;
    z-index: 1;
  }
  span {
    display: inline-block;
    width: 32px;
    padding: 1px 0 0;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    font-size: 11px;
    font-weight: $light;
    text-align: center;
    position: absolute;
    bottom: 6px;
    right: 6px;
    z-index: 2;
  }
}
@media all and (max-width: 648px) {
  .main-banner {
    width: calc(100% - 24px);
    padding: 0;
    margin: 12px auto;
  }
  .swiper-slide {
    max-width: unsetd;
  }
}
</style>
