import * as React from 'react';
import { Link } from 'react-router-dom';
import { IssueSidebarProps } from '../types';
import './issue-sidebar.scss';

export function IssueSidebar(props: IssueSidebarProps) {
  return (
    <div className="issue-sidebar">
      <div className="issue-sidebar__track">
        <div>{props.currentPage}/{props.totalPages}</div>
        <div onClick={(event) => props.onPrev(event)}>prev</div>
        <div onClick={(event) => props.onNext(event)}>next</div>
        <Link to={'/'}>back</Link>
      </div>
    </div>
  );
}
