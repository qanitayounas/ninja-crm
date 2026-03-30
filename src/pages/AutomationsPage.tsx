import { Outlet } from 'react-router-dom';

export const AutomationsPage = () => {
    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-12 bg-ninja-bg custom-scrollbar animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto pb-10">
                <Outlet />
            </div>
        </div>
    );
};
