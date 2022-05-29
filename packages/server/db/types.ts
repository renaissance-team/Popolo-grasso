export type MessageType = {
  topic_id: number,
  text: string,
  user: string,
};

export type MessageResponseType = MessageType & {
  message_id: number,
  date: Date,
};

export type TopicResponseType = {
  name: string,
  created_date: Date,
  topic_id: number,
}

export type ForumTopicResponseType = TopicResponseType & {
  message_id: number,
  text: string,
  date: Date,
  user: string,
}

export type ThemeResponseType = {
  theme_id: number,
  name: string,
}

export type UserThemeType = {
  theme_id: number,
  device?: string,
  user_id: number,
}

export type UserThemeResponseType = UserThemeType & {
  user_theme_id: number,
}

export type SelectedUserThemeType = UserThemeResponseType & ThemeResponseType
