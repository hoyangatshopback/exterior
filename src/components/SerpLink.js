import PropTypes from 'prop-types';
import React from 'react';

import logo from '@/assets/content/icon-16.png';

const styles = {
  shopbackSerpLink: {
    display: 'flex !important',
    height: '100% !important',
    'justify-content': 'start',
    'align-items': 'flex-end',
  },
  shopbackSerpLogo: {
    'background-image': `url(${logo}) !important`,
    'background-repeat': 'no-repeat !important',
    'background-size': '16px !important',
    width: '16px !important',
    height: '16px !important',
  },
  shopbackSerpText: {
    'font-family': '"Roboto", sans-serif !important',
    'margin-left': '4px !important',
    'font-size': '14px !important',
    color: '#ff4e4e !important',
    'line-height': '16px !important',
    'vertical-align': 'top !important',
  }
}

const SerpLink = (props) => (
  <div style={styles.shopbackSerpLink}>
    <div style={styles.shopbackSerpLogo} />
    <div style={styles.shopbackSerpText}>{props.merchant.serpCashbackInfo}</div>
  </div>
);

SerpLink.propTypes = {
  merchant: PropTypes.object.isRequired,
};

export default SerpLink;
