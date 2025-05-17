import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const isLogged = localStorage.getItem('auth') === 'true'

  if (!isLogged) {
    router.navigate(['/login'])
    return false
  }
  return true;
};
