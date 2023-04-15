<template>
  <client-only>
    <CommonModalAutoHeight
      :header-show="false"
      @click-backdrop="handlerClickCloseModal"
    >
      <div slot="body" class="curious-review__container">
        <p class="curious-review__title">
          체험 수업은 만족하셨나요?<br />{{ learnerName }}님의 후기가 궁금해요!
          🤩
        </p>
        <div class="curious-review__buttons">
          <p class="curious-review__button color" @click="moveToReviews">
            후기 남기기
          </p>
          <p class="curious-review__button" @click="moveToLesson">
            체험 노트 확인하기
          </p>
        </div>
        <div class="curious-review__bottom">
          <p
            class="curious-review__always-close"
            @click="handlerClickAlwaysClose"
          >
            더이상 보지 않기
          </p>
          <p class="curious-review__close" @click="handlerClickCloseModal">
            닫기
          </p>
        </div>
      </div>
    </CommonModalAutoHeight>
  </client-only>
</template>
<script>
import localStorageWithExpireTime from '~/assets/js/localStorageWithExpireTime'
export default {
  name: 'CuriousReviewModal',
  components: {
    CommonModalAutoHeight: () =>
      import('~/components/common/CommonModalAutoHeight'),
  },
  data: () => ({
    learnerName: window.homefit.user.name,
  }),
  methods: {
    handlerClickCloseModal() {
      this.$emit('close-modal')
    },
    handlerClickAlwaysClose() {
      localStorageWithExpireTime.setLocalStorageWithExpireTime(
        'curiousModal',
        true,
        3600 * 60 * 60
      )
      this.handlerClickCloseModal()
    },
    moveToLesson() {
      location.href = '/f/user/mypage/lesson/learner/'
    },
    moveToReviews() {
      location.href = '/f/user/mypage/review/'
    },
  },
}
</script>
<style scoped lang="scss">
@import '~/assets/scss/_index.scss';
.curious-review__container {
  background-color: #232323;
}
.curious-review__title {
  font-size: 22px;
  font-weight: $medium;
  color: #ffffff;
  padding: 24px;
}
.curious-review__buttons {
  @include flexBox(column);
  padding: 0 24px;
  gap: 8px;
  .curious-review__button {
    flex: 1;
    width: 100%;
    height: 56px;
    line-height: 56px;
    border-radius: 12px;
    text-align: center;
    border: 1px solid #414141;
    font-weight: $medium;
    color: #ffffff;
    cursor: pointer;
    &.color {
      border: none;
      background-image: linear-gradient(to right, #6400c8 0%, #ff7d00 100%);
    }
  }
}
.curious-review__bottom {
  height: 60px;
  @include flexBox(row, space-between, center);
  background-color: #000000;
  padding: 0 24px;
  margin-top: 24px;
}
.curious-review__always-close {
  font-size: 14px;
  cursor: pointer;
  color: #ffffff;
}
.curious-review__close {
  font-weight: $medium;
  cursor: pointer;
  color: #ffffff;
}
</style>
