// TO-DO Will move RegExp to DB in the nearly future
export const isYahooRedirectUrl = (url = '') => (url ? /r\.search\.yahoo\.com/.test(url) : false);
