import * as React from 'react';
import { Link } from 'react-router-dom';
import { className } from '../@hooks/class-name/class-name';
import { useScrollInteraction } from '../@hooks/scroll-interaction/scroll-interaction';
import { IssueHeaderProps } from '../types';
import './issue-header.scss';

export function IssueHeader(props: IssueHeaderProps) {

  const [active, setActive] = useScrollInteraction([props.totalPages]);

  return (
    <div className={className('issue-header', { active })}>
      <div className="issue-header__empty"></div>
      <div className="issue-header__spacer"></div>
      <Link className="issue-header__title" to={'/'}>{props.name}</Link>
      <div className="issue-header__counter">{props.currentPage} / {props.totalPages}</div>
      <div className="issue-header__spacer"></div>
      <a href={props.pdfUrl} download={props.pdfName} className="issue-header__button">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M8 11h-6v10h20v-10h-6v-2h8v14h-24v-14h8v2zm5 2h4l-5 6-5-6h4v-12h2v12z" /></svg>
      </a>
    </div>
  );
}
