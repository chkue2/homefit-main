const hashMap = new Map([
  ['WORKOUT', { listings: 'LISTINGS', payment: 'PAYMENT' }],
  [
    'MEDITATION',
    { listings: 'LISTINGS_MEDITATION', payment: 'PAYMENT_MEDITATION' },
  ],
  ['ART', { listings: 'LISTINGS_ART', payment: 'PAYMENT_ART' }],
  ['MUSIC', { listings: 'LISTINGS_MUSIC', payment: 'PAYMENT_MUSIC' }],
])

const getOrderFromEnum = (key) => (hashMap.has(key) ? hashMap.get(key) : '')

export { getOrderFromEnum }
