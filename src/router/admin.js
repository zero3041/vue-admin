const admin = [{
    path   : '/admins',
    name:"admin",
    component: () => import('../layouts/admin.vue'),
    meta:{
        auth: true
    },
    children: [
        // User 
        {
            path: 'users',
            name: 'admin-users',
            component: () => import('../pages/admin/users/index.vue')
        },
        {
            path: 'users/create',
            name: 'admin-users-create',
            component: () => import('../pages/admin/users/create.vue')
        },
        {
            path: 'roles',
            name: 'admin-roles',
            component: () => import('../pages/admin/roles/index.vue')
        },
        {
            path: 'settings',
            name: 'admin-settings',
            component: () => import('../pages/admin/settings/index.vue')
        },
        {
            path: 'users/:id/edit',
            name: 'admin-users-edit',
            component: () => import('../pages/admin/users/edit.vue')
        },
        {
            path: 'products',
            name: 'admin-products',
            component: () => import('../pages/admin/products/index.vue')
        },
        {
            path: 'products/:id/edit',
            name: 'admin-products-edit',
            component: () => import('../pages/admin/products/edit.vue')
        },
        {
            path: 'products/create',
            name: 'admin-products-create',
            component: () => import('../pages/admin/products/create.vue')
        },
    ]
}];

const login = [{
    path:'/',
    name:'login',
    component: () => import('../layouts/login.vue'),
    meta:{
        auth:false
    }
}]

export default {
    admin,
    login
}