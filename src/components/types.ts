// enum

export enum ViewModes {
  Contain = 1,
  Cover = 2,
}

// reducer

export enum Actions {
  ToggleViewMode = 'toggleViewMode',
  ReplacePage = 'replacePage',
  SetPage = 'setPage',
  SelectIssue = 'selectIssue',
}

export type Action =
  | { type: Actions.ToggleViewMode }
  | { type: Actions.ReplacePage, i: number }
  | { type: Actions.SetPage, i: number }
  | { type: Actions.SelectIssue, i: number }

// state

export type Issue = {
  slug: string;
  name: string;
  number: number;
  year: number;
  totalPages: number;
  month: string;
  path: string;
  pdf: string;
}

export type IssuesState = {
  viewMode: ViewModes;
  issues: Issue[];
  currentIssue?: string;
  currentPage?: number;
}

// params

export type IssueParams = {
  issueSlug: string;
  issuePage: string;
}

// views

export type ButtonProps = {
  onClick?: (event: any) => void;
}

/*
export type ButtonProps = {
  label: string;
  onClick: () => void;
  active?: boolean;
}

export type ButtonLinkProps = {
  exact: boolean;
  label: string;
  to: string;
}
*/

export type IssuesProps = {
}

export type IssueProps = {
}

export type IssueCoverProps = {
  exact: boolean;
  image: string;
  label: string;
  to: string;
}

export type IssueSidebarProps = {
  totalPages: number;
  currentPage: number;
  onPrev: (event: any) => void;
  onNext: (event: any) => void;
}

export type IssueHeaderProps = {
  name: string;
  pdfUrl: string;
  pdfName: string;
  totalPages: number;
  currentPage: number;
  onPrev: (event: any) => void;
  onNext: (event: any) => void;
}

export type IssueFooterProps = {
  name: string;
  pdfUrl: string;
  pdfName: string;
  totalPages: number;
  currentPage: number;
  onPrev: (event: any) => void;
  onNext: (event: any) => void;
}

export type ScrollIndicatorProps = {
  totalPages: number;
}
