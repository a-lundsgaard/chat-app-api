export interface GraphQLContextApi {
    signIn: () => string,
    authenticate: () => boolean
}