import React from "react";
import PropTypes from "prop-types";
const SearchStatus = ({ length, onQuantityChange }) => {
    return (
        <h2 key="h2">
            <span
                key="message"
                className={
                    onQuantityChange(length).includes("Никто")
                        ? "badge bg-danger"
                        : "badge bg-primary"
                }
            >
                {onQuantityChange(length)}
            </span>
        </h2>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired,
    onQuantityChange: PropTypes.func.isRequired
};

export default SearchStatus;
