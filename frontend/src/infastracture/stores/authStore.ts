import {defineStore} from "pinia";

export interface AuthState {
    userId: string;
}

const storagePath = 'AUTH_STORE';

const useAuthStore = defineStore(storagePath, {
    state: (): AuthState => ({
        userId: undefined,
    }),

    actions: {
        setUser(dto: AuthState) {
            this.userId = dto.userId
            this.saveToStorage(dto)
        },

        logout() {
            this.userId = undefined
            localStorage.clear();
        },

        saveToStorage(dto: AuthState) {
            localStorage.setItem(storagePath, JSON.stringify(dto));
        },

        loadFromStorage() {
            const saved = localStorage.getItem(storagePath);
            if (saved) {
                const data = JSON.parse(saved);
                this.userId = data.id;
            }
        }
    }
})

export function loadAuth() {
    const auth = useAuthStore();
    auth.loadFromStorage()
}

export default useAuthStore