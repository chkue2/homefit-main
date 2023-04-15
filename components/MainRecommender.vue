<template>
  <div class="main-recommender" @click="toggleMoveToSuggestModal">
    <p class="recommender-left pc">
      💌 {{ computedRecommender }}께서 회원님을 위해 <b>5,000원 할인</b>을<br />
      받을 수 있는 초대장을 보내주셨어요!
    </p>
    <p class="recommender-left mo">
      💌 {{ computedRecommender }}께서 회원님을 위해<br /><b>5,000원 할인</b>
      초대장을 보내주셨어요!
    </p>
    <p class="recommender-right"></p>
  </div>
</template>
<script>
import helpers from '@/assets/js/helpers'
import recommender from '@/assets/js/recommender'
export default {
  name: 'MainRecommender',
  props: ['recommender'],
  computed: {
    computedRecommender() {
      return `${this.recommender.name}님(${this.recommender.email.substring(
        0,
        3
      )}*)`
    },
  },
  created() {
    this.makeCookie()
  },
  methods: {
    makeCookie() {
      if (this.recommender.email === window.homefit.user.email) {
        return
      }

      recommender.makeCookie(helpers.getQueryParameter().recommender)
    },
    toggleMoveToSuggestModal() {
      this.$emit('toggle-move-to-suggest-modal')
    },
  },
}
</script>
<style scoped lang="scss">
@import '~/assets/scss/_index.scss';
.main-recommender {
  @include flexBox(row, space-between, center);
  padding: 16px 24px;
  background-color: #230f0f;
  .recommender-left {
    font-size: 14px;
    color: #ffffff;
    b {
      font-weight: $medium;
      color: #ffff00;
    }
    &.pc {
      display: block;
    }
    &.mo {
      display: none;
    }
  }
  .recommender-right {
    width: 250px;
    height: 36px;
    @include flexBox(row, center, center);
    border: 1px solid #ffffff;
    border-radius: 18px;
    cursor: pointer;
    color: #ffffff;
    font-size: 14px;
    &::before {
      content: '지금 초대 수락하고 5,000원 할인 받기';
    }
  }
}
@media all and (max-width: 648px) {
  .main-recommender {
    .recommender-left {
      &.pc {
        display: none;
      }
      &.mo {
        display: block;
      }
    }
    .recommender-right {
      width: 100px;
      height: 36px;
      &::before {
        content: '초대 수락하기';
      }
    }
  }
}
</style>
