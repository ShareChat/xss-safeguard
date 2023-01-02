import { sanitizeString, sanitizeUrl, getSafeSearchParam } from '../src';

describe('Test Sanitize String', () => {
  let windowSpy: any;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });
  afterEach(() => {
    windowSpy.mockRestore();
  });
  it('Test Normal String', () => {
    expect(
      sanitizeString(
        "https://sharechat.com/?lang=<script>{alert('Hello World')}</script>"
      )
    ).toEqual('httpssharechatcomlangscriptalertHello Worldscript');
  });
  it('Test URL String', () => {
    expect(
      sanitizeUrl(
        "https://sharechat.com/?lang=<script>{alert('Hello World')}</script>"
      )
    ).toEqual('https://sharechat.com/?lang=scriptalertHello World/script');
  });
  it('Test URL search parameter without attack', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        origin: 'https://sharechat.com',
        search: '?answer=yes',
      },
    }));
    expect(getSafeSearchParam('answer')).toEqual('yes');
  });
  it('Test URL search parameter with attack', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        origin: 'https://sharechat.com',
        search: '?answer=<script>alert("Hello")</script>',
      },
    }));
    expect(getSafeSearchParam('answer')).toEqual('scriptalertHelloscript');
  });
});
