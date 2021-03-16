import { cryptoPassword } from "qapi/password_tools/mod.ts";

import {
  graphql,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString,
} from "https://raw.githubusercontent.com/adelsz/graphql-deno/v15.0.0/mod.ts";

export const qapiAppend = (dex: any) => {
  const queryFields = {}
  const resolver = {

  }
  const mutationFields = {
    userResetPassword: {
      type: GraphQLBoolean,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
        pwd: {type: GraphQLNonNull(GraphQLString),}
      },
      resolve: async (_: any, {id, pwd}: any, ctx: any) => {
        if (_['userResetPassword']) {
          await _['userResetPassword']({id, pwd}, ctx)
        }
        const { password, salt } = cryptoPassword(pwd);
        await dex('user').updateById(id, {password, salt})
        return true;
      }
    }
  }
  return {
    queryFields, resolver, mutationFields
  }
}
