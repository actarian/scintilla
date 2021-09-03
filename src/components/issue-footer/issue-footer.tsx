import * as React from 'react';
import { Link } from 'react-router-dom';
import { className } from '../@hooks/class-name/class-name';
import { useScrollInteraction } from '../@hooks/scroll-interaction/scroll-interaction';
import { IssueFooterProps } from '../types';
import './issue-footer.scss';

export function IssueFooter(props: IssueFooterProps) {

  const [active, setActive] = useScrollInteraction([props.totalPages]);

  return (
    <div className={className('issue-footer', { active })}>
      <div className="issue-footer__prev" onClick={(event) => props.onPrev(event)} data-hover>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" /></svg>
      </div>
      <div className="issue-footer__spacer"></div>
      {false &&
        <Link className="issue-footer__logo" to={'/'}>
          <img src="/scintilla/assets/img/logo.png" />
        </Link>
      }
      <Link className="issue-footer__title" to={'/'}>{props.name}</Link>
      <div className="issue-footer__counter">{props.currentPage} / {props.totalPages}</div>
      <div className="issue-footer__spacer"></div>
      <div className="issue-footer__next" onClick={(event) => props.onNext(event)} data-hover>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" /></svg>
      </div>
    </div>
  );
}
