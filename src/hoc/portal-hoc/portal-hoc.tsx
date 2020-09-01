// Modules
import React, { Component, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';

// Constants
import { ROOT_ELEMENT_ID } from 'constants/ui.constants';

/**
 * Portal HOC
 */
const PortalHoc = <T,>(EnhancedComponent: FunctionComponent<T>) =>
  class PortalComponent extends Component<T> {
    rootContainer: HTMLElement = document.getElementById(ROOT_ELEMENT_ID)!;

    render() {
      return ReactDOM.createPortal(<EnhancedComponent {...this.props} />, this.rootContainer);
    }
  };

export default PortalHoc;
