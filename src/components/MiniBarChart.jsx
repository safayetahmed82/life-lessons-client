const MiniBarChart = ({ data }) => {
  const max = Math.max(...data.map((day) => day.count), 1);

  return (
    <div className="mt-6 flex h-44 items-end gap-3">
      {data.map((day) => (
        <div
          key={day.date}
          className="flex h-full flex-1 flex-col items-center justify-end gap-1"
        >
          <span className="text-xs font-semibold text-night">{day.count}</span>
          <div
            className="w-full max-w-[44px] rounded-t-md bg-night"
            style={{ height: `${Math.max((day.count / max) * 100, 3)}%` }}
          ></div>
          <span className="text-xs text-gray-600">{day.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MiniBarChart;