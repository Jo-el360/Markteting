
export enum CopyType {
  SOCIAL_MEDIA_POST = 'SOCIAL_MEDIA_POST',
  AD_HEADLINE = 'AD_HEADLINE',
  EMAIL_SUBJECT = 'EMAIL_SUBJECT',
}

export interface GeneratedCopy {
  type: CopyType;
  content: string;
}
