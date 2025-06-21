export type ChatMessageType = {
  message: string | React.ReactElement;
  sender: string;
  id: string;
  time: string;
};

export type ChatMessagesType = ChatMessageType[];

export type ChatMessageLiteType = {
  message: string;
  sender: string;
};
