module.exports = {
  title: 'Vuex Storage Plugin',
  base: '/vuex-storage-plugin/',
  locale: {
    '/': {
      lang: 'en-US',
      description: 'Easy and simple to use Vuex\'s storage plugin'
    },
    '/pt-BR/': {
      lang: 'pt-BR',
      description: 'Plugin de Storage para Vuex, simples e de fácil usar'
    }
  },
  themeConfig: {
    repo: 'gigioSouza/vuex-storage-plugin',
    displayAllHeaders: true,
    nav: [
      {
        text: 'Doc',
        link: 'doc'
      },
      {
        text: 'Demo',
        link: 'demo'
      },
      {
        text: 'Languages',
        items: [
          {
            text: 'English',
            link: '/'
          },
          {
            text: 'Português brasileiro',
            link: '/pt-BR/'
          }
        ]
      }
    ],
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English'
      },
      '/pt-BR/': {
        selectText: 'Languages',
        label: 'Português brasileiro'
      }
    }
  }
};