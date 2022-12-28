import axios from 'axios';
import { Notify } from 'quasar';

type Metadata = {
  description: string;
  domain: string;
  images: string[] | undefined;
  title: string;
  url: string;
};

const normalizeUrl = (url: string, onlyDomain = true) => {
  url = url.trim();
  const __removeProtocol = (url: string) => url.replace(/^http(s?):\/\//, '');
  const __removeWww = (url: string) => url.replace(/^www\./, '');
  const __removeTrailingSlash = (url: string) =>
    url.endsWith('/') ? url.slice(0, -1) : url;
  const __onlyDomain = (url: string) => (onlyDomain ? url.split('/')[0] : url);

  return [url]
    .map(__removeProtocol)
    .map(__removeWww)
    .map(__removeTrailingSlash)
    .map(__onlyDomain)
    .pop() as string;
};

const isValidUrl = (url: string) => {
  url = url ? url.trim() : '';
  if (url === '') return true;

  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const isValidTime = (start: string, end: string) => {
  return start.replace(':', '').localeCompare(end.replace(':', '')) < 1;
};

const getMetadata = async (url: string) => {
  const urlString: string = url.trim();

  const response = await axios.get(
    `https://jsonlink.io/api/extract?url=${urlString}`
  );
  return response.data as Metadata;
};

const generateDefaultIcon = (url: string) => {
  if (url.includes('facebook'))
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png';
  if (url.includes('youtube'))
    return 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png';
  if (url.includes('shoppe'))
    return 'https://assets.stickpng.com/thumbs/6102dc563de48b00044eb5b3.png';
  if (url.includes('messenger'))
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/2048px-Facebook_Messenger_logo_2020.svg.png';
  return 'https://westsiderc.org/wp-content/uploads/2021/04/Website-Icon-2.png';
};

const showNotify = (type: string, message: string) => {
  let htmlMessage = '';
  if (type == 'error') {
    htmlMessage = `<div class="m-0 p-4 text-sm text-red-700 bg-red-100 rounded-lg">${message}</div>`;
  }
  if (type == 'success') {
    htmlMessage = `<div class="m-0 p-4 text-sm text-green-700 bg-green-100 rounded-lg">${message}</div>`;
  }

  Notify.create({
    html: true,
    classes: 'bg-transparent border-none shadow-none',
    message: htmlMessage,
    position: 'top-right',
    timeout: 3000,
  });
};

export default {
  normalizeUrl,
  isValidUrl,
  isValidTime,
  getMetadata,
  generateDefaultIcon,
  showNotify,
};
