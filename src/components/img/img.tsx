import * as React from 'react';
import { HTMLProps, useState } from 'react';
import { className } from '../@hooks/class-name/class-name';
import { ButtonProps } from '../types';
import './img.scss';

export function Img(props: ButtonProps & HTMLProps<HTMLImageElement>) {

  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
    console.log("Loaded!");
  };

  const onClick = (typeof props.onClick === 'function') ? (event: any) => (props.onClick as (event: any) => void)(event) : undefined;

  return (
    <img className={className('img', { loaded })} src={props.src} loading="lazy" onLoad={onLoad} onClick={onClick} data-hover />
  );
}
