import { LoopPage } from './app.po';

describe('loop App', () => {
  let page: LoopPage;

  beforeEach(() => {
    page = new LoopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('loop works!');
  });
});
