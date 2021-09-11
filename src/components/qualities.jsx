import React from "react";
import PropTypes from "prop-types";

const Qualities = (props) => {
    return (
        <td>
            {props.qualities.map((colorBlock) => {
                return (
                    <span
                        className={props.onClass(colorBlock.color)}
                        key={props.qualities.id}
                    >
                        {colorBlock.name}
                    </span>
                );
            })}
        </td>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired,
    onClass: PropTypes.func.isRequired
};
export default Qualities;
