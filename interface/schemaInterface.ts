export interface UserInterface {
    id: string;
    email: string;
    username: string;
    password: string;
}

export interface BookInterface {
    id: string;
    title: string;
    author: string;
    releaseDate: Date;
    stock: number;
}

export interface BookedBook {
    id: string;
    bookId: string;
    userId: string;
    borrowingDate: Date;
    dueDate: Date;
}