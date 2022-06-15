import PropTypes from 'prop-types';
import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { OTHER_SERP_PATTERN_LIST } from 'shared/constants';
import { getMerchantOfSerpMap } from 'shared/selectors/merchants';

import SerpLink from '../components/SerpLink';

const prependElement = (insertedRow, alink, serpElement) => {
  let element = alink.firstChild;
  for (let i = 1; i < insertedRow; i++) {
    element = element.nextSibling;
  }

  alink.insertBefore(serpElement, element);
};


const getInlineStyle = (styleObj) => {
  const inline = Object.entries(styleObj).reduce((prev, curr) => {
    let [attr, val] = curr;
    const attrWithoutUnit = ['z-index'];
    if (Number.isInteger(val) && !attrWithoutUnit.includes(attr)) {
      val += 'px';
    }
    return prev += `${attr}: ${val}; `;
  }, '');
  return inline;
}

const styles = {
  shopbackSerp: {
    display: 'block !important',
    height: '20px',
    clear: 'both',
  },
}

export class SerpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.sbSerpClasses = [
      'shopback-serp',
      'shopback-serp-link',
      'shopback-serp-logo',
      'shopback-serp-text',
    ];
    // this.getLinkClickHandler = this.getLinkClickHandler.bind(this);
    // this.trackSerpLinkClick = this.trackSerpLinkClick.bind(this);
  }

  // componentDidMount() {
  //   const { serp, merchantOfSerpMap } = this.props;
  //   const injectionCount = merchantOfSerpMap.length;
  //   if (!injectionCount) {
  //     this.props.unMount();
  //   } else {
  //     this.props.trackExtSerpVisited(serp.domain);
  //   }
  // }

  // getLinkClickHandler(link, merchant) {
  //   const linkUrl = link.getAttribute('href');

  //   return (event) => {
  //     this.trackSerpLinkClick(event, linkUrl, merchant.id);
  //   };
  // }

  matchClickTarget(link, target) {
    const isSBSerp = this.sbSerpClasses.some((className) => target.matches(`.${className}`));
    const isOtherSerp = OTHER_SERP_PATTERN_LIST.some((selector) => {
      const otherSerpElem = link.querySelector(selector);
      if (otherSerpElem) {
        return target.isEqualNode(otherSerpElem) || otherSerpElem.contains(target);
      }
      return false;
    });
    let clickTarget = 'rawLink';

    if (isSBSerp) {
      clickTarget = 'sbSerp';
    } else if (isOtherSerp) {
      clickTarget = 'otherSerp';
    }

    return clickTarget;
  }

  // trackSerpLinkClick(event, url, eventTrackMerchantId) {
  //   const { serp } = this.props;
  //   const link = event.currentTarget;
  //   const target = event.target;
  //   const clickTarget = this.matchClickTarget(link, target);
  //   this.props.dispatch(trackExtSerpClicked(serp.domain, url, eventTrackMerchantId, clickTarget));
  // }

  renderSerpLinks(linkMerchantsMap) {
    const { serp } = this.props;
    linkMerchantsMap.forEach((merchantMap) => {
      const { merchant, link } = merchantMap;
      const serpDiv = document.createElement('div');

      serpDiv.className = 'shopback-serp';
      serpDiv.style = getInlineStyle(styles.shopbackSerp);
      link.setAttribute('shopback-serp', 'true');
      link.onclick = this.getLinkClickHandler(link, merchant);

      prependElement(serp.insertedRow, link, serpDiv);
      /* calling ReactDOM.render here will trigger warning console.
       * Warning: Render methods should be a pure function of props and state;
       * triggering nested component updates from render is not allowed.
       * If necessary, trigger nested updates in componentDidUpdate.
       */
      render(<SerpLink merchant={merchant} />, serpDiv);
    });
  }

  render() {
    const { merchantOfSerpMap } = this.props;
    if (merchantOfSerpMap.length) {
      this.renderSerpLinks(merchantOfSerpMap);
    }
    return null;
  }
}


SerpContainer.propTypes = {
  serp: PropTypes.object.isRequired,
  // unMount: PropTypes.func.isRequired,
  merchantOfSerpMap: PropTypes.array.isRequired,
  // trackExtSerpVisited: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  (state, props) => ({
    merchantOfSerpMap: getMerchantOfSerpMap(state, { links: props.links }),
  }),
  (dispatch) => ({
    // ...bindActionCreators(
    //   {
    //     trackExtSerpVisited: trackExtSerpVisitedAction,
    //   },
    //   dispatch
    // ),
    dispatch,
  })
)(SerpContainer);
