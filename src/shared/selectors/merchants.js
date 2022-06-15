import { createSelector } from 'reselect';
import { isYahooRedirectUrl } from '@/shared/urls';

const getUndecoratedLinks = (state, props) => {
  const { links } = props;
  return links.filter((link) => !link.getAttribute('shopback-serp'));
};

export const getStandDownNotifierStandDownAt = createSelector(
  getMerchantById,
  (merchant) => merchant && merchant.standDownAt
);

export const merchantHasCashback = createSelector(getMerchantById, (merchant) => {
  if (merchant && merchant.cashback) {
    return !!parseFloat(merchant.cashback.amount);
  }
  return false;
});

export const getMerchantOfSerpMap = createSelector(
  [getUndecoratedLinks, (state) => state],
  (links, state) => {
    const linkMerchantMaps = [];
    links.forEach((link) => {
      let url = link.getAttribute('href');
      if (isYahooRedirectUrl(url)) {
        /* Merchant url is hidden in pathname as RU=https%3A%2F%2Fglobal.rakuten.com%2Fzh-tw%2F
         * (url.pathname looks like RO=10/RU=https%3A%2F%2Fglobal.rakuten.com%2Fzh-tw%2F/RK=2)
         */
        const targetParam = new URL(url).pathname.split('/').find((path) => path.startsWith('RU='));
        if (targetParam) {
          /* Because url has been encoded, so we need to decode */
          url = decodeURIComponent(targetParam.split('=').pop());
        }
      }

      const merchant = matchMerchant(state, { url });
      // To close only when isSerpEnabled is false, and hasn't cashback
      if (
        merchant &&
        merchant.isSerpEnabled !== false &&
        merchantHasCashback(state, { id: merchant.id })
      ) {
        linkMerchantMaps.push({ link, merchant });
      }
    });
    return linkMerchantMaps;
  }
);