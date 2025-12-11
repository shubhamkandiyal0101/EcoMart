import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { SingleProductComponent } from './shared/product/single-product/single-product.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserListComponent } from './user-list/user-list.component';
import { userRoutes } from './user-domain/user.routes';
import { userGuard } from './user.guard';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';

export const routes: Routes = [
    {
        path:'',
        component: MainLayoutComponent,
        children: [
            {
                path:'',
                component: HomePage
            },
            {
                path: 'shop',
                component: ShopPageComponent
            },
            {
                path: 'shop/:category',
                component: ShopPageComponent
            },
            {
                path: 'shop/product/:productUrl',
                component: SingleProductComponent
            },
            {
                path: 'cart',
                component: CartItemsComponent
            },
            {
                path: 'user-list',
                component: UserListComponent
            },
            {
                path: 'checkout',
                component: CheckoutPageComponent
            }
        ]
    },
    {
        path:'login',
        component: UserLoginComponent
    },
    {
        path:'thank-you',
        component: ThankYouPageComponent
    },
    {
        path:'user',
        loadChildren: ()=>(userRoutes),
        canActivate: [userGuard]
    }
];
