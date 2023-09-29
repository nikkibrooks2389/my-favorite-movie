function SortBy(props) {
    const options = [
        { value: 'popularity.desc', label: 'Popularity Descending' },
        { value: 'release_date.desc', label: 'Release Date Descending' },
        // ... add more as required
    ];

    return (
        <div>
            <select onChange={(e) => props.onSortChange(e.target.value)}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SortBy;