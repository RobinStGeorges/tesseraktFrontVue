import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Accueil from '@/components/Accueil'
import Cours from '@/components/Cours'
import Exercices from '@/components/Exercices'
import ShowExercice from '@/components/ShowExercice'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/accueil',
      name: 'accueil',
      component: Accueil
    },
    {
      path: '/cours',
      name: 'cours',
      component: Cours
    },
    {
      path: '/exercices',
      name: 'exercices',
      component: Exercices
    },
    {path: '/exercice/:id',name: 'exercice', component: ShowExercice}
  ]
})
