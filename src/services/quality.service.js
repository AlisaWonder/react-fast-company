import httpService from "../services/http.service";

const qualityEndpoint = "quality/";

const qualityService = {
    get: async () => {
        const { data } = await httpService.get(qualityEndpoint);
        return data;
    }
};

export default qualityService;
