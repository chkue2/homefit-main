<template>
  <div id="lessonBeforeState">
    <div class="container">
      <div class="item" :class="{ on: computedStatus.trialLesson.isOn }">
        <p class="column title"><i />{{ computedStatus.trialLesson.title }}</p>
        <div class="column content hidden">
          <i />
          {{ computedStatus.trialLesson.content }}
        </div>
      </div>
      <div class="item" :class="{ on: computedStatus.discussTrialDate.isOn }">
        <p class="column title">
          <i />{{ computedStatus.discussTrialDate.title }}
        </p>
        <div class="column content hidden">
          <i />
          {{ computedStatus.discussTrialDate.content }}
        </div>
      </div>
      <div class="item" :class="{ on: computedStatus.readSubmitForm.isOn }">
        <p class="column title">
          <i />{{ computedStatus.readSubmitForm.title }}
        </p>
        <div class="column content hidden">
          <i />
          {{ computedStatus.readSubmitForm.content }}
        </div>
      </div>
      <div class="item" :class="{ on: computedStatus.searchCoach.isOn }">
        <p class="column title"><i />{{ computedStatus.searchCoach.title }}</p>
        <div class="column content hidden">
          <i />
          {{ computedStatus.searchCoach.content }}
        </div>
      </div>
      <div class="item">
        <p class="column title"><i />체험 신청 완료</p>
        <div class="column content hidden">
          <i />{{ changeDateFormat(trialProgress.submittedDoneAt) }}
        </div>
      </div>
    </div>
    <div class="container background"><i class="bar" /></div>
    <LoadingModal v-if="isLoading" />
  </div>
