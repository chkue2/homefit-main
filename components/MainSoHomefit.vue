<template>
  <div class="container">
    <div class="title">
      <p>검증된 1위 홈핏🥇</p>
    </div>
    <div class="so">
      <div v-show="soHomefitContents.length === 0">
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
          v-for="(program, index) in soHomefitContents"
          :key="index"
          class="swiper-slide"
          @click="handlerClickOpenDetail(program)"
        >
          <div class="swiper-image">
            <picture>
              <source :srcset="program.thumbnailWebp" type="image/webp" />
              <img :data-src="program.thumbnailJpg" class="lazy" alt />
            </picture>
            <div class="swiper-shadow"></div>
            <div class="swiper-content">
              <p class="swiper-title">{{ program.title }}</p>
              <p class="swiper-subtitle">{{ program.subtitle }}</p>
            </div>
          </div>
          <p class="swiper-button">
            {{ program.button }}
          </p>
        </div>
      </div>
    </div>
    <i v-show="soHomefitContents.length > 3" class="button so--next"></i>
    <i v-show="soHomefitContents.length > 3" class="button so--prev"></i>
  </div>
</template>
<script>
import Swiper from 'swiper/bundle'
import '~/assets/css/swiper.min.css'
export default {
  name: 'MainSoHomefit',
  data: () => ({
    swiper: null,
    soHomefitContents: [],
  }),
  created() {
    this.fetchSoHomefitContents()
  },
  mounted() {
    this.initializeSwiper()
  },
  methods: {
    fetchSoHomefitContents() {
      this.soHomefitContents = [
        {
          id: 'so1',
          thumbnailWebp:
            'https://dcse8twossp9.cloudfront.net/static/img/v2/main/so-01.webp',
          thumbnailJpg:
            'https://dcse8twossp9.cloudfront.net/static/img/v2/main/so-01.jpg',
          title: '누적 수업 수 15만+',
          subtitle: '만족도 No.1 방문 트레이닝',
          button: '홈핏이 1위인 이유!',
          path: '/f/service/',
          isModal: false,
        },
        {
          id: 'so2',
          thumbnailWebp:
            'https://dcse8twossp9.cloudfront.net/static/img/v2/main/so-02.webp',
          thumbnailJpg:
            'https://dcse8twossp9.cloudfront.net/static/img/v2/main/so-02.jpg',
          title: '경력 3년+ 전문가',
          subtitle: '자격증과 지도 경력 4 step 검증',
          button: '전문가 관리는 이렇게!',
          path: 'expert',
          isModal: true,
        },
        {
          id: 'so3',
          thumbnailWebp:
            'https://dcse8twossp9.cloudfront.net/static/img/v2/main/so-03.webp',
          thumbnailJpg:
            'https://dcse8twossp9.cloudfront.net/static/img/v2/main/so-03.jpg',
          title: '혹시 문제가 생기면..?',
          subtitle: '걱정 No! 홈핏이 다 해결해 드립니다!',
          button: '불만 처리 절차 확인하기',
          path: 'complaint',
          isModal: true,
        },
        {
          id: 'so4',
          thumbnailWebp:
            'https://dcse8twossp9.cloudfront.net/static/img/v2/main/so-04.webp',
          thumbnailJpg:
            'https://dcse8twossp9.cloudfront.net/static/img/v2/main/so-04.jpg',
          title: '나를 위한 맞춤 관리',
          subtitle: '디지털 노트로 체계적인 관리 가능!',
          button: '어떻게 사용하나요?',
          path: 'how',
          isModal: true,
        },
        {
          id: 'so5',
          thumbnailWebp:
            'https://dcse8twossp9.cloudfront.net/static/img/v2/main/so-05.webp',
          thumbnailJpg:
            'https://dcse8twossp9.cloudfront.net/static/img/v2/main/so-05.jpg',
          title: '최고의 임직원 복지',
          subtitle: '임직원의 건강이 곧 회사의 경쟁력!',
          button: '기업 레슨 알아보기',
          path: '/f/group/',
          isModal: false,
        },
      ]
    },
    initializeSwiper() {
      this.swiper = new Swiper('.so', {
        centeredSlides: false,
        slidesPerView: 'auto',
        spaceBetween: 8,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.so--next',
          prevEl: '.so--prev',
        },
      })
    },
    handlerClickOpenDetail({ path, isModal }) {
      if (isModal) {
        switch (path) {
          case 'expert':
            this.$emit('toggle-so-homefit-expert-modal')
            break
          case 'complaint':
            this.$emit('toggle-so-homefit-complaint-modal')
            break
          case 'how':
            this.$emit('toggle-so-homefit-how-modal')
            break
          default:
            break
        }
      } else {
        location.href = path
      }
    },
  },
}
</script>
<style scoped lang="scss">
@import '~/assets/scss/_index.scss';
.container {
  padding: 0;
  margin: $new-container-margin;
  position: relative;
}
.title {
  @include flexBox(row, space-between, center);
  padding: 0 24px;
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
.so {
  overflow: hidden;
  margin-top: 12px;
  padding: 0 24px;
  .swiper-slide {
    @include flexBox(column, flex-end, center);
    gap: 24px;
    width: 296px;
    position: relative;
    border-radius: 8px;
    cursor: pointer;
    .swiper-image {
      width: 100%;
      position: relative;
      img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 8px;
        position: relative;
        z-index: 1;
      }
      .swiper-shadow {
        width: 100%;
        height: 120px;
        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.8)
        );
        border-radius: 0 0 8px 8px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
      }
      .swiper-content {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 24px;
        @include flexBox(column, center, center);
        gap: 4px;
        z-index: 3;
      }
      .swiper-title {
        font-size: 24px;
        font-weight: $medium;
        color: #ffffff;
        text-align: center;
      }
      .swiper-subtitle {
        font-size: 14px;
        text-align: center;
        color: #ffffff;
      }
    }
    .swiper-button {
      width: 220px;
      height: 48px;
      border: 1px solid #000000;
      border-radius: 8px;
      cursor: pointer;
      color: #000000;
      font-weight: $medium;
      text-align: center;
      line-height: 48px;
    }
  }
}
.button {
  display: block;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 43%;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
  &.so--next {
    @include defaultIcon(
      'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/expand-right-box-black.svg'
    );
    right: 0;
  }
  &.so--prev {
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
  .so {
    .swiper-slide {
      width: 100%;
      img {
        height: 240px;
      }
    }
  }
  .button {
    display: none;
  }
}
</style>
