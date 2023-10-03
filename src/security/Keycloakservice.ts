import Keycloak from "keycloak-js";

const keycloakInstance = new Keycloak({
    url: process.env.VUE_APP_KC_URL,
    realm: process.env.VUE_APP_KC_REALM,
    clientId: process.env.VUE_APP_KC_CLIENT_ID
});

interface CallbackOneParam<T1 = void, T2 = void> {
    (param1: T1): T2;
}

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const Login = (onAuthenticatedCallback: CallbackOneParam): void => {
    keycloakInstance
        .init({onLoad: "login-required"})
        .then(function (authenticated) {
            authenticated ? onAuthenticatedCallback() : alert("non authenticated");
        })
        .catch((e) => {
            console.dir(e);
            console.log(`keycloak init exception: ${e}`);
        });
};

const UserName = (): string | undefined =>
    keycloakInstance?.tokenParsed?.preferred_username;

const Token = (): string | undefined => keycloakInstance?.token;

const LogOut = () => keycloakInstance.logout();

const UserRoles = (): string[] | undefined => {
    if (keycloakInstance.resourceAccess === undefined) return undefined;
    return keycloakInstance.realmAccess?.roles;
};

const updateToken = (successCallback: any) =>
    keycloakInstance.updateToken(5).then(successCallback).catch(doLogin);

const doLogin = keycloakInstance.login;

const isLoggedIn = () => !!keycloakInstance.token;

const hasRequiredRoles = (requiredRoles: string[]) => {
    const userRoles = UserRoles();
    return userRoles !== undefined && requiredRoles.some(role => userRoles.includes(role));
};

const KeyCloakService = {
    CallLogin: Login,
    GetUserName: UserName,
    GetAccesToken: Token,
    CallLogOut: LogOut,
    GetUserRoles: UserRoles,
    UpdateToken: updateToken,
    IsLoggedIn: isLoggedIn,
    HasRequiredRoles: hasRequiredRoles,
};

export default KeyCloakService;