import * as React from 'react';
import { HTMLProps, useRef, useState } from 'react';
import { className } from '../@hooks/class-name/class-name';
import { useIntersection } from '../@hooks/intersection/intersection';
import { ImgProps } from '../types';
import './img.scss';

export function Img(props: ImgProps & HTMLProps<HTMLImageElement>) {

  const [loaded, setLoaded] = useState(false);

  const [visible, setVisible] = useState(false);

  const elementRef = useRef<HTMLImageElement>(null);

  useIntersection(elementRef, () => {
    setVisible(true);
  }, '0px');

  const onLoad = () => {
    setLoaded(true);
    // console.log("Loaded!");
  };

  const onClick = (typeof props.onClick === 'function') ? (event: any) => (props.onClick as (event: any) => void)(event) : undefined;

  return (
    <img className={className('img', { loaded })} onLoad={onLoad} onClick={onClick} src={visible ? props.src : undefined} ref={elementRef} data-hover />
  );
}
