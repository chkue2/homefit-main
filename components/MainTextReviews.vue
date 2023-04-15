<template>
  <div id="mainTextReviews">
    <div class="reviews-vertical pc">
      <div class="vertical-container swiper-no-swiping vertical-left">
        <div class="swiper-wrapper">
          <div
            v-for="(review, index) in computedPcList.left"
            :key="index"
            class="vertical-block swiper-slide"
          >
            <MainTextReviewBlock :review="review" />
          </div>
        </div>
      </div>
      <div class="vertical-container swiper-no-swiping vertical-right">
        <div class="swiper-wrapper">
          <div
            v-for="(review, index) in computedPcList.right"
            :key="index"
            class="vertical-block swiper-slide"
          >
            <MainTextReviewBlock :review="review" />
          </div>
        </div>
      </div>
    </div>
    <div class="reviews-vertical mo">
      <div class="vertical-container swiper-no-swiping vertical-mo">
        <div class="swiper-wrapper">
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="vertical-block swiper-slide"
          >
            <MainTextReviewBlock :review="review" />
          </div>
        </div>
      </div>
    </div>
    <div class="text-reviews-gra"></div>
    <p class="text-reviews-button" @click="moveToReviewsAll">
      + {{ computedTotalCount }}개의 후기 더보기
    </p>
  </div>
</template>
<script>
import Swiper from 'swiper/bundle'
import '~/assets/css/swiper.min.css'
import MainTextReviewBlock from '~/components/main/MainTextReviewBlock'
export default {
  name: 'MainTextReviews',
  components: {
    MainTextReviewBlock,
  },
  props: {
    reviews: { type: Array, default: () => [] },
    total: { type: Number, default: 0 },
  },
  data: () => ({
    swiper: null,
    swiper2: null,
    swiper3: null,
  }),
  computed: {
    computedPcList() {
      const left = []
      const right = []

      for (let i = 0; i < this.reviews.length; i++) {
        if (i === 0 || i % 2 === 0) {
          left.push(this.reviews[i])
        } else {
          right.push(this.reviews[i])
        }
      }

      return {
        left,
        right,
      }
    },
    computedTotalCount() {
      return this.total.toLocaleString()
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeSwiper()
    })
  },
  methods: {
    initializeSwiper() {
      this.swiper = new Swiper('.vertical-left', {
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        speed: 1500,
        direction: 'vertical',
        loop: true,
        spaceBetween: 12,
        autoHeight: false,
        allowTouchMove: false,
        noSwipingClass: 'swiper-no-swiping',
      })
      this.swiper2 = new Swiper('.vertical-right', {
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        speed: 1500,
        direction: 'vertical',
        loop: true,
        spaceBetween: 12,
        autoHeight: false,
        allowTouchMove: false,
        noSwipingClass: 'swiper-no-swiping',
      })
      this.swiper3 = new Swiper('.vertical-mo', {
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        speed: 1500,
        direction: 'vertical',
        loop: true,
        spaceBetween: 12,
        autoHeight: false,
        allowTouchMove: false,
        noSwipingClass: 'swiper-no-swiping',
      })
    },
    moveToReviewsAll() {
      this.$router.push('/f/reviews/?tab=all')
    },
  },
}
</script>
<style scope lang="scss">
@import '~/assets/scss/_index.scss';
#mainTextReviews {
  position: relative;
  .reviews-vertical {
    margin-top: 25px;
    height: 480px;
    overflow: hidden;
    padding: 0 24px;
    @include flexBox(row, center, center);
    gap: 12px;
    &.pc {
      display: flex;
    }
    &.mo {
      display: none;
    }
    .vertical-container {
      height: 100%;
      flex: 1;
      .vertical-block {
        width: 100%;
        height: auto;
        padding: 12px;
        border: 8px;
        background-color: #ffffff;
        box-shadow: 0 0 10px 0 rgba(125, 125, 125, 0.1);
      }
    }
  }
  .text-reviews-gra {
    width: 100%;
    height: 100px;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
  }
  .text-reviews-button {
    width: 300px;
    height: 48px;
    line-height: 48px;
    border-radius: 24px;
    border: 1px solid;
    cursor: pointer;
    text-align: center;
    font-weight: $medium;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    background-color: #ffffff;
  }
}
@media all and (max-width: 648px) {
  #mainTextReviews {
    .reviews-vertical {
      &.pc {
        display: none;
      }
      &.mo {
        display: flex;
      }
    }
    .vertical-container {
      height: 100%;
    }
    .text-reviews-button {
      width: 200px;
    }
  }
}
</style>
