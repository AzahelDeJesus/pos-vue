import { createRouter, createWebHistory } from 'vue-router'
import MainView from "../views/MainView.vue";
import AdmiLayout from "../views/admin/AdmiLayout.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: MainView
    },
    {
      path: "/admi",
      name: "admi",
      component: AdmiLayout,
      children: [
          {
            path: "productos",
            name: "products",
            component: ()=> import("../views/admin/ProductsView.vue")
          },
          {
            path: "venta",
            name: "sales",
            component: ()=> import("../views/admin/SalesView.vue")
          },{
            path: "nuevo",
            name: "new-product",
            component: ()=> import("../views/admin/NewProductView.vue")
          },{
            path: "editar/:id",
            name: "edit-product",
            component: ()=> import("../views/admin/EditProductView.vue")
          }
      ]
    }
  ]
})

export default router
