# 홈핏 - 메인페이지
> [홈핏 플랫폼 메인페이지](https://homefit.co.kr/)
* Swiper.js 및 AOS.js 사용
* geolocation 활용 위치 기반 서비스 제공
* 섹션을 각각의 component로 구성
* 로딩 최적화를 위한 코드 구성
  * 최상단 컨텐츠 제외하고 나머지 컨텐츠는 비동기 호출로 최초 로딩 속도 상승
  * 이미지 컨텐츠가 많아서 lazy loading 적용으로 최초 로딩 속도 상승
