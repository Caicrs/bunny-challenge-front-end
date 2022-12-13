import api from "api/bunnyApi";

export const user = {
    createUser: () => `${api}/user`,
    listUsers: () => `${api}/user`,
    userById: (id: string) => `${api}/user/${id}`,
};