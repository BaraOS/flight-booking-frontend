export interface Meta {
  count: number;
  links?: CollectionLinks;
}

interface CollectionLinks {
  self: string;
  next: string;
  previous: string;
  last: string;
  first: string;
  up: string;
}
