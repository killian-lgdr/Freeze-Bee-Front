import KeyCloakService from "@/security/Keycloakservice";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const requiredRoles = to.meta.requiredRoles as string[];
    const userRoles = KeyCloakService.GetUserRoles();

    if (requiredRoles && requiredRoles.length > 0) {
        if (userRoles && requiredRoles.some(role => userRoles.includes(role))) {
            next();
        } else {
            next("/");
        }
    } else {
        next();
    }
};
