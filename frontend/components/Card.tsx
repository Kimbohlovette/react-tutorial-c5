import React from "react";

function StatsCard({ title, text }: { title: string; text: string }) {
	return (
		<div className="flex-1 p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
			<p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
			<p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{text}</p>
		</div>
	);
}

export default StatsCard;
