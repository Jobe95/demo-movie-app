import { useNavigate } from "react-router-dom";
import { Show } from "../types/show";
import { Badge } from "./badge";
import { ShowImage } from "./show-image";
import { ShowSummary } from "./show-summary";

export const ShowCard = (show: Show) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${show.id}`);
    window.scrollTo(0, 0);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <li
      className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md outline-none transition duration-300 ease-in-out hover:shadow-md hover:shadow-emerald-500 focus:shadow-emerald-500"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${show.name}`}
    >
      <ShowImage image={show.image?.medium} alt={`${show.name} image`} />
      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-1">
          <h3 className="text-md font-semibold text-emerald-500">
            {show.name}
          </h3>
          <Badge
            text={show.rating.average?.toString() || "N/A"}
            variant="rating"
          />
        </div>
        <ShowSummary summary={show.summary} className="line-clamp-2" />
      </div>
    </li>
  );
};
