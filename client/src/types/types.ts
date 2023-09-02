export interface IUser {
    _id: string,
    name: string,
    loginWith: string,
    email: string,
    isAdmin: boolean,
    img: string
    login: string
}

export interface IReview {
    _id: string,
    idAutor: string,
    nameReview: string,
    title: string,
    group: boolean,
    creationDate: number,
    score: number,
    description: string,
    img: string,
    tags: string[],
}