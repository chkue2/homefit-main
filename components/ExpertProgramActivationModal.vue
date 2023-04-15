<template>
  <client-only>
    <CommonModal :header-show="false" @click-backdrop="closeActivationModal">
      <div slot="body" class="activation__container">
        <i class="activation__close" @click="closeActivationModal" />
        <div class="content__container">
          <p class="content__title">
            반갑습니다, {{ userName }} 전문가님.<br />
            홈핏 전문가 활동 안내입니다.
          </p>
          <p class="content__subject">
            홈핏 전문가로 활동하기 위해서는, 반드시 프로그램 개설을 신청하셔야
            합니다.
          </p>
          <p class="content__subject">{{ computedGuide }}</p>
          <p class="content__subject">지금 프로그램 개설을 신청하시겠어요?</p>
          <p class="activation__button--success" @click="moveToCoachProgramOn">
            지금 할게요
          </p>
          <p class="activation__button--cancel" @click="closeActivationModal">
            다음에 할게요
          </p>
        </div>
      </div>
    </CommonModal>
  </client-only>
</template>
<script>
import CommonModal from '~/components/common/CommonModal'
export default {
  name: 'ExpertProgramActivationModal',
  components: {
    CommonModal,
  },
  data() {
    return {
      userName: '',
      coachType: '',
    }
  },
  computed: {
    isArtMusic() {
      return ['ART', 'MUSIC'].includes(this.coachType)
    },
    computedGuide() {
      return this.isArtMusic
        ? '신분증 졸업(재학)증명서 등 기본서류가 미리 준비되어 있다면 10분이 채 걸리지 않습니다.'
        : '신분증, 자격증 및 수료증 이미지만 미리 준비되어 있다면 10분이 채 걸리지 않습니다.'
    },
  },
  mounted() {
    this.userName = window.homefit.user.name
    this.coachType = window.homefit.coach.coachType
  },
  methods: {
    closeActivationModal() {
      this.$emit('close-activation-modal')
    },
    moveToCoachProgramOn() {
      location.href = '/user/mypage/upload/'
    },
  },
}
</script>
<style scoped lang="scss">
@import '~/assets/scss/_index.scss';
.activation__container {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}
.activation__close {
  width: 24px;
  height: 24px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(https://dcse8twossp9.cloudfront.net/static/img/icon/close-white.svg);
  cursor: pointer;
  position: absolute;
  top: 24px;
  right: 24px;
}
.content__container {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 0 24px;
  padding-bottom: 30px;
  .content__title {
    font-size: 22px;
    font-weight: $bold;
    margin-bottom: 20px;
    color: #ffffff;
  }
  .content__subject {
    font-weight: $medium;
    color: #ffffff;
    & + .content__subject {
      margin-top: 8px;
    }
  }
  .activation__button--success {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right, #6400c8 0%, #ff7d00 100%);
    font-weight: $bold;
    color: #ffffff;
    border-radius: 12px;
    cursor: pointer;
    margin-top: 40px;
    margin-bottom: 18px;
  }
  .activation__button--cancel {
    color: #ffffff;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
