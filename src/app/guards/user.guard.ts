import { inject, Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanDeactivate,
    GuardResult,
    MaybeAsync,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { CreatePostComponent } from '../views/create-post/create-post.component';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanDeactivate<CreatePostComponent> {
    router = inject(Router);
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): MaybeAsync<GuardResult> {
        return this.checkAuth();
    }
    canDeactivate(
        component: CreatePostComponent,
    ): boolean {
        if (!component.isFormSubmitted) {
            return window.confirm("You have some unsaved changes do you want to discard those changes?")
        }
        return true;
    }
    private checkAuth(): boolean {
        if (localStorage.getItem('loggedInuser')) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
