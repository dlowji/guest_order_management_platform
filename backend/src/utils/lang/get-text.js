import en from './en.js';
import vi from './vi.js';

export default (lang, key) => {
  if (lang == 'vi') {
    return vi[key];
  } else {
    return en[key];
  }
};
