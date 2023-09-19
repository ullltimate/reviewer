export interface IUser {
    _id: string,
    name: string,
    loginWith: string,
    email: string,
    isAdmin: string,
    img: string
    login: string
}

export interface IReview {
    _id: string,
    idAutor: string,
    nameReview: string,
    title: string,
    group: string,
    creationDate: number,
    score: number,
    description: string,
    img: string,
    tags: string[],
    averageRating: number,
}

export interface ITagCloud {
    value: string,
    count: number,
}