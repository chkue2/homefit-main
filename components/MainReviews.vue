<template>
  <div class="container">
    <div class="title">
      <p>홈핏 후기</p>
      <span @click="moveToReviews">전체보기</span>
    </div>
    <div v-if="computedReviews.length > 0" class="reviews">
      <div class="swiper-wrapper">
        <div v-for="i in computedReviews.length" :key="i" class="swiper-slide">
          <img
            v-for="(review, index) in computedReviews[i - 1]"
            :key="index"
            :data-src="review.review.imageUrlForThumbnail"
            class="lazy"
            alt
            @click="handlerClickReviewItem(review)"
          />
        </div>
      </div>
      <i class="button reviews--next"></i>
      <i class="button reviews--prev"></i>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { isEmpty } from 'lodash'
import Swiper from 'swiper/bundle'
import '~/assets/css/swiper.min.css'

export default {
  name: 'MainReviews',
  data: () => ({
    swiper: null,
  }),
  computed: {
    ...mapState('reviews', ['imageReviews']),
    computedReviews() {
      const res = []
      if (!isEmpty(this.imageReviews)) {
        let index = 0
        for (let i = 0; i < Math.ceil(this.imageReviews.length / 3); i++) {
          res.push(this.imageReviews.slice(index, index + 3))
          index += 3
        }
      }
      return res
    },
  },
  mounted() {
    window.homefit.lazyLoadImage()
    this.$nextTick(() => {
      this.initializeSwiper()
    })
  },
  methods: {
    ...mapActions('reviews', ['openReviewDetailModal', 'setSelectedReview']),
    initializeSwiper() {
      this.swiper = new Swiper('.reviews', {
        centeredSlides: false,
        slidesPerView: 'auto',
        spaceBetween: 1,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.reviews--next',
          prevEl: '.reviews--prev',
        },
      })
    },
    moveToReviews() {
      location.href = '/f/reviews/'
    },
    handlerClickReviewItem(review) {
      this.setSelectedReview(review)
      this.openReviewDetailModal()
    },
  },
}
</script>
<style scoped lang="scss">
@import '~/assets/scss/_index.scss';
.container {
  padding: $new-padding;
  margin: $new-container-margin;
  position: relative;
}
.title {
  @include flexBox(row, space-between, center);
  margin-bottom: 12px;
  p {
    font-size: 18px;
    line-height: 18px;
    font-weight: $bold;
  }
  span {
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
  }
}
.reviews {
  overflow: hidden;
  position: relative;
  .swiper-slide {
    @include flexBox(column, center, flex-start);
    width: 106px;
    gap: 1px;
    cursor: pointer;
    img {
      width: 106px;
      height: 106px;
      object-fit: cover;
    }
  }
}
.button {
  display: block;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  &.reviews--next {
    @include defaultIcon(
      'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/expand-right-box-black.svg'
    );
    right: 0;
  }
  &.reviews--prev {
    @include defaultIcon(
      'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/expand-left-box-black.svg'
    );
    left: 0;
  }
  &.swiper-button-disabled {
    display: none;
  }
}
@media all and (max-width: 648px) {
  .container {
    padding: 0;
  }
  .title {
    padding: 0 24px;
  }
  .button {
    display: none;
  }
}
</style>
