import { StarIcon } from "./icons/StarIcon"

export default function RatingStars ({ rating }) {
    
   if (rating > 0 && rating <= 1.50) {
        return <StarIcon />
   } else if (rating > 1.50 && rating <= 2.50) {
        return (
            <div className="flex gap-1">
                <StarIcon />
                <StarIcon />
            </div>
        )
    } else if (rating > 2.50 && rating <= 3.50) {
        return (
            <div className="flex gap-1">
                <StarIcon />
                <StarIcon />
                <StarIcon />
            </div>
        )
    } else if (rating > 3.50 && rating <= 4.50) {
        return (
            <div className="flex gap-1">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
            </div>
        )
    } else {
        return (
            <div className="flex gap-1">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
            </div>
        )
    }
}