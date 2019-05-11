import { singletonMockStorage } from '../../mock-storage';
import { Nuxt, Builder } from 'nuxt';
import { resolve } from 'path';

describe('VuexStoragePlugin in Nuxt', () => {
  let nuxt = null;

  beforeAll(done => {
    const config = {
      dev: false,
      rootDir: resolve(__dirname, '..')
    };
    nuxt = new Nuxt(config);
    new Builder(nuxt).build()
      .then(() => nuxt.server.listen(4000, 'localhost'))
      .then(done);
  }, 30000);

  afterAll(nuxt.close);

  it.only('Route / exits and render HTML', done => {
    const context = {};
    nuxt.server.renderRoute('/', context)
      .then(({ html }) => {
        expect(html.includes('<h1 class="red">Bacon null</h1>')).toBeTruthy();
        done();
      });
  });
});