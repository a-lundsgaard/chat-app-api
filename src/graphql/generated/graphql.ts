import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Conversation = {
  __typename?: 'Conversation';
  created_at: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  owner_id: Scalars['Int'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  conversation_id: Scalars['ID'];
  created_at: Scalars['String'];
  id: Scalars['Int'];
  user_id: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
};

/**
 * The entry-point for mutations.
 * This acts as the top-level api from which all mutations must start
 */
export type Mutation = {
  __typename?: 'Mutation';
  addMessage: Message;
  createConversation: Conversation;
  login?: Maybe<Scalars['String']>;
  registerUser: User;
  root?: Maybe<Scalars['String']>;
};


/**
 * The entry-point for mutations.
 * This acts as the top-level api from which all mutations must start
 */
export type MutationAddMessageArgs = {
  content: Scalars['String'];
  conversation_id: Scalars['ID'];
  user_id: Scalars['Int'];
};


/**
 * The entry-point for mutations.
 * This acts as the top-level api from which all mutations must start
 */
export type MutationCreateConversationArgs = {
  name: Scalars['String'];
  owner_id: Scalars['Int'];
};


/**
 * The entry-point for mutations.
 * This acts as the top-level api from which all mutations must start
 */
export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


/**
 * The entry-point for mutations.
 * This acts as the top-level api from which all mutations must start
 */
export type MutationRegisterUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

/**
 * The entry-point for queries.
 * This acts as the top-level api from which all queries must start
 */
export type Query = {
  __typename?: 'Query';
  getAllConversationsByUserId: Array<Conversation>;
  getAllUsers: Array<User>;
  getConversationMessages?: Maybe<Array<Maybe<Message>>>;
  getMessagesByConversationIdWithUser?: Maybe<Array<Maybe<Message>>>;
  getMessagesFromConversation: Array<Message>;
  root?: Maybe<Scalars['String']>;
};


/**
 * The entry-point for queries.
 * This acts as the top-level api from which all queries must start
 */
export type QueryGetAllConversationsByUserIdArgs = {
  user_id: Scalars['Int'];
};


/**
 * The entry-point for queries.
 * This acts as the top-level api from which all queries must start
 */
export type QueryGetConversationMessagesArgs = {
  id: Scalars['ID'];
};


/**
 * The entry-point for queries.
 * This acts as the top-level api from which all queries must start
 */
export type QueryGetMessagesByConversationIdWithUserArgs = {
  id: Scalars['ID'];
};


/**
 * The entry-point for queries.
 * This acts as the top-level api from which all queries must start
 */
export type QueryGetMessagesFromConversationArgs = {
  conversation_id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageCreated?: Maybe<Message>;
  root?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  password: Scalars['String'];
  username: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Conversation: ResolverTypeWrapper<Conversation>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Conversation: Conversation;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Message: Message;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  User: User;
};

export type ConversationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = {
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  conversation_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationAddMessageArgs, 'content' | 'conversation_id' | 'user_id'>>;
  createConversation?: Resolver<ResolversTypes['Conversation'], ParentType, ContextType, RequireFields<MutationCreateConversationArgs, 'name' | 'owner_id'>>;
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  registerUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'email' | 'password' | 'username'>>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllConversationsByUserId?: Resolver<Array<ResolversTypes['Conversation']>, ParentType, ContextType, RequireFields<QueryGetAllConversationsByUserIdArgs, 'user_id'>>;
  getAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  getConversationMessages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType, RequireFields<QueryGetConversationMessagesArgs, 'id'>>;
  getMessagesByConversationIdWithUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType, RequireFields<QueryGetMessagesByConversationIdWithUserArgs, 'id'>>;
  getMessagesFromConversation?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryGetMessagesFromConversationArgs, 'conversation_id'>>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  messageCreated?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "messageCreated", ParentType, ContextType>;
  root?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "root", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Conversation?: ConversationResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

