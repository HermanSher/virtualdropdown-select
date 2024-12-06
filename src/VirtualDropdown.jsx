import { useEffect, useMemo, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";

function VirtualizedDropdown({
    fullData,
    chunkSize = 100,
    itemHeight = 35,
    displayKey = "customer",
    inputWidth = "100%",
    inputHeight = "35px",
    inputColor = "#ccc",
    multipleSelect = true,
    dropdownWidth = "350px",
    maxDropdownHeight = 300,
    onChange,
    keyField = "id" // New prop to allow users to specify the key field
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [dimensions, setDimensions] = useState({
        width: parseInt(dropdownWidth) || 350,
        height: maxDropdownHeight
    });
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [displayData, setDisplayData] = useState([]);

    const containerRef = useRef(null);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const hasMore = displayData.length < fullData.length;

    useEffect(() => {
        setDisplayData(fullData.slice(0, chunkSize));
    }, [fullData, chunkSize]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchQuery("");
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const viewportHeight = window.innerHeight;
                const rect = containerRef.current.getBoundingClientRect();
                const availableHeight = viewportHeight - rect.bottom - 20;
                const containerWidth = containerRef.current.offsetWidth;

                setDimensions({
                    width: containerWidth,
                    height: Math.max(Math.min(availableHeight, maxDropdownHeight), 200)
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [isOpen, maxDropdownHeight]);

    const filteredData = useMemo(() => {
        if (!searchQuery) return displayData;

        const lowerCaseQuery = searchQuery.toLowerCase();

        return fullData.filter((item) =>
            Object.values(item).some((value) => {
                const stringValue = String(value).toLowerCase();
                return stringValue.includes(lowerCaseQuery);
            })
        );
    }, [fullData, displayData, searchQuery]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Update toggleSingleItem to use dynamic keyField
    const toggleSingleItem = (id, item, isSelected) => {
        if (multipleSelect) {
            const newSelectedItems = isSelected
                ? [...selectedItems, item]
                : selectedItems.filter((selectedItem) => selectedItem[keyField] !== id);
            setSelectedItems(newSelectedItems);
            setSelectedIds(newSelectedItems.map(item => item[keyField]));
            onChange?.(newSelectedItems); // Call onChange with new selection
        } else {
            const newSelectedItems = isSelected ? [item] : [];
            setSelectedItems(newSelectedItems);
            setSelectedIds(isSelected ? [id] : []);
            setSearchQuery("");
            setIsOpen(false);
            onChange?.(newSelectedItems); // Call onChange with new selection
        }
    };

    // Update toggleSelectAll to use dynamic keyField
    const toggleSelectAll = (isSelected) => {
        if (isSelected) {
            setSelectedIds(fullData.map((item) => item[keyField]));
            setSelectedItems(fullData);
            onChange?.(fullData); // Call onChange with all items
        } else {
            setSelectedIds([]);
            setSelectedItems([]);
            onChange?.([]); // Call onChange with empty array
        }
    };

    const loadMore = () => {
        const currentLength = displayData.length;
        const nextChunk = fullData.slice(currentLength, currentLength + chunkSize);
        setDisplayData((prev) => [...prev, ...nextChunk]);
    };

    return (
        <div style={{ position: "relative", width: dropdownWidth }} ref={containerRef}>
            <div style={{ position: "relative" }}>
                <div style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    border: `1px solid ${inputColor}`,
                    borderRadius: "4px",
                    minHeight: inputHeight,
                    padding: "4px 8px",
                    boxSizing: "border-box",
                    gap: "8px",
                    cursor: "text",
                    width: inputWidth, // Add this
                }} onClick={() => {
                    inputRef.current?.focus();
                }}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={selectedItems.length === 0 ? "Search..." : ""}
                        style={{
                            height: "100%",
                            border: "none",
                            outline: "none",
                            padding: "0",
                            flex: "1",
                            fontSize: "14px",
                            minWidth: "50px",
                            backgroundColor: "transparent",
                            width: "100%", // This ensures input takes available space
                        }}
                        value={multipleSelect
                            ? searchQuery
                            : (searchQuery || (selectedItems[0] && displayKey.split(".").reduce((obj, key) => obj?.[key], selectedItems[0])) || "")}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (!isOpen) {
                                setIsOpen(true);
                            }
                            if (!multipleSelect) {
                                setSelectedItems([]);
                                setSelectedIds([]);
                            }
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown();
                        }}
                    />
                    {multipleSelect && selectedItems.length > 0 && (
                        <div style={{
                            backgroundColor: "#e3e3e3",
                            borderRadius: "16px",
                            padding: "2px 8px",
                            fontSize: "12px",
                            color: "#666",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            whiteSpace: "nowrap",
                        }}>
                            <span>
                                {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItems([]);
                                    setSelectedIds([]);
                                }}
                                style={{
                                    border: "none",
                                    background: "none",
                                    padding: "0",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    color: "#666",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        width: "100%",
                        backgroundColor: "#fff",
                        border: "1px solid #e1e4e8",
                        borderRadius: "4px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                        zIndex: 1000,
                        boxSizing: "border-box",
                    }}
                >
                    {multipleSelect && (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            borderBottom: "1px solid #e1e4e8",
                        }}>
                            <input
                                type="checkbox"
                                onChange={(e) => toggleSelectAll(e.target.checked)}
                                checked={selectedIds.length > 0 && selectedIds.length === fullData.length}
                                style={{ marginRight: "8px" }}
                            />
                            <span style={{ fontSize: "14px" }}>
                                Select All
                            </span>
                        </div>
                    )}

                    <List
                        height={dimensions.height}
                        itemCount={filteredData.length}
                        itemSize={itemHeight}
                        width={dimensions.width}
                        onItemsRendered={({ visibleStopIndex }) => {
                            if (hasMore && visibleStopIndex >= filteredData.length - 1) {
                                loadMore();
                            }
                        }}
                        style={{
                            padding: "4px 0",
                            overflowX: "hidden",
                        }}
                    >
                        {({ index, style }) => {
                            const item = filteredData[index];
                            const displayValue = displayKey.split(".").reduce((obj, key) => obj?.[key], item);
                            const isSelected = selectedIds.includes(item[keyField]);

                            return (
                                <div style={{
                                    ...style,
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "0 12px",
                                    fontSize: "14px",
                                    backgroundColor: multipleSelect
                                        ? (isSelected ? "#f1f8ff" : "transparent")
                                        : (isSelected ? "#e6f3ff" : "transparent"),
                                    cursor: "pointer"
                                }}
                                    onClick={(e) => {
                                        if (e.target.type !== 'checkbox') {
                                            toggleSingleItem(item[keyField], item, !isSelected);
                                        }
                                    }}>
                                    {multipleSelect && (
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                toggleSingleItem(item[keyField], item, e.target.checked);
                                            }}
                                            style={{ marginRight: "8px" }}
                                        />
                                    )}
                                    {displayValue}
                                </div>
                            );
                        }}
                    </List>

                    {filteredData.length === 0 && (
                        <div style={{
                            padding: "12px",
                            textAlign: "center",
                            color: "#666",
                            fontSize: "14px"
                        }}>
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default VirtualizedDropdown;
