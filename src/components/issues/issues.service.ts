import { useReducer } from 'react';
import { ObservableAction, ObservableHook, useReducer$, useSharedReducer$ } from '../@hooks/observable/observable';
import { deepCopy } from '../@hooks/utils/utils';
import { Action, Actions, IssuesState, ViewModes } from '../types';

export const DEFAULT_STATE: IssuesState = {
  viewMode: ViewModes.Contain,
  issues: [{
    slug: 'scintilla-3',
    name: 'Scintilla 3',
    number: 3,
    year: 93,
    month: 'Gennaio-Febbraio',
    totalPages: 36,
    path: '/scintilla/assets/img/scintilla-03/',
    pdf: 'scintilla-03.pdf',
  }, {
    slug: 'scintilla-4',
    name: 'Scintilla 4',
    number: 4,
    year: 93,
    month: '',
    totalPages: 32,
    path: '/scintilla/assets/img/scintilla-04/',
    pdf: 'scintilla-04.pdf',
  }, {
    slug: 'scintilla-5',
    name: 'Scintilla 5',
    number: 5,
    year: 93,
    month: '',
    totalPages: 40,
    path: '/scintilla/assets/img/scintilla-05/',
    pdf: 'scintilla-05.pdf',
  }, {
    slug: 'scintilla-6',
    name: 'Scintilla 6',
    number: 6,
    year: 93,
    month: 'Novembre',
    totalPages: 28,
    path: '/scintilla/assets/img/scintilla-06/',
    pdf: 'scintilla-06.pdf',
  }, {
    slug: 'scintilla-7',
    name: 'Scintilla 7',
    number: 7,
    year: 94,
    month: '',
    totalPages: 40,
    path: '/scintilla/assets/img/scintilla-07/',
    pdf: 'scintilla-07.pdf',
  }, {
    slug: 'scintilla-8',
    name: 'Scintilla 8',
    number: 8,
    year: 94,
    month: '',
    totalPages: 38,
    path: '/scintilla/assets/img/scintilla-08/',
    pdf: 'scintilla-08.pdf',
  }, {
    slug: 'auto-scintilla-1',
    name: 'Auto Scintilla 1',
    number: 9,
    year: 93,
    month: '',
    totalPages: 40,
    path: '/scintilla/assets/img/auto-scintilla-01/',
    pdf: 'auto-scintilla-01.pdf',
  }, {
    slug: 'auto-scintilla-2',
    name: 'Auto Scintilla 2',
    number: 2,
    year: 94,
    month: 'Settembre',
    totalPages: 66,
    path: '/scintilla/assets/img/auto-scintilla-02/',
    pdf: 'auto-scintilla-02.pdf',
  }],
}

export const toggleViewMode = (state: IssuesState): IssuesState => {
  state.viewMode = state.viewMode === ViewModes.Contain ? ViewModes.Cover : ViewModes.Contain;
  return state;
}

export const replacePage = (state: IssuesState, i: number): IssuesState => {
  state.currentPage = i;
  return state;
}

export const setPage = (state: IssuesState, i: number): IssuesState => {
  state.currentPage = i;
  return state;
}

export const selectIssue = (state: IssuesState, i: number): IssuesState => {
  return state;
}

// private

function reducer(prevState: IssuesState, action: Action) {
  switch (action.type) {
    case Actions.ToggleViewMode:
      return toggleViewMode(deepCopy<IssuesState>(prevState));
    case Actions.ReplacePage:
      return replacePage(deepCopy<IssuesState>(prevState), action.i);
    case Actions.SetPage:
      return setPage(deepCopy<IssuesState>(prevState), action.i);
    case Actions.SelectIssue:
      return selectIssue(deepCopy<IssuesState>(prevState), action.i);
    default:
      throw new Error('unknown action');
  }
}

function reducer$(prevState: IssuesState, action: ObservableAction) {
  switch (action.type) {
    case Actions.ToggleViewMode:
      return toggleViewMode(deepCopy<IssuesState>(prevState));
    case Actions.ReplacePage:
      return replacePage(deepCopy<IssuesState>(prevState), action.i);
    case Actions.SelectIssue:
      return selectIssue(deepCopy<IssuesState>(prevState), action.i);
    default:
      throw new Error('unknown action');
  }
}

// public

export function useStore(defaultState?: IssuesState) {
  return useReducer(reducer, defaultState || DEFAULT_STATE);
}

export function useStore$(defaultState?: IssuesState): ObservableHook<IssuesState> {
  return useReducer$<IssuesState>(reducer$, defaultState || DEFAULT_STATE);
}

export function useSharedStore$(defaultState?: IssuesState): ObservableHook<IssuesState> {
  return useSharedReducer$<IssuesState>(reducer$, defaultState || DEFAULT_STATE);
}
