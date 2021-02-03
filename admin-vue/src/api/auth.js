import strapi from '@/utils/strapi'
import store from '@/store'
import gql from 'graphql-tag'

export function login(data) {
  return strapi.post('/graphql', {
    variables: { input: data },
    query: gql`
      mutation($input: UsersPermissionsLoginInput!) {
        login(input: $input) {
          jwt
          user {
            id
            username
            email
            avatar
            role {
              name
            }
          }
        }
      }
    `.loc.source.body
  })
}

export function getInfo() {
  return strapi.post('/graphql', {
    variables: {},
    query: gql`
      query {
        me {
          id
          avatar
          email
          username
        }
      }
    `.loc.source.body
  })
}

export function sendRestPwdEmail() {
  return strapi.post('/graphql', {
    variables: { email: store.state.user.email },
    query: gql`
      mutation ($email: String!){
        forgotPassword(email: $email) {
          ok
        }
      }
    `.loc.source.body
  })
}

export const resetPwd = (code, newPassword) => strapi.post('/graphql', {
  variables: { code, newPassword },
  query: gql`
    mutation ($code: String!, $newPassword: String!){
      resetPassword(code: $code, password: $newPassword, passwordConfirmation: $newPassword) {
        jwt
        user {
          id
        }
      }
    }
  `.loc.source.body
})
