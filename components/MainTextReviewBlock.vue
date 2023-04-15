<template>
  <div class="vertical-box">
    <div class="vertical-top">
      <p class="vertical-rating">
        <i v-for="(i, index) in review.review.rating" :key="index"></i>
      </p>
      <p class="vertical-date">
        {{ review.review.userName }} {{ computedChangeDateFormat }}
      </p>
    </div>
    <p class="vertical-middle">
      <span v-if="computedIsBeforeAfter" class="vertical-beforeafter"
        >비포&에프터</span
      >
      <span class="vertical-program"
        >{{ review.program.serviceTypeCaption }}·{{ computedProgramTypeCaption
        }}{{ computedLessonPeriod }}</span
      >
    </p>
    <p class="vertical-content">
      {{ review.review.content }}
    </p>
    <p v-if="computedIsReply" class="vertical-reply"><i></i> 답글</p>
    <div v-if="computedImages.length > 0" class="vertical-images">
      <img v-for="(img, i) in computedImages" :key="i" :src="img" alt />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { concat } from 'lodash'
export default {
  name: 'MainTextReviewBlock',
  props: {
    review: { type: Object, default: () => {} },
  },
  computed: {
    computedChangeDateFormat() {
      return moment(this.review.review.createdAt).format('YYYY년 M월 D일')
    },
    computedIsBeforeAfter() {
      return this.review.review.type === '비포_애프터'
    },
    computedProgramTypeCaption() {
      return this.review.payment.homefitProgramType === 'TRIAL'
        ? '체험 수업'
        : '정규 수업'
    },
    computedIsReply() {
      return (
        this.review.review.expertReply !== '' ||
        this.review.review.adminReply !== ''
      )
    },
    computedImages() {
      return concat(
        this.review.review.imageUrlsForNormal,
        this.review.review.imageUrlsForBefore,
        this.review.review.imageUrlsForAfter
      )
    },
    computedLessonPeriod() {
      const lessonStartedAtMoment = moment(this.review.review.lessonStartedAt)

      if (this.review.review.isWrittenAfterLessonEnd === true) {
        return '(종료 후기)'
      }

      if (
        !this.review.review.lessonStartedAt ||
        lessonStartedAtMoment.isValid() === false
      ) {
        return ''
      }

      return `(${Math.ceil(
        moment().diff(lessonStartedAtMoment, 'months', true)
      )}개월차)`
    },
  },
}
</script>
<style scope lang="scss">
@import '~/assets/scss/_index.scss';
.vertical-box {
  width: 100%;
  .vertical-top {
    width: 100%;
    @include flexBox(row, space-between, center);
  }
  .vertical-rating {
    @include flexBox(row, flex-start, center);
    gap: 3px;
    i {
      display: block;
      width: 14px;
      height: 14px;
      @include defaultIcon(
        'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/star-yellow.svg'
      );
    }
  }
  .vertical-date {
    font-size: 12px;
    color: #7d7d7d;
  }
  .vertical-middle {
    line-height: 18px;
    margin: 8px 0;
    width: 100%;
  }
  .vertical-beforeafter {
    padding: 0 3px;
    font-size: 12px;
    color: #1973e6;
    border: 1px solid #1973e6;
    line-height: 18px;
    margin-right: 8px;
  }
  .vertical-program {
    font-size: 12px;
    color: #7d7d7d;
  }
  .vertical-content {
    font-size: 14px;
    color: #555555;
  }
  .vertical-reply {
    margin-top: 10px;
    @include flexBox(row, flex-start, center);
    font-size: 12px;
    color: #7d7d7d;
    i {
      display: block;
      width: 13px;
      height: 12px;
      @include defaultIcon(
        'https://dcse8twossp9.cloudfront.net/static/img/v2/icon/reco.svg'
      );
      margin-right: 2px;
    }
  }
  .vertical-images {
    margin-top: 8px;
    @include flexBox(row, flex-start, center);
    gap: 4px;
    overflow-x: auto;
    white-space: nowrap;
    img {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
  }
}
</style>
