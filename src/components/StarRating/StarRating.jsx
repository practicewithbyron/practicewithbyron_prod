import React, { useEffect, useState } from "react";

import StarHollow from './StarHollow';
import StarHalf from "./StarHalf";
import StarFull from "./StarFull";

import "./StarRating.css";

const GetRating = (decimal) => {
    const rounded = Math.round(decimal * 2) / 2;
    const isEndsWithPointFive = rounded % 1 === 0.5;
    
    return {
      num: Math.floor(rounded),
      endsWithPointFive: isEndsWithPointFive
    };
}

export const StarRating = ({num}) => {
    const [starRating, setStarRating] = useState(null)

    useEffect(() => {
        setStarRating(GetRating(num));
    }, [num])

    return(
        <div className="starRating-container">
            {Array.from({ length: starRating?.num }, (_, i) => (
                <StarFull key={i} />
            ))}
            { starRating?.endsWithPointFive ? <StarHalf/> : <></>}
            {Array.from({ length: 5 - (starRating?.num + (starRating?.endsWithPointFive ? 1 : 0)) }, (_, i) => (
                <StarHollow key={i} />
            ))}
        </div>
    )
}