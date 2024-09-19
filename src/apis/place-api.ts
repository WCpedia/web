import { IApiServerResponseBody } from "../common/interface/interface";
import { PaginatedResponse } from "../common/type/type";
import { fetchToServer } from "./api";
import { IPaginationParams } from "./interface/common-api.interface";
import { IPlace } from "./interface/place.interface";

const ENV = import.meta.env;

export class PlaceApi {
  static async getPlaceWithToiletList({
    take = 20,
    lastItemId,
  }: {
    take?: number;
    lastItemId?: number | null;
  }): Promise<IApiServerResponseBody<PaginatedResponse<IPlace, "places">>> {
    try {
      let url = `places/toilet?take=${take}`;
      if (lastItemId) {
        url += `&lastItemId=${lastItemId}`;
      }
      const response = await fetchToServer(url);
      if (response.status !== 200) {
        throw new Error(`response.status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}
