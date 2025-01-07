import { ApiManager } from "./ApiManager"

export const UseFetchFindManyBook = async () => {
    try {
        const fetch = await ApiManager(`/book/find-many`)

        return fetch.data
    } catch {
        throw new Error("Error Creating User")
    }
}

export const UseFetchFindOneByBookId = async ({id}: {id: string}) => {
    try {
        const fetch = await ApiManager(`/book/find-by-id/${id}`)

        return fetch.data
    } catch (error) {
        throw new Error(error)
    }
}

export const UseUpdateBookByBookId = async ({id, data: {title, author, releaseDate, stock}}: {id: string, data: { title: string, author: string, releaseDate: Date, stock: number}}) => {
    try {
        const update = await ApiManager(`/book/update/${id}`, {
            method: 'PATCH',
            data: {
                title: title,
                author: author,
                release_date: releaseDate,
                stock: stock,
            }
        })

        return update.data
    } catch (error) {
        throw new Error(error)
    }
}

export const UseCreateBook = async ({title, author, releaseDate, stock}: { title: string, author: string, releaseDate: Date, stock: number}) => {
    try {
        const create = await ApiManager(`/book/create`, {
            method: 'POST',
            data: {
                title: title,
                author: author,
                release_date: releaseDate,
                stock: stock,
            }
        })

        return create.data
    } catch (error) {
        throw new Error(error)
    }
}