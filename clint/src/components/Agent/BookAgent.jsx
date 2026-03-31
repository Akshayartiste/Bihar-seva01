"use client"

import { useState, useMemo, Suspense, useRef, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "../ui/Input"
import { AgentCard } from "./Agent-card"
import agentsData from "../data/bookAgent.json"
import "../css/BookAgent.css"

const SERVICES = [
  "Medicine Delivery",
  "Document Work",
  "Shopping",
  "Banking",
  "Tickets",
  "Recharge",
]

function BookAgentContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedServices, setSelectedServices] = useState([])
  const [sortBy, setSortBy] = useState("rating")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isFilterOpen])

  const filteredAgents = useMemo(() => {
    let result = agentsData.agents

    if (searchQuery) {
      result = result.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedServices.length > 0) {
      result = result.filter((agent) =>
        selectedServices.some((service) =>
          agent.services.includes(service)
        )
      )
    }

    result.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "slots") return b.availableSlots - a.availableSlots
      return 0
    })

    return result
  }, [searchQuery, selectedServices, sortBy])

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    )
  }

  const clearFilters = () => {
    setSelectedServices([])
    setSortBy("rating")
    setSearchQuery("")
  }

  const FilterContent = () => (
    <>
      <div className="filter-section">
        <h3 className="filter-title">
          <Filter className="filter-icon" />
          Filter by Service
        </h3>

        <div className="service-filters">
          {SERVICES.map((service) => (
            <label key={service} className="service-checkbox">
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => toggleService(service)}
              />
              <span className="checkbox-label">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Sort By</h3>
        <div className="sort-options">
          {[
            { value: "rating", label: "Highest Rated" },
            { value: "slots", label: "Most Available" },
            { value: "price", label: "By Price" },
          ].map((option) => (
            <label key={option.value} className="sort-radio">
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sortBy === option.value}
                onChange={(e) => setSortBy(e.target.value)}
              />
              <span className="radio-label">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="clear-filters-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </>
  )

  return (
    <>
      <div className="page-headers">
        <h1 className="page-titles">Book a Service Agent</h1>
        <p className="page-subtitles">
          Find trusted agents in Bihar for your daily needs
        </p>
      </div>

      <div className="page-container">
        {/* Desktop Filter */}
        <div className="desktop-filter-container">
          <div className="filters-sidebar">
            <FilterContent />
          </div>
        </div>

        {/* Mobile / Tablet Filter */}
        <div className="mobile-filter-container" ref={filterRef}>
          <button
            className="filter-toggle-btn"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="filter-icon-btn" />
            Filters
          </button>

          {isFilterOpen && (
            <div className="filters-dropdown">
              <button
                className="filter-close-btn"
                onClick={() => setIsFilterOpen(false)}
              >
                <X className="filter-close-icon" />
              </button>
              <FilterContent />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Search */}
          <div className="search-container">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <Input
                type="text"
                placeholder="Search agents by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Results Info */}
          <div className="results-info">
            {filteredAgents.length > 0 ? (
              <p>
                {filteredAgents.length} agent
                {filteredAgents.length !== 1 ? "s" : ""} found
              </p>
            ) : (
              <p>No agents found matching your criteria</p>
            )}
          </div>

          {/* Agent Grid */}
          {filteredAgents.length > 0 ? (
            <div className="agents-grid">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default function BookAgentPage() {
  return (
    <main className="book-agent-page">
      <Suspense fallback={null}>
        <BookAgentContent />
      </Suspense>
    </main>
  )
}
