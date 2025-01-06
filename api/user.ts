import { ApiManager } from "./ApiManager"

export const UseFetchFindManyUser = async () => {
    try {
        const fetch = await ApiManager(`/user/find-many`)

        return fetch.data
    } catch {
        throw new Error("Error Creating User")
    }
}

export const UseFetchFindOneByUserId = async ({id}: {id: string}) => {
    try {
        const fetch = await ApiManager(`/user/find-by-id/${id}`)

        return fetch.data
    } catch (error) {
        throw new Error(error)
    }
}

export const UseUpdateUserByUserId = async ({id, data: {username, password, email}}: {id: string, data: {username: string, password: string, email: string}}) => {
    try {
        const update = await ApiManager(`user/update/${id}`, {
            method: 'PATCH',
            data: {
                username,
                password,
                email
            }
        })

        return update.data
    } catch (error) {
        throw new Error(error)
    }
}

export const UseCreateUser = async ({email, username, password}: {email: string, username: string, password: string}) => {
    try {
        const create = await ApiManager(`/user/create`, {
            method: 'POST',
            data: {
                username: username,
                password: password,
                email: email
            }
        })

        return create.data
    } catch (error) {
        throw new Error(error)
    }
}