import { sanitizeString, sanitizeUrl } from '../src';

describe('Test Sanitize String', () => {
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
});
