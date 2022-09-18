import {TextTitleCasePipe} from "./title-case.pipe";

describe('textTitleCasePipe', () => {
  it('create an instance', () => {
    const pipe = new TextTitleCasePipe();
    expect(pipe).toBeTruthy();
  });


  it('returns title case result', () => {

    const pipe = new TextTitleCasePipe();
    const result = pipe.transform('test title');
    expect(result).toBe('Test title');
  });

});
