/* eslint-disable */

// More info
// https://hackernoon.com/jest-for-all-episode-1-vue-js-d616bccbe186

// import pretty from 'pretty';
import toDiffableHtml from 'diffable-html';

// import * as cheerio from 'cheerio';
//
// function removeVueSpecificMarkup(content) {
//   const $ = cheerio.load(content, {
//     normalizeWhitespace: true,
//     xmlMode: true,
//   });
//   $('*').each((_, element) => {
//     const attribs = Object.keys(element.attribs)
//       .filter(attr => !(attr.startsWith('data-server-rendered')))
//       .reduce((all, next) => {
//         return Object.assign(all, { [next]: element.attribs[next] });
//       }, {});
//     element.attribs = attribs;
//   });
//   return $.html();
// }

const componentFixtureSerializer = {
  test(object) {
    return (object.$el || (object.constructor && object.constructor.name === 'VueWrapper'));
  },
  print(val) {
    let element;
    if ((val.constructor && val.constructor.name === 'VueWrapper')) {
      element = val.vm.$el;
    } else {
      element = val.$el;
    }
    let html = element.outerHTML;
    // html = removeVueSpecificMarkup(html);
    // const prettyHtml = pretty(html, { ocd: true });
    const prettyHtml = toDiffableHtml(html);
    return prettyHtml;
  },
};

export default componentFixtureSerializer;
