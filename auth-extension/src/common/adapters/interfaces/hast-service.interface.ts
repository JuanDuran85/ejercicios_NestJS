export interface HastService {
  hash(data: string): string;
  compare(data: string, encrypted: string): boolean;
}
