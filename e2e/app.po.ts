import { browser, element, by } from 'protractor';

export class LoopPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('loop-root h1')).getText();
  }
}
