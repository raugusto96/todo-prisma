export interface HttpPostClient {
  post: (url: string, data: any) => Promise<void>;
}
