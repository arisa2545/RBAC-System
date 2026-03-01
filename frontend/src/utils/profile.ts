import type { IProfileResponse } from "@/interface/profile.interface";

export const getProfileFormStorage = (): IProfileResponse => {
    const profile = localStorage.getItem('profile');
    return JSON.parse(profile ?? '');
}