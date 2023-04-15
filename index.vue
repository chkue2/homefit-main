<template>
  <CommonNavigatorContainer now-page="home">
    <div slot="body">
      <MainRecommender
        v-if="isRecommended"
        :recommender="recommender"
        @toggle-move-to-suggest-modal="toggleMoveToSuggestModal"
      />
      <MainBanner :banners="banners" />
      <MainFindExpert />
      <MainSoHomefit
        @toggle-so-homefit-expert-modal="toggleSoHomefitExpertModal"
        @toggle-so-homefit-complaint-modal="toggleSoHomefitComplaintModal"
        @toggle-so-homefit-how-modal="toggleSoHomefitHowModal"
      />
      <MainWhyHomefit :why-homefit-contents="whyHomefits" />
      <PopularHomefit
        v-if="popularHomefits.length > 0"
        :programs="popularHomefits"
      />
      <MainReviews v-if="imageReviews.length > 0" />
      <MainTextReviews
        v-if="textReviews.length > 0"
        :reviews="textReviews"
        :total="textReviewsTotal"
      />
      <MainFeeds v-if="feeds.length > 0" :feeds="feeds" />
      <div class="main-gif">
        <img
          data-src="https://dcse8twossp9.cloudfront.net/static/img/main/720_color64_optimize35.gif"
          class="lazy"
          alt
        />
      </div>
      <div class="main-starting">
        <p
          class="text-color-move-animation"
          v-html="computedStartingText[0]"
        ></p>
        <p
          class="text-color-move-animation"
          v-html="computedStartingText[1]"
        ></p>
      </div>
      <div class="main__button" @click="toggleMoveToSuggestModal">
        찾아오는 나만의 전문가 찾기
      </div>
      <div class="main-recruit" @click="moveToRecruit">
        <img
          data-src="https://dcse8twossp9.cloudfront.net/static/img/v2/main/9-in.svg"
          class="lazy"
          alt
        />
        <div class="recruit-right">
          <p class="right-top">운동, 요가명상 지원 ></p>
          <p class="right-bottom">전문가님이신가요?</p>
        </div>
      </div>
      <Footer />
      <WhyHomefitDetailModal v-if="isDetailModal" />
      <LocationTypeModal
        v-if="isLocationTypeModal"
        :items="[
          { name: '전국의 인기 홈핏 보기', value: 1 },
          { name: '내 위치 주변으로 변경', value: 2 },
          { name: '위치 직접 변경', value: 3 },
        ]"
        @click-item="handlerClickLocationType"
      />
      <LocationSelectModal v-if="isLocationModal" />
      <WorkoutCoachProfileModal
        v-if="isWorkoutCoachProfileModal"
        :is-popular="true"
        :is-main="true"
        @select-coach="moveToPayment"
        @re-open-coach-profile-modal="reOpenCoachProfileModal"
        @toggle-coach-profile="closeCoachProfileModal"
      />
      <HobbyCoachProfileModal
        v-if="isHobbyCoachProfileModal"
        :is-popular="true"
        :is-main="true"
        @select-coach="moveToPayment"
        @toggle-coach-profile="closeCoachProfileModal"
      />
      <HomefitFeedDetailModal v-if="isFeedDetailModal" />
      <PhotoReviewOnceModal v-if="isReviewDetailModal" />
      <SoHomefitExpertModal
        v-if="isSoHomefitExpertModal"
        @toggle-move-to-suggest-modal="toggleMoveToSuggestModal"
        @close-modal="toggleSoHomefitExpertModal"
      />
      <SoHomefitComplaintModal
        v-if="isSoHomefitComplaintModal"
        @toggle-move-to-suggest-modal="toggleMoveToSuggestModal"
        @close-modal="toggleSoHomefitComplaintModal"
      />
      <SoHomefitHowModal
        v-if="isSoHomefitHowModal"
        @toggle-move-to-suggest-modal="toggleMoveToSuggestModal"
        @close-modal="toggleSoHomefitHowModal"
      />
      <MoveToSuggestModal
        v-if="isMoveToSuggestModal"
        @close-move-to-suggest-modal="toggleMoveToSuggestModal"
      />
      <ExpertProgramActivationModal
        v-if="isExpertProgramActivationModal"
        @close-activation-modal="toggleExpertProgramActivationModal"
      />
      <LessonBeforeStateModal
        v-if="isLessonBeforeStateModal"
        @close-modal="toggleLessonBeforeStateModal"
      />
      <CuriousReviewModal
        v-if="isCuriousReviewModal"
        @close-modal="toggleCuriousReviewModal"
      />
    </div>
  </CommonNavigatorContainer>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import { isEmpty } from 'lodash'
