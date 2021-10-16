/* eslint-disable indent */
import React, { useState } from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const [caretArray, setCaretArray] = useState(columns);
    const handleSort = (item) => {
        if (selectedSort.iter === item) {
            onSort({
                ...selectedSort,
                // eslint-disable-next-line multiline-ternary
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
            // selectedSort.order === "desc"
            //         ? "bi bi-caret-down-fill"
            //         : "bi bi-caret-up-fill"
            setCaretArray((prevstate) => {
                const newCaretArr = columns;
                newCaretArr[
                    selectedSort.iter === "profession.name"
                        ? "professions"
                        : selectedSort.iter
                ].className =
                    selectedSort.order === "asc"
                        ? "bi bi-caret-up-fill"
                        : "bi bi-caret-down-fill";
                return newCaretArr;
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };

    const handleFiltration = (item) => {
        handleSort(item);
    };
    return (
        <thead key="thead">
            <tr key="tr">
                {Object.keys(caretArray).map((column) => (
                    <th
                        key={column}
                        onClick={
                            caretArray[column].path
                                ? () =>
                                      handleFiltration(caretArray[column].path)
                                : undefined
                        }
                        {...{ role: caretArray[column].path && "button" }}
                        scope="col"
                    >
                        {caretArray[column].name}
                        <i className={caretArray[column].className}></i>
                    </th>
                ))}

                <th key="del btn column" scope="col"></th>
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
