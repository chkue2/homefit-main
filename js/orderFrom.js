import helpers from '~/assets/js/helpers'
import { getOrderFromEnum } from '~/assets/js/enums/orderFromEnum'

export default {
  appendToUriOrderFromForPayment(baseUri, serviceType) {
    const orderFrom = helpers.getQueryParameter().orderFrom
    const { payment } = getOrderFromEnum(serviceType)
    return orderFrom
      ? helpers.getUrlWithAppendedParameterToBaseUrl(
          baseUri,
          'orderFrom',
          orderFrom
        )
      : this.appendToUriOrderFrom(baseUri, payment)
  },
  appendToUriIfHasOrderFromQueryParam(baseUri) {
    const orderFrom = helpers.getQueryParameter().orderFrom
    return orderFrom
      ? helpers.getUrlWithAppendedParameterToBaseUrl(
          baseUri,
          'orderFrom',
          orderFrom
        )
      : baseUri
  },
  appendToUriOrderFrom(baseUri, orderForm) {
    return helpers.getUrlWithAppendedParameterToBaseUrl(
      baseUri,
      'orderFrom',
      orderForm
    )
  },
}
