const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/articulos',
    name: 'Articulos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Articles.vue') }
    ],
  },
  {
    path: '/favoritos',
    name: 'Favorites',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Favorites.vue') }
    ],
  },
  {
    path: '/agregar',
    name: 'AddArticles',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AddArticles.vue') }
    ],
  },
  {
    path: '/mis-articulos',
    name: 'MyArticles',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MyArticles.vue') }
    ],
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