import MainReviews from '~/components/main/MainReviews'
import MainTextReviews from '~/components/main/MainTextReviews'
import orderFrom from '~/assets/js/orderFrom'
import { getOrderFromEnum } from '~/assets/js/enums/orderFromEnum'
import localStorageWithExpireTime from '~/assets/js/localStorageWithExpireTime'
import recommender from '~/assets/js/recommender'
import axiosCatchHelper from '~/assets/js/axiosCatchHelper'
export default {
  name: 'NewGeneration',
  components: {
    MainReviews,
    MainTextReviews,
    CommonNavigatorContainer: () =>
      import('~/components/common/CommonNavigatorContainer'),
    MainBanner: () => import('~/components/main/MainBanner'),
    MainRecommender: () => import('~/components/main/MainRecommender'),
    MainFindExpert: () => import('~/components/main/MainFindExpert'),
    MainSoHomefit: () => import('~/components/main/MainSoHomefit'),
    MainWhyHomefit: () => import('~/components/main/MainWhyHomefit'),
    PopularHomefit: () => import('~/components/main/PopularHomefit'),
    MainFeeds: () => import('~/components/main/MainFeeds'),
    Footer: () => import('~/components/common/CommonFooterV2'),
    WhyHomefitDetailModal: () =>
      import('~/components/why/WhyHomefitDetailModal'),
    LocationTypeModal: () => import('~/components/popular/LocationTypeModal'),
    LocationSelectModal: () =>
      import('~/components/popular/LocationSelectModal'),
    WorkoutCoachProfileModal: () =>
      import('~/components/userInfoForm/searchCoach/CoachProfileModal'),
    HobbyCoachProfileModal: () =>
      import('~/components/hobby/coach/CoachProfileModal'),
    HomefitFeedDetailModal: () =>
      import('~/components/feed/HomefitFeedDetailModal'),
    PhotoReviewOnceModal: () =>
      import('~/components/reviews/PhotoReviewOnceModal'),
    MoveToSuggestModal: () => import('~/components/common/MoveToSuggestModal'),
    ExpertProgramActivationModal: () =>
      import('~/components/main/ExpertProgramActivationModal'),
    LessonBeforeStateModal: () =>
      import('~/components/main/LessonBeforeStateModal'),
    CuriousReviewModal: () => import('~/components/main/CuriousReviewModal'),
    SoHomefitExpertModal: () => import('~/components/so/SoHomefitExpertModal'),
    SoHomefitHowModal: () => import('~/components/so/SoHomefitHowModal'),
  },
  data() {
    return {
      isMoveToSuggestModal: false,
      isExpertProgramActivationModal: false,
      isCuriousReviewModal: false,
      isRecommended: false,
      isLessonBeforeStateModal: false,
      isSoHomefitExpertModal: false,
      isSoHomefitComplaintModal: false,
      isSoHomefitHowModal: false,
      recommender: {
        name: '',
        email: '',
      },
      banners: [],
      textReviews: [],
      textReviewsTotal: 0,
      whyHomefits: [],
      popularHomefits: [],
      feeds: [],
    }
  },
  computed: {
    ...mapState('popular', [
      'isLocationTypeModal',
      'isLocationModal',
      'isWorkoutCoachProfileModal',
      'isHobbyCoachProfileModal',
    ]),
    ...mapState('why', ['isDetailModal']),
    ...mapState('feed', ['isFeedDetailModal']),
    ...mapState('reviews', ['imageReviews', 'isReviewDetailModal']),
    computedStartingText() {
      return [
        `<span>${'오직 나를 위한 시간'.split('').join('</span><span>')}</span>`,
        `<span>${'39,000원으로 시작해요!'
          .split('')
          .join('</span><span>')}</span>`,
      ]
    },
  },
  created() {
    this.fetch().then(() => {
      axios.post('/api/main/reviewImages/', { _method: 'get' }).then((r) => {
        this.setImageReviews(r.data.index.index)
      })
      axios.post('/api/main/reviews/', { _method: 'get' }).then((r) => {
        this.textReviews = r.data.index
        this.textReviewsTotal = r.data.total
      })
      axios.post('/api/main/feeds/', { _method: 'get' }).then((r) => {
        this.feeds = r.data.index
      })
    })
  },
  mounted() {
    if (
      window.homefit.user.grade === 'coach' &&
      window.homefit?.coach?.hasCoachProgramRegister === false
    ) {
      this.isExpertProgramActivationModal = true
    }

    this.isCuriousReviewModal =
      !isEmpty(
        localStorageWithExpireTime.getLocalStorageWithExpireTime('curiousModal')
      ) &&
      !isEmpty(window.homefit.user.trialProgress.followup_modal) &&
      window.homefit.user.trialProgress.followup_modal === true

    this.isLessonBeforeStateModal = !isEmpty(
      window.homefit.user.trialProgress.data
    )

    this.initializeRecommender()
  },
  methods: {
    ...mapActions('popular', [
      'handlerClickLocationType',
      'closeCoachProfileModal',
      'reOpenCoachProfileModal',
    ]),
    ...mapActions('reviews', ['setImageReviews']),
    fetch() {
      return axios.post('/api/main/', { _method: 'get' }).then((r) => {
        this.banners = r.data.mainBanners
        this.whyHomefits = r.data.homefitAtItems
        this.popularHomefits = r.data.popularHomefits
      })
    },
    initializeRecommender() {
      const recommenderFromUriQueryParameter =
        recommender.getFromUriQueryParameter()
      if (
        recommenderFromUriQueryParameter !== undefined &&
        recommenderFromUriQueryParameter !== ''
      ) {
        recommender
          .fetchDecryptedRecommender(recommenderFromUriQueryParameter)
          .then((response) => {
            recommender.setLocalStorage(recommenderFromUriQueryParameter)
            this.recommender = response.data.recommender
            this.isRecommended = true
          })
          .catch((e) => {
            axiosCatchHelper.alertIfHasMessage(e)
          })
      }
    },
    toggleMoveToSuggestModal() {
      this.isMoveToSuggestModal = !this.isMoveToSuggestModal
    },
    toggleExpertProgramActivationModal() {
      this.isExpertProgramActivationModal = !this.isExpertProgramActivationModal
    },
    moveToPayment(val) {
      const url = `/payment/${val.permalink}`
      location.href = orderFrom.appendToUriOrderFrom(
        url,
        getOrderFromEnum(val.serviceType).listings
      )
    },
    toggleCuriousReviewModal() {
      this.isCuriousReviewModal = !this.isCuriousReviewModal
    },
    toggleLessonBeforeStateModal() {
      this.isLessonBeforeStateModal = !this.isLessonBeforeStateModal
    },
    toggleSoHomefitExpertModal() {
      this.isSoHomefitExpertModal = !this.isSoHomefitExpertModal
    },
    toggleSoHomefitComplaintModal() {
      this.isSoHomefitComplaintModal = !this.isSoHomefitComplaintModal
    },
    toggleSoHomefitHowModal() {
      this.isSoHomefitHowModal = !this.isSoHomefitHowModal
    },
    moveToRecruit() {
      location.href = '/recruit/'
    },
  },
}
</script>
<style scoped lang="scss">
@import '~/assets/scss/_index.scss';
@import '~/assets/scss/animation/text_color_move.scss';
.main__button {
  height: 48px;
  line-height: 48px;
  text-align: center;
  background-color: #000000;
  border-radius: 8px;
  cursor: pointer;
  font-weight: $medium;
  color: #ffffff;
  margin: 0 24px;
}
.main-gif {
  margin-top: 36px;
  text-align: center;
  img {
    width: 240px;
    height: 240px;
  }
}
.main-starting {
  margin-bottom: 12px;
  text-align: center;
  &::v-deep {
    span {
      font-size: 18px;
      font-weight: $medium;
    }
  }
}
.main-recruit {
  @include flexBox(row, center, center);
  gap: 12px;
  margin-top: 48px;
  cursor: pointer;
  img {
    width: 30px;
    height: 36px;
    margin-bottom: 4px;
  }
  .recruit-right {
    @include flexBox(column, center, flex-start);
    gap: 4px;
    .right-top {
      font-size: 12px;
      font-weight: $light;
      line-height: 15px;
    }
    .right-bottom {
      font-weight: $medium;
      line-height: 21px;
    }
  }
}
</style>
