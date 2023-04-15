<template>
  <div class="container">
    <div class="title">
      <p>홈핏 피드</p>
      <span @click="moveToHomefitFeed">전체보기</span>
    </div>
    <div class="feeds__pc">
      <div class="feeds__column">
        <div
          v-for="(feed, index) in feeds.slice(0, 3)"
          :key="index"
          class="feeds__item"
          @click="handerClickHomefitFeed(feed)"
        >
          <img
            :data-src="feed.thumbnailUrl"
            alt
            class="feeds__img lazy"
            loading="lazy"
          />
          <div class="feeds__content">
            <p class="feeds__title">{{ feed.title }}</p>
            <p class="feeds__tag">{{ feed.category }}</p>
          </div>
        </div>
      </div>
      <div class="feeds__column">
        <div
          v-for="(feed, index) in feeds.slice(3, 6)"
          :key="index"
          class="feeds__item"
          @click="handerClickHomefitFeed(feed)"
        >
          <img :src="feed.thumbnailUrl" alt class="feeds__img" loading="lazy" />
          <div class="feeds__content">
            <p class="feeds__title">{{ feed.title }}</p>
            <p class="feeds__tag">{{ feed.category }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="feeds__mo">
      <div class="swiper-wrapper">
        <div class="swiper-slide feeds__column">
          <div
            v-for="(feed, index) in feeds.slice(0, 3)"
            :key="index"
            class="feeds__item"
            @click="handerClickHomefitFeed(feed)"
          >
            <img
              :data-src="feed.thumbnailUrl"
              alt
              class="feeds__img lazy"
              loading="lazy"
            />
            <div class="feeds__content">
              <p class="feeds__title">{{ feed.title }}</p>
              <p class="feeds__tag">{{ feed.category }}</p>
            </div>
          </div>
        </div>
        <div class="swiper-slide feeds__column">
          <div
            v-for="(feed, index) in feeds.slice(3, 6)"
            :key="index"
            class="feeds__item"
            @click="handerClickHomefitFeed(feed)"
          >
            <img
              :data-src="feed.thumbnailUrl"
              alt
              class="feeds__img lazy"
              loading="lazy"
            />
            <div class="feeds__content">
              <p class="feeds__title">{{ feed.title }}</p>
              <p class="feeds__tag">{{ feed.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.min.css'

export default {
  name: 'MainFeeds',
  props: {
    feeds: { type: Array, default: () => [] },
  },
  mounted() {
    window.homefit.lazyLoadImage()
    this.initSwiper()
  },
  methods: {
    ...mapActions('feed', ['openDetailModal']),
    initSwiper() {
      this.swiper = new Swiper('.feeds__mo', {
        spaceBetween: 24,
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
      })
    },
    moveToHomefitFeed() {
      location.href = '/f/feed/'
    },
    handerClickHomefitFeed({ id }) {
      this.openDetailModal(id)
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
  overflow: hidden;
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
.feeds__pc {
  @include flexBox(row, space-between, flex-start);
  gap: 12px;
}
.feeds__mo {
  display: none;
}
.feeds__column {
  @include flexBox(column, flex-start, flex-start);
  flex: 1;
  gap: 12px;
}
.feeds__item {
  @include flexBox(row, flex-start, flex-start);
  flex: 1;
  gap: 12px;
  cursor: pointer;
}
.feeds__img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
}
.feeds__title {
  font-size: 14px;
  line-height: 18px;
  margin-top: 4px;
  margin-bottom: 4px;
}
.feeds__tag {
  font-size: 12px;
  line-height: 18px;
  color: #555555;
}
@media all and (max-width: 648px) {
  .feeds__pc {
    display: none;
  }
  .feeds__mo {
    display: block;
  }
  .feeds__column {
    flex: none;
    gap: 12px;
    max-width: 240px;
  }
  .feeds__item {
    @include flexBox(row, flex-start, center);
    flex: 1;
    gap: 8px;
  }
  .feeds__img {
    width: 62px;
    height: 62px;
    border-radius: 8px;
  }
  .feeds__title {
    margin-top: 0;
  }
}
</style>
