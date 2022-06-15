export { default as SerpContainer } from './containers/SerpContainer';
export * from './containers/SerpContainer';

export function greeting() {
  return 'Hello, there.';
}

export const settings = {
  "serp": [
    {
      "domain": "yahoo",
      "rx": "yahoo.com/(?:w*/)?search.*[&?][pq]=([^&]*)",
      "pattern": "div#main h3 a",
      "searchInputPattern": "div#sbq-wrap > #yschsp",
      "insertedRow": 1,
      "_id": "5b2bb99d3455c041f128d9ad"
    },
    {
      "domain": "bing",
      "rx": "\\.bing\\.com/search.*[&?]q=([^&]*)",
      "pattern": "#b_results>.b_algo, #b_results>li, #b_results h2 a, div[class=\"sb_tlst\"] * a",
      "searchInputPattern": "#sb_form_q",
      "insertedRow": 1,
      "_id": "5b2bb99d3455c041f128d9ac"
    },
    {
      "domain": "google",
      "rx": "^https?://(?:www\\.|encrypted\\.)?google\\.[\\w\\.]{2,6}.*",
      "pattern": ".yuRUbf > a",
      "searchInputPattern": ".gLFyf",
      "insertedRow": 2,
      "_id": "5b2bb99d3455c041f128d9ab"
    },
    {
      "domain": "naver",
      "rx": "search\\.naver\\.com/",
      "pattern": "#main_pack > div.nsite.section._nsiteBase > ul > li > dl > dt > a,#main_pack > div.nsite.section._nsiteTop > ul > li > dl > dt > a,div.sp_website ul li dl dt a.title_link",
      "searchInputPattern": "input#nx_query",
      "insertedRow": 1,
      "_id": "5b2bb99d3455c041f128d9aa"
    }
  ],
}