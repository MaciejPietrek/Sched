import { MegaMenuItem, MenuItem } from 'primeng/api';
import { paths } from './paths';

export const navigationItem = {
  user: (username: string) => ({
    icon: 'pi pi-fw pi-user',
    label: username,
    routerLink: `/${paths.userPage}`,
  }),
  sources: {
    icon: 'pi pi-fw pi-database',
    label: 'sources',
    routerLink: `/${paths.souces}`,
  },
  signOut: {
    icon: 'pi pi-fw pi-sign-out',
    label: 'sign out',
    routerLink: `/${paths.signOut}`,
  },
  signIn: {
    icon: 'pi pi-fw pi-sign-in',
    label: 'sign in',
    routerLink: `/${paths.signIn}`,
  },
  main: {
    icon: 'pi pi-fw pi-home',
    label: 'main',
    routerLink: `/${paths.main}`,
  },
};
