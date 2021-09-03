import * as React from 'react';
import { Dispatch, useLayoutEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ScrollIndexRef, useScrollIndex } from '../@hooks/scroll-index/scroll-index';
import { useScrollRepos } from '../@hooks/scroll-repos/scroll-repos';
import { Cursor } from '../cursor/cursor';
import { Img } from '../img/img';
import { IssueFooter } from '../issue-footer/issue-footer';
import { IssueHeader } from '../issue-header/issue-header';
import { useStore } from '../issues/issues.service';
import { ScrollIndicator } from '../scroll-indicator/scroll-indicator';
import { Action, Actions, IssueParams, IssueProps, IssuesState, ViewModes } from '../types';
import './issue.scss';

export function Issue(props: IssueProps) {

  const { issueSlug, issuePage } = useParams<IssueParams>();

  const [state, dispatch] = useStore();

  const issue = state.issues.find(x => x.slug === issueSlug);

  const pages = issue ? new Array(issue.totalPages).fill(0).map((x, i) => {
    return {
      id: i,
      number: i + 1,
      path: issue.path,
    };
  }) : [];

  const containerRef = useRef<HTMLDivElement>(null);

  useScrollRepos(containerRef, '.card--page', state.viewMode);

  // useScrollHistory(containerRef, '.card--page', state.viewMode);

  const history = useHistory();

  useScrollIndex((scrollIndexRef: ScrollIndexRef) => {
    const index = scrollIndexRef.index + 1;
    if (index !== 0 && index !== state.currentPage) {
      history.replace(`/issue/${issueSlug}/page-${index}`);
      onReplacePage(state, dispatch, index);
    }
  }, containerRef, '.card--page', state.viewMode);

  if (issuePage) {
    const myRef = useRef(null);
    useLayoutEffect(() => {
      if (containerRef.current) {
        const url = `/issue/${issueSlug}/${issuePage}`;
        const pages = Array.prototype.slice.call(containerRef.current.querySelectorAll('.card--page'));
        const page = pages.find(x => x.getAttribute('data-url') === url);
        if (page) {
          page.scrollIntoView();
          window.scrollBy(0, - window.innerHeight / 100 * 5);
          /*
          const rect = page.getBoundingClientRect();
          window.scrollTo({
            behavior: "smooth",
            top: rect.top,
          });
          */
        }
      }
    }, [myRef.current]);
  }

  const name = issue ? issue.name : 'untitled';
  const pdfUrl = issue ? issue.path + issue.pdf : '';
  const pdfName = issue ? issue.pdf : '';
  const totalPages = issue ? issue.totalPages : 0;
  const currentPage = state.currentPage || 1;

  const onSetPageIndex = (i: number) => {
    if (i > 0 && i <= totalPages) {
      dispatch({ type: Actions.SetPage, i });
      const node = containerRef.current;
      const elements = node ? Array.prototype.slice.call(node.querySelectorAll('.card--page')) : [];
      const element = elements[i - 1];
      if (element) {
        const rect = element.getBoundingClientRect();
        // element.scrollIntoView();
        (window as any).scrollDisabled = true;
        window.scrollBy(0, rect.top - window.innerHeight / 100 * 5);
        setTimeout(() => {
          (window as any).scrollDisabled = false;
        });
      }
    }
  }

  const onPrev = () => {
    console.log('onPrev');
    onSetPageIndex(currentPage - 1);
  }
  const onNext = () => {
    console.log('onNext');
    onSetPageIndex(currentPage + 1);
  }

  return (
    <div className="section--issue">
      <ScrollIndicator totalPages={totalPages} />
      <IssueHeader name={name} pdfUrl={pdfUrl} pdfName={pdfName} totalPages={totalPages} currentPage={currentPage} onPrev={() => onPrev()} onNext={() => onNext()} />
      <div className="container">
        <div className={`listing--page ${state.viewMode === ViewModes.Contain ? "contain" : "cover"}`} ref={containerRef}>
          {pages && (pages.map((v, i) => <div key={v.number} id={`page-${v.number}`} className="listing__item">
            <div className="card--page" data-number={v.number} data-url={`/issue/${issueSlug}/page-${v.number}`}>
              <Img src={v.path + `page-${(v.number < 10 ? '0' : '') + v.number}.jpg`} onClick={(event: any) => onToggleViewMode(state, dispatch)} />
            </div>
          </div>))}
        </div>
      </div>
      <IssueFooter name={name} pdfUrl={pdfUrl} pdfName={pdfName} totalPages={totalPages} currentPage={currentPage} onPrev={() => onPrev()} onNext={() => onNext()} />
      <Cursor />
    </div>
  );
}

// pure

function onToggleViewMode(state: IssuesState, dispatch: Dispatch<Action> | Dispatch<Action>) {
  dispatch({ type: Actions.ToggleViewMode });
}

function onReplacePage(state: IssuesState, dispatch: Dispatch<Action> | Dispatch<Action>, index: number) {
  dispatch({ type: Actions.ReplacePage, i: index });
}
