<template>
  <div class="container">
    <div class="title">
      <p>인기 홈핏😎</p>
      <span @click="moveToPopular">전체보기</span>
    </div>
    <div class="location" @click="openLocationTypeModal">전국</div>
    <div class="popular">
      <div class="swiper-wrapper">
        <div
          v-for="(program, index) in programs"
          :key="index"
          class="swiper-slide"
          @click="openCoachProfileModal(program)"
        >
          <div class="popular__gradation"></div>
          <img :data-src="program.imageUrl" class="lazy" alt />
          <p class="tag" :class="changeClass(program.type)">
            {{ program.typeCaption }}
          </p>
          <p class="content">{{ program.programTitle }}</p>
        </div>
      </div>
    </div>
    <i class="button popular--next"></i>
    <i class="button popular--prev"></i>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Swiper from 'swiper/bundle'
import '~/assets/css/swiper.min.css'

export default {
  name: 'PopularHomefit',
  props: {
    programs: { type: Array, default: () => [] },
  },
  computed: {
    ...mapState('popular', ['selectedAddress']),
  },
  watch: {
    selectedAddress: {
      deep: true,
      handler() {
        location.href = '/f/popular/'
      },
    },
  },
  mounted() {
    this.initializeSwiper()
    window.homefit.lazyLoadImage()
  },
  methods: {
    ...mapActions('popular', [
      'openLocationTypeModal',
      'openCoachProfileModal',
    ]),
    initializeSwiper() {
      this.swiper = new Swiper('.popular', {
        centeredSlides: false,
        slidesPerView: 'auto',
        spaceBetween: 8,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.popular--next',
          prevEl: '.popular--prev',
        },
      })
    },
    changeClass(x) {
      switch (x) {
        case 1:
        case 2:
        case 3:
        case 4:
          return 'workout'
        case 5:
          return 'meditation'
        case 6:
          return 'art'
        case 7:
        case 8:
          return 'music'
        default:
          return ''
      }
    },
    moveToPopular() {
      location.href = '/f/popular/'
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
.location {
  @include flexBox(row, center, center);
  display: inline-flex;
  gap: 4px;
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  color: #232323;
  border: 1px solid #e1e1e1;
  border-radius: 20px;
  cursor: pointer;
  margin: 12px 0;
  &::before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    @include defaultIcon(
      'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/location-black.svg'
    );
  }
}
.popular {
  overflow: hidden;
  .swiper-slide {
    @include flexBox(column, flex-end, flex-start);
    width: 220px;
    height: 220px;
    position: relative;
    border-radius: 8px;
    padding: 12px;
    cursor: pointer;
    .popular__gradation {
      width: 100%;
      height: 97px;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 0 0 8px 8px;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.8)
      );
      z-index: 2;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 8px;
      z-index: 1;
    }
    .tag {
      height: 20px;
      line-height: 20px;
      padding: 0 4px;
      text-align: center;
      border-radius: 4px;
      font-size: 12px;
      margin-bottom: 8px;
      position: relative;
      z-index: 3;
      &.workout {
        background-color: $workout-color;
        color: #ffffff;
      }
      &.music {
        background-color: $music-color;
      }
      &.meditation {
        background-color: $meditation-color;
      }
      &.art {
        background-color: $art-color;
      }
    }
    .content {
      color: #ffffff;
      line-height: 18px;
      font-weight: $medium;
      position: relative;
      z-index: 3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.button {
  display: block;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 63%;
  transform: translateY(-50%);
  z-index: 2;
  &.popular--next {
    @include defaultIcon(
      'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/expand-right-box-black.svg'
    );
    right: 0;
  }
  &.popular--prev {
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
  .location {
    margin-left: 24px;
  }
  .popular {
    padding: 0 24px;
    .swiper-slide {
      width: 200px;
      height: 200px;
      .popular__gradation {
        height: 88px;
      }
    }
  }
  .button {
    display: none;
  }
}
</style>
