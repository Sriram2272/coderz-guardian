import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';

// Pages that handle their own top bar
const pagesWithCustomTopBar = ['/universities'];

export function AdminLayout() {
  const location = useLocation();
  const hasCustomTopBar = pagesWithCustomTopBar.some(path => 
    location.pathname === path
  );

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {!hasCustomTopBar && <AdminTopBar />}
        <main className={`flex-1 overflow-y-auto ${hasCustomTopBar ? '' : 'p-6'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