</template>
<script>
import moment from 'moment'
import { isEmpty, cloneDeep } from 'lodash'
export default {
  name: 'MainLessonBeforeState',
  components: {
    LoadingModal: () => import('~/components/common/LoadingModal'),
  },
  props: {
    mainTrialProgress: { type: Object, default: () => {} },
  },
  data() {
    return {
      isLoading: false,
      trialProgress: {},
    }
  },
  computed: {
    computedStatus() {
      const isEmptyTrialProgress = isEmpty(this.trialProgress)
      const searchCoachDoing =
        !isEmptyTrialProgress && this.trialProgress.searchCoach === 'DOING'
      const searchCoachDone =
        !isEmptyTrialProgress && this.trialProgress.searchCoach === 'DONE'
      const readSubmitFormDoing =
        !isEmptyTrialProgress && this.trialProgress.readSubmitForm === 'DOING'
      const readSubmitFormDone =
        !isEmptyTrialProgress && this.trialProgress.readSubmitForm === 'DONE'
      const discussTrialDateDoing =
        !isEmptyTrialProgress && this.trialProgress.discussTrialDate === 'DOING'
      const discussTrialDateDone =
        !isEmptyTrialProgress && this.trialProgress.discussTrialDate === 'DONE'
      const PaidLessonDoing =
        !isEmptyTrialProgress && this.trialProgress.paidLesson === 'DOING'
      const PaidLessonDone =
        !isEmptyTrialProgress &&
        this.trialProgress.paidLesson === 'DONE' &&
        !isEmpty(this.trialProgress.paidLessonDoneAt)

      const trialLessonDoing =
        !isEmptyTrialProgress && this.trialProgress.trialLesson === 'DOING'
      const trialLessonDone =
        !isEmptyTrialProgress && this.trialProgress.trialLesson === 'DONE'

      return {
        searchCoach: {
          isOn: searchCoachDoing,
          title: searchCoachDone
            ? '전문가 매칭 완료'
            : searchCoachDoing
            ? '전문가 매칭 중'
            : '전문가 매칭',
          content: searchCoachDone
            ? this.changeDateFormat(this.trialProgress.searchCoachDoneAt)
            : '딱 맞는 전문가를 찾아드릴게요!',
        },
        readSubmitForm: {
          isOn: readSubmitFormDoing,
          title: readSubmitFormDone
            ? '신청서 확인(전문가) 완료'
            : readSubmitFormDoing
            ? '신청서 확인 중(전문가)'
            : '신청서 확인(전문가)',
          content: readSubmitFormDone
            ? this.changeDateFormat(this.trialProgress.readSubmitFormDoneAt)
            : '전문가가 회원님의 신청서를 확인합니다.',
        },
        discussTrialDate: {
          isOn: discussTrialDateDoing,
          title: discussTrialDateDone
            ? '체험 일정 조율 완료'
            : discussTrialDateDoing
            ? '체험 일정 조율 중'
            : '체험 일정 조율',
          content: discussTrialDateDone
            ? this.changeDateFormat(this.trialProgress.discussTrialDateDoneAt)
            : '전문가가 회원님께 직접 연락드릴 예정입니다.',
        },
        paidLesson: {
          hasPaidDataVersion:
            (this.trialProgress.paidLesson === 'DONE' &&
              this.trialProgress.paidLessonDoneAt === '') === false,
          isOn: PaidLessonDoing,
          title: PaidLessonDone
            ? '결제 완료'
            : PaidLessonDoing
            ? '결제 대기'
            : '결제',
          content: PaidLessonDone
            ? this.changeDateFormat(this.trialProgress.paidLessonDoneAt)
            : '결제를 완료하면 체험 수업이 확정됩니다!',
        },
        trialLesson: {
          isOn: trialLessonDoing,
          title: trialLessonDone ? '체험 수업 완료' : '체험 수업',
          content: `${
            trialLessonDone
              ? `체험 수업은 즐거우셨나요?(체험일:${this.changeDateFormat(
                  window.homefit.user.trialProgress.lessonStartDate
                )})`
              : isEmpty(window.homefit.user.trialProgress.lessonStartDate)
              ? '전문가가 체험 수업일을 확정할 예정입니다.'
              : `약속된 체험일에 만나요!(체험일:${this.changeDateFormat(
                  window.homefit.user.trialProgress.lessonStartDate
                )})`
          }`,
        },
      }
    },
  },
  created() {
    this.trialProgress = cloneDeep(this.mainTrialProgress)
  },
  methods: {
    changeDateFormat(x) {
      return x === undefined ||
        x === null ||
        x === '' ||
        x === '0000-00-00 00:00:00'
        ? ''
        : moment(x).format('YY.M.D HH:mm')
    },
  },
}
</script>
<style scoped lang="scss">
@import '~/assets/scss/_index.scss';
#lessonBeforeState {
  position: relative;
  .container {
    padding: 24px;
    position: relative;
    z-index: 2;
    .item {
      display: flex;
      flex-direction: column;
      .column {
        display: flex;
        align-items: center;
        i {
          width: 16px;
          display: flex;
          justify-content: center;
          margin-right: 6px;
          &::before {
            content: '';
            width: 8px;
            height: 8px;
            border: 1px solid #b9b9b9;
            border-radius: 50%;
            background-color: #ffffff;
            box-sizing: border-box;
          }
        }
        &.title {
          font-size: 14px;
          font-weight: $medium;
          color: #7d7d7d;
        }
        &.content {
          font-size: 12px;
          font-weight: $light;
          color: #7d7d7d;
        }
        &.hidden {
          i {
            visibility: hidden;
          }
        }
      }
      &.on {
        .column {
          i {
            &::before {
              content: '';
              width: 16px;
              height: 16px;
              border-radius: 50%;
              box-sizing: border-box;
              background: url(https://dcse8twossp9.cloudfront.net/static/img/icon/check-circle-blue.svg)
                no-repeat center/cover;
              border: none;
            }
          }
          &.title {
            color: #1973e6;
          }
        }
      }
      & + .item {
        margin-top: 12px;
      }
    }
    &.background {
      z-index: 1;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      padding-top: 35px;
      .bar {
        display: block;
        width: 2px;
        height: calc(100% - 25px);
        margin-left: 7px;
        background-color: #e1e1e1;
      }
    }
  }
}
</style>
