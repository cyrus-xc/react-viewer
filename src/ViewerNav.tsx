import * as React from 'react';
import { ImageDecorator } from './ViewerProps';

type ReferrerPolicy = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';

export interface ViewerNavProps {
  prefixCls: string;
  images: ImageDecorator[];
  activeIndex: number;
  onChangeImg: (index: number) => void;
}

export default function ViewerNav(props: ViewerNavProps) {
  const { activeIndex = 0 } = props;

  function handleChangeImg(newIndex: number) {
    if (activeIndex === newIndex) {
      return;
    }
    props.onChangeImg(newIndex);
  }

  const marginLeft = `calc(50% - ${activeIndex + 1} * 31px)`;
  const listStyle = {
    marginLeft,
  };

  return (
    <div className={`${props.prefixCls}-navbar`}>
      <ul className={`${props.prefixCls}-list ${props.prefixCls}-list-transition`} style={listStyle}>
        {props.images.map((item, index) => (
          <li
            key={index}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => {
              handleChangeImg(index);
            }}
          >
            <img
              src={item.src}
              alt={item.alt || ''}
              loading={item.loading}
              decoding={item.decoding}
              crossOrigin={item.crossOrigin}
              referrerPolicy={item.referrerPolicy as ReferrerPolicy}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
