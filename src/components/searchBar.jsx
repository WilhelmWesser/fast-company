import { React } from "react";
import PropTypes from "prop-types";
const SearchBar = ({ handleChange, searchValue }) => {
    return (
        <form className="input-group mb-3">
            <input
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Find User"
                aria-describedby="button-addon2"
                value={searchValue}
            ></input>
        </form>
    );
};
SearchBar.propTypes = {
    handleChange: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired
};
export default SearchBar;
