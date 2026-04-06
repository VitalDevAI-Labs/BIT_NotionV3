export interface NotionRichText {
  plain_text: string;
  type: string;
}

export interface NotionSelectOption {
  name: string;
  id?: string;
  color?: string;
}

export interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  archived: boolean;
  properties: {
    Title: { title: NotionRichText[] };
    Type: { select: NotionSelectOption | null };
    Description: { rich_text: NotionRichText[] };
    Categories: { multi_select: NotionSelectOption[] };
    Tags: { multi_select: NotionSelectOption[] };
    URL: { url: string | null };
    'Prompt Text': { rich_text: NotionRichText[] };
    Model: { select: NotionSelectOption | null };
    'Is Popular': { checkbox: boolean };
  };
}

export interface NotionQueryResponse {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string | null;
  object: string;
}

export interface NotionErrorResponse {
  object: 'error';
  status: number;
  code: string;
  message: string;
}
