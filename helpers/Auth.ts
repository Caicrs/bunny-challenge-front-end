import { LocalStorageKeys } from "types/LocalStorageKeys";
import { LocalStorageHelper } from "./LocalStorageHelper";
import { RoutePath } from "types/routes";

export const Auth = {
    profile: (): any => {
        const thisProfile = LocalStorageHelper.get(LocalStorageKeys.PROFILE)
        return thisProfile
    },
    token: (): any => {
        const token = LocalStorageHelper.get(LocalStorageKeys.TOKEN)
        return token
    },
    isAuth: (): boolean => {
        const token = LocalStorageHelper.get(LocalStorageKeys.TOKEN)
        return token !== null 
    },
    logout: (): void => {
        LocalStorageHelper.clear()
        window.location.replace(RoutePath.HOME)
    }
}
