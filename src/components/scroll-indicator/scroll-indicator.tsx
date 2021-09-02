import * as React from 'react';
import { useLayoutEffect, useState } from 'react';
import { ScrollIndicatorProps } from '../types';
import './scroll-indicator.scss';

export function ScrollIndicator(props: ScrollIndicatorProps) {

  const [scroll, setScroll] = useState(0);

  const onScroll = () => {
    const documentElement = document.documentElement;
    const scrollTop = documentElement.scrollTop;
    const scrollHeight = documentElement.scrollHeight - documentElement.clientHeight;
    const percent = (scrollTop / scrollHeight) * 100;
    setScroll(percent);
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [props.totalPages]);

  return (
    <div className="scroll-indicator">
      <div className="scroll-indicator__track" style={{ width: `${scroll}%` }}></div>
    </div>
  );
}
