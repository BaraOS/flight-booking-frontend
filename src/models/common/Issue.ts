export interface Issue {
  status: number;
  code: number;
  title: string;
  detail: string;
  source?: IssueSource;
}

interface IssueSource {
  pointer: string;
  parameter: string;
  example: string;
}
