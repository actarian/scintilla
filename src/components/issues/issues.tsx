import * as React from 'react';
import { Link } from 'react-router-dom';
import { Cursor } from '../cursor/cursor';
import { IssueCover } from '../issue-cover/issue-cover';
import { IssuesProps } from '../types';
import './issues.scss';
import { useStore } from './issues.service';

export function Issues(props: IssuesProps) {

  const [state, dispatch] = useStore();

  const links = state.issues.map(x => {
    return {
      exact: true,
      image: x.path + 'cover.jpg',
      label: x.name,
      to: `/issue/${x.slug}`,
    }
  });

  return (
    <div className="section--issues">
      <div className="container">
        <div className="listing--cover">
          {(links.map((x, i) => <div key={i} className="listing__item">
            <IssueCover exact={x.exact} to={x.to} image={x.image} label={x.label} />
            {false &&
              <Link className="card--cover" to={x.to}>
                <img loading="lazy" src={x.image} />
              </Link>
            }
          </div>))}
        </div>
      </div>
      <Cursor />
    </div>
  );
}

// pure
