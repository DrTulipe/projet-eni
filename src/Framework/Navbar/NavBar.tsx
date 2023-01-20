import { FaChevronDown } from 'react-icons/fa'
import { GiChickenOven } from 'react-icons/gi'
import  BrandIconUrl from '../../../public/images-logo/PLANNING BY DAY Logo - Original.svg';

interface Props {
  childrens: any;
}
export function Navbar(props: Props ) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl overflow-hidden">
          <img className="w-48 -my-[50%] p-0" src={BrandIconUrl} alt="Planning By Day" />
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <a>
              Parent
              <FaChevronDown />
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
