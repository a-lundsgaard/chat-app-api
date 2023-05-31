import { GraphQLResolveInfo } from 'graphql';
import { ContextManager } from '../context/index';
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
  name?: Maybe<Scalars['String']>;
  owner_id: Scalars['Int'];
  participantIds: Array<Scalars['Int']>;
};

export type ConversationInput = {
  name?: InputMaybe<Scalars['String']>;
  owner_id: Scalars['Int'];
  participantIds: Array<Scalars['Int']>;
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

export type MessageInput = {
  content: Scalars['String'];
  conversation_id: Scalars['ID'];
  receiver_ids: Array<Scalars['Int']>;
  user_id: Scalars['Int'];
  username: Scalars['String'];
};

/** MUTATIONS */
export type Mutation = {
  __typename?: 'Mutation';
  addMessage: Message;
  createConversation: Conversation;
  login: UserLoginResponse;
  registerUser: User;
  root?: Maybe<Scalars['String']>;
};


/** MUTATIONS */
export type MutationAddMessageArgs = {
  input: MessageInput;
};


/** MUTATIONS */
export type MutationCreateConversationArgs = {
  input: ConversationInput;
};


/** MUTATIONS */
export type MutationLoginArgs = {
  input: UserLoginInput;
};


/** MUTATIONS */
export type MutationRegisterUserArgs = {
  input: UserRegisterInput;
};

/** QUERIES */
export type Query = {
  __typename?: 'Query';
  getAllConversationsByUserId: Array<Conversation>;
  getAllUsers: Array<User>;
  getConversationMessages?: Maybe<Array<Maybe<Message>>>;
  getMessagesByConversationIdWithUser?: Maybe<Array<Maybe<Message>>>;
  getMessagesFromConversation: Array<Message>;
  getUsersByUsername?: Maybe<Array<User>>;
  isMe?: Maybe<UserResponsObject>;
  root?: Maybe<Scalars['String']>;
};


/** QUERIES */
export type QueryGetAllConversationsByUserIdArgs = {
  user_id: Scalars['Int'];
};


/** QUERIES */
export type QueryGetConversationMessagesArgs = {
  id: Scalars['ID'];
};


/** QUERIES */
export type QueryGetMessagesByConversationIdWithUserArgs = {
  id: Scalars['ID'];
};


/** QUERIES */
export type QueryGetMessagesFromConversationArgs = {
  conversation_id: Scalars['ID'];
};


/** QUERIES */
export type QueryGetUsersByUsernameArgs = {
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  conversationCreated?: Maybe<Message>;
  conversationMessageAdded?: Maybe<Message>;
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

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** The response for when a user is successfully logged in */
export type UserLoginResponse = {
  __typename?: 'UserLoginResponse';
  token: Scalars['String'];
  user?: Maybe<UserResponsObject>;
};

/** Inputs */
export type UserRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponsObject = {
  __typename?: 'UserResponsObject';
  email: Scalars['String'];
  id: Scalars['Int'];
  isLoggedIn?: Maybe<Scalars['Boolean']>;
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
  ConversationInput: ConversationInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Message: ResolverTypeWrapper<Message>;
  MessageInput: MessageInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserLoginInput: UserLoginInput;
  UserLoginResponse: ResolverTypeWrapper<UserLoginResponse>;
  UserRegisterInput: UserRegisterInput;
  UserResponsObject: ResolverTypeWrapper<UserResponsObject>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Conversation: Conversation;
  ConversationInput: ConversationInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Message: Message;
  MessageInput: MessageInput;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  User: User;
  UserLoginInput: UserLoginInput;
  UserLoginResponse: UserLoginResponse;
  UserRegisterInput: UserRegisterInput;
  UserResponsObject: UserResponsObject;
};

export type ConversationResolvers<ContextType = ContextManager, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = {
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  participantIds?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = ContextManager, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  conversation_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ContextManager, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationAddMessageArgs, 'input'>>;
  createConversation?: Resolver<ResolversTypes['Conversation'], ParentType, ContextType, RequireFields<MutationCreateConversationArgs, 'input'>>;
  login?: Resolver<ResolversTypes['UserLoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  registerUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ContextManager, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllConversationsByUserId?: Resolver<Array<ResolversTypes['Conversation']>, ParentType, ContextType, RequireFields<QueryGetAllConversationsByUserIdArgs, 'user_id'>>;
  getAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  getConversationMessages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType, RequireFields<QueryGetConversationMessagesArgs, 'id'>>;
  getMessagesByConversationIdWithUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType, RequireFields<QueryGetMessagesByConversationIdWithUserArgs, 'id'>>;
  getMessagesFromConversation?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryGetMessagesFromConversationArgs, 'conversation_id'>>;
  getUsersByUsername?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryGetUsersByUsernameArgs, 'username'>>;
  isMe?: Resolver<Maybe<ResolversTypes['UserResponsObject']>, ParentType, ContextType>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = ContextManager, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  conversationCreated?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "conversationCreated", ParentType, ContextType>;
  conversationMessageAdded?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "conversationMessageAdded", ParentType, ContextType>;
  messageCreated?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "messageCreated", ParentType, ContextType>;
  root?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "root", ParentType, ContextType>;
};

export type UserResolvers<ContextType = ContextManager, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLoginResponseResolvers<ContextType = ContextManager, ParentType extends ResolversParentTypes['UserLoginResponse'] = ResolversParentTypes['UserLoginResponse']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserResponsObject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponsObjectResolvers<ContextType = ContextManager, ParentType extends ResolversParentTypes['UserResponsObject'] = ResolversParentTypes['UserResponsObject']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isLoggedIn?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ContextManager> = {
  Conversation?: ConversationResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserLoginResponse?: UserLoginResponseResolvers<ContextType>;
  UserResponsObject?: UserResponsObjectResolvers<ContextType>;
};

