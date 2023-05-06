/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/test-profile": {
    get: operations["AppController_getProfile"];
  };
  "/test-profile-jwt": {
    get: operations["AppController_getProfileJwt"];
  };
  "/sitemap/sitemap.xml": {
    get: operations["SitemapController_getSitemap"];
  };
  "/reviews/{id}": {
    get: operations["ReviewController_get"];
  };
  "/reviews": {
    post: operations["ReviewController_create"];
  };
  "/characters": {
    get: operations["CharacterController_searchCharacters"];
    post: operations["CharacterController_createCharacter"];
  };
  "/characters/{id}": {
    get: operations["CharacterController_getCharacter"];
    patch: operations["CharacterController_updateCharacter"];
  };
  "/profiles/{id}": {
    get: operations["ProfileController_getProfile"];
  };
  "/profiles/mine": {
    patch: operations["ProfileController_updateProfile"];
  };
  "/chats": {
    post: operations["ChatController_create"];
  };
  "/chats/{id}": {
    get: operations["ChatController_get"];
    patch: operations["ChatController_update"];
  };
  "/chats/{id}/messages": {
    post: operations["ChatController_createMessage"];
    delete: operations["ChatController_deleteMessages"];
  };
  "/chats/{id}/messages/{messageId}": {
    patch: operations["ChatController_updateMessage"];
  };
  "/tags": {
    get: operations["TagController_findAll"];
  };
  "/tunnel/kobold/check": {
    get: operations["TunnelController_checkKoboldUrl"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    ReviewView: {
      user_profiles: {
        avatar?: string;
        name?: string;
        user_name?: string;
      };
      character_id: string;
      content: string | null;
      created_at: string;
      is_like: boolean;
      user_id: string;
    };
    CreateReviewDto: {
      character_id: string;
      is_like: boolean;
      content?: string;
    };
    Review: {
      character_id: string;
      content: string | null;
      created_at: string;
      is_like: boolean;
      user_id: string;
    };
    Paginated: {
      data: (string)[];
      total: number;
      size: number;
      page: number;
    };
    CharacterDto: {
      avatar: string;
      name: string;
      personality: string;
      scenario: string;
      description: string;
      example_dialogs: string;
      first_message: string;
      is_nsfw: boolean;
      is_public: boolean;
      tag_ids: (number)[];
    };
    CharacterEntity: {
      id: string;
      avatar: string;
      created_at: string;
      creator_id: string;
      description: string;
      example_dialogs: string;
      first_message: string;
      is_nsfw: boolean;
      is_public: boolean;
      name: string;
      personality: string;
      scenario: string;
      updated_at: string;
    };
    TagEntity: {
      id: number;
      description: string;
      name: string;
      slug: string;
      created_at: string;
    };
    CharacterStats: {
      chat: number;
      message: number;
    };
    CharacterView: {
      id: string;
      name: string;
      avatar: string;
      description: string;
      created_at: string;
      is_public: boolean;
      is_nsfw: boolean;
      creator_id: string;
      creator_name: string;
      creator_verified: boolean;
      tags?: (components["schemas"]["TagEntity"])[];
      stats?: components["schemas"]["CharacterStats"];
    };
    FullCharacterView: {
      id: string;
      name: string;
      avatar: string;
      description: string;
      created_at: string;
      is_public: boolean;
      is_nsfw: boolean;
      creator_id: string;
      creator_name: string;
      creator_verified: boolean;
      tags?: (components["schemas"]["TagEntity"])[];
      stats?: components["schemas"]["CharacterStats"];
      example_dialogs: string;
      first_message: string;
      personality: string;
      scenario: string;
    };
    ProfileResponse: {
      id: string;
      about_me: string;
      avatar: string;
      name: string;
      profile: string;
      user_name: string;
      config: Record<string, never>;
      is_verified: boolean;
    };
    ProfileUpdateDto: {
      about_me?: string;
      avatar?: string;
      name?: string;
      profile?: string;
      user_name?: string;
      config?: Record<string, never>;
    };
    CreateChatDto: {
      character_id: string;
    };
    ChatEntity: {
      id: number;
      character_id: string;
      user_id: string;
      summary: string;
      created_at: string;
      updated_at: string;
      is_public: boolean;
      summary_chat_id: number | null;
    };
    UpdateChatDto: {
      is_public?: boolean;
      summary?: string;
      summary_chat_id?: number;
    };
    ChatEntityWithCharacter: {
      id: number;
      character_id: string;
      user_id: string;
      summary: string;
      created_at: string;
      updated_at: string;
      is_public: boolean;
      summary_chat_id: number | null;
      characters: {
        id?: string;
        name?: string;
        description?: string;
        avatar?: string;
        example_dialogs?: string;
        first_message?: string;
        personality?: string;
        scenario?: string;
      };
    };
    ChatMessageEntity: {
      id: number;
      chat_id: number;
      created_at: string;
      is_bot: boolean;
      is_main: boolean;
      message: string;
    };
    ChatResponse: {
      chat: components["schemas"]["ChatEntityWithCharacter"];
      chatMessages: (components["schemas"]["ChatMessageEntity"])[];
    };
    CreateChatMessageDto: {
      message: string;
      is_bot: boolean;
      is_main: boolean;
    };
    UpdateChatMessageDto: {
      message?: string;
      is_main?: boolean;
    };
    DeleteChatMessageDto: {
      message_ids: (number)[];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  AppController_getProfile: {
    responses: {
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
    };
  };
  AppController_getProfileJwt: {
    responses: {
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
    };
  };
  SitemapController_getSitemap: {
    responses: {
      200: never;
    };
  };
  ReviewController_get: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": (components["schemas"]["ReviewView"])[];
        };
      };
      default: {
        content: {
          "application/json": (components["schemas"]["ReviewView"])[];
        };
      };
    };
  };
  ReviewController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateReviewDto"];
      };
    };
    responses: {
      201: never;
      default: {
        content: {
          "application/json": components["schemas"]["Review"];
        };
      };
    };
  };
  CharacterController_searchCharacters: {
    parameters: {
      query: {
        user_id?: string;
        tag_id?: number;
        page: number;
        mode?: "sfw" | "all" | "nsfw";
        sort?: "latest" | "popular";
        search?: string;
      };
    };
    responses: {
      200: never;
      default: {
        content: {
          "application/json": components["schemas"]["Paginated"];
        };
      };
    };
  };
  CharacterController_createCharacter: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CharacterDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      default: {
        content: {
          "application/json": components["schemas"]["CharacterEntity"];
        };
      };
    };
  };
  CharacterController_getCharacter: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["CharacterView"];
        };
      };
      default: {
        content: {
          "application/json": components["schemas"]["FullCharacterView"];
        };
      };
    };
  };
  CharacterController_updateCharacter: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CharacterDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      default: {
        content: {
          "application/json": components["schemas"]["CharacterEntity"];
        };
      };
    };
  };
  ProfileController_getProfile: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      default: {
        content: {
          "application/json": components["schemas"]["ProfileResponse"];
        };
      };
    };
  };
  ProfileController_updateProfile: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ProfileUpdateDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      default: {
        content: {
          "application/json": components["schemas"]["ProfileResponse"];
        };
      };
    };
  };
  ChatController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateChatDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      default: {
        content: {
          "application/json": components["schemas"]["ChatEntity"];
        };
      };
    };
  };
  ChatController_get: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: never;
      default: {
        content: {
          "application/json": components["schemas"]["ChatResponse"];
        };
      };
    };
  };
  ChatController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateChatDto"];
      };
    };
    responses: {
      200: never;
      default: {
        content: {
          "application/json": components["schemas"]["ChatEntity"];
        };
      };
    };
  };
  ChatController_createMessage: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateChatMessageDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      default: {
        content: {
          "application/json": components["schemas"]["ChatMessageEntity"];
        };
      };
    };
  };
  ChatController_deleteMessages: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["DeleteChatMessageDto"];
      };
    };
    responses: {
      200: never;
      default: {
        content: {
          "application/json": (components["schemas"]["ChatMessageEntity"])[];
        };
      };
    };
  };
  ChatController_updateMessage: {
    parameters: {
      path: {
        id: string;
        messageId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateChatMessageDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      default: {
        content: {
          "application/json": components["schemas"]["ChatMessageEntity"];
        };
      };
    };
  };
  TagController_findAll: {
    responses: {
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      default: {
        content: {
          "application/json": (components["schemas"]["TagEntity"])[];
        };
      };
    };
  };
  TunnelController_checkKoboldUrl: {
    parameters: {
      query: {
        apiUrl: string;
      };
    };
    responses: {
      200: never;
    };
  };
}
