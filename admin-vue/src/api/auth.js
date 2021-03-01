import strapi from '@/utils/strapi'
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

export const resetPwd = (password) => strapi.post('/graphql', {
  variables: { input: { password }},
  query: gql`
    mutation ($input: updatePasswordInput){
      updatePassword(input: $input) {
        success
      }
    }
  `.loc.source.body
})
