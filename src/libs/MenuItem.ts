import { faAddressCard, faBox, faCog, faGlobeAsia, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
  title: string;
  icon: IconDefinition;
  link: string;
  subs?: {
    title: string;
    link: string;
  }[];
}

export const MenuItems: MenuItem[] = [
  {
    title: 'common:sidebar.dashboard.title',
    icon: faGlobeAsia,
    link: '/',
  },
  {
    title: 'common:sidebar.product.title',
    icon: faBox,
    link: '#',
    subs: [
      {
        title: 'common:sidebar.product.add_product',
        link: '/product/create',
      },
      {
        title: 'common:sidebar.product.product_list',
        link: '/product',
      },
      {
        title: 'common:sidebar.category.category_list',
        link: '/category',
      },
    ],
  },
  {
    title: 'common:sidebar.customer.title',
    icon: faAddressCard,
    link: '#',
    subs: [
      {
        title: 'common:sidebar.customer.customer_list',
        link: '/customer',
      },
    ],
  },
  {
    title: 'common:sidebar.settings.title',
    icon: faCog,
    link: '#',
    subs: [
      {
        title: 'common:sidebar.settings.add_user',
        link: '/hr/users/create',
      },
      {
        title: 'common:sidebar.settings.user_list',
        link: '/hr/users',
      },
      {
        title: 'common:sidebar.banner.banner_list',
        link: '/banner',
      },
    ],
  },
];
