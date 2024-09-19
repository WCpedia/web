import { useState, useEffect, useCallback, useRef } from "react";
import { PlaceApi } from "../apis/place-api";
import { IPlace } from "../apis/interface/place.interface";

interface UsePlacesWithToiletsProps {
  initialTake?: number;
}

export const usePlacesWithToilets = ({ initialTake = 10 }: UsePlacesWithToiletsProps = {}) => {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastItemId, setLastItemId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const isInitialMount = useRef(true);

  const fetchPlacesWithToilets = useCallback(async (take: number, lastId?: number | null) => {
    if (loading) return; // 이미 로딩 중이면 중복 요청 방지
    setLoading(true);
    setError(null);
    try {
      const res = await PlaceApi.getPlaceWithToiletList({ take, lastItemId: lastId });
      const newPlaces = res.data.places;

      if (newPlaces.length < take) {
        setHasMore(false);
      }

      if (newPlaces.length > 0) {
        setPlaces((prevPlaces) => [...prevPlaces, ...newPlaces]);
        setLastItemId(newPlaces[newPlaces.length - 1].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("화장실 정보를 가져오는 데 실패했습니다."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchPlacesWithToilets(initialTake);
    }
  }, [fetchPlacesWithToilets, initialTake]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchPlacesWithToilets(initialTake, lastItemId);
    }
  }, [fetchPlacesWithToilets, initialTake, lastItemId, loading, hasMore]);

  return { places, loading, error, hasMore, loadMore };
};
