import React from 'react';

const FilterBar = ({ statusFilter, setStatusFilter, searchQuery, setSearchQuery }) => {
    const tabs = ['All', 'New', 'Completed'];

    return (
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mb-10">
            <div className="flex bg-white p-1.5 rounded-[20px] border border-slate-200/60 shadow-sm w-full sm:w-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50/50 pointer-events-none"></div>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setStatusFilter(tab)}
                        className={`relative z-10 flex-1 sm:flex-none px-8 py-2.5 rounded-2xl text-sm font-bold transition-all duration-500 ${
                            statusFilter === tab 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="relative w-full sm:w-80 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                    type="text"
                    className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200/60 rounded-[22px] text-base outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 text-slate-700 placeholder:text-slate-400 shadow-sm font-semibold"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    );
};

export default FilterBar;
