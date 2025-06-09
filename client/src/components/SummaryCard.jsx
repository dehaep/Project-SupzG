// src/components/SummaryCard.jsx

export default function SummaryCard({ title, value, color }) {
    return (
        <div className={`p-4 rounded shadow ${color}`}>
        <p className="text-sm text-zinc-600">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        </div>
    );
    }
