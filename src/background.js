'use strict';

const blocksiteWithUrl = (tabId, url) => {
  const currentDomain = normalizeUrl(url);

  let openRequest = indexedDB.open('blocklearn', 10);

  openRequest.onsuccess = function (e) {
    const db = e.target.result;

    const transaction = db
      .transaction(['blocksites'], 'readonly')
      .objectStore('blocksites');

    const request = transaction.getAll();

    request.onsuccess = function () {
      const blocksites = request.result;

      const inBlocktime = (start, end) => {
        const now = new Date();
        const timeStr = `${now.getHours()}${now.getMinutes()}`;

        return (
          start.replace(':', '').localeCompare(timeStr) < 1 &&
          timeStr.localeCompare(end.replace(':', '')) < 1
        );
      };

      if (blocksites && blocksites.length > 0) {
        const blocksiteSetting = blocksites.find(
          (item) => item.url == currentDomain
        );

        if (blocksiteSetting) {
          const current = new Date();
          const dayOfWeek = current.getDay() == 0 ? 6 : current.getDay() - 1;

          if (
            blocksiteSetting.days[dayOfWeek] &&
            inBlocktime(blocksiteSetting.time.start, blocksiteSetting.time.end)
          ) {
            chrome.tabs.update(tabId, {
              url: `${chrome.runtime.getURL('index.html')}`,
            });
          }
        }
      }
    };
  };

  openRequest.onerror = function (e) {
    console.log('onerror!');
    console.dir(e);
  };
};

chrome.runtime.onInstalled.addListener(function () {});

const __removeProtocol = (url) => url.replace(/^http(s?):\/\//, '');
const __removeWww = (url) => url.replace(/^www\./, '');
const __removeTrailingSlash = (url) =>
  url.endsWith('/') ? url.slice(0, -1) : url;

const normalizeUrl = (url) =>
  [url].map(__removeProtocol).map(__removeWww).map(__removeTrailingSlash).pop();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  const url = changeInfo.pendingUrl || changeInfo.url;
  if (!url || !url.startsWith('http')) {
    return;
  }

  blocksiteWithUrl(tabId, url);
});

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  const url = details.url;
  if (!url || !url.startsWith('http')) {
    return;
  }

  blocksiteWithUrl(details.tabId, url);
});
