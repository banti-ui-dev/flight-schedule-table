import { useEffect, useState } from "react"
import type { Flight } from "../types/flight"
import flightsData from "../data/flights.json"
const useFlights = () => {
    const [flights, setFlights] = useState<Flight[]>([])
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState("");
    const [aoc, setAoc] = useState("");
    const [bodyType, setBodyType] = useState("");
    const [days, setDays] = useState<number[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    useEffect(() => {
        setFlights(flightsData.flights as Flight[]);
    }, [])

    const filteredFlights = flights.filter((item) => {
        const matchesSearch =
            item.flightNumber.toLowerCase().includes(search.toLowerCase()) ||
            item.origin.toLowerCase().includes(search.toLowerCase()) ||
            item.destination.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = status ? item.status === status : true;

        const matchesAoc = aoc ? item.aoc === aoc : true;

        const matchesBodyType = bodyType ? item.bodyType === bodyType : true;

        const matchesDays =
            days.length > 0
                ? item.daysOfOperation.some((day) => days.includes(day))
                : true;
        return matchesSearch && matchesStatus && matchesAoc && matchesBodyType && matchesDays;
    });

    const deleteFlight = (id: string) => {
        setFlights((prev) => prev.filter((item) => item.id !== id));
    };

    //Update Function with help of AI
    const updateFlight = (id: string, field: keyof Flight, value: any) => {
        setFlights((prev) =>
            prev.map((f) => f.id === id ? { ...f, [field]: value } : f)
        );
    };
    const startEdit = (id: string) => { setEditingId(id); };
    const cancelEdit = () => { setEditingId(null); };
    const saveEdit = () => { setEditingId(null); };
    //toggle Select with help of AI
    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id)
            ? prev.filter((i) => i !== id)
            : [...prev, id]
        );
    };
    const deleteSelected = () => {
        setFlights((prev) =>
            prev.filter((f) => !selectedIds.includes(f.id))
        );
        setSelectedIds([]);
    };
    return { flights: filteredFlights, search, setSearch, status, setStatus, aoc, setAoc, bodyType, setBodyType, days, setDays, deleteFlight, editingId, startEdit, cancelEdit, saveEdit, updateFlight, selectedIds, toggleSelect, deleteSelected}
}

export default useFlights
