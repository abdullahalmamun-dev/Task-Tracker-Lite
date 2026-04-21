import React from 'react';

const FilterBar = ({ statusFilter, setStatusFilter, searchQuery, setSearchQuery }) => {
    const tabs = ['All', 'New', 'Completed'];

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
            <div className="flex bg-slate-200/50 p-1 rounded-xl w-full sm:w-auto">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setStatusFilter(tab)}
                        className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                            statusFilter === tab 
                            ? 'bg-white text-indigo-600 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="relative w-full sm:w-64 group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-700 placeholder:text-slate-400 shadow-sm font-medium"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    );
};

export default FilterBar;
