<template>
  <div class="container">
    <div class="title">
      <p>이럴땐 홈핏😊</p>
      <span @click="moveToWhyHomefit()">전체보기</span>
    </div>
    <div class="why">
      <div v-show="whyHomefitContents.length === 0">
        <v-skeleton-loader
          class="mx-auto"
          min-width="100%"
          max-width="600"
          min-height="200"
          type="paragraph"
        ></v-skeleton-loader>
      </div>
      <div class="swiper-wrapper">
        <div
          v-for="(program, index) in whyHomefitContents"
          :key="index"
          class="swiper-slide"
          @click="handlerClickOpenDetailModal(program)"
        >
          <img :src="program.thumb_url" alt />
          <p class="content">{{ program.title }}</p>
          <p class="category">
            {{ changeServiceType(program.service_type) }}
          </p>
        </div>
      </div>
    </div>
    <i v-show="whyHomefitContents.length > 3" class="button why--next"></i>
    <i v-show="whyHomefitContents.length > 3" class="button why--prev"></i>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Swiper from 'swiper/bundle'
import '~/assets/css/swiper.min.css'
import serviceTypeEnum from '~/assets/js/enums/serviceTypeEnum'

export default {
  name: 'MainWhyHomefit',
  props: {
    whyHomefitContents: { type: Array, default: () => [] },
  },
  data: () => ({
    serviceTypeEnum,
  }),
  watch: {
    whyHomefitContents() {
      if (this.whyHomefitContents.length === 0) {
        return
      }
      this.$nextTick(function () {
        this.initializeSwiper()
      })
    },
  },
  methods: {
    ...mapActions('why', ['openDetailModal']),
    initializeSwiper() {
      this.swiper = new Swiper('.why', {
        centeredSlides: false,
        slidesPerView: 'auto',
        spaceBetween: 8,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.why--next',
          prevEl: '.why--prev',
        },
      })
    },
    moveToWhyHomefit() {
      location.href = '/f/why/'
    },
    changeServiceType(type) {
      return serviceTypeEnum[type] ?? ''
    },
    handlerClickOpenDetailModal(program) {
      this.openDetailModal(program.id)
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
.why {
  overflow: hidden;
  margin-top: 12px;
  .swiper-slide {
    @include flexBox(column, flex-end, flex-start);
    width: 160px;
    position: relative;
    border-radius: 8px;
    cursor: pointer;
    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
    }
    .content {
      font-size: 14px;
      line-height: 18px;
      margin: 8px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .category {
      line-height: 18px;
      font-size: 12px;
      color: #555555;
      margin-bottom: 8px;
    }
  }
}
.button {
  display: block;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 41%;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
  &.why--next {
    @include defaultIcon(
      'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/expand-right-box-black.svg'
    );
    right: 0;
  }
  &.why--prev {
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
  .why {
    padding: 0 24px;
    .swiper-slide {
      width: 140px;
      img {
        height: 140px;
      }
    }
  }
  .button {
    display: none;
  }
}
</style>
