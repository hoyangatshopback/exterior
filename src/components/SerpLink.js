import PropTypes from 'prop-types';
import React from 'react';
// import styled, { css } from 'styled-components';

import logo from '@/assets/content/icon-16.png';

const styles = {
  shopbackSerpLink: {
    display: 'flex',
    height: '100%',
    justifyContent: 'start',
    alignItems: 'flex-end',
  },
  shopbackSerpLogo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px',
    width: '16px',
    height: '16px',
  },
  shopbackSerpText: {
    fontFamily: '"Roboto", sans-serif',
    marginLeft: '4px',
    fontSize: '14px',
    color: '#ff4e4e',
    lineHeight: '16px',
    verticalAlign: 'top',
  }
}

// const ShopbackSerpLink = styled.div`
//   display: flex;
//   height: 100%;
//   justify-content: start;
//   align-items: flex-end;
// `;

// const ShopbackSerpLogo = styled.div`
//   background-image: url(${logo});
//   background-repeat: no-repeat;
//   background-size: 16px;
//   width: 16px;
//   height: 16px;
// `

// const ShopbackSerpTextCSS = css`
//   font-family: 'Roboto', sans-serif;
//   margin-left: 4px;
//   font-size: 14px;
//   color: #ff4e4e;
//   line-height: 16px;
//   vertical-align: top;
// `

// const ShopbackSerpText = styled.div`${ShopbackSerpTextCSS}`

const SerpLink = (props) => {
  return (
    <div style={styles.shopbackSerpLink}>
      <div style={styles.shopbackSerpLogo} />
      <div style={styles.shopbackSerpText}>{props?.merchant?.serpCashbackInfo || ''}</div>
    </div>
  )
};

SerpLink.propTypes = {
  merchant: PropTypes.object.isRequired,
};

export default SerpLink;
