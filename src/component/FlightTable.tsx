import useFlights from "../hooks/useFlights";
import { FixedSizeList as List } from "react-window";
const FlightTable = () => {
  const {
    flights,
    search,
    setSearch,
    status,
    setStatus,
    aoc,
    setAoc,
    bodyType,
    setBodyType,
    days,
    setDays,
    deleteFlight,
    editingId,
    startEdit,
    cancelEdit,
    saveEdit,
    updateFlight,
    selectedIds,
    toggleSelect,
    deleteSelected,
  } = useFlights();
  const daysList = [
    { label: "Mon", value: 1 },
    { label: "Tue", value: 2 },
    { label: "Wed", value: 3 },
    { label: "Thu", value: 4 },
    { label: "Fri", value: 5 },
    { label: "Sat", value: 6 },
    { label: "Sun", value: 7 },
  ];
  const handleDayChange = (value: number) => {
    if (days.includes(value)) {
      setDays(days.filter((day) => day !== value));
    } else {
      setDays([...days, value]);
    }
  };
  const Row = ({ index, style }: any) => {
    const flight = flights[index];
    console.log("render row:", index);
    return (
      <div
        style={{
          ...style,
          display: "flex",
          borderBottom: "1px solid #ccc",
          alignItems: "center",
        }}
      >
        <div style={{ width: "60px" }}>
          <input
            type="checkbox"
            checked={selectedIds.includes(flight.id)}
            onChange={() => toggleSelect(flight.id)}
          />
        </div>

        <div style={{ width: "100px" }}>{flight.id}</div>
        <div style={{ width: "80px" }}>{flight.aoc}</div>
        <div style={{ width: "100px" }}>{flight.flightNumber}</div>
        <div style={{ width: "100px" }}>{flight.origin}</div>
        <div style={{ width: "120px" }}>{flight.destination}</div>

        <div style={{ width: "100px" }}>
          {editingId === flight.id ? (
            <input
              value={flight.std}
              onChange={(e) => updateFlight(flight.id, "std", e.target.value)}
            />
          ) : (
            flight.std
          )}
        </div>

        <div style={{ width: "100px" }}>
          {editingId === flight.id ? (
            <input
              value={flight.sta}
              onChange={(e) => updateFlight(flight.id, "sta", e.target.value)}
            />
          ) : (
            flight.sta
          )}
        </div>

        <div style={{ width: "120px" }}>
          {editingId === flight.id ? (
            <select
              value={flight.status}
              onChange={(e) =>
                updateFlight(flight.id, "status", e.target.value)
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          ) : (
            flight.status
          )}
        </div>

        <div style={{ width: "150px" }}>
          {editingId === flight.id ? (
            <>
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => startEdit(flight.id)}>Edit</button>
              <button onClick={() => deleteFlight(flight.id)}>Del</button>
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <div>
      <h2>Flight Table</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search by Flight No / Origin / Destination"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px", width: "600px" }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginLeft: "10px", padding: "8px" }}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          value={aoc}
          onChange={(e) => setAoc(e.target.value)}
          style={{ marginLeft: "10px", padding: "8px" }}
        >
          <option value="">All AOC</option>
          <option value="AK">AK</option>
          <option value="D7">D7</option>
          <option value="FD">FD</option>
          <option value="Z2">Z2</option>
        </select>
        <select
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value)}
          style={{ marginLeft: "10px", padding: "8px" }}
        >
          <option value="">All Body Type</option>
          <option value="narrow_body">Narrow Body</option>
          <option value="wide_body">Wide Body</option>
        </select>
      </div>

      <div
        style={{ margin: "10px 0", display: "flex", justifyContent: "center" }}
      >
        {selectedIds.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Delete selected flights?")) {
                deleteSelected();
              }
            }}
            style={{ marginBottom: "10px" }}
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
        <div style={{ marginLeft: "15px" }}>
          {daysList.map((d) => (
            <label key={d.value} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                checked={days.includes(d.value)}
                onChange={() => handleDayChange(d.value)}
              />
              {d.label}
            </label>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontWeight: "bold",
          borderBottom: "1px solid #000",
          padding: "8px 0",
        }}
      >
        <div style={{ width: "60px" }}>Select</div>
        <div style={{ width: "100px" }}>ID</div>
        <div style={{ width: "80px" }}>AOC</div>
        <div style={{ width: "100px" }}>Flight No</div>
        <div style={{ width: "100px" }}>Origin</div>
        <div style={{ width: "120px" }}>Destination</div>
        <div style={{ width: "100px" }}>STD</div>
        <div style={{ width: "100px" }}>STA</div>
        <div style={{ width: "120px" }}>Status</div>
        <div style={{ width: "150px" }}>Action</div>
      </div>
      <List height={400} itemCount={flights.length} itemSize={50} width="100%">
        {Row}
      </List>
    </div>
  );
};

export default FlightTable;
