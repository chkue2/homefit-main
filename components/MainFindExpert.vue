<template>
  <div class="container">
    <div class="title text-color-move-animation" v-html="computedTitle"></div>
    <div class="expert-container">
      <div class="expert-column expert-left">
        <p class="expert-title">개인 고객</p>
        <div class="expert-flex">
          <div
            v-for="expert in findExpert"
            :key="expert.name"
            class="expert-item"
            @click="moveByServiceType(expert.serviceType)"
          >
            <img :src="expert.src" />
            <span>{{ expert.name }}</span>
          </div>
        </div>
      </div>
      <div class="expert-column expert-right">
        <p class="expert-title pc">기업/단체 고객</p>
        <p class="expert-title mo">기업/단체</p>
        <div class="expert-flex">
          <div
            class="expert-item"
            @click="moveByServiceType(findGroup.serviceType)"
          >
            <img :src="findGroup.src" />
            <span class="pc">{{ findGroup.name }}</span>
            <span class="mo">{{ findGroup.nameMobile }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commonMixins from '~/assets/js/commonMixins'
export default {
  name: 'MainFindExpert',
  mixins: [commonMixins],
  data: () => ({
    findExpert: [
      {
        src: 'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/yopila-white.svg',
        name: '운동',
        serviceType: 'workout',
      },
      {
        src: 'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/art-white.svg',
        name: '미술',
        serviceType: 'art',
      },
      {
        src: 'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/medi-white.svg',
        name: '요가명상',
        serviceType: 'meditation',
      },
      {
        src: 'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/music-white.svg',
        name: '음악',
        serviceType: 'music',
      },
    ],
    findGroup: {
      src: 'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/group-white.svg',
      name: '오피스 프로그램',
      nameMobile: '오피스',
      serviceType: 'group',
    },
  }),
  computed: {
    computedTitle() {
      return `<span>${'찾아오는 나만의 전문가를 찾아보세요!'
        .split('')
        .join('</span><span>')}</span>`
    },
  },
}
</script>
<style scoped lang="scss">
@import '~/assets/scss/_index.scss';
@import '~/assets/scss/animation/text_color_move.scss';
.container {
  padding: $new-padding;
  margin: $new-container-margin;
}
.title {
  font-weight: $medium;
  text-align: center;
  margin-bottom: 24px;
  &::v-deep {
    span {
      font-size: 20px;
    }
  }
}
.expert-container {
  display: flex;
  gap: 8px;
}
.expert-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &.expert-right {
    flex: 1;
  }
}
.expert-title {
  font-weight: $medium;
}
.expert-flex {
  @include flexBox(row, center, center);
  padding: 24px;
  border-radius: 8px;
  background-color: #f5f5f5;
  gap: 48px;
}
.expert-item {
  gap: 6px;
  @include flexBox(column, center, center);
  cursor: pointer;
  img {
    width: 48px;
    height: 48px;
  }
  span {
    font-size: 14px;
    text-align: center;
    line-height: 18px;
    color: #232323;
  }
}
.pc {
  display: block;
}
.mo {
  display: none;
}
@media all and (max-width: 648px) {
  .expert-flex {
    padding: 12px;
    gap: 16px;
  }
  .expert-title {
    font-size: 14px;
  }
  .expert-item {
    img {
      width: 42px;
      height: 42px;
    }
  }
  .pc {
    display: none;
  }
  .mo {
    display: block;
  }
}
</style>
