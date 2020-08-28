import * as Types from './schemas'

export type OrdersQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Types.Scalars['String']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  start?: Types.Maybe<Types.Scalars['Int']>
  where?: Types.Maybe<Types.Scalars['JSON']>
}>

export type OrdersQuery = {
  orders?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<Types.Order, 'id' | 'created_at' | 'updated_at' | 'detail' | 'amount' | 'delivery_time'> & {
          created_by?: Types.Maybe<Pick<Types.AdminUser, 'username'>>
          updated_by?: Types.Maybe<Pick<Types.AdminUser, 'username'>>
        }
      >
    >
  >
}

export type OrderQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type OrderQuery = {
  order?: Types.Maybe<
    Pick<Types.Order, 'id' | 'created_at' | 'updated_at' | 'detail' | 'amount' | 'delivery_time'> & {
      created_by?: Types.Maybe<Pick<Types.AdminUser, 'username'>>
      updated_by?: Types.Maybe<Pick<Types.AdminUser, 'username'>>
    }
  >
}
