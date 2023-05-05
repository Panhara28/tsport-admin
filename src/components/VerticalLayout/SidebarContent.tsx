import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';

// //Import Scrollbar
import SimpleBar from 'simplebar-react';

// MetisMenu
import MetisMenu from 'metismenujs';
import Link from 'next/link';

//i18n

const SidebarContent = (props: any) => {
  const ref: any = useRef();

  const activateParentDropdown = useCallback(item => {
    item.classList.add('active');
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show');
    }

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              parent5.childNodes[0].classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props?.location?.pathname;
    new MetisMenu('#side-menu');
    let matchingMenuItem = null;
    const ul: any = document.getElementById('side-menu');
    const items = ul.getElementsByTagName('a');
    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }

    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [props?.location?.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item: any) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      {/* <SimpleBar style={{ maxHeight: '100%' }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Menu </li>
            <li>
              <Link href="/">
                <a className="waves-effect">
                  <i className="uil-home-alt"></i>
                  <span className="badge rounded-pill bg-primary float-end">01</span>
                  <span>Dashboard</span>
                </a>
              </Link>
            </li>

            <li className="menu-title">Apps</li>
            <li>
              <Link href="#">
                <a className="has-arrow waves-effect">
                  <i className="uil-store"></i>
                  <span>Ecom</span>
                </a>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link href="/#">
                    <a>Hello</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar> */}
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default SidebarContent;
