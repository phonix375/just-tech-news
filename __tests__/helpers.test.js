const {format_date, format_plural, format_url} = require('../utils/helpers');

test('format_date() return a date string' , () => {
    const date = new Date('2021-05-29 16:12:03');

    expect(format_date(date)).toBe('5/29/2021');
})

test('format_plural', () => {
    expect(format_plural('lion', 1)).toBe('lion');
    expect(format_plural('lion', 2 )).toBe('lions');
})

test('format_url() returns a simple url string', ()=> {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/abcdefg/');
    const url3 = format_url('https://www.google.com?q=hello');

    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('google.com');
})