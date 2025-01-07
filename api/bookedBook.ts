import { ApiManager } from "./ApiManager"

export const UseFetchFindManyBookedBook = async () => {
    try {
        const fetch = await ApiManager(`/booked-book/find-many`)

        return fetch.data
    } catch {
        throw new Error("Error Creating User")
    }
}

export const UseFetchFindOneByBookedBookId = async ({id}: {id: string}) => {
    try {
        const fetch = await ApiManager(`/booked-book/find-by-id/${id}`)

        return fetch.data
    } catch (error) {
        throw new Error(error)
    }
}

export const UseUpdateBookByBookedBookId = async ({id, data: {book_id, user_id, borrowing_date, due_date}}: {id: string, data: { book_id: string, user_id: string, borrowing_date: Date, due_date: Date}}) => {
    try {
        const update = await ApiManager(`/booked-book/update/${id}`, {
            method: 'PATCH',
            data: {
                book_id: book_id,
                user_id: user_id,
                borrowing_date: borrowing_date,
                due_date: due_date,
            }
        })

        return update.data
    } catch (error) {
        throw new Error(error)
    }
}

export const UseCreateBookedBook = async ({book_id, user_id, borrowing_date, due_date}: { book_id: string, user_id: string, borrowing_date: Date, due_date: Date}) => {
    try {
        const create = await ApiManager(`/booked-book/create`, {
            method: 'POST',
            data: {
                book_id: book_id,
                user_id: user_id,
                borrowing_date: borrowing_date,
                due_date: due_date,
            }
        })

        return create.data
    } catch (error) {
        throw new Error(error)
    }
}