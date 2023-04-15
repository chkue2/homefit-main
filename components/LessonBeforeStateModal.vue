<template>
  <client-only>
    <CommonModalAutoHeight :header-show="false" @click-backdrop="closeModal">
      <div slot="body" class="before-state">
        <p class="lesson-state__title">
          {{ computedTitle }}
        </p>
        <MainLessonBeforeState
          :is-main="true"
          :main-trial-progress="mainTrialProgress"
        />
        <div class="lesson-state__bottom">
          <p class="lesson-state__detail" @click="moveToLesson">자세히 보기</p>
          <p class="lesson-state__close" @click="closeModal">닫기</p>
        </div>
      </div>
    </CommonModalAutoHeight>
  </client-only>
</template>
<script>
import { isEmpty } from 'lodash'
export default {
  name: 'LessonBeforeStateModal',
  components: {
    CommonModalAutoHeight: () =>
      import('~/components/common/CommonModalAutoHeight'),
    MainLessonBeforeState: () =>
      import('~/components/main/MainLessonBeforeState'),
  },
  data: () => ({
    learnerName: window.homefit.user.name,
    mainTrialProgress: window.homefit.user.trialProgress.data,
  }),
  computed: {
    computedTitle() {
      const isEmptyTrialProgress = isEmpty(this.mainTrialProgress)
      const searchCoachDoing =
        !isEmptyTrialProgress && this.mainTrialProgress.searchCoach === 'DOING'
      const readSubmitFormDoing =
        !isEmptyTrialProgress &&
        this.mainTrialProgress.readSubmitForm === 'DOING'
      const discussTrialDateDoing =
        !isEmptyTrialProgress &&
        this.mainTrialProgress.discussTrialDate === 'DOING'
      const PaidLessonDoing =
        !isEmptyTrialProgress && this.mainTrialProgress.paidLesson === 'DOING'

      return searchCoachDoing === true || PaidLessonDoing === true
        ? `${this.learnerName}님을 위해서 최적의 전문가를 찾고 있어요! 👀`
        : readSubmitFormDoing === true
        ? `${this.learnerName}님의 소중한 신청정보를 전문가가 검토중입니다! 🧐`
        : discussTrialDateDoing === true
        ? `체험 일정 조율을 위해 전문가가 ${this.learnerName}님께 곧 연락드려요! 🙌`
        : `${this.learnerName}님, 약속된 체험일에 만족스러운 수업 되시길 바라겠습니다! 🥰`
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    moveToLesson() {
      location.href = '/f/user/mypage/lesson/learner/'
    },
  },
}
</script>
<style scoped lang="scss">
@import '~/assets/scss/_index.scss';
.lesson-state__title {
  font-size: 22px;
  font-weight: $medium;
  word-break: keep-all;
  padding: 26px 24px 0;
}
.lesson-state__bottom {
  height: 60px;
  @include flexBox(row, space-between, center);
  background-color: #f5f5f5;
  padding: 0 24px;
  margin-top: 2px;
}
.lesson-state__detail {
  font-size: 14px;
  cursor: pointer;
}
.lesson-state__close {
  font-weight: $medium;
  cursor: pointer;
}
</style>
